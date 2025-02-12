"use client";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState as useSearchParamsState } from "nuqs";
import { useState } from "react";
import apiClient from "@/lib/api-client";
import Items from "./_components/items";

const ITEMS_PER_PAGE = 10;

export default function Page() {
  const [page, setPage] = useSearchParamsState(
    "page",
    parseAsInteger.withDefault(1)
  );

  const { isFetching, data } = useQuery<DataType>({
    queryKey: ["equipments", page],
    queryFn: () => apiClient.get(`/equipment/all?page=${page}`),
  });

  const [open, setOpen] = useState<boolean>(false);

  const totalItems = data?.data.totalPages
    ? data.data.totalPages * ITEMS_PER_PAGE
    : 0;
  const hasNextPage = data?.data.pageInfo?.hasNextPage ?? false;
  const hasPreviousPage = data?.data.pageInfo?.hasPreviousPage ?? false;

  return (
    <section className="flex flex-col items-start justify-start gap-5 !p-0 w-full">
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
    totalPages: number;
  };
};

export type Item = {
  id: number;
  name: string;
  icon: string;
  isActive: boolean;
  createdAt: string;
};
