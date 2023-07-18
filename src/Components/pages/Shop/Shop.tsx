import React, { FC, useState, useEffect } from "react";
import Div from "../../UI/Div";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import useAuth from "../../providers/useAuth";
import AddShopItem from "./AddShopItem";
import { ShopItem } from "../../../types";

const Shop: FC = () => {
  const { db } = useAuth();
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "ShopItems"), (snapshot) => {
      const newItems = snapshot.docs.map((doc) => doc.data() as ShopItem);
      setShopItems(newItems);
    });
    return () => {
      unsub();
    };
  }, []);
  return (
    <Div>
      <AddShopItem />
      <Box sx={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        {shopItems.map((shopItem) => (
          <Card sx={{ minWidth: 350 }}>
            <CardActionArea>
              <Box sx={{ height: 350 }}>
                <CardMedia
                  component="img"
                  image={shopItem.shopItemPhoto}
                  alt=""
                  sx={{ height: "100%", width: "100%", objectFit: "cover" }}
                />
              </Box>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {shopItem.shopItemName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {shopItem.shopItemDescription}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "10px  ",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Цена:{shopItem.shopItemCash} рублей
                </Typography>
                <Button size="small" color="primary">
                  Добавить в корзину
                </Button>
              </Box>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Div>
  );
};

export default Shop;
