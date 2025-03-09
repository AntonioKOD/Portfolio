"use client"

import { Admin, Resource } from "react-admin"
import { prismaDataProvider } from "./prismaDataProvider"
import { authProvider } from "./authProvider"
import { CustomLayout } from "./CustomLayout"
import { CustomTheme } from "./CustomTheme"

// Import resource components
import { TemplateList, TemplateEdit, TemplateCreate, TemplateShow } from "./resources/templates"
import { UserList, UserEdit, UserShow } from "./resources/users"
import { ProjectList, ProjectEdit, ProjectCreate, ProjectShow } from "./resources/projects"

// Import icons
import { Code, FileText, Users } from "lucide-react"

export default function AdminDashboard() {
  return (
    <Admin
      dataProvider={prismaDataProvider}
      authProvider={authProvider}
      layout={CustomLayout}
      theme={CustomTheme}
      dashboard={() => <Dashboard />}
    >
      <Resource
        name="templates"
        list={TemplateList}
        edit={TemplateEdit}
        create={TemplateCreate}
        show={TemplateShow}
        icon={Code}
        options={{ label: "Templates" }}
      />
     
      <Resource
        name="users"
        list={UserList}
        edit={UserEdit}
        show={UserShow}
        icon={Users}
        options={{ label: "Users" }}
      />
      <Resource
        name="projects"
        list={ProjectList}
        edit={ProjectEdit}
        create={ProjectCreate}
        show={ProjectShow}
        icon={Code}
        options={{ label: "Projects" }}
      />
    </Admin>
  )
}

// Dashboard component
import { Title, useGetList } from "react-admin"
import { Card, CardContent } from "@mui/material"
import { Grid, Box, Typography } from "@mui/material"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"
import { Line, Bar, Pie } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend)

const Dashboard = () => {
  // Fetch some data for the dashboard
  const { data: templates, isLoading: templatesLoading } = useGetList("templates", {
    pagination: { page: 1, perPage: 10 },
    sort: { field: "id", order: "DESC" },
  })

  const { data: posts, isLoading: postsLoading } = useGetList("posts", {
    pagination: { page: 1, perPage: 10 },
    sort: { field: "id", order: "DESC" },
  })

  const { data: users, isLoading: usersLoading } = useGetList("users", {
    pagination: { page: 1, perPage: 10 },
    sort: { field: "id", order: "DESC" },
  })

  const { data: projects, isLoading: projectsLoading } = useGetList("projects", {
    pagination: { page: 1, perPage: 10 },
    sort: { field: "id", order: "DESC" },
  })

  // Sample data for charts
  const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Website Visitors",
        data: [1200, 1900, 3000, 5000, 4000, 6000, 7000],
        borderColor: "rgba(94, 234, 212, 1)",
        backgroundColor: "rgba(94, 234, 212, 0.2)",
        tension: 0.4,
      },
    ],
  }

  const barChartData = {
    labels: ["Templates", "Blog Posts", "Users", "Projects"],
    datasets: [
      {
        label: "Count",
        data: [templates?.length || 0, posts?.length || 0, users?.length || 0, projects?.length || 0],
        backgroundColor: [
          "rgba(94, 234, 212, 0.6)",
          "rgba(168, 85, 247, 0.6)",
          "rgba(245, 158, 11, 0.6)",
          "rgba(244, 63, 94, 0.6)",
        ],
        borderColor: [
          "rgba(94, 234, 212, 1)",
          "rgba(168, 85, 247, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(244, 63, 94, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const pieChartData = {
    labels: ["Templates", "Projects"],
    datasets: [
      {
        data: [templates?.length || 0, projects?.length || 0],
        backgroundColor: ["rgba(94, 234, 212, 0.6)", "rgba(168, 85, 247, 0.6)"],
        borderColor: ["rgba(94, 234, 212, 1)", "rgba(168, 85, 247, 1)"],
        borderWidth: 1,
      },
    ],
  }

  return (
    <Box>
      <Title title="Dashboard" />

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              backgroundColor: "rgba(94, 234, 212, 0.1)",
              borderLeft: "4px solid rgba(94, 234, 212, 1)",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {templatesLoading ? "..." : templates?.length || 0}
              </Typography>
              <Typography color="textSecondary">Templates</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              backgroundColor: "rgba(168, 85, 247, 0.1)",
              borderLeft: "4px solid rgba(168, 85, 247, 1)",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {postsLoading ? "..." : posts?.length || 0}
              </Typography>
              <Typography color="textSecondary">Blog Posts</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              borderLeft: "4px solid rgba(245, 158, 11, 1)",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {usersLoading ? "..." : users?.length || 0}
              </Typography>
              <Typography color="textSecondary">Users</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              backgroundColor: "rgba(244, 63, 94, 0.1)",
              borderLeft: "4px solid rgba(244, 63, 94, 1)",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {projectsLoading ? "..." : projects?.length || 0}
              </Typography>
              <Typography color="textSecondary">Projects</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Website Traffic
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line
                  data={lineChartData}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Content Distribution
              </Typography>
              <Box sx={{ height: 300 }}>
                <Pie
                  data={pieChartData}
                  options={{
                    maintainAspectRatio: false,
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Content Overview
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={barChartData}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

