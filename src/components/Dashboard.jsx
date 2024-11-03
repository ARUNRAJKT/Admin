import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Heading,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import axios from "axios";


Chart.register(...registerables);

const API_URL = "http://localhost:3000/users"; 

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        setUsers(response.data);
        console.log(users)
        calculateAnalytics(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [users]);

  const calculateAnalytics = (userData) => {
    const now = new Date();
    const analyticsData = {
      totalUsers: userData.length,
      last24h: 0,
      last7d: 0,
      last15d: 0,
      last30d: 0,
      registrationTrends: Array(30).fill(0),
    };

    userData.forEach(user => {
      const createdAt = new Date(user.createdAt);
      const daysSinceCreated = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));

      if (daysSinceCreated <= 1) analyticsData.last24h++;
      if (daysSinceCreated <= 7) analyticsData.last7d++;
      if (daysSinceCreated <= 15) analyticsData.last15d++;
      if (daysSinceCreated <= 30) analyticsData.last30d++;

      if (daysSinceCreated < 30) {
        analyticsData.registrationTrends[29 - daysSinceCreated]++;
      }
    });

    setAnalytics(analyticsData);
  };

  const cardList = [
    { title: "Total Users", value: analytics.totalUsers || 0, color: "brown.500" },
    { title: "Last 24h", value: analytics.last24h || 0, color: "blue.500" },
    { title: "Last 7d", value: analytics.last7d || 0, color: "green.500" },
    { title: "Last 15d", value: analytics.last15d || 0, color: "orange.500" },
    { title: "Last 30d", value: analytics.last30d || 0, color: "red.500" },
  ];

  const chartData = {
    labels: Array.from({ length: 30 }, (_, i) => `${i + 1} days ago`),
    datasets: [
      {
        label: "User Registrations",
        data: analytics.registrationTrends,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: 'Days Ago' },
      },
      y: {
        title: { display: true, text: 'Number of User Registrations' },
        beginAtZero: true,
        ticks: {
          stepSize: 1, 
        },
      },
    },
  };

  return (
    <div>
      <SimpleGrid minChildWidth="250px" spacing={5} mb={5}>
        {cardList.map((card, index) => (
          <Flex
            key={index}
            shadow="lg"
            bg="white"
            p="3"
            justifyContent="center"
            alignItems="center"
          >
            <Box width={40}>
              <Text fontSize="1xl" color="gray.500">{card.title}</Text>
              <Heading size="lg" color={card.color}>{card.value}</Heading>
            </Box>
          </Flex>
        ))}
      </SimpleGrid>

      <Box mt={5} p={5} borderRadius="lg" bg="white" shadow="lg" height="400px">
        <Heading size="lg" mb={4}>User Registration Trends</Heading>
        <Line data={chartData} options={chartOptions} />
      </Box>
    </div>
  );
}
