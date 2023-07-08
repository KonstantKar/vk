import { Padding, Password, Send } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React, { FC, SyntheticEvent, useState } from "react";

interface userData {
  email: string;
  password: string;
}

const Auth: FC = () => {
  const [isRegForm, setIsRegForm] = useState(false);
  const [userData, setUserData] = useState<userData>({
    email: "",
    password: "",
  });

  const handleLogin = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData.email, userData.password);

    if (isRegForm) {
      console.log("register");
    } else {
      console.log("auth");
    }

    console.log(userData.email, userData.password);

    setUserData({
      email: "",
      password: "",
    });
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TextField
        type="email"
        label="Почта"
        variant="outlined"
        value={userData.email}
        //Благодаря спред оператору копируем изначальную email а потом её перезаписываем
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        sx={{ marginBottom: 2 }}
        required
      />
      <TextField
        type="password"
        label="Пароль"
        variant="outlined"
        value={userData.password}
        //Благодаря спред оператору копируем изначальный пароль а потом её перезаписываем
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        sx={{ marginBottom: 2 }}
        required
      />

      <Button
        type="submit"
        onClick={() => setIsRegForm(true)}
        variant="contained"
        endIcon={<Send />}
        sx={{ marginBottom: 2 }}
      >
        Войти
      </Button>
      <Button
        type="submit"
        onClick={() => setIsRegForm(false)}
        variant="contained"
      >
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default Auth;
