import { useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Home from "./home";
import Dashboard from "../components/Dashboard";

const Index = () => {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return <div className="container max-w-full h-full"></div>;
};

export default Index;
