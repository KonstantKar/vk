import React, { FC, useState, useEffect } from "react";
import Div from "../../UI/Div";
import { Badge, Box, IconButton } from "@mui/material";
import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import useAuth from "../../providers/useAuth";
import AddShopItem from "./ShopComponents/AddShopItem";
import { ShopItem } from "../../../types";
import Cart from "./ShopComponents/Cart"; // Импортируем компонент корзины
import { ShoppingBag } from "@mui/icons-material";
import OneShopItem from "./ShopComponents/OneShopItem";
import { useNavigate } from "react-router-dom";

const Shop: FC = () => {
  const { db } = useAuth();
  const navigate = useNavigate();
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [cartItems, setCartItems] = useState<ShopItem[]>([]); // Состояние для хранения выбранных товаров в корзине

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "ShopItems"), (snapshot) => {
      const newItems = snapshot.docs.map((doc) => doc.data() as ShopItem);
      setShopItems(newItems);
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const cartItemsRef = collection(db, "CartItems");
    const unsubscribe = onSnapshot(cartItemsRef, (snapshot) => {
      const newItems = snapshot.docs.map((doc) => doc.data() as ShopItem);
      setCartItems(newItems);
    });

    return () => unsubscribe();
  }, [db]);

  // Функция для добавления товара в корзину
  const addToCart = async (shopItem: ShopItem) => {
    try {
      // Добавляем shopItem в коллекцию "CartItems" в Firebase
      const cartItemRef = doc(collection(db, "CartItems"));
      await setDoc(cartItemRef, {
        ...shopItem,
        timestamp: serverTimestamp(),
      });
      console.log("Товар успешно добавлен в корзину!");
    } catch (error) {
      console.error("Ошибка при добавлении товара в корзину:", error);
    }
  };

  return (
    <Div>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Badge badgeContent={cartItems.length} color="primary">
          <IconButton onClick={() => navigate("/Shop/Cart")}>
            <ShoppingBag />
          </IconButton>
        </Badge>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {shopItems.map((shopItem) => (
          <OneShopItem shopItem={shopItem} addToCart={addToCart} />
        ))}
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <AddShopItem />
      </Box>
    </Div>
  );
};

export default Shop;
