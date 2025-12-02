import { AppLayout } from "@/components/layout/AppLayout";
import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { CreateOrganization } from "@/components/auth/CreateOrganization";

import { getAgents } from "@/app/actions/agent";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (!session.session.activeOrganizationId) {
    return <CreateOrganization />;
  }

  // Fetch agents
  const agents = await getAgents(session.session.activeOrganizationId);

  return <AppLayout agents={agents}>{children}</AppLayout>;
};

export default DashboardLayout;

