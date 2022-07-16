import "@/styles/globals.css";
import { ColorSchemeProvider } from "@/contexts/ColorScheme";
import { CustomAppProps } from "@/types/next";

function MyApp({ Component, pageProps }: CustomAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ColorSchemeProvider>
      {getLayout(<Component {...pageProps} />)}
    </ColorSchemeProvider>
  );
}

export default MyApp;
