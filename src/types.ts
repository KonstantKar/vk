import { Dispatch, SetStateAction } from "react";

export type TypeSetState<T> = Dispatch<SetStateAction<T>>;

export interface Post {
  author: User;
  createdData: string;
  content: string;
  images?: { image: string }[]; // Обновите эту строку
}

export interface User {
  id: number;
  avatar: string;
  name: string;
  online?: boolean;
}

export interface MenuItem {
  title: string;
  link: string;
  icon: any;
}
