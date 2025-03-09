"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import AdminDashboard from "@/components/admin/AdminDashboard"

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Check if user is authenticated and is an admin
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/admin-dashboard")
    } else if (status === "authenticated") {
      // Check if user is admin - adjust this based on your user model
      const isAdmin = session?.user?.email === "antonio_kodheli@icloud.com"
      if (!isAdmin) {
        router.push("/")
      }
    }
  }, [status, session, router])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Only render the admin dashboard if authenticated and admin
  if (status === "authenticated" && session?.user?.email === "antonio_kodheli@icloud.com") {
    return <AdminDashboard />
  }

  // This will briefly show before redirect happens
  return null
}

