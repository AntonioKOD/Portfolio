"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/use-debounce"

export default function BlogSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize search term from URL query parameter
  const [searchTerm, setSearchTerm] = useState(searchParams?.get("search") || "")

  // Debounce search term to avoid too many URL updates
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Update URL when debounced search term changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString())

    if (debouncedSearchTerm) {
      params.set("search", debouncedSearchTerm)
    } else {
      params.delete("search")
    }

    // Update the URL with the search parameter
    router.push(`/blog?${params.toString()}`, { scroll: false })
  }, [debouncedSearchTerm, router, searchParams])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm("")
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search articles..."
        className="pl-10 pr-10 h-12 bg-background/80 backdrop-blur-sm border-primary/20 focus:border-primary"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={handleClearSearch}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </div>
  )
}

