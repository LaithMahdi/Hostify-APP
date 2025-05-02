"use client";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState as useSearchParamsState } from "nuqs";
import apiClient from "@/lib/api-client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BreadCrumbList from "@/components/shared/bread-crumb-list";
import Items from "./_components/items";
import Search from "./_components/search";
import { RegionFilter } from "./_components/region-filter";
import { governorates } from "./_components/constants";
import FilterButton from "@/components/shared/filter-button";

const ITEMS_PER_PAGE = 10;

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [page, setPage] = useSearchParamsState(
    "page",
    parseAsInteger.withDefault(1)
  );

  const search = searchParams.get("search") || "";
  const hasParking = searchParams.get("hasParking");
  const isPetFriendly = searchParams.get("isPetFriendly");
  const country = searchParams.get("country") || "";

  const { isFetching, data } = useQuery<DataType>({
    queryKey: [
      "reservations",
      page,
      search,
      hasParking,
      country,
      isPetFriendly,
    ],
    // &search=${search}&country=${country}&hasParking=${hasParking}&isPetFriendly=${isPetFriendly}
    queryFn: () => apiClient.get(`/reservation/all?page=${page}`),
  });

  const totalItems = data?.data.totalItems ? data.data.totalItems : 0;
  const hasNextPage = data?.data.pageInfo?.hasNextPage ?? false;
  const hasPreviousPage = data?.data.pageInfo?.hasPreviousPage ?? false;

  return (
    <section className="flex flex-col items-start justify-start gap-2 w-full">
      <BreadCrumbList
        breadCrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Guest House", href: "/guest-house" },
        ]}
      />
      <h1 className="text-3xl font-semibold mb-3">
        Guest Houses&nbsp;
        <span className="text-sm font-medium text-gray-500">
          ({totalItems})
        </span>
      </h1>
      <div className="flex items-center flex-col md:flex-row gap-2 w-full">
        <Search />
        <RegionFilter
          filterName="country"
          options={governorates.map((e) => {
            return { value: e, label: e };
          })}
        />
        <FilterButton
          filterName="hasParking"
          options={[
            {
              id: "true",
              label: "Has Parking",
            },
            {
              id: "false",
              label: "No Parking",
            },
          ]}
        />
        <FilterButton
          filterName="isPetFriendly"
          options={[
            {
              id: "true",
              label: "Pet Friendly",
            },
            {
              id: "false",
              label: "Not Pet Friendly",
            },
          ]}
        />
        <div className="flex flex-1 justify-end">
          <Button
            variant="primary"
            className="py-5"
            onClick={() => router.push("/guest-house/create")}
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
  id: string;
  checkIn: string;
  checkOut: string;
  status: string;
  totalPrice: number;
  room: {
    id: string;
    roomNumber: number;
  };
  client: {
    id: string;
    fullName: string;
  };
  createdAt: string;
};
