import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SettingsClient } from "./components/SettingsClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.Settings" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || !session.session.activeOrganizationId) {
    return notFound();
  }

  const [user, organization] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
    }),
    prisma.organization.findUnique({
      where: { id: session.session.activeOrganizationId },
      include: {
        members: {
          include: {
            user: true
          }
        }
      }
    })
  ]);

  if (!user || !organization) {
    return notFound();
  }

  return <SettingsClient user={user} organization={organization} />;
}
