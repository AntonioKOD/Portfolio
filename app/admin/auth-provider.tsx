"use client"

import { type ReactNode, createContext, useContext, useState, useEffect } from "react"
import { useSession } from "next-auth/react"

interface AdminAuthContextType {
  isAdmin: boolean
  isLoading: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAdmin: false,
  isLoading: true,
})

export const useAdminAuth = () => useContext(AdminAuthContext)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true)
      return
    }

    // Check if user is admin - adjust based on your user model
    const admin = session?.user?.email === "antonio_kodheli@icloud.com"
    setIsAdmin(!!admin)
    setIsLoading(false)
  }, [session, status])

  return <AdminAuthContext.Provider value={{ isAdmin, isLoading }}>{children}</AdminAuthContext.Provider>
}

