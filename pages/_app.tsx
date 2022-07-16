import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "../components/NavBar/NavBar";
import { ColorSchemeProvider } from "../contexts/ColorScheme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ColorSchemeProvider>
      <NavBar />
      <Component {...pageProps} />
    </ColorSchemeProvider>
  );
}

export default MyApp;
