import Profile from "../pages/Profile/Profile";
import Home from "../pages/Home/Home";
import Messages from "../pages/Messages/Messages";
import Friends from "../pages/Friends/Friends";
import Auth from "../pages/Auth/Auth";
import Conversation from "../pages/Messages/Conversation";
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
    path: "message/:id",
    exact: false,
    component: Home,
    auth: true,
  },
  {
    path: "conversation",
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
    path: "friends/:id",
    exact: false,
    component: Home,
    auth: true,
  },
  {
    path: "/auth",
    exact: true,
    component: Auth,
    auth: false,
  },
];
