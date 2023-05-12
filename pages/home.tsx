import Dashboard from "../components/Dashboard";

export default function Home({ session }) {
  return (
    <Dashboard session={session}>
      <main>
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-700">
                Home page!!
              </h2>
            </div>
          </div>
      </main>
    </Dashboard>
  );
}
