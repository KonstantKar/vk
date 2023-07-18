import { Box, Button, TextField } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { FC, useState } from "react";
import useAuth from "../../providers/useAuth";

const AddShopItem: FC = () => {
  const [error, setError] = useState("");
  const [shopItemName, setShopItemName] = useState("");
  const [shopItemDescription, setShopItemDescription] = useState("");
  const [shopItemCash, setshopItemCash] = useState("");
  const [shopItemPhoto, setShopItemPhoto] = useState("");
  const { db } = useAuth();
  const addShopItemFunction = async (e: any) => {
    try {
      await addDoc(collection(db, "ShopItems"), {
        shopItemName: shopItemName,
        shopItemCash: shopItemCash,
        shopItemPhoto: shopItemPhoto,
        shopItemDescription: shopItemDescription,
        timestamp: serverTimestamp(),
      });
    } catch (e: any) {
      setError(e);
    }
    setShopItemName("");
    setShopItemDescription("");
    setshopItemCash("");
    setShopItemPhoto("");
  };
  return (
    <Box sx={{ display: "flex", marginBottom: 2 }}>
      <TextField
        type="name"
        label="Название"
        variant="outlined"
        value={shopItemName}
        onChange={(e) => setShopItemName(e.target.value)}
        required
        sx={{ marginRight: 3 }}
      />
      <TextField
        type="description"
        label="Описание"
        variant="outlined"
        value={shopItemDescription}
        onChange={(e) => setShopItemDescription(e.target.value)}
        required
        sx={{ marginRight: 3 }}
      />
      <TextField
        type="cash"
        label="Ценник"
        variant="outlined"
        value={shopItemCash}
        onChange={(e) => setshopItemCash(e.target.value)}
        required
        sx={{ marginRight: 3 }}
      />
      <TextField
        type="photo"
        label="Изображение"
        variant="outlined"
        value={shopItemPhoto}
        onChange={(e) => setShopItemPhoto(e.target.value)}
        required
        sx={{ marginRight: 3 }}
      />
      <Button variant="contained" color="success" onClick={addShopItemFunction}>
        Добавить товар!
      </Button>
    </Box>
  );
};

export default AddShopItem;
