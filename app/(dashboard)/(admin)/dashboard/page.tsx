"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-[400px]">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
          Monthly Sales
        </h2>
        <ChartContainer config={chartConfig} className="min-h-[200px]">
          <BarChart width={350} height={250} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="desktop" fill="#2563eb" radius={[4, 4, 0, 0]} />
            <Bar dataKey="mobile" fill="#60a5fa" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
