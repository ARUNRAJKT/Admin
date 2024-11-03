import React from "react";
import {
  Flex,
  Text,
  Button,
  Spacer,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();


  const pageTitles = {
    "/dashboard": "Dashboard",
    "/users": "Users",
    "/products": "Products",
    "/orders": "Orders",
    "/admins": "Admin",
  };


  const currentPage = pageTitles[location.pathname] || "Home";
  const loggedInUser = "John Doe"; 

  const showPageTitle = useBreakpointValue({ base: false, md: true });

  return (
    <Flex as="nav" bg="teal.500" p={4} color="white" align="center">
      {showPageTitle && (
        <Text fontSize="xl" fontWeight="bold">
          {currentPage}
        </Text>
      )}

      <Spacer />

      <Flex align="center">
        <Text mr={4}>Welcome, {loggedInUser}</Text>
        <Button colorScheme="teal" variant="outline" size="sm">
          Logout
        </Button>
      </Flex>
    </Flex>
  );
}
