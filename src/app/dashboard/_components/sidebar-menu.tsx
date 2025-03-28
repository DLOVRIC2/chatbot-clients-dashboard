"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getTimeFromSidebarTimeTitle } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import MenuSkeleton from "./menu-skeleton";

interface DashboardSidebarMenuProps {
  menu_title: "Today" | "Last 7 Days";
}

interface Menu {
  thread_id: string;
  total?: number;
  tokens?: number;
  title: string;
}

interface PaginationData {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
}

async function getMenus(
  menu_title: string,
  page: number = 1,
  limit: number = 5
) {
  const time = getTimeFromSidebarTimeTitle(menu_title);
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (time) {
    params.set("timeRange", time);
  }

  const res = await fetch(`/api/threads?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return {
    menus: data.conversations as Menu[],
    pagination: data.pagination as PaginationData,
  };
}

export default function DashboardSidebarMenu({
  menu_title,
}: DashboardSidebarMenuProps) {
  const [menuList, setMenuList] = useState<Menu[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 5,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMenus(1);
  }, [menu_title]);

  const fetchMenus = async (page: number) => {
    setIsLoading(true);
    try {
      const { menus, pagination: newPagination } = await getMenus(
        menu_title,
        page
      );
      setMenuList(menus.slice(0, 5));
      setPagination(newPagination);
    } catch (error) {
      console.error("Error fetching menus:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    fetchMenus(page);
  };

  const renderPaginationItems = () => {
    const items = [];
    const { currentPage, totalPages } = pagination;

    // Calculate which 3 pages to show
    let startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);

    // Adjust if we're at the end
    if (endPage - startPage < 2) {
      startPage = Math.max(1, endPage - 2);
    }

    // Generate the three page items
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            size={"sm"}
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
            aria-disabled={isLoading}
            aria-current={currentPage === i ? "page" : undefined}
            className={isLoading ? "pointer-events-none opacity-50" : undefined}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <SidebarGroup className="relative">
      <SidebarGroupLabel className="px-4 pl-0 text-xs font-semibold">
        {menu_title}
      </SidebarGroupLabel>
      <SidebarGroupContent className="space-y-1">
        <SidebarMenu>
          {isLoading ? (
            <MenuSkeleton />
          ) : menuList?.length > 0 ? (
            menuList.map((menu: Menu) => (
              <SidebarMenuItem key={menu.thread_id} className="my-1 h-7">
                <SidebarMenuButton asChild>
                  <Link
                    href={`/dashboard/${menu.thread_id}`}
                    className="flex items-center"
                  >
                    <span>
                      {menu.thread_id.slice(0, 4)} -{" "}
                      {menu?.title?.toLowerCase()}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          ) : (
            <SidebarMenuItem>
              <span className="text-sm text-gray-500">
                No conversations found
              </span>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
        <div className="absolute top-1/2 -translate-y-1/2 -right-1">
          {pagination.totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent className="flex flex-col">
                <PaginationItem>
                  <PaginationPrevious
                    size={"sm"}
                    aria-disabled={pagination.currentPage === 1 || isLoading}
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    className={
                      pagination.currentPage === 1 || isLoading
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {renderPaginationItems()}
                <PaginationItem>
                  <PaginationNext
                    size={"sm"}
                    aria-disabled={
                      pagination.currentPage === pagination.totalPages ||
                      isLoading
                    }
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    className={
                      pagination.currentPage === pagination.totalPages ||
                      isLoading
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
