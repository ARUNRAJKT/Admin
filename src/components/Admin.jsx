import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Text,
  Spinner,
  HStack,
  useToast,
  VStack,
  Divider,
  useBreakpointValue,
} from '@chakra-ui/react';
import './Admin.css';

export default function Admin() {
  const [adminDetails, setAdminDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchAdminDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/users');
        const adminUser = response.data.find(user => user.role === 'admin');
        setAdminDetails(adminUser || null);
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
    <Box 
      className="glass-effect" 
      p={5} 
      bg='rgba(255, 255, 255, 0.3)' 
      shadow='lg' 
      borderRadius='lg' 
      maxW='600px' 
      mx='auto' 
      mt={10}
    >
      {loading ? (
        <HStack my={8} alignItems='center' justifyContent='center'>
          <Spinner size='lg' color='blue.500' />
        </HStack>
      ) : error ? (
        <HStack my={8} alignItems='center' justifyContent='center'>
          <Text color='red.500'>{error}</Text>
        </HStack>
      ) : adminDetails ? (
        <VStack spacing={4} align='start'>
          <Text fontSize='2xl' fontWeight='bold'>Admin Details</Text>
          <Divider />
          <Text><strong>Name:</strong> {adminDetails.name}</Text>
          <Text><strong>Email:</strong> {adminDetails.email}</Text>
          <Text><strong>Role:</strong> {adminDetails.role}</Text>
          <Text>
            <strong>Created At:</strong> {adminDetails.createdAt ? new Date(adminDetails.createdAt).toLocaleString() : 'N/A'}
          </Text>
          <Text>
            <strong>Updated At:</strong> {adminDetails.updatedAt ? new Date(adminDetails.updatedAt).toLocaleString() : 'N/A'}
          </Text>
          <Divider />
        </VStack>
      ) : (
        <Text>No admin details available.</Text>
      )}
    </Box>
  );
}
