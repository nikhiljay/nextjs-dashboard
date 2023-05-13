import "../styles/globals.css";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { AppProps } from "next/app";
import Dashboard from "../components/Dashboard";
import { useRouter } from "next/router";

function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const router = useRouter();
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      {router.pathname === "/login" ? (
        <Component {...pageProps} />
      ) : (
        <Dashboard>
          <Component {...pageProps} />
        </Dashboard>
      )}
    </SessionContextProvider>
  );
}
export default App;
