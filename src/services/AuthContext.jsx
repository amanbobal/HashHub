import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check session on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost/hashhub/checkSession.php", {
          method: "GET",
          credentials: "include"
        });
        const data = await res.json();
        if (data.status === "success") {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Session check failed:", err);
        setUser(null);
      }
    };
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
