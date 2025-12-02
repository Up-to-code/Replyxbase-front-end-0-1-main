import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Plus, MoreHorizontal, Shield, User, Trash2, Mail } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';

const initialMembers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'owner', status: 'active', avatar: null },
  { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', role: 'admin', status: 'active', avatar: null },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'member', status: 'invited', avatar: null },
];

import { Button } from '@/components/ui/Button';

// ... (keep existing imports and initialMembers)

export const TeamSettings: React.FC = () => {
  const t = useTranslations("Dashboard.Settings.Team");
  const tModals = useTranslations("Dashboard.Settings.Team.Modals");
  
  const [members, setMembers] = useState(initialMembers);
  const [memberToRemove, setMemberToRemove] = useState<typeof initialMembers[0] | null>(null);
  const [isInviteMode, setIsInviteMode] = useState(false);

  const handleRemoveMember = () => {
    if (memberToRemove) {
      setMembers(members.filter(m => m.id !== memberToRemove.id));
      setMemberToRemove(null);
    }
  };

  if (isInviteMode) {
    return (
      <div className="animate-fade-in">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900">{tModals("AddMember.title")}</h2>
          <p className="text-base text-muted-foreground mt-2">{t("description")}</p>
        </div>

        <div className="max-w-2xl space-y-8">
          <div className="grid gap-4">
            <label className="text-base font-semibold text-gray-900">{tModals("AddMember.email")}</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground rtl:left-auto rtl:right-4" />
              <input 
                type="email" 
                placeholder="colleague@company.com"
                className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 rounded-xl pl-12 pr-5 py-4 text-base text-gray-900 transition-all duration-200 rtl:pl-5 rtl:pr-12"
              />
            </div>
          </div>

          <div className="grid gap-4">
            <label className="text-base font-semibold text-gray-900">{tModals("AddMember.role")}</label>
            <div className="grid gap-4">
              <label className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="radio" name="role" value="member" defaultChecked className="mt-1 w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                <div>
                  <span className="block text-sm font-bold text-gray-900">{t("roles.member")}</span>
                  <span className="block text-sm text-muted-foreground mt-1">Can view and edit own tasks, but cannot manage team settings.</span>
                </div>
              </label>
              <label className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="radio" name="role" value="admin" className="mt-1 w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                <div>
                  <span className="block text-sm font-bold text-gray-900">{t("roles.admin")}</span>
                  <span className="block text-sm text-muted-foreground mt-1">Full access to all settings and team management features.</span>
                </div>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-8 border-t border-gray-100">
            <Button 
              onClick={() => setIsInviteMode(false)}
              variant="primary"
              className="px-8 py-3.5 h-auto rounded-lg text-sm font-semibold"
            >
              {tModals("AddMember.submit")}
            </Button>
            <Button 
              onClick={() => setIsInviteMode(false)}
              variant="ghost"
              className="px-6 py-3.5 h-auto rounded-lg text-sm font-medium"
            >
              {tModals("AddMember.cancel")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t("title")}</h2>
          <p className="text-base text-muted-foreground mt-2">{t("description")}</p>
        </div>
        <Button 
          onClick={() => setIsInviteMode(true)}
          variant="primary"
          className="flex items-center gap-3 px-6 py-3 h-auto rounded-lg text-sm font-semibold"
        >
          <Plus className="w-5 h-5" />
          {t("invite")}
        </Button>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="text-left py-6 px-8 text-xs font-bold text-gray-500 uppercase tracking-wider rtl:text-right">{t("table.member")}</th>
              <th className="text-left py-6 px-8 text-xs font-bold text-gray-500 uppercase tracking-wider rtl:text-right">{t("table.role")}</th>
              <th className="text-left py-6 px-8 text-xs font-bold text-gray-500 uppercase tracking-wider rtl:text-right">{t("table.status")}</th>
              <th className="text-right py-6 px-8 text-xs font-bold text-gray-500 uppercase tracking-wider rtl:text-left">{t("table.actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-6 px-8">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-medium border-2 border-white">
                      {member.avatar ? (
                        <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full" />
                      ) : (
                        member.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <p className="text-base font-bold text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-6 px-8">
                  <div className="flex items-center gap-2.5">
                    {member.role === 'owner' ? (
                      <Shield className="w-5 h-5 text-blue-600" />
                    ) : (
                      <User className="w-5 h-5 text-gray-400" />
                    )}
                    <span className="text-sm text-gray-700 capitalize font-semibold">{t(`roles.${member.role}`)}</span>
                  </div>
                </td>
                <td className="py-6 px-8">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold capitalize border
                    ${member.status === 'active' 
                      ? 'bg-green-50 text-green-700 border-green-100' 
                      : 'bg-yellow-50 text-yellow-700 border-yellow-100'}`}>
                    {member.status}
                  </span>
                </td>
                <td className="py-6 px-8 text-right rtl:text-left">
                  <button 
                    onClick={() => setMemberToRemove(member)}
                    className="text-gray-400 hover:text-red-600 p-2.5 rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                    title="Remove Member"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Remove Member Modal */}
      <Modal
        isOpen={!!memberToRemove}
        onClose={() => setMemberToRemove(null)}
        title={tModals("RemoveMember.title")}
        footer={
          <>
            <button 
              onClick={() => setMemberToRemove(null)}
              className="px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {tModals("RemoveMember.cancel")}
            </button>
            <button 
              onClick={handleRemoveMember}
              className="px-6 py-3 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              {tModals("RemoveMember.confirm")}
            </button>
          </>
        }
      >
        <p className="text-gray-600 text-base leading-relaxed">
          {tModals("RemoveMember.confirmation", { name: memberToRemove?.name ?? '' })}
        </p>
      </Modal>
    </div>
  );
};
