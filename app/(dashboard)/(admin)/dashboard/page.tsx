"use client";

import MonthlySalesChart from "./MonthlySalesChart";







const Page = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Dashboardteste
      </h1>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <MonthlySalesChart />
        </div>
      </div>
    </div>
  );
};

export default Page;
