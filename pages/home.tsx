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

const people = [
  {
    name: "Lindsay Walton",
    phone: "(123) 456-7890",
    email: "lindsay.walton@example.com",
    role: "Patient",
  },
  {
    "name": "James Carter",
    "phone": "(456) 789-1234",
    "email": "james.carter@example.com",
    "role": "Patient",
  },
  {
    "name": "Susan Thompson",
    "phone": "(789) 123-4567",
    "email": "susan.thompson@example.com",
    "role": "Patient",
  },
  {
    "name": "Andrew Johnson",
    "phone": "(321) 654-9870",
    "email": "andrew.johnson@example.com",
    "role": "Patient",
  },
  {
    "name": "Patricia Williams",
    "phone": "(654) 321-0987",
    "email": "patricia.williams@example.com",
    "role": "Patient",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  useEffect(() => {
    document?.querySelector("body")?.classList.add("bg-gray-100/50");
    return () => {
      document?.querySelector("body")?.classList.remove("bg-gray-100/50");
    };
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
                <div className="absolute rounded-md bg-vitalize-secondary p-3">
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
                      className="font-medium text-vitalize-primary hover:text-vitalize-secondary"
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
        <div className="px-4 sm:px-6 lg:px-8 pt-12">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Users
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the users in your account including their name,
                phone, email and role.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                className="block rounded-md bg-vitalize-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-vitalize-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vitalize-primary"
              >
                Add user
              </button>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Phone
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {people.map((person) => (
                        <tr key={person.email}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {person.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.phone}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.role}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a
                              href="#"
                              className="text-vitalize-primary hover:text-indigo-900"
                            >
                              Edit
                              <span className="sr-only">, {person.name}</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Dashboard>
  );
}
