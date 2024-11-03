import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Text,
  Spinner,
  HStack,
  useToast,
  Button,
} from '@chakra-ui/react';

export default function Admin() {
  const [adminDetails, setAdminDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchAdminDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/users'); // Adjust the endpoint for admin details
        setAdminDetails(response.data);
      } catch (err) {
        setError(err.message);
        toast({
          position: 'top',
          description: 'Failed to load admin details',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, [toast]);

  return (
    <Box p={5} bg='white' shadow='lg' borderRadius='lg'>
      {loading ? (
        <HStack my={8} alignItems='center' justifyContent='center'>
          <Spinner size='lg' color='blue.500' />
        </HStack>
      ) : error ? (
        <HStack my={8} alignItems='center' justifyContent='center'>
          <Text color='red.500'>{error}</Text>
        </HStack>
      ) : adminDetails ? (
        <Box>
          <Text fontSize='2xl' fontWeight='bold'>Admin Details</Text>
          <Text mt={2}><strong>Name:</strong> {adminDetails.name}</Text>
          <Text><strong>Email:</strong> {adminDetails.email}</Text>
          <Text><strong>Role:</strong> {adminDetails.role}</Text>
          <Text><strong>Phone:</strong> {adminDetails.phone || 'N/A'}</Text>
          <Text><strong>Address:</strong> {adminDetails.address || 'N/A'}</Text>
          
          <HStack mt={4}>
            <Button colorScheme='teal'>Edit Admin Details</Button>
            <Button colorScheme='red'>Delete Admin</Button>
          </HStack>
        </Box>
      ) : (
        <Text>No admin details available.</Text>
      )}
    </Box>
  );
}
