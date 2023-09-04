import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import localStorageService, {
  setTokens
} from "../services/localSorage.service";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
});

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState();
  const [error, setError] = useState(null);
  const history = useHistory();

  async function signIn({ email, password }) {
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      getUserData();
    } catch (error) {
      const { code, message } = error.response.data.error;

      if (code === 400) {
        errorCatcher(error);
        if (message === "INVALID_PASSWORD") {
          throw new Error("Неверный логин или пароль");
        }
        if (
          message ===
          "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
        ) {
          throw new Error("Слишком много попыток входа, попробуйте позже");
        }
      }
    }
  }

  function logOut() {
    localStorageService.removeAuthData();
    setUser(null);
    history.push("/");
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async function signUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post(`accounts:signUp`, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);

      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        ...rest
      });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      // console.log("code", code, message);
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "Пользователь с таким Email уже существует"
          };
          throw errorObject;
        }
      }
    }
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      console.log(content);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }
  useEffect(() => {
    if (localStorageService.getAccesToken()) {
      getUserData();
    }
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return (
    <AuthContext.Provider value={{ signUp, signIn, currentUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AuthProvider;
