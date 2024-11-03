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
  FormLabel,
  FormControl,
  Select,
  Box,
} from '@chakra-ui/react';

const AddModal = ({ isOpen, onClose, onSave, updatedName, setUpdatedName, updatedEmail, setUpdatedEmail, updatedRole, setUpdatedRole }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Box 
          bgGradient="linear(to-r, green.400, green.600)"
          px={4}
          py={3}
          borderTopRadius="lg"
        >
          <ModalHeader color="white">Add New User</ModalHeader>
          <ModalCloseButton />
        </Box>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='green' onClick={onSave}>
            Add User
          </Button>
          <Button colorScheme='red' onClick={onClose} ml={3}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddModal;
