'use server';

import { Booking, BookingFormData, SortField, SortDirection, Customer } from '@/app/[locale]/dashboard/crm/types';
import { calculateEndTime } from '@/app/[locale]/dashboard/crm/utils';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth-server';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';

// Helper to get organization ID
async function getOrganizationId() {
  const session = await getSession();
  if (!session?.session?.activeOrganizationId) {
    throw new Error('No active organization');
  }
  return session.session.activeOrganizationId;
}

// --- Activities Actions ---
export async function logActivity(
  type: 'call' | 'email' | 'note' | 'meeting',
  content: string,
  relatedTo: 'booking' | 'customer',
  relatedId: string
) {
  try {
    const session = await getSession();
    if (!session?.user) throw new Error('Unauthorized');

    const activity = await prisma.activity.create({
      data: {
        type,
        content,
        createdBy: session.user.name || 'Unknown',
        bookingId: relatedTo === 'booking' ? relatedId : undefined,
        customerId: relatedTo === 'customer' ? relatedId : undefined,
      }
    });

    return { success: true, activity };
  } catch (error) {
    console.error('Failed to log activity:', error);
    return { success: false, error: 'Failed to log activity' };
  }
}

// --- Customers Actions ---
export async function createLead(data: {
  fullName: string;
  email: string;
  phone?: string;
  source?: string;
}) {
  try {
    const organizationId = await getOrganizationId();

    // Check if customer exists
    let customer = await prisma.customer.findFirst({
      where: {
        organizationId,
        email: data.email,
      }
    });

    if (customer) {
      return { success: true, customer, isNew: false };
    }

    customer = await prisma.customer.create({
      data: {
        organizationId,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || '',
        status: 'lead',
        notes: `Lead captured via ${data.source || 'website widget'}`,
      }
    });

    revalidatePath('/dashboard/crm');
    return { success: true, customer, isNew: true };
  } catch (error) {
    console.error('Failed to create lead:', error);
    return { success: false, error: 'Failed to create lead' };
  }
}

// --- Bookings Actions ---
export async function getBookings(
  page: number = 1,
  itemsPerPage: number = 10,
  filters?: {
    search?: string;
    status?: string;
    service?: string;
  },
  sort?: {
    field: SortField;
    direction: SortDirection;
  },
  dynamicFilters?: {
    id: string;
    field: string;
    operator: 'equals' | 'contains' | 'gt' | 'lt';
    value: string;
  }[]
) {
  try {
    const organizationId = await getOrganizationId();

    const where: Prisma.BookingWhereInput = {
      organizationId,
    };

    // Apply filters
    if (filters) {
      if (filters.search) {
        where.OR = [
          { customer: { fullName: { contains: filters.search, mode: 'insensitive' } } },
          { customer: { email: { contains: filters.search, mode: 'insensitive' } } },
          { customer: { phone: { contains: filters.search, mode: 'insensitive' } } },
        ];
      }

      if (filters.status && filters.status !== 'all') {
        where.status = filters.status;
      }

      if (filters.service && filters.service !== 'all') {
        where.serviceType = filters.service;
      }
    }

    // Apply dynamic filters
    if (dynamicFilters && dynamicFilters.length > 0) {
      const dynamicConditions: Prisma.BookingWhereInput[] = [];
      
      for (const filter of dynamicFilters) {
        if (!filter.value) continue;

        // This is a simplified mapping. You might need more complex logic depending on field types.
        // Assuming most fields are strings for now or handled specifically.
        const field = filter.field as keyof Prisma.BookingWhereInput; 
        
        // Note: Prisma types are strict. We might need to cast or handle specific fields.
        // For safety, let's handle known fields.
        
        let condition: any = {};

        switch (filter.operator) {
          case 'equals':
            condition = { equals: filter.value, mode: 'insensitive' };
            break;
          case 'contains':
            condition = { contains: filter.value, mode: 'insensitive' };
            break;
          case 'gt':
             // Handle numbers/dates
             if (field === 'price' || field === 'people') {
                 condition = { gt: Number(filter.value) };
             }
            break;
          case 'lt':
             if (field === 'price' || field === 'people') {
                 condition = { lt: Number(filter.value) };
             }
            break;
        }

        if (Object.keys(condition).length > 0) {
             // @ts-ignore - Dynamic field access is tricky with Prisma types
            dynamicConditions.push({ [field]: condition });
        }
      }
      
      if (dynamicConditions.length > 0) {
          where.AND = dynamicConditions;
      }
    }

    // Apply sorting
    let orderBy: Prisma.BookingOrderByWithRelationInput = { date: 'desc' };
    if (sort) {
      switch (sort.field) {
        case 'date':
          orderBy = { date: sort.direction };
          break;
        case 'customer':
          orderBy = { customer: { fullName: sort.direction } };
          break;
        case 'status':
          orderBy = { status: sort.direction };
          break;
        case 'service':
          orderBy = { serviceType: sort.direction };
          break;
        case 'priority':
           // Priority is an enum/string, so alphabetical sort might not be what we want.
           // But for simplicity:
           orderBy = { priority: sort.direction };
          break;
      }
    }

    const [bookings, totalItems] = await Promise.all([
      prisma.booking.findMany({
        where,
        orderBy,
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        include: {
          customer: true,
          activities: true,
        },
      }),
      prisma.booking.count({ where }),
    ]);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return {
      bookings: bookings as unknown as Booking[], // Cast to match frontend type if needed
      totalItems,
      totalPages,
      currentPage: page
    };
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    return {
      bookings: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: 1
    };
  }
}

export async function createBooking(formData: BookingFormData) {
  try {
    const organizationId = await getOrganizationId();

    // Check if customer exists or create new
    let customer = await prisma.customer.findFirst({
      where: {
        organizationId,
        email: formData.customer.email,
      }
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          organizationId,
          fullName: formData.customer.fullName,
          email: formData.customer.email,
          phone: formData.customer.phone,
          company: formData.customer.company,
          address: formData.customer.address,
          notes: formData.customer.notes,
        }
      });
    } else {
      // Update existing customer info
      customer = await prisma.customer.update({
        where: { id: customer.id },
        data: {
          fullName: formData.customer.fullName,
          phone: formData.customer.phone,
          company: formData.customer.company,
          address: formData.customer.address,
          notes: formData.customer.notes,
        }
      });
    }

    const newBooking = await prisma.booking.create({
      data: {
        organizationId,
        customerId: customer.id,
        date: formData.booking.date,
        startTime: formData.booking.startTime,
        endTime: calculateEndTime(formData.booking.startTime, formData.booking.duration),
        duration: formData.booking.duration,
        people: formData.booking.people,
        serviceType: formData.booking.serviceType,
        occasion: formData.booking.occasion,
        specialRequests: formData.booking.specialRequests,
        location: formData.booking.location,
        status: formData.booking.status,
        priority: formData.booking.priority,
        staffAssigned: formData.booking.staffAssigned,
        notes: formData.booking.notes,
        source: formData.booking.source,
        tags: formData.booking.tags,
      },
      include: {
        customer: true,
        activities: true,
      }
    });

    // Update customer stats
    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        totalBookings: { increment: 1 },
        lastVisit: newBooking.date,
      }
    });

    revalidatePath('/dashboard/crm');
    return { success: true, booking: newBooking as unknown as Booking };
  } catch (error) {
    console.error('Failed to create booking:', error);
    return { success: false, error: 'Failed to create booking' };
  }
}

export async function updateBooking(bookingId: string, formData: BookingFormData) {
  try {
    const organizationId = await getOrganizationId();

    const existingBooking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!existingBooking) {
      throw new Error('Booking not found');
    }

    // Update customer info
    if (existingBooking.customerId) {
      await prisma.customer.update({
        where: { id: existingBooking.customerId },
        data: {
          fullName: formData.customer.fullName,
          email: formData.customer.email,
          phone: formData.customer.phone,
          company: formData.customer.company,
          address: formData.customer.address,
          notes: formData.customer.notes,
        }
      });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        date: formData.booking.date,
        startTime: formData.booking.startTime,
        endTime: calculateEndTime(formData.booking.startTime, formData.booking.duration),
        duration: formData.booking.duration,
        people: formData.booking.people,
        serviceType: formData.booking.serviceType,
        occasion: formData.booking.occasion,
        specialRequests: formData.booking.specialRequests,
        location: formData.booking.location,
        status: formData.booking.status,
        priority: formData.booking.priority,
        staffAssigned: formData.booking.staffAssigned,
        notes: formData.booking.notes,
        source: formData.booking.source,
        tags: formData.booking.tags,
      },
      include: {
        customer: true,
        activities: true,
      }
    });

    revalidatePath('/dashboard/crm');
    return { success: true, booking: updatedBooking as unknown as Booking };
  } catch (error) {
    console.error('Failed to update booking:', error);
    return { success: false, error: 'Failed to update booking' };
  }
}

export async function deleteBooking(bookingId: string) {
  try {
    await prisma.booking.delete({
      where: { id: bookingId },
    });
    revalidatePath('/dashboard/crm');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete booking:', error);
    return { success: false, error: 'Failed to delete booking' };
  }
}

export async function updateBookingStatus(bookingId: string, status: Booking['status']) {
  try {
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
      include: {
        customer: true,
        activities: true,
      }
    });
    revalidatePath('/dashboard/crm');
    return { success: true, booking: booking as unknown as Booking };
  } catch (error) {
    console.error('Failed to update booking status:', error);
    return { success: false, error: 'Failed to update booking status' };
  }
}

// --- Calendar Actions ---
export async function getAllBookingsForCalendar(
    filters?: {
        search?: string;
        status?: string;
        service?: string;
    }
) {
  try {
    const organizationId = await getOrganizationId();
    
    const where: Prisma.BookingWhereInput = {
      organizationId,
    };

    if (filters) {
      if (filters.search) {
        where.OR = [
          { customer: { fullName: { contains: filters.search, mode: 'insensitive' } } },
          { customer: { email: { contains: filters.search, mode: 'insensitive' } } },
        ];
      }
      if (filters.status && filters.status !== 'all') {
        where.status = filters.status;
      }
      if (filters.service && filters.service !== 'all') {
        where.serviceType = filters.service;
      }
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        customer: true,
        activities: true,
      }
    });

    return bookings as unknown as Booking[];
  } catch (error) {
    console.error('Failed to fetch calendar bookings:', error);
    return [];
  }
}

// --- Customers Actions ---
export async function getCustomers() {
  try {
    const organizationId = await getOrganizationId();
    const customers = await prisma.customer.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
    return customers as unknown as Customer[];
  } catch (error) {
    console.error('Failed to fetch customers:', error);
    return [];
  }
}
