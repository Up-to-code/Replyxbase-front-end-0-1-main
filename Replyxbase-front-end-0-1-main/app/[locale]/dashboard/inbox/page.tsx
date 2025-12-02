import React from 'react';
import { InboxClient } from './components/InboxClient';

export const metadata = {
  title: 'Inbox | Dashboard',
  description: 'Manage customer conversations',
};

export default function InboxPage() {
  return <InboxClient />;
}
