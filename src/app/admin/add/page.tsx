"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { IconPlus, IconArrowLeft, IconX, IconBulb, IconLink, IconDatabase, IconSearch, IconCheck } from "@tabler/icons-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { api } from "@/trpc/react"
import { UrlStatus } from "@prisma/client"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Schema cho form thêm single URL
const singleUrlSchema = z.object({
  url: z.string().url("URL không hợp lệ"),
  status: z.nativeEnum(UrlStatus),
  countryId: z.string().optional(),
  categoryId: z.string().optional(),
})

// Schema cho form thêm multiple URLs
const multipleUrlSchema = z.object({
  urls: z.string().min(1, "Vui lòng nhập ít nhất một URL"),
  status: z.nativeEnum(UrlStatus),
  countryId: z.string().optional(),
  categoryId: z.string().optional(),
})

type SingleUrlForm = z.infer<typeof singleUrlSchema>
type MultipleUrlForm = z.infer<typeof multipleUrlSchema>

export default function AddDataPage() {
  const [activeTab, setActiveTab] = React.useState<"xtream" | "country" | "category">("xtream")

  // Fetch countries and categories for select options
  const { data: countries } = api.country.getAll.useQuery({})
  const { data: categories } = api.category.getAll.useQuery({})

  // Default values for forms
  const singleFormDefaults: SingleUrlForm = {
    url: "",
    status: UrlStatus.ACTIVE,
    countryId: undefined,
    categoryId: undefined,
  }

  const multipleFormDefaults: MultipleUrlForm = {
    urls: "",
    status: UrlStatus.ACTIVE,
    countryId: undefined,
    categoryId: undefined,
  }

  // Single URL form
  const singleForm = useForm<SingleUrlForm>({
    resolver: zodResolver(singleUrlSchema),
    defaultValues: singleFormDefaults,
  })

  // Multiple URLs form
  const multipleForm = useForm<MultipleUrlForm>({
    resolver: zodResolver(multipleUrlSchema),
    defaultValues: multipleFormDefaults,
  })

  // Function to clear all forms
  const clearAllForms = React.useCallback(() => {
    singleForm.reset(singleFormDefaults)
    multipleForm.reset(multipleFormDefaults)
  }, [singleForm, multipleForm, singleFormDefaults, multipleFormDefaults])

  // Clear forms when switching tabs
  React.useEffect(() => {
    clearAllForms()
  }, [activeTab, clearAllForms])

  // Enhanced mutations with better reset functionality
  const createXtreamUrl = api.xtreamUrl.create.useMutation({
    onSuccess: () => {
      toast.success("Xtream URL đã được thêm thành công!")
      singleForm.reset(singleFormDefaults)
      // Trigger a small delay to ensure UI updates
      setTimeout(() => {
        singleForm.clearErrors()
      }, 100)
    },
    onError: (error) => {
      toast.error(`Lỗi khi thêm Xtream URL: ${error.message}`)
    },
  })

  const createXtreamUrls = api.xtreamUrl.createMany.useMutation({
    onSuccess: (data) => {
      const count = data?.count || 0
      toast.success(`${count} Xtream URLs đã được thêm thành công!`)
      multipleForm.reset(multipleFormDefaults)
      setTimeout(() => {
        multipleForm.clearErrors()
      }, 100)
    },
    onError: (error) => {
      toast.error(`Lỗi khi thêm Xtream URLs: ${error.message}`)
    },
  })

  const createCountryUrl = api.countryUrl.create.useMutation({
    onSuccess: () => {
      toast.success("Country URL đã được thêm thành công!")
      singleForm.reset(singleFormDefaults)
      setTimeout(() => {
        singleForm.clearErrors()
      }, 100)
    },
    onError: (error) => {
      toast.error(`Lỗi khi thêm Country URL: ${error.message}`)
    },
  })

  const createCountryUrls = api.countryUrl.createMany.useMutation({
    onSuccess: (data) => {
      const count = data?.count || 0
      toast.success(`${count} Country URLs đã được thêm thành công!`)
      multipleForm.reset(multipleFormDefaults)
      setTimeout(() => {
        multipleForm.clearErrors()
      }, 100)
    },
    onError: (error) => {
      toast.error(`Lỗi khi thêm Country URLs: ${error.message}`)
    },
  })

  const createCategoryUrl = api.categoryUrl.create.useMutation({
    onSuccess: () => {
      toast.success("Category URL đã được thêm thành công!")
      singleForm.reset(singleFormDefaults)
      setTimeout(() => {
        singleForm.clearErrors()
      }, 100)
    },
    onError: (error) => {
      toast.error(`Lỗi khi thêm Category URL: ${error.message}`)
    },
  })

  const createCategoryUrls = api.categoryUrl.createMany.useMutation({
    onSuccess: (data) => {
      const count = data?.count || 0
      toast.success(`${count} Category URLs đã được thêm thành công!`)
      multipleForm.reset(multipleFormDefaults)
      setTimeout(() => {
        multipleForm.clearErrors()
      }, 100)
    },
    onError: (error) => {
      toast.error(`Lỗi khi thêm Category URLs: ${error.message}`)
    },
  })

  // Handle single URL submission
  const onSingleSubmit = (values: SingleUrlForm) => {
    switch (activeTab) {
      case "xtream":
        if (!values.countryId) {
          toast.error("Vui lòng chọn quốc gia cho Xtream URL")
          return
        }
        createXtreamUrl.mutate({
          url: values.url,
          status: values.status,
          countryId: values.countryId,
        })
        break
      case "country":
        if (!values.countryId) {
          toast.error("Vui lòng chọn quốc gia cho Country URL")
          return
        }
        createCountryUrl.mutate({
          url: values.url,
          status: values.status,
          countryId: values.countryId,
        })
        break
      case "category":
        if (!values.categoryId) {
          toast.error("Vui lòng chọn danh mục cho Category URL")
          return
        }
        createCategoryUrl.mutate({
          url: values.url,
          status: values.status,
          categoryId: values.categoryId,
        })
        break
    }
  }

  // Handle multiple URLs submission
  const onMultipleSubmit = (values: MultipleUrlForm) => {
    const urlList = values.urls
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0)

    if (urlList.length === 0) {
      toast.error("Vui lòng nhập ít nhất một URL")
      return
    }

    switch (activeTab) {
      case "xtream":
        if (!values.countryId) {
          toast.error("Vui lòng chọn quốc gia cho Xtream URLs")
          return
        }
        createXtreamUrls.mutate({
          urls: urlList.map(url => ({
            url,
            status: values.status,
            countryId: values.countryId!,
          })),
        })
        break
      case "country":
        if (!values.countryId) {
          toast.error("Vui lòng chọn quốc gia cho Country URLs")
          return
        }
        createCountryUrls.mutate({
          urls: urlList.map(url => ({
            url,
            status: values.status,
            countryId: values.countryId!,
          })),
        })
        break
      case "category":
        if (!values.categoryId) {
          toast.error("Vui lòng chọn danh mục cho Category URLs")
          return
        }
        createCategoryUrls.mutate({
          urls: urlList.map(url => ({
            url,
            status: values.status,
            categoryId: values.categoryId!,
          })),
        })
        break
    }
  }

  const isLoading = createXtreamUrl.isPending || createCountryUrl.isPending ||
    createCategoryUrl.isPending || createXtreamUrls.isPending ||
    createCountryUrls.isPending || createCategoryUrls.isPending

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "xtream": return <IconDatabase className="h-4 w-4" />
      case "country": return <IconLink className="h-4 w-4" />
      case "category": return <IconBulb className="h-4 w-4" />
      default: return <IconPlus className="h-4 w-4" />
    }
  }

  const getTabDescription = () => {
    switch (activeTab) {
      case "xtream": return "Quản lý và thêm URLs cho Xtream streaming"
      case "country": return "Quản lý URLs theo từng quốc gia cụ thể"
      case "category": return "Phân loại URLs theo danh mục nội dung"
      default: return ""
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      {/* Header cải thiện */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div className="flex-1">
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Thêm dữ liệu mới
          </h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            {getTabDescription()}
          </p>
        </div>
        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <Link href="/admin">
            <Button variant="outline" size="sm" className="w-fit hover:bg-slate-100 dark:hover:bg-slate-800">
              <IconArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          </Link>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Tab Selection với style cải thiện */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)} className="w-full">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar tabs cho desktop */}
          <div className="lg:w-64 lg:flex-shrink-0">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-1 lg:h-auto lg:p-1 lg:space-y-1 bg-white dark:bg-slate-800 border shadow-sm">
              <TabsTrigger
                value="xtream"
                className="flex items-center gap-2 lg:justify-start lg:px-4 lg:py-3 lg:h-auto data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/50"
              >
                {getTabIcon("xtream")}
                <span className="hidden sm:inline lg:inline">Xtream URLs</span>
                <span className="sm:hidden lg:hidden">Xtream</span>
              </TabsTrigger>
              <TabsTrigger
                value="country"
                className="flex items-center gap-2 lg:justify-start lg:px-4 lg:py-3 lg:h-auto data-[state=active]:bg-green-50 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900/50"
              >
                {getTabIcon("country")}
                <span className="hidden sm:inline lg:inline">Country URLs</span>
                <span className="sm:hidden lg:hidden">Country</span>
              </TabsTrigger>
              <TabsTrigger
                value="category"
                className="flex items-center gap-2 lg:justify-start lg:px-4 lg:py-3 lg:h-auto data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-900/50"
              >
                {getTabIcon("category")}
                <span className="hidden sm:inline lg:inline">Category URLs</span>
                <span className="sm:hidden lg:hidden">Category</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Main content area */}
          <div className="flex-1 min-w-0">
            <TabsContent value="xtream" className="mt-0">
              <FormSection
                title="Xtream URLs"
                description="Thêm và quản lý URLs cho Xtream streaming service"
                iconColor="blue"
                singleForm={singleForm}
                multipleForm={multipleForm}
                onSingleSubmit={onSingleSubmit}
                onMultipleSubmit={onMultipleSubmit}
                isLoading={isLoading}
                countries={countries?.countries}
                categories={undefined}
                activeTab={activeTab}
                singleFormDefaults={singleFormDefaults}
                multipleFormDefaults={multipleFormDefaults}
              />
            </TabsContent>

            <TabsContent value="country" className="mt-0">
              <FormSection
                title="Country URLs"
                description="Thêm URLs được phân loại theo quốc gia"
                iconColor="green"
                singleForm={singleForm}
                multipleForm={multipleForm}
                onSingleSubmit={onSingleSubmit}
                onMultipleSubmit={onMultipleSubmit}
                isLoading={isLoading}
                countries={countries?.countries}
                categories={undefined}
                activeTab={activeTab}
                singleFormDefaults={singleFormDefaults}
                multipleFormDefaults={multipleFormDefaults}
              />
            </TabsContent>

            <TabsContent value="category" className="mt-0">
              <FormSection
                title="Category URLs"
                description="Phân loại URLs theo danh mục nội dung"
                iconColor="purple"
                singleForm={singleForm}
                multipleForm={multipleForm}
                onSingleSubmit={onSingleSubmit}
                onMultipleSubmit={onMultipleSubmit}
                isLoading={isLoading}
                countries={undefined}
                categories={categories?.categories}
                activeTab={activeTab}
                singleFormDefaults={singleFormDefaults}
                multipleFormDefaults={multipleFormDefaults}
              />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

// Component riêng cho form section
interface FormSectionProps {
  readonly title: string
  readonly description: string
  readonly iconColor: "blue" | "green" | "purple"
  readonly singleForm: any
  readonly multipleForm: any
  readonly onSingleSubmit: (values: SingleUrlForm) => void
  readonly onMultipleSubmit: (values: MultipleUrlForm) => void
  readonly isLoading: boolean
  readonly countries?: Array<{ id: string; name: string }>
  readonly categories?: Array<{ id: string; name: string }>
  readonly activeTab: string
  readonly singleFormDefaults: SingleUrlForm
  readonly multipleFormDefaults: MultipleUrlForm
}

function FormSection({
  singleForm,
  multipleForm,
  onSingleSubmit,
  onMultipleSubmit,
  isLoading,
  countries,
  categories,
  activeTab,
  singleFormDefaults,
  multipleFormDefaults
}: FormSectionProps) {

  // Get placeholder based on active tab
  const getUrlPlaceholder = () => {
    switch (activeTab) {
      case "xtream":
        return "http://pazzy.xyz:8080/get.php?username=DemoAccount&password=DemoPass9&type=m3u&output=ts"
      case "country":
        return "https://example.com"
      case "category":
        return "https://example.com"
      default:
        return "https://example.com"
    }
  }

  const getMultipleUrlsPlaceholder = () => {
    switch (activeTab) {
      case "xtream":
        return "http://pazzy.xyz:8080/get.php?username=Account1&password=Pass123&type=m3u&output=ts\nhttp://server2.xyz:8080/get.php?username=Account2&password=Pass456&type=m3u&output=ts\nhttp://stream3.xyz:8080/get.php?username=Account3&password=Pass789&type=m3u&output=ts"
      case "country":
        return "https://example1.com\nhttps://example2.com\nhttps://example3.com"
      case "category":
        return "https://example1.com\nhttps://example2.com\nhttps://example3.com"
      default:
        return "https://example1.com\nhttps://example2.com\nhttps://example3.com"
    }
  }

  return (
    <div className="space-y-6">
      {/* Forms grid - responsive */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Single URL Form */}
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <IconPlus className="h-5 w-5 text-blue-600" />
              Thêm một URL
            </CardTitle>
            <CardDescription className="text-sm">
              Thêm một URL đơn lẻ vào hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Form {...singleForm}>
              <form onSubmit={singleForm.handleSubmit(onSingleSubmit)} className="space-y-4">
                {/* Country/Category selector */}
                {(countries || categories) && (
                  <FormField
                    control={singleForm.control}
                    name={categories ? "categoryId" : "countryId"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          {categories ? "Danh mục" : "Quốc gia"}
                        </FormLabel>
                        {categories ? (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-5">
                                <SelectValue placeholder="Chọn danh mục" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((item: { id: string; name: string }) => (
                                <SelectItem key={item.id} value={item.id}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <CountryCombobox
                            value={field.value}
                            onValueChange={field.onChange}
                            countries={countries}
                            placeholder="Chọn hoặc nhập quốc gia..."
                          />
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={singleForm.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={getUrlPlaceholder()}
                          className="h-10"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={singleForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Trạng thái</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={UrlStatus.ACTIVE}>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              Hoạt động
                            </div>
                          </SelectItem>
                          <SelectItem value={UrlStatus.INACTIVE}>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                              Không hoạt động
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2 pt-2">
                  <Button
                    type="submit"
                    className="flex-1 h-10"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Đang thêm...
                      </div>
                    ) : (
                      "Thêm URL"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => {
                      singleForm.reset(singleFormDefaults)
                      singleForm.clearErrors()
                      toast.success("Form đã được xóa!")
                    }}
                    disabled={isLoading}
                    title="Xóa form"
                  >
                    <IconX className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Multiple URLs Form */}
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <IconDatabase className="h-5 w-5 text-purple-600" />
              Thêm nhiều URLs
            </CardTitle>
            <CardDescription className="text-sm">
              Thêm nhiều URLs cùng lúc (bulk import)
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Form {...multipleForm}>
              <form onSubmit={multipleForm.handleSubmit(onMultipleSubmit)} className="space-y-4">
                {/* Country/Category selector */}
                {(countries || categories) && (
                  <FormField
                    control={multipleForm.control}
                    name={categories ? "categoryId" : "countryId"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          {categories ? "Danh mục" : "Quốc gia"}
                        </FormLabel>
                        {categories ? (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-10">
                                <SelectValue placeholder="Chọn danh mục" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((item: { id: string; name: string }) => (
                                <SelectItem key={item.id} value={item.id}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <CountryCombobox
                            value={field.value}
                            onValueChange={field.onChange}
                            countries={countries}
                            placeholder="Chọn hoặc nhập quốc gia..."
                          />
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={multipleForm.control}
                  name="urls"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">URLs</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={getMultipleUrlsPlaceholder()}
                          className="min-h-[120px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        💡 Nhập mỗi URL trên một dòng riêng biệt
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={multipleForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Trạng thái</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={UrlStatus.ACTIVE}>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              Hoạt động
                            </div>
                          </SelectItem>
                          <SelectItem value={UrlStatus.INACTIVE}>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                              Không hoạt động
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2 pt-2">
                  <Button
                    type="submit"
                    className="flex-1 h-10"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Đang thêm...
                      </div>
                    ) : (
                      "Thêm URLs"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => {
                      multipleForm.reset(multipleFormDefaults)
                      multipleForm.clearErrors()
                      toast.success("Form đã được xóa!")
                    }}
                    disabled={isLoading}
                    title="Xóa form"
                  >
                    <IconX className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Component CountryCombobox cho phép nhập country mới
interface CountryComboboxProps {
  readonly value?: string
  readonly onValueChange: (value: string) => void
  readonly countries?: Array<{ id: string; name: string }>
  readonly placeholder?: string
  readonly disabled?: boolean
}

function CountryCombobox({ value, onValueChange, countries = [], placeholder = "Chọn hoặc nhập quốc gia...", disabled }: CountryComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")
  
  // Mutation để tìm hoặc tạo country
  const findOrCreateCountry = api.country.findOrCreate.useMutation({
    onSuccess: (country) => {
      onValueChange(country.id)
      setOpen(false)
      setSearchValue("")
      toast.success(`Quốc gia "${country.name}" đã được ${countries.find(c => c.id === country.id) ? 'chọn' : 'thêm mới'}!`)
    },
    onError: (error) => {
      toast.error(`Lỗi khi thêm quốc gia: ${error.message}`)
    },
  })

  const selectedCountry = countries.find((country) => country.id === value)
  
  // Filter countries based on search
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchValue.toLowerCase())
  )

  const handleSelect = (countryId: string) => {
    if (countryId === "CREATE_NEW") {
      // Tạo country mới từ search value
      if (searchValue.trim()) {
        findOrCreateCountry.mutate({ name: searchValue.trim() })
      }
    } else {
      onValueChange(countryId)
      setOpen(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchValue.trim() && filteredCountries.length === 0) {
      e.preventDefault()
      findOrCreateCountry.mutate({ name: searchValue.trim() })
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className="h-10 justify-between w-full"
          disabled={disabled}
        >
          {selectedCountry ? selectedCountry.name : placeholder}
          <IconSearch className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Tìm kiếm hoặc nhập tên quốc gia mới..."
            value={searchValue}
            onValueChange={setSearchValue}
            onKeyDown={handleKeyDown}
          />
          <CommandList>
            <CommandEmpty>
              {searchValue.trim() ? (
                <div className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Không tìm thấy quốc gia &quot;{searchValue}&quot;
                  </p>
                  <Button
                    size="sm"
                    onClick={() => handleSelect("CREATE_NEW")}
                    disabled={findOrCreateCountry.isPending}
                    className="w-full"
                  >
                    {findOrCreateCountry.isPending ? (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Đang thêm...
                      </div>
                    ) : (
                      <>
                        <IconPlus className="w-3 h-3 mr-1" />
                        Thêm &quot;{searchValue}&quot;
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                "Nhập tên quốc gia để tìm kiếm..."
              )}
            </CommandEmpty>
            <CommandGroup>
              {filteredCountries.map((country) => (
                <CommandItem
                  key={country.id}
                  value={country.id}
                  onSelect={() => handleSelect(country.id)}
                >
                  <IconCheck
                    className={`mr-2 h-4 w-4 ${
                      value === country.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {country.name}
                </CommandItem>
              ))}
              {searchValue.trim() && filteredCountries.length > 0 && (
                <CommandItem
                  value="CREATE_NEW"
                  onSelect={() => handleSelect("CREATE_NEW")}
                >
                  <IconPlus className="mr-2 h-4 w-4" />
                  Thêm &quot;{searchValue}&quot; vào danh sách
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}