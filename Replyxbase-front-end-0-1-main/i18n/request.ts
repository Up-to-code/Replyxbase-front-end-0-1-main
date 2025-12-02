import { getRequestConfig } from "next-intl/server";
import { Locale } from "./routing";

const locales = ["ar", "en"] as const;
const defaultLocale: Locale = "ar";

export default getRequestConfig(async ({ requestLocale }) => {
  // Await the promise to resolve the locale string
  let locale = (await requestLocale) as string | undefined;

  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});