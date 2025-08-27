"use client"

import * as React from "react"

import {
  useSortable,
} from "@dnd-kit/sortable"
import {
  IconCircleCheckFilled,
  IconDotsVertical,
  IconGripVertical,
  IconEdit,
  IconTrash,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useIsMobile } from "@/hooks/use-mobile"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DataTableColumnHeader } from "../data-table/data-table-column-header"
import { useCRUD } from "../data-table/data-table"

// Updated schema to match database structure for CategoryURL
export const schema = z.object({
  id: z.string(),
  url: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  isExpired: z.boolean(),
  categoryId: z.string(),
  // Optional: if category data is included via relations
  category: z.object({
    id: z.string(),
    name: z.string()
  }).optional(),
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

// Edit Item Dialog
function EditItemDialog({ 
  item,
  onEdit,
  trigger 
}: { 
  item: z.infer<typeof schema>;
  onEdit: (id: string, updatedItem: Partial<z.infer<typeof schema>>) => void;
  trigger: React.ReactNode;
}) {
  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const updatedItem = {
      url: formData.get('url') as string,
      status: formData.get('status') as "ACTIVE" | "INACTIVE",
      categoryId: formData.get('categoryId') as string,
    }
    
    onEdit(item.id, updatedItem)
    setOpen(false)
    toast.success("Category item updated successfully!")
  }

  return (
    <Drawer direction={isMobile ? "bottom" : "right"} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {trigger}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Edit Category Item</DrawerTitle>
          <DrawerDescription>
            Update category item details below
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="edit-categoryId">Category ID</Label>
              <Input 
                id="edit-categoryId" 
                name="categoryId" 
                defaultValue={item.categoryId}
                placeholder="Enter category ID" 
                required 
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="edit-url">URL</Label>
              <Input 
                id="edit-url" 
                name="url" 
                defaultValue={item.url}
                placeholder="Enter URL" 
                required 
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="edit-status">Status</Label>
              <Select name="status" defaultValue={item.status}>
                <SelectTrigger id="edit-status" className="w-full">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">Update Item</Button>
              <DrawerClose asChild>
                <Button type="button" variant="outline" className="flex-1">Cancel</Button>
              </DrawerClose>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

// Add Item Dialog
function AddItemDialog({ 
  onAdd, 
  trigger 
}: { 
  onAdd: (item: Omit<z.infer<typeof schema>, 'id'>) => void;
  trigger: React.ReactNode;
}) {
  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const newItem = {
      url: formData.get('url') as string,
      status: formData.get('status') as "ACTIVE" | "INACTIVE",
      isExpired: false,
      categoryId: formData.get('categoryId') as string,
    }
    
    onAdd(newItem)
    setOpen(false)
    toast.success("Category item added successfully!")
  }

  return (
    <Drawer direction={isMobile ? "bottom" : "right"} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {trigger}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Add New Category Item</DrawerTitle>
          <DrawerDescription>
            Create a new category item with the details below
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="add-categoryId">Category ID</Label>
              <Input id="add-categoryId" name="categoryId" placeholder="Enter category ID" required />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="add-url">URL</Label>
              <Input id="add-url" name="url" placeholder="Enter URL" required />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="add-status">Status</Label>
              <Select name="status" defaultValue="ACTIVE">
                <SelectTrigger id="add-status" className="w-full">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">Add Item</Button>
              <DrawerClose asChild>
                <Button type="button" variant="outline" className="flex-1">Cancel</Button>
              </DrawerClose>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

// Delete Confirmation Dialog
function DeleteItemDialog({ 
  item,
  onDelete,
  trigger 
}: { 
  item: z.infer<typeof schema>;
  onDelete: (id: string) => void;
  trigger: React.ReactNode;
}) {
  const handleDelete = () => {
    onDelete(item.id)
    toast.success("Category item deleted successfully!")
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the category item
            with URL: {item.url}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
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
    accessorKey: "categoryId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      // Display category name if available, otherwise show categoryId
      const categoryName = row.original.category?.name || row.original.categoryId;
      return (
        <div className="flex items-center gap-2">
          <div className="h-4 w-6 rounded-sm bg-gradient-to-r from-green-500 to-blue-500"></div>
          <span className="font-medium">{categoryName}</span>
        </div>
      );
    },
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
      return <ActionsCell row={row} />
    },
    enableHiding: false,
    size: 80,
  },
]

// Separate Actions Cell component to use the hook
function ActionsCell({ row }: { row: any }) {
  const { onEdit, onDelete } = useCRUD()

  const handleEdit = (id: string, updatedItem: Partial<z.infer<typeof schema>>) => {
    if (onEdit) onEdit(id, updatedItem)
  }

  const handleDelete = (id: string) => {
    if (onDelete) onDelete(id)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <IconDotsVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <EditItemDialog
          item={row.original}
          onEdit={handleEdit}
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="gap-2">
              <IconEdit className="h-4 w-4" />
              Edit
            </DropdownMenuItem>
          }
        />
        <DropdownMenuItem className="gap-2">
          <IconCircleCheckFilled className="h-4 w-4" />
          {row.original.status === "ACTIVE" ? "Mark as Inactive" : "Mark as Active"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DeleteItemDialog
          item={row.original}
          onDelete={handleDelete}
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="gap-2 text-destructive">
              <IconTrash className="h-4 w-4" />
              Delete
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Export the dialog components for use in other files
export { EditItemDialog, AddItemDialog, DeleteItemDialog }