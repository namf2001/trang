"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
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
export const dynamic = 'force-dynamic';

export default function AdminPage() {
  const { data: xtreamData, isLoading, error } = api.xtreamUrl.getAll.useQuery({});
  const { data: countryData, isLoading: countryLoading, error: countryError } = api.countryUrl.getAll.useQuery({});
  const { data: categoryData, isLoading: categoryLoading, error: categoryError } = api.categoryUrl.getAll.useQuery({});
  
  return (
    <Tabs
      defaultValue="xtream"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
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
            <SelectItem value="key-personnel">Key Personnel</SelectItem>
            <SelectItem value="focus-documents">Focus Documents</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="xtream">Xtream</TabsTrigger>
          <TabsTrigger value="countries">
            Countries
          </TabsTrigger>
          <TabsTrigger value="categories">
            Categories
          </TabsTrigger>
          <TabsTrigger value="key-personnel">
            Key Personnel <Badge variant="secondary">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
        </TabsList>
        {/* <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">Add Section</span>
          </Button>
        </div> */}
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
          return <DataTable key="xtream-table" data={xtreamData?.urls || []} columns={xtreamColumns} />;
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
          return <DataTable key="countries-table" data={countryData?.urls || []} columns={countriesColumns} />;
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
          return <DataTable key="categories-table" data={categoryData?.urls || []} columns={categoriesColumns} />;
        })()}
      </TabsContent>
    </Tabs>
  );
}