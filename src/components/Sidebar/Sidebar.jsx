import React from 'react';
import {
    Box,
    Button,
    useColorModeValue,
    Drawer,
    DrawerContent,
    useDisclosure,
} from '@chakra-ui/react';
import SidebarContent from './SidebarContent';
import { FaBars } from 'react-icons/fa';
export default function Sidebar() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const bgColor = useColorModeValue('gray.50', 'gray.800');

    return (
        <Box minH="100vh" bg={bgColor}>
            <SidebarContent
                onClose={onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            <Box
                display={{ base: 'block', md: 'none' }}
                onClick={onOpen}
                position="fixed"
                top="20px"
                left="20px"
                bg="teal.500"
                p="10px"
                borderRadius="md"
                color="white"
                cursor="pointer"
            >
                <Button
                    colorScheme="teal"
                    variant="outline"
                    size="sm"
                    leftIcon={<FaBars />} 
                    borderRadius="md" 
                    _hover={{ bg: 'teal.50', borderColor: 'teal.500' }} 
                    _active={{ bg: 'teal.100', borderColor: 'teal.600' }} 
                    _focus={{ boxShadow: 'outline' }} 
                    onClick={onOpen}
                >
                </Button>
            </Box>
        </Box>
    );
}
