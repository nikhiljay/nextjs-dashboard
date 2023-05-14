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

  const isDashboardPage = (path: string) => {
    const dashboardBasePaths = ["/home", "/schedule", "/settings"];
    const dashboardPages = dashboardBasePaths.map(
      (basePath) => new RegExp(`^${basePath}`)
    );
    return dashboardPages.some((pattern) => pattern.test(path));
  };

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      {isDashboardPage(router.pathname) ? (
        <Dashboard>
          <Component {...pageProps} />
        </Dashboard>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionContextProvider>
  );
}
export default App;
