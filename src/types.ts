import { Dispatch, SetStateAction } from "react";

export type TypeSetState<T> = Dispatch<SetStateAction<T>>;

export interface Post {
  author: User;
  createdData: string;
  content: string;
  images?: { image: string }[]; // Обновите эту строку
}

export interface User {
  id: string;
  avatar: string;
  name: string;
  online?: boolean;
  status?: string;
  background?: string;
}

export interface MenuItem {
  title: string;
  link: string;
  icon: any;
}

export interface Message {
  userId: string;
  message: string;
  user: User;
}
