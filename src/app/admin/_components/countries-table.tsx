"use client"

import * as React from "react"
import { api } from "@/trpc/react"
import { DataTable } from "@/app/admin/_components/data-table/data-table"
import { columns as xtreamColumns } from "@/app/admin/_components/columns/xtream-column"


export function CountriesTable() {
  const { data, isLoading, error } = api.xtreamUrl.getAll.useQuery({ limit: 20 });

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading data...</div>
  }
  if (error) {
    return <div className="flex justify-center p-8 text-red-500">Error loading data: {error.message}</div>
  }

  return (
    <DataTable data={data} columns={xtreamColumns} />
  )
}