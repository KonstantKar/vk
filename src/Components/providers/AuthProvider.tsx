import { createContext, useEffect } from "react";
import React, {
  FC,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { User } from "../../types";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { dataUsers } from "../layout/sidebar/SidebarData/dataUsers";
import { useNavigate } from "react-router-dom";

interface AuthContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>> | null;
  auth: Auth;
  db: Firestore;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null as User | null);

  const auth = getAuth();
  //получение экземпляра Firestore
  const db = getFirestore();

  useEffect(() => {
    const unListen = onAuthStateChanged(auth, (authUser) => {
      if (authUser)
        setUser({
          id: authUser.uid,
          avatar: dataUsers[0].avatar,
          name: authUser.displayName || "",
        });
      else {
        setUser(null);
        navigate("/auth");
      }
    });
    return () => {
      unListen();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ auth, user, setUser, db }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
