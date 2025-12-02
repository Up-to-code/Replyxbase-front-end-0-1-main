import React from 'react'
import CRM from './CRM'
import { getBookings, getCustomers } from '@/app/actions/crm'

async function page() {
  const [bookingsData, customers] = await Promise.all([
    getBookings(1, 10),
    getCustomers()
  ]);

  return (
    <CRM 
      initialBookings={bookingsData.bookings} 
      initialPagination={{
        currentPage: bookingsData.currentPage,
        totalPages: bookingsData.totalPages,
        totalItems: bookingsData.totalItems
      }}
      initialCustomers={customers}
    />
  )
}

export default page