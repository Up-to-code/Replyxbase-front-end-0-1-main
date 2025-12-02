'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { CreateAgentForm } from '../components/CreateAgentForm';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CreateAgentPage() {
  const t = useTranslations("Dashboard.Agents.Create");

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-10">
        <Link 
          href="/dashboard/agents" 
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 rtl:hidden" />
          <ArrowRight className="w-4 h-4 ltr:hidden" />
          {t("backToAgents")}
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
        <p className="text-lg text-gray-500 mt-2">{t("subtitle")}</p>
      </div>

      {/* Form */}
      <CreateAgentForm />
    </div>
  );
}
