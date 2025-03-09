"use client"

import {
  Layout,
  type LayoutProps,
  AppBar,
  type AppBarProps,
  Menu,
  type MenuProps,
  Sidebar,
  type SidebarProps,
} from "react-admin"
import { Box, Typography, useMediaQuery, type Theme } from "@mui/material"
import { SiteLogo } from "@/components/site-logo"

// Custom AppBar component
export const CustomAppBar = (props: AppBarProps) => {
  return (
    <AppBar
      {...props}
      color="primary"
      elevation={1}
      sx={{
        "& .RaAppBar-title": {
          flex: 1,
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        },
        backgroundColor: "#111827",
        color: "white",
      }}
    >
      <Typography variant="h6" color="inherit" sx={{ flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SiteLogo textSize="sm" animated={false} />
          <Box sx={{ ml: 2, display: { xs: "none", sm: "block" } }}>Admin Dashboard</Box>
        </Box>
      </Typography>
      {/* Add any additional buttons or components here */}
    </AppBar>
  )
}

// Custom Menu component
export const CustomMenu = (props: MenuProps) => {
  return (
    <Menu
      {...props}
      sx={{
        "& .RaMenu-item": {
          color: "#e2e8f0",
          "&.RaMenu-active": {
            color: "#5eead4",
            "& .RaMenu-icon": {
              color: "#5eead4",
            },
          },
        },
        "& .RaMenu-icon": {
          color: "#94a3b8",
        },
      }}
    />
  )
}

// Custom Sidebar component
export const CustomSidebar = (props: SidebarProps) => {
  return (
    <Sidebar
      {...props}
      sx={{
        "& .RaSidebar-paper": {
          backgroundColor: "#1e293b",
          color: "#e2e8f0",
        },
      }}
    />
  )
}

// Custom Layout component
export const CustomLayout = (props: LayoutProps) => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"))

  return (
    <Layout
      {...props}
      appBar={CustomAppBar}
      menu={CustomMenu}
      sidebar={CustomSidebar}
      sx={{
        "& .RaLayout-content": {
          backgroundColor: "#0f172a",
          color: "#e2e8f0",
          padding: isSmall ? "16px" : "24px",
        },
      }}
    />
  )
}

