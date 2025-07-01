"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fakerEN as faker } from "@faker-js/faker";
import { Activity, PackageCheck, Truck, Users2 } from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#0f766e", "#0369a1", "#6d28d9", "#84cc16"];

export default function DashboardTemplate() {
  const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const stats = {
    totalOrders: randomInt(50, 150),
    inProgress: randomInt(10, 50),
    completed: randomInt(30, 100),
    drivers: randomInt(5, 20),
  };

  const ordersOverTime = Array.from({ length: 7 }, (_, i) => ({
    date: `Day ${i + 1}`,
    orders: randomInt(5, 25),
  }));

  const orderStatusDistribution = [
    { name: "New", value: randomInt(5, 20) },
    { name: "Assigned", value: randomInt(5, 20) },
    { name: "In Progress", value: randomInt(5, 20) },
    { name: "Completed", value: randomInt(10, 40) },
  ];

  const driverActivity = Array.from({ length: stats.drivers }, () => ({
    name: faker.person.firstName(),
    deliveries: randomInt(1, 15),
  }));

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Orders</CardTitle>
            <PackageCheck className="text-muted-foreground h-5 w-5" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {stats.totalOrders}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>In Progress</CardTitle>
            <Activity className="text-muted-foreground h-5 w-5" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {stats.inProgress}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Completed</CardTitle>
            <Truck className="text-muted-foreground h-5 w-5" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {stats.completed}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active Drivers</CardTitle>
            <Users2 className="text-muted-foreground h-5 w-5" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {stats.drivers}
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="orders">Orders Over Time</TabsTrigger>
          <TabsTrigger value="status">Order Status</TabsTrigger>
          <TabsTrigger value="drivers">Driver Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Orders Over the Last 7 Days</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ordersOverTime}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#0f766e"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle>Order Status Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {orderStatusDistribution.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers">
          <Card>
            <CardHeader>
              <CardTitle>Driver Delivery Counts</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={driverActivity}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="deliveries"
                    fill="#6d28d9"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
