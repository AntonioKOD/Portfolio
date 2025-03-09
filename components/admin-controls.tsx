"use client"

import { useSession } from "next-auth/react"
import { type ReactNode, useEffect, useState } from "react"

export default function AdminControls({ children }: { children: ReactNode }) {
  const { data: session } = useSession()
  const [isAdmin, setIsAdmin] = useState(false)

  // Check if user is admin on client side
  useEffect(() => {
    if (session?.user?.email === "antonio_kodheli@icloud.com") {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
  }, [session])

  // Only render children if user is admin
  if (!isAdmin) return null

  return <>{children}</>
}

