import { useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    user ? router.push("/home") : router.push("/login");
  }, [user]);
};

export default Index;
