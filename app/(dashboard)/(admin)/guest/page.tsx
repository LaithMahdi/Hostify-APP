"use client";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState as useSearchParamsState } from "nuqs";
import BreadCrumbList from "@/components/shared/bread-crumb-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Search from "./_components/search";
import Items from "./_components/items";
import { useRouter, useSearchParams } from "next/navigation";
import apiClient from "@/lib/api-client";

const ITEMS_PER_PAGE = 10;

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [page, setPage] = useSearchParamsState(
    "page",
    parseAsInteger.withDefault(1)
  );

  const search = searchParams.get("search") || "";
  const cin = searchParams.get("cin") || "";

  const { isFetching, data } = useQuery<DataType>({
    queryKey: ["guests", page, search, cin],
    queryFn: () =>
      apiClient.get(
        `/client/added-by?page=${page}&search=${search}&cin=${cin}`
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
          { label: "Clients", href: "/guest" },
        ]}
      />
      <h1 className="text-3xl font-semibold mb-3">
        Guests&nbsp;
        <span className="text-sm font-medium text-gray-500">
          ({totalItems})
        </span>
      </h1>
      <div className="flex items-center flex-col md:flex-row gap-2 w-full">
        <Search placeholder="Search by name ..." />
        <Search searchName="cin" placeholder="Search by cin ..." />
        <div className="flex flex-1 justify-end">
          <Button
            variant="primary"
            className="py-5"
            onClick={() => router.push("/guest/create")}
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
  cin: number;
  numPassport: number;
  fullName: string;
  isActive: boolean;
  email: string;
  phone: number;
  gender: string;
  age: number;
  createdAt: string;
  membre: Array<{
    id: number;
    fullName: string;
    gender: string;
    relationship: string;
    isManier: boolean;
  }>;
};
