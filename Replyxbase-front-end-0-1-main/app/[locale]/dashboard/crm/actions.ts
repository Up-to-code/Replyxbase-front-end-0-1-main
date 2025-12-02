'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { BookingFormData } from './types'

// --- Customers ---

export async function getCustomers(organizationId: string) {
  try {
    const customers = await prisma.customer.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { bookings: true }
        }
      }
    })
    return { success: true, data: customers }
  } catch (error) {
    console.error('Failed to fetch customers:', error)
    return { success: false, error: 'Failed to fetch customers' }
  }
}

export async function createCustomer(organizationId: string, data: any) {
  try {
    const customer = await prisma.customer.create({
      data: {
        ...data,
        organizationId,
      },
    })
    revalidatePath('/dashboard/crm')
    return { success: true, data: customer }
  } catch (error) {
    console.error('Failed to create customer:', error)
    return { success: false, error: 'Failed to create customer' }
  }
}

export async function updateCustomer(id: string, data: any) {
  try {
    const customer = await prisma.customer.update({
      where: { id },
      data,
    })
    revalidatePath('/dashboard/crm')
    return { success: true, data: customer }
  } catch (error) {
    console.error('Failed to update customer:', error)
    return { success: false, error: 'Failed to update customer' }
  }
}

export async function deleteCustomer(id: string) {
  try {
    await prisma.customer.delete({
      where: { id },
    })
    revalidatePath('/dashboard/crm')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete customer:', error)
    return { success: false, error: 'Failed to delete customer' }
  }
}

// --- Bookings ---

export async function getBookings(organizationId: string) {
  try {
    const bookings = await prisma.booking.findMany({
      where: { organizationId },
      include: {
        customer: true,
        activities: true,
      },
      orderBy: { date: 'desc' },
    })
    return { success: true, data: bookings }
  } catch (error) {
    console.error('Failed to fetch bookings:', error)
    return { success: false, error: 'Failed to fetch bookings' }
  }
}

export async function createBooking(organizationId: string, data: BookingFormData) {
  try {
    // 1. Find or create customer
    let customerId = ''
    
    // Check if customer exists by email
    const existingCustomer = await prisma.customer.findFirst({
      where: { 
        organizationId,
        email: data.customer.email 
      }
    })

    if (existingCustomer) {
      customerId = existingCustomer.id
      // Update customer details if needed, or just use existing
      await prisma.customer.update({
        where: { id: customerId },
        data: {
            fullName: data.customer.fullName,
            phone: data.customer.phone,
            company: data.customer.company,
            address: data.customer.address,
            notes: data.customer.notes,
        }
      })
    } else {
      const newCustomer = await prisma.customer.create({
        data: {
          organizationId,
          fullName: data.customer.fullName,
          email: data.customer.email,
          phone: data.customer.phone,
          company: data.customer.company,
          address: data.customer.address,
          notes: data.customer.notes,
        }
      })
      customerId = newCustomer.id
    }

    // 2. Create Booking
    const booking = await prisma.booking.create({
      data: {
        organizationId,
        customerId,
        date: data.booking.date,
        startTime: data.booking.startTime,
        endTime: calculateEndTime(data.booking.startTime, data.booking.duration),
        duration: data.booking.duration,
        people: data.booking.people,
        serviceType: data.booking.serviceType,
        occasion: data.booking.occasion,
        specialRequests: data.booking.specialRequests,
        location: data.booking.location,
        status: data.booking.status,
        priority: data.booking.priority,
        staffAssigned: data.booking.staffAssigned,
        notes: data.booking.notes,
        source: data.booking.source,
        tags: data.booking.tags,
      }
    })

    revalidatePath('/dashboard/crm')
    return { success: true, data: booking }
  } catch (error) {
    console.error('Failed to create booking:', error)
    return { success: false, error: 'Failed to create booking' }
  }
}

export async function updateBooking(id: string, data: any) {
  try {
    const booking = await prisma.booking.update({
      where: { id },
      data,
    })
    revalidatePath('/dashboard/crm')
    return { success: true, data: booking }
  } catch (error) {
    console.error('Failed to update booking:', error)
    return { success: false, error: 'Failed to update booking' }
  }
}

export async function deleteBooking(id: string) {
  try {
    await prisma.booking.delete({
      where: { id },
    })
    revalidatePath('/dashboard/crm')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete booking:', error)
    return { success: false, error: 'Failed to delete booking' }
  }
}

// --- Stats ---

export async function getCRMStats(organizationId: string) {
    try {
        const [totalBookings, totalCustomers, activeBookings] = await Promise.all([
            prisma.booking.count({ where: { organizationId } }),
            prisma.customer.count({ where: { organizationId } }),
            prisma.booking.count({ 
                where: { 
                    organizationId, 
                    status: { in: ['pending', 'confirmed'] } 
                } 
            })
        ])

        return {
            success: true,
            data: {
                totalBookings,
                totalCustomers,
                activeBookings
            }
        }
    } catch (error) {
        console.error('Failed to get stats:', error)
        return { success: false, error: 'Failed to get stats' }
    }
}

// Helper
function calculateEndTime(startTime: string, durationMinutes: number): string {
  const [hours, minutes] = startTime.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  date.setMinutes(date.getMinutes() + durationMinutes);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}
