import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Stack,
  Divider,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Flex,
  keyframes,
} from "@chakra-ui/react";
import { Box, Button, useToast } from "@chakra-ui/react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase/firebase-config";
import PropertyCard from "../Component/PropertyCard";
import UseAuth from "../custom-hooks/UseAuth";

const Home = () => {
  const currentUser = UseAuth();
  const [products, setProducts] = useState([]);
  const toast = useToast();

  // todo: update the product
  const UpdateProduct = async (id) => {
    try {
      const productRef = doc(db, "properties", id);
      const temp = window.prompt("Please Re-enter the Property_name");
      await updateDoc(productRef, { productName: temp });
      getData();

      // * optional
      toast({
        title: "Product Updated",
        status: "success",
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };
  // todo: Delete the Product
  const DeleteProduct = async (id) => {
    try {
      const productRef = doc(db, "properties", id);
      await deleteDoc(productRef);
      getData();
      // * optional
      toast({
        title: "Product Deleted",
        status: "success",
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // * TO get the data from database
  const getData = async () => {
    try {
      const productsRef = collection(db, "properties");
      const res = await getDocs(productsRef);

      // * making an readable array for the data
      const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      setProducts(data); //* storing the data into state
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
    // <Box px={10}>
    //   <TableContainer>
    //     <Table variant="simple">
    //       <TableCaption>Lista de Propiedades</TableCaption>
    //       <Thead>
    //         <Tr>
    //           <Th>ID</Th>
    //           <Th>Nombre de la propiedad</Th>
    //           <Th>Tipo de compra</Th>
    //           <Th>Precio</Th>
    //           <Th>Tipo de propiedad</Th>
    //           <Th>Ubicación</Th>
    //           <Th>Colonia</Th>
    //           <Th>Estado</Th>
    //           <Th>Municipio</Th>
    //           <Th>Metros Totales</Th>
    //           <Th>Metros de Construcción</Th>
    //           <Th>Imágenes</Th>
    //           <Th>Recámaras</Th>
    //           <Th>Baños</Th>
    //           <Th>Estacionamientos</Th>
    //           <Th>Descripción</Th>
    //           <Th>Características</Th>
    //           <Th>Servicios</Th>
    //           <Th>Exteriores</Th>
    //           <Th>Actualizar</Th>
    //           <Th>Borrar</Th>
    //         </Tr>
    //       </Thead>
    //       <Tbody>
    //         {products.map((product) => (
    //           <Tr key={product.id}>
    //             <Td>{product.id}</Td>
    //             <Td>{product.nombre}</Td>
    //             <Td>{product.tipoCompra}</Td>
    //             <Td>{product.precio}</Td>
    //             <Td>{product.tipoPropiedad}</Td>
    //             <Td>{product.ubicacion}</Td>
    //             <Td>{product.colonia}</Td>
    //             <Td>{product.estado}</Td>
    //             <Td>{product.municipio}</Td>
    //             <Td>{product.metrosCuadrados}</Td>
    //             <Td>{product.metrosConstruccion}</Td>
    //             <Td>Imagenes</Td>
    //             <Td>{product.recamaras}</Td>
    //             <Td>{product.baños}</Td>
    //             <Td>{product.estacionamiento}</Td>
    //             <Td>{product.descripcion}</Td>
    //             <Td>{product.caracteristicas}</Td>
    //             <Td>{product.servicios}</Td>
    //             <Td>{product.exterior}</Td>
    //             {/* <Td>
    //               <Image src={product.productImg} alt="" boxSize={100} />
    //             </Td> */}
    //             <Td>
    //               <Button onClick={() => UpdateProduct(product.id)}>
    //                 Update
    //               </Button>
    //             </Td>
    //             <Td>
    //               <Button onClick={() => DeleteProduct(product.id)}>
    //                 Delete
    //               </Button>
    //             </Td>
    //           </Tr>
    //         ))}
    //       </Tbody>
    //     </Table>
    //   </TableContainer>
    // </Box>
    <>
      {currentUser && (
        <Flex alignItems={"center"} p={10} animation={appearAnimation}>
          {/* First letter uppercase */}

          <Heading color="teal.400">
            Bienvenido,{" "}
            {currentUser?.email.split("@")[0][0].toUpperCase() +
              currentUser?.email.split("@")[0].slice(1)}
          </Heading>
        </Flex>
      )}
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill)"
        // templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        px={10}
      >
        {/* CARDS */}
        {products.length > 0 ? (
          products.map((property, index) => (
            <PropertyCard property={property} key={index} />
          ))
        ) : (
          // Center the text
          <Text
            fontSize="xl"
            fontWeight="bold"
            textAlign="center"
            color="gray.500"
            animation={appearAnimation}
          >
            No hay propiedades registradas
          </Text>
        )}
      </SimpleGrid>
    </>
  );
};

export default Home;
