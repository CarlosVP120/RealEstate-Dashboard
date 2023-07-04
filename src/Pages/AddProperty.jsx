import {
  Box,
  Button,
  Input,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Grid,
  Flex,
  keyframes,
  Heading,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useState, useCallback } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase/firebase-config";
import ChakraTagInput from "../Component/ChakraTagInput";
import ResizeTextarea from "react-textarea-autosize";

// * Initial State;
const initialState = {
  nombre: "",
  tipoCompra: "",
  precio: 0,
  tipoPropiedad: "",
  calle: "",
  colonia: "",
  estado: "",
  municipio: "",
  metrosCuadrados: 0,
  metrosConstruccion: 0,
  imagenes: [],
  recamaras: 0,
  baños: 0,
  mediosBaños: 0,
  estacionamiento: 0,
  descripcion: "",
  caracteristicas: [],
  servicios: [],
  exterior: [],
};
import UploadImages from "../Component/UploadImages";
import { useEffect } from "react";

const AddProduct = () => {
  const toast = useToast();
  const [product, setProduct] = useState(initialState);

  const [modalOpen, setModalOpen] = useState(false);

  // * Add new Product into firebase Database;
  const AddProduct = async () => {
    try {
      const productRef = collection(db, "properties");
      await addDoc(productRef, product);

      // * Optional;
      toast({
        title: "Property Added In the database",
        status: "success",
        isClosable: true,
        position: "top-right",
      });
      setProduct(initialState);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // * to update state with product-details
  const handleChange = (e) => {
    if (
      e.target.name == "metrosCuadrados" ||
      e.target.name == "metrosConstruccion" ||
      e.target.name == "estacionamiento" ||
      e.target.name == "recamaras" ||
      e.target.name == "baños" ||
      e.target.name == "mediosBaños"
    ) {
      setProduct((prev) => ({
        ...prev,
        [e.target.name]: Number(e.target.value),
      }));
      return;
    }

    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageDrop = (images) => {
    setProduct((prev) => ({ ...prev, imagenes: images }));
    console.log(images);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(product.imagenes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProduct((prev) => ({ ...prev, imagenes: items }));
  };

  const appear = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
`;

  const appearAnimation = `${appear} 0.5s ease-in-out`;

  const format = (val) => `$` + val;
  const parse = (val) => val.replace(/^\$/, "");

  const formatM2C = (val) => `M^2` + val;
  const parseM2C = (val) => val.replace(/^\$/, "");

  const handleTagsChange = useCallback((event, tags) => {
    setProduct((prev) => ({ ...prev, [event.target.name]: tags }));
  }, []);

  // Get the information of the #imageInput
  // useEffect(() => {
  //   const imageInput = document.querySelector("#imageInput");
  //   const file = imageInput.files[0];
  //   console.log(file);
  // }, []);

  return (
    <Box pb={10} animation={appearAnimation}>
      <Flex alignItems={"center"} p={10}>
        {/* First letter uppercase */}
        <Heading color="teal.400">Agregar Propiedad</Heading>
      </Flex>
      <Box w="80%" m="auto" mt="10" border={"0px"} borderRadius="10px" p="5">
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <Box my="4">
            <label htmlFor="nombre">Nombre de la propiedad:</label>
            <Input
              id="nombre"
              placeholder="Nombre de la propiedad"
              value={product.nombre}
              name="nombre"
              onChange={handleChange}
              mt={1}
            />
          </Box>
          <Box my="4">
            <label htmlFor="tipoCompra">Tipo de compra:</label>
            {/* <Input
              id="tipoCompra"
              placeholder="Tipo de compra"
              value={product.tipoCompra}
              name="tipoCompra"
              onChange={handleChange}
              mt={1}
            /> */}
            <Select
              id="tipoCompra"
              placeholder="Seleccionar"
              value={product.tipoCompra}
              name="tipoCompra"
              onChange={handleChange}
              mt={1}
            >
              <option value="Venta">Venta</option>
              <option value="Renta">Renta</option>
              <option value="Ambas">Ambas</option>
            </Select>
          </Box>
          <Box my="4">
            <label htmlFor="precio">Precio:</label>

            {/* <NumberInput  min={0}>
              <NumberInputField
                id="precio"
                value={product.precio}
                name="precio"
                onChange={handleChange}
                mt={1}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput> */}

            <NumberInput
              id="precio"
              onChange={(precio) => {
                setProduct((prev) => ({ ...prev, precio: parse(precio) }));
              }}
              value={format(product.precio)}
              min={0}
              mt={1}
            >
              <NumberInputField />
            </NumberInput>
          </Box>
          <Box my="4">
            <label htmlFor="tipoPropiedad">Tipo de propiedad:</label>
            {/* <Input
              id="tipoPropiedad"
              placeholder="Tipo de propiedad"
              value={product.tipoPropiedad}
              name="tipoPropiedad"
              onChange={handleChange}
              mt={1}
            /> */}
            <Select
              id="tipoPropiedad"
              placeholder="Seleccionar"
              value={product.tipoPropiedad}
              name="tipoPropiedad"
              onChange={handleChange}
              mt={1}
            >
              <option value="Casa">Casa</option>
              <option value="Casa en condominio">Casa en condominio</option>
              <option value="Departamento">Departamento</option>
              <option value="Terreno o Lote">Terreno / Lote</option>
              <option value="Oficina">Oficina</option>
              <option value="Nave Industrial">Nave Industrial</option>
            </Select>
          </Box>
          <Box my="4">
            <label htmlFor="calle">Calle:</label>
            <Input
              id="calle"
              placeholder="Calle"
              value={product.calle}
              name="calle"
              onChange={handleChange}
              mt={1}
            />
          </Box>
          <Box my="4">
            <label htmlFor="colonia">Colonia:</label>
            <Input
              id="colonia"
              placeholder="Colonia"
              value={product.colonia}
              name="colonia"
              onChange={handleChange}
              mt={1}
            />
          </Box>
          <Box my="4">
            <label htmlFor="estado">Estado:</label>
            <Input
              id="estado"
              placeholder="Estado"
              value={product.estado}
              name="estado"
              onChange={handleChange}
              mt={1}
            />
          </Box>
          <Box my="4">
            <label htmlFor="municipio">Municipio:</label>
            <Input
              id="municipio"
              placeholder="Municipio"
              value={product.municipio}
              name="municipio"
              onChange={handleChange}
              mt={1}
            />
          </Box>
          <Box my="4">
            <label htmlFor="metrosCuadrados">Metros cuadrados:</label>
            <NumberInput min={0} mt={1}>
              <NumberInputField
                id="metrosCuadrados"
                value={product.metrosCuadrados}
                name="metrosCuadrados"
                onChange={handleChange}
              />
              <NumberInputStepper>
                <NumberIncrementStepper
                  onClick={() =>
                    setProduct((prev) => ({
                      ...prev,
                      metrosCuadrados: Number(prev.metrosCuadrados) + 1,
                    }))
                  }
                />
                <NumberDecrementStepper
                  onClick={() =>
                    setProduct((prev) => ({
                      ...prev,
                      metrosCuadrados: Number(prev.metrosCuadrados) - 1,
                    }))
                  }
                />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box my="4">
            <label htmlFor="metrosConstruccion">Metros construcción:</label>
            <NumberInput min={0} mt={1}>
              <NumberInputField
                id="metrosConstruccion"
                value={product.metrosConstruccion}
                name="metrosConstruccion"
                onChange={handleChange}
              />
              <NumberInputStepper>
                <NumberIncrementStepper
                  onClick={() =>
                    setProduct((prev) => ({
                      ...prev,
                      metrosConstruccion: Number(prev.metrosConstruccion) + 1,
                    }))
                  }
                />
                <NumberDecrementStepper
                  onClick={() =>
                    setProduct((prev) => ({
                      ...prev,
                      metrosConstruccion: Number(prev.metrosConstruccion) - 1,
                    }))
                  }
                />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box my="4">
            <label htmlFor="estacionamiento">Estacionamiento:</label>
            <NumberInput min={0} max={10} mt={1}>
              <NumberInputField
                id="estacionamiento"
                value={product.estacionamiento}
                name="estacionamiento"
                onChange={handleChange}
              />
              <NumberInputStepper>
                <NumberIncrementStepper
                  onClick={() =>
                    setProduct((prev) => ({
                      ...prev,
                      estacionamiento: Number(prev.estacionamiento) + 1,
                    }))
                  }
                />
                <NumberDecrementStepper
                  onClick={() =>
                    setProduct((prev) => ({
                      ...prev,
                      estacionamiento: Number(prev.estacionamiento) - 1,
                    }))
                  }
                />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box my="4">
            <label htmlFor="recamaras">Recámaras:</label>
            <NumberInput min={0} max={10} mt={1}>
              <NumberInputField
                id="recamaras"
                value={product.recamaras}
                name="recamaras"
                onChange={handleChange}
              />
              <NumberInputStepper>
                <NumberIncrementStepper
                  onClick={() =>
                    setProduct((prev) => ({
                      ...prev,
                      recamaras: Number(prev.recamaras) + 1,
                    }))
                  }
                />
                <NumberDecrementStepper
                  onClick={() =>
                    setProduct((prev) => ({
                      ...prev,
                      recamaras: Number(prev.recamaras) - 1,
                    }))
                  }
                />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box my="4">
            <label htmlFor="baños">Baños Completos:</label>
            <NumberInput min={0} max={10} mt={1}>
              <NumberInputField
                id="baños"
                value={product.baños}
                name="baños"
                onChange={handleChange}
              />
              <NumberInputStepper>
                <NumberIncrementStepper
                  onClick={() =>
                    setProduct((prev) => ({
                      ...prev,
                      baños: Number(prev.baños) + 1,
                    }))
                  }
                />
                <NumberDecrementStepper
                  onClick={() =>
                    setProduct((prev) => ({
                      ...prev,
                      baños: Number(prev.baños) - 1,
                    }))
                  }
                />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box my="4">
            <label htmlFor="mediosBaños">Medios Baños:</label>
            <NumberInput min={0} max={10} mt={1}>
              <NumberInputField
                id="mediosBaños"
                value={product.mediosBaños}
                name="mediosBaños"
                onChange={handleChange}
              />
              <NumberInputStepper>
                <NumberIncrementStepper
                  onClick={() =>
                    setProduct((prev) => ({
                      ...prev,
                      mediosBaños: Number(prev.mediosBaños) + 1,
                    }))
                  }
                />
                <NumberDecrementStepper
                  onClick={() =>
                    setProduct((prev) => ({
                      ...prev,
                      mediosBaños: Number(prev.mediosBaños) - 1,
                    }))
                  }
                />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box my="4">
            <Flex direction="column">
              <label htmlFor="imagenes">Imágenes:</label>
              {/* Button to open Modal */}
              <Button
                onClick={() => {
                  setModalOpen(true);
                }}
                mt={1}
              >
                {product.imagenes.length > 0
                  ? "Cambiar imágenes"
                  : "Agregar imágenes"}
              </Button>
              {/* Modal */}
              {modalOpen && (
                <UploadImages
                  handleImageDrop={handleImageDrop}
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  product={product}
                  setProduct={setProduct}
                />
              )}
            </Flex>
          </Box>

          <Box my="4">
            <Flex gap={1} alignItems="center">
              <label htmlFor="caracteristicas">Características: </label>
              <Text color="teal.400">(Presione "enter" para crear)</Text>
            </Flex>
            {/* <Textarea
              id="caracteristicas"
              placeholder="Características"
              value={product.caracteristicas}
              name="caracteristicas"
              onChange={handleChange}
              mt={1}
            /> */}

            {/* List of inputs, where the user will enter the characteristics one by one */}
            <ChakraTagInput
              name="caracteristicas"
              mt={1}
              tags={product.caracteristicas}
              onTagsChange={handleTagsChange}
              // wrapProps={{
              //   direction: "column",
              //   align: "start",
              // }}
              // wrapItemProps={(isInput) =>
              //   isInput
              //     ? {
              //         alignSelf: "stretch",
              //       }
              //     : null
              // }
            />
          </Box>

          <Box my="4">
            <Flex gap={1} alignItems="center">
              <label htmlFor="caracteristicas">Servicios: </label>
              <Text color="teal.400">(Presione "enter" para crear)</Text>
            </Flex>
            {/* <Textarea
              id="servicios"
              placeholder="Servicios"
              value={product.servicios}
              name="servicios"
              onChange={handleChange}
              mt={1}
            /> */}
            <ChakraTagInput
              name="servicios"
              mt={1}
              tags={product.servicios}
              onTagsChange={handleTagsChange}
            />
          </Box>
          <Box my="4">
            <Flex gap={1} alignItems="center">
              <label htmlFor="caracteristicas">Exterior: </label>
              <Text color="teal.400">(Presione "enter" para crear)</Text>
            </Flex>
            {/* <Textarea
              id="exterior"
              placeholder="Exterior"
              value={product.exterior}
              name="exterior"
              onChange={handleChange}
              mt={1}
            /> */}

            <ChakraTagInput
              name="exterior"
              mt={1}
              tags={product.exterior}
              onTagsChange={handleTagsChange}
            />
          </Box>
        </Grid>
        <Box my="4">
          <label htmlFor="descripcion">Descripción:</label>
          <Textarea
            id="descripcion"
            placeholder="Descripción"
            value={product.descripcion}
            name="descripcion"
            onChange={handleChange}
            mt={1}
            mb={3}
            as={ResizeTextarea}
          />
        </Box>

        <Button onClick={AddProduct} colorScheme="teal">
          Agregar Propiedad
        </Button>

        {/* For that shows the images */}
        {/* {product.imagenes.length > 0 && (
          <Box mt={5}>
            <Heading size="md" mb={2}>
              Imágenes:
            </Heading>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              {product.imagenes.map((image, index) => (
                <Box key={index}>
                  <img
                    src={image}
                    alt="preview"
                    style={{ width: "100%", height: "100%" }}
                  />

                  <Text>{image}</Text>
                </Box>
              ))}
            </Grid>
          </Box>
        )} */}

        {/* TEMP
        <input
          type="file"
          name="file"
          accept="image/*"
          multiple
          id="imageInput"
        /> */}
      </Box>
    </Box>
  );
};

export default AddProduct;
