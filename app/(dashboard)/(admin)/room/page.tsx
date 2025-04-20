"use client";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState as useSearchParamsState } from "nuqs";
import apiClient from "@/lib/api-client";

import Search from "./_components/search";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BreadCrumbList from "@/components/shared/bread-crumb-list";
import Items from "./_components/items";

const ITEMS_PER_PAGE = 10;

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [page, setPage] = useSearchParamsState(
    "page",
    parseAsInteger.withDefault(1)
  );

  const status = searchParams.get("status") || "";
  const roomNumber = Number(searchParams.get("roomNumber") || "0");

  const { isFetching, data } = useQuery<DataType>({
    queryKey: ["rooms", page, status, roomNumber],
    queryFn: () =>
      apiClient.get(
        `/room/all?page=${page}&status=${status}&roomNumber=${roomNumber}`
      ),
  });

  const totalItems = data?.data.totalItems ? data.data.totalItems : 0;
  const hasNextPage = data?.data.pageInfo?.hasNextPage ?? false;
  const hasPreviousPage = data?.data.pageInfo?.hasPreviousPage ?? false;

  return (
    <section className="flex flex-col items-start justify-start gap-2 w-full p-2">
      <BreadCrumbList
        breadCrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Rooms", href: "/room" },
        ]}
      />
      <h1 className="text-3xl font-semibold mb-3">
        Rooms&nbsp;
        <span className="text-sm font-medium text-gray-500">
          ({totalItems})
        </span>
      </h1>
      <div className="flex items-center flex-col md:flex-row gap-2 w-full">
        <Search placeholder="Search by room number..." />
        {/* <FilterButton
          filterName="status"
          options={RoomStatus.map((type) => ({
            id: type.value,
            label: type.label,
          }))}
        /> */}
        <div className="flex flex-1 justify-end">
          <Button
            variant="primary"
            className="py-5"
            onClick={() => router.push("/room/create")}
          >
            <Plus className="text-white" />
            Create
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 w-full">
        <Items
          isLoading={isFetching}
          paginationProps={{
            advanced: {
              totalItems,
              onPageChange: setPage,
              pageIndex: page,
              itemsPerPage: ITEMS_PER_PAGE,
            },
            isNextDisabled: !hasNextPage,
            isPreviousDisabled: !hasPreviousPage,
            onNextClick: () => setPage(page + 1),
            onPreviousClick: () => setPage(page - 1),
          }}
          items={data?.data.data || []}
          viewMode={"list"}
        />
      </div>
    </section>
  );
}

export type DataType = {
  data: {
    data: Array<Item>;
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
    totalItems: number;
  };
};

export type Item = {
  id: number;
  roomNumber: number;
  type: string;
  pricePerNight: number;
  status: string;
  capacity: number;
  hasBalcony: boolean;
  description?: string;

  images: Array<{
    id: number;
    url: string;
  }>;
  equipment: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
