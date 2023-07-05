import React from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  keyframes,
} from "@chakra-ui/react";
import { useState, useRef } from "react";

const PropertyCard = ({ property }) => {
  const [access, setAccess] = useState("");

  const appear = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
`;

  const appearAnimation = `${appear} 0.3s ease-in-out`;

  return (
    <>
      {/* CARD */}
      <Card maxW="sm" animation={appearAnimation} boxShadow="2xl">
        <CardBody>
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">Living room Sofa</Heading>
            <Text>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces, earthy toned spaces and for people who love a chic design
              with a sprinkle of vintage design.
            </Text>
            <Text color="blue.600" fontSize="2xl">
              $450
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            {/* When user clicks on Edit button, set the access state to "editar" */}
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => {
                setAccess("editar");
              }}
            >
              Editar
            </Button>
            {/* When user clicks on View button, set the access state to "ver" */}
            <Button
              variant="ghost"
              colorScheme="blue"
              onClick={() => {
                setAccess("ver");
              }}
            >
              Ver
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      {/* MODAL */}
      {/* When access state is "editar", show the ModalEdit component, when access state is "ver", show the ModalView component */}
      {access === "editar" ? (
        <ModalEdit property={property} setAccess={setAccess} />
      ) : access === "ver" ? (
        <ModalView property={property} setAccess={setAccess} />
      ) : null}
    </>
  );
};

const ModalView = ({ property, setAccess }) => {
  return (
    <Modal isCentered isOpen={true} onClose={() => setAccess("")}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ver Propiedad</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Modal body text goes here.</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setAccess("")}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ModalEdit = ({ property, setAccess }) => {
  return (
    <Modal isCentered isOpen={true} onClose={() => setAccess("")}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Propiedad</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Modal body text goes here.</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setAccess("")}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PropertyCard;
