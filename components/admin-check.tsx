"use client"

import { useSession } from "next-auth/react"
import { type ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminCheck({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return

    if (session?.user?.email === "antonio_kodheli@icloud.com") {
      setIsAdmin(true)
    } else {
      router.push("/")
    }

    setIsLoading(false)
  }, [session, status, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAdmin) return null

  return <>{children}</>
}

