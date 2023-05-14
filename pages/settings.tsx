import { useEffect } from "react";
import { useRouter } from "next/router";

const SettingsPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/settings/account");
  }, []);
};

export default SettingsPage;
