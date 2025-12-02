import React from 'react';
import { useTranslations } from 'next-intl';
import { FileText, Upload, Link as LinkIcon, Plus, File, Trash2, ExternalLink, Search } from 'lucide-react';
import { toast } from 'sonner';

export const KnowledgeTab = () => {
  const t = useTranslations("Dashboard.Agents.Detail");

  const handleAddSource = () => {
    toast.info(t("knowledge.add") + " - Coming Soon");
  };

  const documents = [
    { id: 1, name: 'Product Manual v2.pdf', type: 'PDF', size: '2.4 MB', date: 'Oct 24, 2023', status: 'Indexed' },
    { id: 2, name: 'Pricing Guide 2024', type: 'Web', size: '156 KB', date: 'Nov 02, 2023', status: 'Indexed' },
    { id: 3, name: 'Support FAQs', type: 'Text', size: '45 KB', date: 'Nov 10, 2023', status: 'Processing' },
    { id: 4, name: 'API Documentation', type: 'Web', size: '1.2 MB', date: 'Nov 15, 2023', status: 'Indexed' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-gray-900">Knowledge Base</h3>
          <p className="text-sm text-gray-500">Manage the documents your agent uses to answer questions.</p>
        </div>
        <div className="flex gap-3">
           <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search files..." 
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64"
            />
          </div>
          <button 
            onClick={handleAddSource}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            {t("knowledge.add")}
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-500 text-xs uppercase tracking-wider">Name</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-500 text-xs uppercase tracking-wider">Type</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-500 text-xs uppercase tracking-wider">Date Added</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-500 text-xs uppercase tracking-wider">Status</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-500 text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                        {doc.type === 'PDF' && <FileText className="w-5 h-5" />}
                        {doc.type === 'Web' && <LinkIcon className="w-5 h-5" />}
                        {doc.type === 'Text' && <File className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{doc.name}</div>
                        <div className="text-xs text-gray-500">{doc.size}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {doc.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {doc.date}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      doc.status === 'Indexed' 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-yellow-50 text-yellow-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        doc.status === 'Indexed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
