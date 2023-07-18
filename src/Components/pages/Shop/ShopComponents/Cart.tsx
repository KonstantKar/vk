import React, { FC, useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { ShopItem } from "../../../../types";
import useAuth from "../../../providers/useAuth";

const Cart: FC = () => {
  const { db } = useAuth();
  const [cartItems, setCartItems] = useState<ShopItem[]>([]);

  useEffect(() => {
    const cartItemsRef = collection(db, "CartItems");
    const unsubscribe = onSnapshot(cartItemsRef, (snapshot) => {
      const newItems = snapshot.docs.map((doc) => doc.data() as ShopItem);
      setCartItems(newItems);
    });

    return () => unsubscribe();
  }, [db]);

  const totalPrice = cartItems.reduce(
    (total: number, item: ShopItem) => total + item.shopItemCash,
    0
  );

  const removeFromCart = async (itemId: string) => {
    try {
      const cartItemRef = doc(db, "CartItems", itemId);
      await deleteDoc(cartItemRef);
      console.log("Товар успешно удален из корзины!");

      // Обновляем состояние cartItems после успешного удаления элемента из базы данных
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } catch (error) {
      console.error("Ошибка при удалении товара из корзины:", error);
    }
  };

  return (
    <div>
      <Typography variant="h5">Корзина покупок</Typography>
      <List>
        {cartItems.map((item: ShopItem) => (
          <div key={item.id}>
            <ListItem>
              <ListItemText secondary={`Цена: ${item.shopItemCash} рублей`} />
              <Button color="secondary" onClick={() => removeFromCart(item.id)}>
                Удалить
              </Button>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      <Typography>Итого: {totalPrice} рублей</Typography>
    </div>
  );
};

export default Cart;
