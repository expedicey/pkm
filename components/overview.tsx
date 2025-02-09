"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

// Sample data for multiple franchises
const data = [
  {
    name: "Jan",
    "Franchise A": Math.floor(Math.random() * 3000) + 1000,
    "Franchise B": Math.floor(Math.random() * 3000) + 1000,
    "Franchise C": Math.floor(Math.random() * 3000) + 1000,
  },
  {
    name: "Feb",
    "Franchise A": Math.floor(Math.random() * 3000) + 1000,
    "Franchise B": Math.floor(Math.random() * 3000) + 1000,
    "Franchise C": Math.floor(Math.random() * 3000) + 1000,
  },
  {
    name: "Mar",
    "Franchise A": Math.floor(Math.random() * 3000) + 1000,
    "Franchise B": Math.floor(Math.random() * 3000) + 1000,
    "Franchise C": Math.floor(Math.random() * 3000) + 1000,
  },
  {
    name: "Apr",
    "Franchise A": Math.floor(Math.random() * 3000) + 1000,
    "Franchise B": Math.floor(Math.random() * 3000) + 1000,
    "Franchise C": Math.floor(Math.random() * 3000) + 1000,
  },
  {
    name: "May",
    "Franchise A": Math.floor(Math.random() * 3000) + 1000,
    "Franchise B": Math.floor(Math.random() * 3000) + 1000,
    "Franchise C": Math.floor(Math.random() * 3000) + 1000,
  },
  {
    name: "Jun",
    "Franchise A": Math.floor(Math.random() * 3000) + 1000,
    "Franchise B": Math.floor(Math.random() * 3000) + 1000,
    "Franchise C": Math.floor(Math.random() * 3000) + 1000,
  },
]

const colors = ["#8884d8", "#82ca9d", "#ffc658"]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip formatter={(value) => [`$${value}`, "Orders"]} labelStyle={{ color: "#888888" }} />
        <Legend />
        {Object.keys(data[0])
          .filter((key) => key !== "name")
          .map((key, index) => (
            <Bar key={key} dataKey={key} fill={colors[index % colors.length]} radius={[4, 4, 0, 0]} />
          ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

