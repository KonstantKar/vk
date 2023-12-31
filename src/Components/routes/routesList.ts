import Profile from "../pages/Profile/Profile";
import Home from "../pages/Home/Home";
import Messages from "../pages/Messages/Messages";
import Friends from "../pages/Friends/Friends";
import FriendProfile from "../pages/Friends/FriendProfile";
import Auth from "../pages/Auth/Auth";
import Conversation from "../pages/Messages/Conversation";
import HackerNews from "../pages/hackerNews/HackerNews";
import OneNews from "../pages/hackerNews/OneNews/OneNews";
import Shop from "../pages/Shop/Shop";
import Cart from "../pages/Shop/ShopComponents/Cart";

export const routesList = [
  {
    path: "/",
    exact: true,
    component: Home,
    auth: true,
  },
  {
    path: "/profile",
    exact: false,
    component: Profile,
    auth: true,
  },
  {
    path: "/profile/:id",
    exact: false,
    component: Home,
    auth: true,
  },
  {
    path: "/messages",
    exact: true,
    component: Messages,
    auth: true,
  },
  {
    path: "/messages/:id",
    exact: false,
    component: Conversation,
    auth: true,
  },
  {
    path: "/friends",
    exact: false,
    component: Friends,
    auth: true,
  },
  {
    path: "/friends/:id",
    exact: false,
    component: FriendProfile,
    auth: true,
  },
  {
    path: "/friends/messages/:id",
    exact: false,
    component: Conversation,
    auth: true,
  },
  {
    path: "/auth",
    exact: true,
    component: Auth,
    auth: false,
  },
  {
    path: "/hackersNews",
    exact: true,
    component: HackerNews,
    auth: false,
  },
  {
    path: "/hackersNews/:id",
    exact: false,
    component: OneNews,
    auth: false,
  },
  {
    path: "/shop/",
    exact: true,
    component: Shop,
    auth: false,
  },
  {
    path: "/shop/cart",
    exact: true,
    component: Cart,
    auth: false,
  },
];
