import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Text,
  FormControl,
  FormLabel,
  Select,
  Box,
} from '@chakra-ui/react';

const UserModal = ({
  isOpen,
  onClose,
  user,
  onSave,
  isEditMode,
  updatedName,
  setUpdatedName,
  updatedEmail,
  setUpdatedEmail,
  updatedRole,
  setUpdatedRole,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bgGradient="linear(to-r, teal.400, teal.600)" color="white">
          {isEditMode ? 'Edit User' : 'User Details'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box bg="gray.50" p={4} borderRadius="md" boxShadow="md">
            {isEditMode ? (
              <>
                <FormControl mb={4}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder='Name'
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder='Email'
                    value={updatedEmail}
                    onChange={(e) => setUpdatedEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Role</FormLabel>
                  <Select
                    placeholder='Select role'
                    value={updatedRole}
                    onChange={(e) => setUpdatedRole(e.target.value)}
                  >
                    <option value='admin'>Admin</option>
                    <option value='user'>User</option>
                  </Select>
                </FormControl>
              </>
            ) : (
              <>
                <Text><strong>Name:</strong> {user?.name}</Text>
                <Text><strong>Email:</strong> {user?.email}</Text>
                <Text><strong>Role:</strong> {user?.role}</Text>
                <Text><strong>Created At:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}</Text>
                <Text><strong>Updated At:</strong> {user?.updatedAt ? new Date(user.updatedAt).toLocaleString() : 'N/A'}</Text>
              </>
            )}
          </Box>
        </ModalBody>
        <ModalFooter>
          {isEditMode ? (
            <Button colorScheme='blue' onClick={() => {
              onSave();
              user.updatedAt = new Date().toISOString();
            }}>
              Save
            </Button>
          ) : null}
          <Button colorScheme='red' onClick={onClose} ml={3}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
