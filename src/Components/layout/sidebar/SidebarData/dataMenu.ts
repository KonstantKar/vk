//Берём все экспорты и обьединяем в Icons
import * as Icons from "@mui/icons-material";
import { MenuItem } from "../../../../types";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
export const dataMenu: MenuItem[] = [
  {
    title: "Моя страница",
    link: "/profile",
    icon: Icons.Home,
  },
  {
    title: "Новости",
    link: "/",
    icon: Icons.Newspaper,
  },
  {
    title: "Друзья",
    link: "/friends",
    icon: Icons.Group,
  },
  {
    title: "Хакерские новости",
    link: "/hackersNews",
    icon: Icons.Announcement,
  },
  {
    title: "Магазин",
    link: "/Shop",
    icon: AddShoppingCartIcon,
  },
];
