import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

import { Layout } from "@/components/Layout";
import { LoginModal } from "@/components/modals/LoginModal";
import { RegesterModal } from "@/components/modals/RegesterModal";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <SessionProvider session={pageProps.session}>
        <Toaster />
        <RegesterModal />
        <LoginModal />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
  );
}
