import React from 'react';
import { useTranslations } from 'next-intl';
import { CreditCard, Check, Zap, Clock } from 'lucide-react';

export const BillingSettings: React.FC = () => {
  const t = useTranslations("Dashboard.Settings.Billing");

  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900">{t("title")}</h2>
        <p className="text-base text-gray-500 mt-2">{t("description")}</p>
      </div>

      <div className="space-y-8">
        {/* Current Plan */}
        <div className="bg-primary rounded-xl p-8 text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
          
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-medium mb-4">
                <Zap className="w-3 h-3 text-yellow-300" />
                <span>Pro Plan</span>
              </div>
              <h3 className="text-3xl font-bold mb-2">$29<span className="text-lg text-primary-foreground/80 font-normal">/mo</span></h3>
              <p className="text-primary-foreground/80 text-sm">Billed monthly. Next billing date: Dec 23, 2025</p>
            </div>
            <button className="bg-white text-primary hover:bg-gray-50 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors">
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white border border-gray-100 rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">{t("paymentMethods.title")}</h3>
            <button className="text-sm font-semibold text-primary hover:text-primary/80">
              + Add Method
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Visa ending in 4242</p>
                  <p className="text-xs text-gray-500">Expiry 12/28</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">Default</span>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">{t("history.title")}</h3>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-8 text-xs font-bold text-gray-500 uppercase">Invoice</th>
                <th className="text-left py-4 px-8 text-xs font-bold text-gray-500 uppercase">Date</th>
                <th className="text-left py-4 px-8 text-xs font-bold text-gray-500 uppercase">Amount</th>
                <th className="text-right py-4 px-8 text-xs font-bold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="py-4 px-8 text-sm font-medium text-gray-900">INV-2024-00{i}</td>
                  <td className="py-4 px-8 text-sm text-gray-500">Oct {23 - i}, 2024</td>
                  <td className="py-4 px-8 text-sm font-medium text-gray-900">$29.00</td>
                  <td className="py-4 px-8 text-right">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700">
                      <Check className="w-3 h-3" /> Paid
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
