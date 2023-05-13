import { useEffect } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import {
  DocumentTextIcon,
  UsersIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import Dashboard from "../components/Dashboard";

const stats = [
  {
    id: 1,
    name: "Total Patients",
    stat: "244",
    icon: UsersIcon,
    change: "12",
    changeType: "increase",
  },
  {
    "id": 2,
    "name": "Total Consultations",
    "stat": "372",
    "icon": VideoCameraIcon,
    "change": "20",
    "changeType": "increase",
  },
  {
    "id": 3,
    "name": "Total Prescriptions",
    "stat": "516",
    "icon": DocumentTextIcon,
    "change": "7",
    "changeType": "increase",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  useEffect(() => {
    document?.querySelector("body")?.classList.add("bg-gray-100");
  }, []);

  return (
    <Dashboard>
      <main>
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 pt-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h1 className="font-semibold leading-7 text-gray-700 text-2xl">
              Welcome back, John
            </h1>
          </div>
        </div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-6 lg:px-8 pt-4">
          {stats.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  <item.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {item.stat}
                </p>
                <p
                  className={classNames(
                    item.changeType === "increase"
                      ? "text-green-600"
                      : "text-red-600",
                    "ml-2 flex items-baseline text-sm font-semibold"
                  )}
                >
                  {item.changeType === "increase" ? (
                    <ArrowUpIcon
                      className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowDownIcon
                      className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                      aria-hidden="true"
                    />
                  )}

                  <span className="sr-only">
                    {" "}
                    {item.changeType === "increase"
                      ? "Increased"
                      : "Decreased"}{" "}
                    by{" "}
                  </span>
                  {item.change}
                </p>
                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      View all
                      <span className="sr-only"> {item.name} stats</span>
                    </a>
                  </div>
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </main>
    </Dashboard>
  );
}
