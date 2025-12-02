import React, { use } from 'react';
import { getTranslations } from 'next-intl/server';
import AgentDetailsClient from './components/AgentDetailsClient';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function generateMetadata({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  
  const agent = await prisma.agent.findUnique({
    where: { id: agentId },
    select: { name: true }
  });

  const t = await getTranslations("Dashboard.Agents.Detail");

  if (!agent) {
    return {
      title: t("notFoundTitle"),
    };
  }

  return {
    title: `${agent.name} - ${t("title")}`,
  };
}

export default async function AgentDashboardPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || !session.session.activeOrganizationId) {
    return notFound();
  }

  // Fetch agent and verify it belongs to the active organization
  const agent = await prisma.agent.findFirst({
    where: {
      id: agentId,
      organizationId: session.session.activeOrganizationId
    }
  });

  if (!agent) {
    notFound();
  }

  // Transform Prisma agent to match the expected type if necessary, 
  // or ensure AgentDetailsClient accepts the Prisma type.
  // For now, passing the agent directly as it matches the shape mostly.
  // We might need to map some fields if AgentDetailsClient expects specific mock data structure.
  
  return <AgentDetailsClient agent={agent} />;
}
