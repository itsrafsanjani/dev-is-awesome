import "@/styles/globals.css";
import { ColorSchemeProvider } from "@/contexts/ColorSchemeContext";
import { CustomAppProps } from "@/types/next";
import { SpotlightProvider } from "@/contexts/SportlightContext";

function MyApp({ Component, pageProps }: CustomAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ColorSchemeProvider>
      <SpotlightProvider>
        {getLayout(<Component {...pageProps} />)}
      </SpotlightProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;
