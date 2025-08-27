"use client"

import * as React from "react"

import {
  useSortable,
} from "@dnd-kit/sortable"
import {
  IconCircleCheckFilled,
  IconDotsVertical,
  IconGripVertical,
  IconTag,
} from "@tabler/icons-react"
import {
  type ColumnDef,
} from "@tanstack/react-table"
import { z } from "zod"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "../data-table/data-table-column-header"

export const schema = z.object({
  id: z.string(),
  url: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  isExpired: z.boolean(),
  category: z.object({
    id: z.string(),
    name: z.string()
  })
});

// Create a separate component for the drag handle
function DragHandle({ id }: { readonly id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "drag",
    header: () => <span className="sr-only">Drag</span>,
    cell: ({ row }) => <DragHandle id={row.index} />,
    size: 40,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: "category.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <IconTag className="h-4 w-4 text-purple-500" />
        <span className="font-medium">{row.original.category.name}</span>
      </div>
    ),
    enableColumnFilter: true,
    filterFn: "includesString",
    size: 150,
  },
  {
    accessorKey: "url",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="URL" />
    ),
    cell: ({ row }) => {
      const url = row.original.url;
      let domain = '';
      try {
        domain = url ? new URL(url).hostname : '';
      } catch {
        domain = 'Invalid URL';
      }
      return (
        <div className="flex flex-col gap-1">
          <div className="font-medium text-sm truncate max-w-xs" title={url}>
            {url}
          </div>
          <div className="text-xs text-muted-foreground">
            {domain}
          </div>
        </div>
      );
    },
    enableColumnFilter: true,
    filterFn: "includesString",
    size: 250,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      const isExpired = row.original.isExpired;
      
      if (isExpired) {
        return (
          <Badge variant="destructive" className="gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
            Expired
          </Badge>
        );
      }
      
      return (
        <Badge 
          variant={status === "ACTIVE" ? "default" : "secondary"} 
          className="gap-1.5"
        >
          {status === "ACTIVE" ? (
            <IconCircleCheckFilled className="h-3 w-3 fill-green-500" />
          ) : (
            <div className="h-1.5 w-1.5 rounded-full bg-gray-500"></div>
          )}
          {status === "ACTIVE" ? "Active" : "Inactive"}
        </Badge>
      );
    },
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      const status = row.original.status;
      const isExpired = row.original.isExpired;
      
      if (value === "expired") return isExpired;
      if (value === "active") return status === "ACTIVE" && !isExpired;
      if (value === "inactive") return status === "INACTIVE" && !isExpired;
      
      return true;
    },
    size: 120,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <IconDotsVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="gap-2">
              <IconCircleCheckFilled className="h-4 w-4" />
              Mark as Active
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <div className="h-2 w-2 rounded-full bg-gray-500"></div>
              Mark as Inactive
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-destructive">
              <IconDotsVertical className="h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
    size: 80,
  },
]