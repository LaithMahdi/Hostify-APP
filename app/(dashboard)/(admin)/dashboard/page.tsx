"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import ReservationStats from "./ReservationStats";
import RoomsPerGuestHouse from "./RoomsPerGuestHouse";
import RegionDistributionChart from "./RegionDistributionChart";
import ReservationTrendChart from "./ReservationTrendChart";
import RoomStatsChart from "./RoomStatsChart";


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
    <div className="container mx-auto py-8">
    <h1 className="text-2xl font-bold mb-8">Tableau de bord</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* <ReservationStats /> */}
          {/* <EquipmentDistributionChart /> */}
      <RoomsPerGuestHouse />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* <EquipmentDistributionChart /> */}
     <RoomStatsChart/>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RegionDistributionChart />
        <ReservationTrendChart />
      </div>
  </div>
  );
}
