"use client";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState as useSearchParamsState } from "nuqs";
import { useState } from "react";
import apiClient from "@/lib/api-client";
import Items from "./_components/items";
import Search from "./_components/search";
import { useSearchParams } from "next/navigation";
import FilterButton from "../../../../components/shared/filter-button";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ITEMS_PER_PAGE = 10;

export default function Page() {
  const searchParams = useSearchParams();
  const [page, setPage] = useSearchParamsState(
    "page",
    parseAsInteger.withDefault(1)
  );

  const search = searchParams.get("search") || "";
  const isActive = searchParams.get("isActive") || "";

  const { isFetching, data } = useQuery<DataType>({
    queryKey: ["equipments", page, search, isActive],
    queryFn: () =>
      apiClient.get(
        `/equipment/all?page=${page}&search=${search}&isActive=${isActive}`
      ),
  });

  const options = [
    { id: "true", label: "Active" },
    { id: "false", label: "Inactive" },
  ];
  const [open, setOpen] = useState<boolean>(false);

  const totalItems = data?.data.totalItems ? data.data.totalItems : 0;
  const hasNextPage = data?.data.pageInfo?.hasNextPage ?? false;
  const hasPreviousPage = data?.data.pageInfo?.hasPreviousPage ?? false;

  return (
    <section className="flex flex-col items-start justify-start gap-2 w-full">
      <h1 className="text-3xl font-semibold mb-3">
        Equipment&nbsp;
        <span className="text-sm font-medium text-gray-500">
          ({totalItems})
        </span>
      </h1>
      <div className="flex items-center flex-col md:flex-row gap-2 w-full">
        <Search />
        <FilterButton filterName="isActive" options={options} />
        <div className="flex flex-1 justify-end">
          <Button variant="primary" className="py-5">
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
  name: string;
  icon: string;
  isActive: boolean;
  createdAt: string;
};
