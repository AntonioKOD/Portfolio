"use client"

import type { AuthProvider } from "react-admin"

export const authProvider: AuthProvider = {
  login: () => {
    // Always allow login
    return Promise.resolve()
  },

  logout: () => {
    return Promise.resolve()
  },

  checkError: () => {
    return Promise.resolve()
  },

  checkAuth: () => {
    // Always authenticated
    return Promise.resolve()
  },

  getPermissions: () => {
    // Give admin permissions to everyone
    return Promise.resolve(["admin"])
  },

  getIdentity: () => {
    return Promise.resolve({
      id: "admin",
      fullName: "Admin User",
      avatar: "https://ui-avatars.com/api/?name=Admin+User&background=5eead4&color=fff",
    })
  },
}

