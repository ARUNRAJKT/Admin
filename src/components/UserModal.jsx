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
    Select,
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
    setUpdatedRole
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{isEditMode ? 'Edit User' : 'Add New User'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input
                        placeholder='Name'
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        mb={3}
                    />
                    <Input
                        placeholder='Email'
                        value={updatedEmail}
                        onChange={(e) => setUpdatedEmail(e.target.value)}
                        mb={3}
                    />
                    <Select
                        placeholder='Select role'
                        value={updatedRole}
                        onChange={(e) => setUpdatedRole(e.target.value)}
                    >
                        <option value='admin'>Admin</option>
                        <option value='user'>User</option>
                        <option value='editor'>Editor</option>
                        {/* Add more roles as needed */}
                    </Select>
                    {user && (
                        <>
                            <Text><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</Text>
                            <Text><strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()}</Text>
                        </>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme={isEditMode ? 'blue' : 'green'} onClick={onSave}>
                        {isEditMode ? 'Save' : 'Add User'}
                    </Button>
                    <Button onClick={onClose} ml={3}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UserModal;
