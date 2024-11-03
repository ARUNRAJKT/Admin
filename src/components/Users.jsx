import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  SimpleGrid,
  Spinner,
  Input,
  HStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import UserModal from './UserModal';
import './Users.css';

export default function Users() {
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedRole, setUpdatedRole] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data || []);
        setFilteredUsers(response.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredUsers(
      users.filter(user =>
        (user.firstName && user.firstName.toLowerCase().includes(query)) ||
        (user.lastName && user.lastName.toLowerCase().includes(query)) ||
        (user.email && user.email.toLowerCase().includes(query))
      )
    );
  };

  const handleDelete = async (userId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      setFilteredUsers(filteredUsers.filter(user => user._id !== userId));
      toast({
        position: 'top',
        description: 'User deleted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        position: 'top',
        description: 'Failed to delete user',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    setUpdatedName(user.name);
    setUpdatedEmail(user.email);
    setUpdatedRole(user.role);
    setEditModalOpen(true);
    setAddModalOpen(false); // Ensure add modal is closed
  };

  const handleUpdateUser = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/users/${currentUser._id}`, {
        name: updatedName,
        email: updatedEmail,
        role: updatedRole,
      });
      setUsers(users.map(user => (user._id === currentUser._id ? { ...user, name: updatedName, email: updatedEmail, role: updatedRole } : user)));
      setFilteredUsers(filteredUsers.map(user => (user._id === currentUser._id ? { ...user, name: updatedName, email: updatedEmail, role: updatedRole } : user)));
      toast({
        position: 'top',
        description: 'User updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setEditModalOpen(false);
    } catch (error) {
      toast({
        position: 'top',
        description: 'Failed to update user',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const openDetailsModal = (user) => {
    setCurrentUser(user);
    setDetailsModalOpen(true);
    setAddModalOpen(false);
  };

  const handleAddUser = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/users', {
        name: updatedName,
        email: updatedEmail,
        role: updatedRole,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      setUsers([...users, response.data]);
      setFilteredUsers([...filteredUsers, response.data]);
      toast({
        position: 'top',
        description: 'User added successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setAddModalOpen(false);
      setUpdatedName('');
      setUpdatedEmail('');
      setUpdatedRole('');
    } catch (error) {
      toast({
        position: 'top',
        description: 'Failed to add user',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
      <HStack mb={5} justifyContent='space-between'>
        <Input
          placeholder='Search by name or email...'
          value={searchQuery}
          onChange={handleSearchChange}
          maxW='300px'
        />
        <Button colorScheme='teal' onClick={() => {
          setUpdatedName('');
          setUpdatedEmail('');
          setUpdatedRole('');
          setAddModalOpen(true);
          setEditModalOpen(false); // Ensure edit modal is closed
        }}>
          Add New User
        </Button>
      </HStack>

      {loading ? (
        <HStack my={8} alignItems='center' justifyContent='center'>
          <Spinner size='lg' color='brown.500' />
        </HStack>
      ) : error ? (
        <HStack my={8} alignItems='center' justifyContent='center'>
          <Text color='red.500'>{error}</Text>
        </HStack>
      ) : (
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Role</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredUsers.map(user => {
              const { _id, name, role } = user;
              return (
                <Tr key={_id} className="glass">
                  <Td onClick={() => openDetailsModal(user)} style={{ cursor: 'pointer' }}>{name}</Td>
                  <Td onClick={() => openDetailsModal(user)} style={{ cursor: 'pointer' }}>
                    <Badge>{role}</Badge>
                  </Td>
                  <Td>
                    <HStack spacing='5'>
                      <Button
                        variant='outline'
                        colorScheme='blue'
                        onClick={() => openEditModal(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant='outline'
                        colorScheme='red'
                        onClick={() => handleDelete(_id)}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}

      {/* Edit Modal */}
      <UserModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        user={currentUser}
        onSave={handleUpdateUser}
        isEditMode={true}
        updatedName={updatedName}
        setUpdatedName={setUpdatedName}
        updatedEmail={updatedEmail}
        setUpdatedEmail={setUpdatedEmail}
        updatedRole={updatedRole}
        setUpdatedRole={setUpdatedRole}
      />

      {/* User Details Modal */}
      <UserModal
        isOpen={isDetailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        user={currentUser}
        isEditMode={false}
      />

      {/* Add User Modal */}
      <UserModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        user={null}
        isEditMode={true}
        onSave={handleAddUser}
        updatedName={updatedName}
        setUpdatedName={setUpdatedName}
        updatedEmail={updatedEmail}
        setUpdatedEmail={setUpdatedEmail}
        updatedRole={updatedRole}
        setUpdatedRole={setUpdatedRole}
      />
    </SimpleGrid>
  );
}
