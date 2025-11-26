import { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import AuthServices from "../services/AuthServices";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [error, setError] = useState(null);

  useEffect(() => {
    setUser({
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
    });
  }, []);

  const loginAction = async (data) => {
    try {
      setError(null);

      const res = await AuthServices.login(data);
      if (res && res?.status == 1) {
        setUser({ name: res?.data?.username, email: res?.data?.email });
        setToken(res?.data?.access_token);
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("role", res.data.role_id);
        toast.success("You are Successfully Logged-In");
        navigate("/");

        window.location.reload();
        return;
      } else {
        toast.error(res?.message)
        setError(t("Invalid Credentials"));
        return;
      }
    } catch (err) {
      console.log("ERROR", err);
      setError(t("Invalid Credentials"));
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    // localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    toast.success("You are Successfully Logged-Out");
    navigate("/signin");
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ token, user, error, loginAction, logOut, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
