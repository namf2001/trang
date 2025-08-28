"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { DataTable } from "./_components/data-table/data-table"
import { api } from "@/trpc/react";
import { columns as xtreamColumns } from "./_components/columns/xtream-column";
import { columns as countriesColumns } from "./_components/columns/countries-columns";
import { columns as categoriesColumns } from "./_components/columns/categories-columns";
import { type ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { type CountryUrlEntity, type CategoryUrlEntity, type XtreamUrlEntity, type UrlEntity } from "./_types/column";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  const { data: xtreamData, isLoading, error, refetch: refetchXtream } = api.xtreamUrl.getAll.useQuery({});
  const { data: countryData, isLoading: countryLoading, error: countryError, refetch: refetchCountry } = api.countryUrl.getAll.useQuery({});
  const { data: categoryData, isLoading: categoryLoading, error: categoryError, refetch: refetchCategory } = api.categoryUrl.getAll.useQuery({});

  // Mutation hooks for Xtream URLs
  const updateXtreamUrl = api.xtreamUrl.update.useMutation({
    onSuccess: () => {
      void refetchXtream();
      toast.success("Xtream URL updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update Xtream URL: ${error.message}`);
    },
  });

  const deleteXtreamUrl = api.xtreamUrl.delete.useMutation({
    onSuccess: () => {
      void refetchXtream();
      toast.success("Xtream URL deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to delete Xtream URL: ${error.message}`);
    },
  });

  // Mutation hooks for Country URLs
  const updateCountryUrl = api.countryUrl.update.useMutation({
    onSuccess: () => {
      void refetchCountry();
      toast.success("Country URL updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update Country URL: ${error.message}`);
    },
  });

  const deleteCountryUrl = api.countryUrl.delete.useMutation({
    onSuccess: () => {
      void refetchCountry();
      toast.success("Country URL deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to delete Country URL: ${error.message}`);
    },
  });

  // Mutation hooks for Category URLs
  const updateCategoryUrl = api.categoryUrl.update.useMutation({
    onSuccess: () => {
      void refetchCategory();
      toast.success("Category URL updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update Category URL: ${error.message}`);
    },
  });

  const deleteCategoryUrl = api.categoryUrl.delete.useMutation({
    onSuccess: () => {
      void refetchCategory();
      toast.success("Category URL deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to delete Category URL: ${error.message}`);
    },
  });

  // Handle edit operations based on the current active tab
  const handleEdit = React.useCallback((id: string, updatedItem: Partial<UrlEntity>, tabType: 'xtream' | 'countries' | 'categories') => {
    const updateData = {
      id,
      url: updatedItem.url,
      status: updatedItem.status,
      isExpired: updatedItem.isExpired,
    };

    switch (tabType) {
      case 'xtream':
        updateXtreamUrl.mutate(updateData);
        break;
      case 'countries':
        updateCountryUrl.mutate(updateData);
        break;
      case 'categories':
        updateCategoryUrl.mutate(updateData);
        break;
      default:
        toast.error('Unknown tab type for edit operation');
    }
  }, [updateXtreamUrl, updateCountryUrl, updateCategoryUrl]);

  // Handle delete operations based on the current active tab
  const handleDelete = React.useCallback((id: string, tabType: 'xtream' | 'countries' | 'categories') => {
    switch (tabType) {
      case 'xtream':
        deleteXtreamUrl.mutate({ id });
        break;
      case 'countries':
        deleteCountryUrl.mutate({ id });
        break;
      case 'categories':
        deleteCategoryUrl.mutate({ id });
        break;
      default:
        toast.error('Unknown tab type for delete operation');
    }
  }, [deleteXtreamUrl, deleteCountryUrl, deleteCategoryUrl]);

  return (
    <Tabs
      defaultValue="xtream"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <div className="flex items-center gap-4">
          <Select defaultValue="xtream">
            <SelectTrigger
              className="flex w-fit @4xl/main:hidden"
              size="sm"
              id="view-selector"
            >
              <SelectValue placeholder="Select a view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="xtream">Xtream</SelectItem>
              <SelectItem value="countries">Countries</SelectItem>
              <SelectItem value="categories">Categories</SelectItem>
            </SelectContent>
          </Select>
          <Link href="/admin/add">
            <Button size="sm" className="gap-2">
              <IconPlus className="h-4 w-4" />
              Thêm dữ liệu
            </Button>
          </Link>
        </div>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="xtream">Xtream</TabsTrigger>
          <TabsTrigger value="countries">
            Countries
          </TabsTrigger>
          <TabsTrigger value="categories">
            Categories
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent
        value="xtream"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        {(() => {
          if (isLoading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <div>Error loading data</div>;
          }
          return (
            <DataTable
              key="xtream-table"
              data={xtreamData?.urls || []}
              columns={xtreamColumns as ColumnDef<XtreamUrlEntity, any>[]}
              onEdit={(id, updatedItem) => handleEdit(id, updatedItem, 'xtream')}
              onDelete={(id) => handleDelete(id, 'xtream')}
            />
          );
        })()}
      </TabsContent>
      <TabsContent
        value="countries"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        {(() => {
          if (countryLoading) {
            return <div>Loading countries...</div>;
          }
          if (countryError) {
            return <div>Error loading countries</div>;
          }
          return (
            <DataTable
              key="countries-table"
              data={countryData?.urls || []}
              columns={countriesColumns as ColumnDef<CountryUrlEntity, any>[]}
              onEdit={(id, updatedItem) => handleEdit(id, updatedItem, 'countries')}
              onDelete={(id) => handleDelete(id, 'countries')}
            />
          );
        })()}
      </TabsContent>
      <TabsContent
        value="categories"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        {(() => {
          if (categoryLoading) {
            return <div>Loading categories...</div>;
          }
          if (categoryError) {
            return <div>Error loading categories</div>;
          }
          return (
            <DataTable
              key="categories-table"
              data={categoryData?.urls || []}
              columns={categoriesColumns as ColumnDef<CategoryUrlEntity, any>[]}
              onEdit={(id, updatedItem) => handleEdit(id, updatedItem, 'categories')}
              onDelete={(id) => handleDelete(id, 'categories')}
            />
          );
        })()}
      </TabsContent>
    </Tabs>
  );
}