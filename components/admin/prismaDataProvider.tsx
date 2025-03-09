"use client"

import type { DataProvider } from "react-admin"

export const prismaDataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination || { page: 1, perPage: 10 }
    const { field, order } = params.sort || { field: 'id', order: 'ASC' }

    // Build query string
    const queryParams = new URLSearchParams({
      page: page.toString(),
      perPage: perPage.toString(),
      sortField: field,
      sortOrder: order,
    })

    // Add filters if any
    if (Object.keys(params.filter).length > 0) {
      queryParams.append("filter", JSON.stringify(params.filter))
    }

    const url = `/api/admin/${resource}?${queryParams.toString()}`

    const response = await fetch(url)
    const { data, total } = await response.json()

    return {
      data,
      total,
    }
  },

  getOne: async (resource, params) => {
    const response = await fetch(`/api/admin/${resource}/${params.id}`)
    const data = await response.json()

    return {
      data,
    }
  },

  getMany: async (resource, params) => {
    // For simplicity, we'll fetch each resource individually
    // In a production app, you might want to optimize this with a batch endpoint
    const data = await Promise.all(
      params.ids.map((id) => fetch(`/api/admin/${resource}/${id}`).then((response) => response.json())),
    )

    return { data }
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort

    // Build query with reference filter
    const filter = {
      ...params.filter,
      [params.target]: params.id,
    }

    const queryParams = new URLSearchParams({
      page: page.toString(),
      perPage: perPage.toString(),
      sortField: field,
      sortOrder: order,
      filter: JSON.stringify(filter),
    })

    const url = `/api/admin/${resource}?${queryParams.toString()}`

    const response = await fetch(url)
    const { data, total } = await response.json()

    return {
      data,
      total,
    }
  },

  create: async (resource, params) => {
    const response = await fetch(`/api/admin/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params.data),
    })

    const data = await response.json()

    return {
      data,
    }
  },

  update: async (resource, params) => {
    const response = await fetch(`/api/admin/${resource}/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params.data),
    })

    const data = await response.json()

    return {
      data,
    }
  },

  updateMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map((id) =>
        fetch(`/api/admin/${resource}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params.data),
        }),
      ),
    )

    return { data: params.ids }
  },

  delete: async (resource, params) => {
    const response = await fetch(`/api/admin/${resource}/${params.id}`, {
      method: "DELETE",
    })

    const data = await response.json()

    return {
      data,
    }
  },

  deleteMany: async (resource, params) => {
    await Promise.all(
      params.ids.map((id) =>
        fetch(`/api/admin/${resource}/${id}`, {
          method: "DELETE",
        }),
      ),
    )

    return { data: params.ids }
  },
}

