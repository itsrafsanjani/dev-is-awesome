import "@/styles/globals.css";
import { ColorSchemeProvider } from "@/contexts/ColorSchemeContext";
import { CustomAppProps } from "@/types/next";
import { SpotlightProvider } from "@/contexts/SportlightContext";
import Head from "next/head";
import { SITE_INFO } from "@/constants/site";

import { withTRPC } from "@trpc/next";
import { AppRouter } from "@/server/routes/app";
import { transformer } from "@/utils/trpc";

function MyApp({ Component, pageProps }: CustomAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ColorSchemeProvider>
      <SpotlightProvider>
        <Head>
          <title>{SITE_INFO.title}</title>
          <meta name="description" content={SITE_INFO.desc} />
        </Head>
        {getLayout(<Component {...pageProps} />)}
      </SpotlightProvider>
    </ColorSchemeProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      transformer,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
