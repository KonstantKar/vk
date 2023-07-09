import { Padding, Password, Send } from "@mui/icons-material";
import { Alert, Button, TextField } from "@mui/material";
import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import useAuth from "../../providers/useAuth";
import { useNavigate } from "react-router-dom";
interface userData {
  email: string;
  password: string;
}

const Auth: FC = () => {
  const navigate = useNavigate();
  const { auth, user } = useAuth();
  const [isRegForm, setIsRegForm] = useState(false);
  const [userData, setUserData] = useState<userData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Регистрация или вход
    if (isRegForm) {
      try {
        await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
      } catch (error: any) {
        error.message && setError(error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
      } catch (error: any) {
        error.message && setError(error.message);
      }
    }

    //Зануление
    setUserData({
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <>
      {error && (
        <Alert style={{ marginBottom: 10 }} severity="error">
          {error},
        </Alert>
      )}
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
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          sx={{ marginBottom: 2 }}
          required
        />

        <Button
          type="submit"
          onClick={() => setIsRegForm(false)}
          variant="contained"
          endIcon={<Send />}
          sx={{ marginBottom: 2 }}
        >
          Войти
        </Button>
        <Button
          type="submit"
          onClick={() => setIsRegForm(true)}
          variant="contained"
        >
          Зарегистрироваться
        </Button>
      </form>
    </>
  );
};

export default Auth;
