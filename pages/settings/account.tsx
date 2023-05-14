import Link from "next/link";
import { useEffect, useState } from "react";
import { Database } from "../../types/supabase";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Avatar from "../../components/Avatar";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

const secondaryNavigation = [
  { name: "Account", href: "/settings/account", current: true },
  { name: "Notifications", href: "/settings/notifications", current: false },
  { name: "Billing", href: "/settings/billing", current: false },
  { name: "Teams", href: "/settings/teams", current: false },
  { name: "Integrations", href: "/settings/integrations", current: false },
];

export default function Account() {
  const user = useUser();
  const supabase = useSupabaseClient<Database>();
  const [full_name, setName] = useState<Profiles["full_name"]>(null);
  const [username, setUsername] = useState<Profiles["username"]>(null);
  const [avatar_url, setAvatarUrl] = useState<Profiles["avatar_url"]>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) getProfile();
  }, [user]);

  async function getProfile() {
    try {
      if (!user) throw new Error("No user");
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`avatar_url, full_name, username`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setName(data.full_name);
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    }
  }

  async function updateProfile({
    avatar_url,
    full_name,
    username,
  }: {
    username: Profiles["username"];
    full_name: Profiles["full_name"];
    avatar_url: Profiles["avatar_url"];
  }) {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const updates = {
        id: user.id,
        username,
        full_name,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <header className="border-b border-gray-200">
        {/* Secondary navigation */}
        <nav className="flex overflow-x-auto py-4">
          <ul
            role="list"
            className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-600 sm:px-6 lg:px-8"
          >
            {secondaryNavigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={item.current ? "text-vitalize-primary" : ""}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Settings forms */}
      <div className="divide-y divide-gray-200">
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-700">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>
          </div>

          <form className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <Avatar
                uid={user?.id as string}
                url={avatar_url}
                size={150}
                onUpload={(url) => {
                  setAvatarUrl(url);
                  updateProfile({
                    username,
                    full_name,
                    avatar_url: url,
                  });
                  window.location.reload();
                }}
              />

              <div className="col-span-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  Full name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={full_name || ""}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm py-1.5 text-gray-700 focus:ring-1 focus:ring-vitalize-secondary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="block w-full rounded-md border-gray-300 shadow-sm py-1.5 text-gray-700 focus:ring-1 focus:ring-vitalize-secondary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm py-1.5 text-gray-700 focus:ring-1 focus:ring-vitalize-secondary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="timezone"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  Timezone
                </label>
                <div className="mt-2">
                  <select
                    id="timezone"
                    name="timezone"
                    className="block w-full rounded-md border-gray-300 shadow-sm py-1.5 text-gray-700 focus:ring-1 focus:ring-vitalize-secondary sm:text-sm sm:leading-6"
                  >
                    <option>Pacific Standard Time</option>
                    <option>Eastern Standard Time</option>
                    <option>Greenwich Mean Time</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 flex">
              <button
                type="submit"
                onClick={() =>
                  updateProfile({ username, full_name, avatar_url })
                }
                disabled={loading}
                className="rounded-md bg-vitalize-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-vitalize-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vitalize-secondary"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-700">
              Change password
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Update your password associated with your account.
            </p>
          </div>

          <form className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md border-gray-300 shadow-sm py-1.5 text-gray-700 focus:ring-1 focus:ring-vitalize-secondary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  New password
                </label>
                <div className="mt-2">
                  <input
                    id="new-password"
                    name="new_password"
                    type="password"
                    autoComplete="new-password"
                    className="block w-full rounded-md border-gray-300 shadow-sm py-1.5 text-gray-700 focus:ring-1 focus:ring-vitalize-secondary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  Confirm password
                </label>
                <div className="mt-2">
                  <input
                    id="confirm-password"
                    name="confirm_password"
                    type="password"
                    autoComplete="new-password"
                    className="block w-full rounded-md border-gray-300 shadow-sm py-1.5 text-gray-700 focus:ring-1 focus:ring-vitalize-secondary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex">
              <button
                type="submit"
                className="rounded-md bg-vitalize-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-vitalize-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vitalize-secondary"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-700">
              Log out other sessions
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              Please enter your password to confirm you would like to log out of
              your other sessions across all of your devices.
            </p>
          </div>

          <form className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="logout-password"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  Your password
                </label>
                <div className="mt-2">
                  <input
                    id="logout-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md border-gray-300 shadow-sm py-1.5 text-gray-700 focus:ring-1 focus:ring-vitalize-secondary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex">
              <button
                type="submit"
                className="rounded-md bg-vitalize-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-vitalize-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vitalize-secondary"
              >
                Log out other sessions
              </button>
            </div>
          </form>
        </div>

        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-700">
              Delete account
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              No longer want to use our service? You can delete your account
              here. This action is not reversible. All information related to
              this account will be deleted permanently.
            </p>
          </div>

          <form className="flex items-start md:col-span-2">
            <button
              type="submit"
              className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
            >
              Yes, delete my account
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
