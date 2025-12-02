'use client';

import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { Loader2, Building2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

import { checkSlugAvailability } from '@/app/actions';
import { useDebounce } from 'use-debounce';

export function CreateOrganization() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [debouncedSlug] = useDebounce(slug, 500);
  const [isSlugAvailable, setIsSlugAvailable] = useState<boolean | null>(null);
  const [slugError, setSlugError] = useState('');
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const t = useTranslations("Auth.CreateOrganization");

  React.useEffect(() => {
    const checkSlug = async () => {
      if (!debouncedSlug) {
        setIsSlugAvailable(null);
        setSlugError('');
        return;
      }

      setIsCheckingSlug(true);
      setSlugError('');
      
      const result = await checkSlugAvailability(debouncedSlug);
      
      setIsCheckingSlug(false);
      setIsSlugAvailable(result.available);
      
      if (!result.available && result.error) {
        setSlugError(t(result.error));
      }
    };

    checkSlug();
  }, [debouncedSlug, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSlugAvailable) return;
    
    setLoading(true);
    setError('');

    try {
      await authClient.organization.create({
        name,
        slug,
      }, {
        onSuccess: () => {
            setSuccess(true);
            setTimeout(() => {
                router.refresh();
            }, 1500);
        },
        onError: (ctx) => {
            setError(ctx.error.message);
            setLoading(false);
        }
      });
    } catch (err) {
      setError(t("error"));
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-16 px-8 text-center"
              >
                <div className="mb-6 rounded-full bg-green-50 p-3 text-green-600">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {t("success")}
                </h3>
                <p className="text-gray-500">
                  Redirecting to your dashboard...
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Header */}
                <div className="px-8 pt-8 pb-6 text-center">
                  <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#2A4D9A]">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                    {t("title")}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    {t("subtitle")}
                  </p>
                </div>

                {/* Form */}
                <div className="px-8 pb-8">
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          {t("nameLabel")}
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#2A4D9A] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#2A4D9A] transition-all duration-200"
                          placeholder={t("namePlaceholder")}
                          value={name}
                          onChange={(e) => {
                              setName(e.target.value);
                              // Auto-generate slug from name if slug is empty or matches previous auto-gen
                              const newSlug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                              setSlug(newSlug);
                          }}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                          {t("slugLabel")}
                        </label>
                        <div className="relative">
                          <input
                            id="slug"
                            name="slug"
                            type="text"
                            required
                            className={`block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-all duration-200 ${
                              slugError 
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                : isSlugAvailable 
                                  ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                                  : 'focus:border-[#2A4D9A] focus:ring-[#2A4D9A]'
                            }`}
                            placeholder={t("slugPlaceholder")}
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                          />
                          {isCheckingSlug && (
                            <div className="absolute right-3 top-2.5">
                              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="min-h-[20px]">
                          {slugError ? (
                            <p className="text-xs text-red-500">{slugError}</p>
                          ) : isSlugAvailable ? (
                            <p className="text-xs text-green-600">{t("slugAvailable")}</p>
                          ) : (
                            <p className="text-xs text-gray-400">{t("slugDescription")}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {error && (
                      <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600 flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading || !isSlugAvailable || isCheckingSlug}
                      className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-[#2A4D9A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#234184] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A4D9A] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          {t("submit")}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          {t("terms")}
        </p>
      </motion.div>
    </div>
  );
}
