import { Customer, Booking } from './types';
import { calculateEndTime } from './utils';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    fullName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Corp Inc',
    address: '123 Main St, New York, NY 10001',
    notes: 'VIP customer, prefers morning appointments',
    loyaltyTier: 'platinum',
    totalBookings: 24,
    totalSpent: 3450,
    lastVisit: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    preferences: ['morning', 'quiet', 'window seat']
  },
  {
    id: '2',
    fullName: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 987-6543',
    address: '456 Oak Ave, Los Angeles, CA 90001',
    notes: 'Allergic to certain products',
    loyaltyTier: 'gold',
    totalBookings: 15,
    totalSpent: 2100,
    lastVisit: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    preferences: ['hypoallergenic', 'evening']
  },
  {
    id: '3',
    fullName: 'Mike Wilson',
    email: 'mike.wilson@email.com',
    phone: '+1 (555) 456-7890',
    company: 'Design Studio LLC',
    address: '789 Pine Rd, Chicago, IL 60601',
    notes: 'Regular client, books monthly',
    loyaltyTier: 'silver',
    totalBookings: 8,
    totalSpent: 980,
    lastVisit: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    preferences: ['weekend', 'group booking']
  }
];

export const serviceTypes = [
  'Dinner Reservation',
  'Haircut & Style',
  'Consultation',
  'Yoga Class',
  'Massage Therapy',
  'Meeting Room'
];

export const staffMembers = [
  'Alex Johnson',
  'Morgan Smith',
  'Casey Williams'
];

export const bookingSources = ['website', 'phone', 'walk-in', 'referral', 'social'] as const;

export const generateMinimalBookings = (): Booking[] => {
  const today = new Date();
  const bookings: Booking[] = [];
  
  for (let dayOffset = 0; dayOffset < 14; dayOffset++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + dayOffset);
    
    const bookingsCount = 2 + (dayOffset % 5);
    
    for (let i = 0; i < bookingsCount; i++) {
      const hour = 9 + (i % 9);
      const minute = (i % 2) * 30;
      const duration = [30, 60, 90, 120][i % 4];
      const customerIndex = (dayOffset + i) % mockCustomers.length;
      const statusIndex = (dayOffset + i) % 5;
      const statuses: Booking['status'][] = ['pending', 'confirmed', 'cancelled', 'completed', 'no-show'];
      const priorityIndex = (dayOffset + i) % 3;
      const priorities: Booking['priority'][] = ['normal', 'high', 'urgent'];
      
      const serviceIndex = (dayOffset + i) % serviceTypes.length;
      const basePrice = 50 + (serviceIndex * 10);
      const price = basePrice + ((i % 5) * 10);
      const deposit = price * 0.2;
      
      const rating = statuses[statusIndex] === 'completed' ? 3 + Math.floor(Math.random() * 3) : undefined;
      
      const tags = [];
      if (i % 3 === 0) tags.push('vip');
      if (i % 4 === 0) tags.push('repeat');
      if (i % 5 === 0) tags.push('special-request');
      
      bookings.push({
        id: `booking-${dayOffset}-${i}`,
        customerId: mockCustomers[customerIndex].id,
        customer: mockCustomers[customerIndex],
        date: currentDate,
        startTime: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        endTime: calculateEndTime(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`, duration),
        duration,
        people: (i % 4) + 1,
        serviceType: serviceTypes[serviceIndex],
        occasion: (i % 3 === 0) ? ['Birthday', 'Business Meeting', 'Anniversary'][i % 3] : undefined,
        specialRequests: (i % 4 === 0) ? `Special request ${i}` : undefined,
        location: (i % 2 === 0) ? `Room ${((i % 5) + 1)}` : undefined,
        status: statuses[statusIndex],
        priority: priorities[priorityIndex],
        createdAt: new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(currentDate.getTime() - (2 * 24 * 60 * 60 * 1000)),
        price,
        deposit,
        staffAssigned: staffMembers[(dayOffset + i) % staffMembers.length],
        notes: (i % 3 === 0) ? `Internal note for booking ${dayOffset}-${i}` : undefined,
        notesCount: Math.floor(Math.random() * 3),
        rating,
        feedback: rating ? `Customer rated ${rating} stars` : undefined,
        source: bookingSources[i % bookingSources.length],
        tags
      });
    }
  }
  
  return bookings;
};