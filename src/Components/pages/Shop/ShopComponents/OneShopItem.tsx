import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { ShopItem } from "../../../../types";

interface OneShopItemProps {
  shopItem: ShopItem;
  addToCart: (shopItem: ShopItem) => void;
}

const OneShopItem: FC<OneShopItemProps> = ({ shopItem, addToCart }) => {
  return (
    <Card key={shopItem.timestamp} sx={{ minWidth: 350, maxWidth: 350 }}>
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
            marginLeft: "10px",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Цена: {shopItem.shopItemCash} рублей
          </Typography>
          <Button
            size="small"
            color="primary"
            onClick={() => addToCart(shopItem)} // Функция для добавления товара в корзину
          >
            Добавить в корзину
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default OneShopItem;
