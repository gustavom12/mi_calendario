import { createContext, useEffect, useState } from 'react';

const userInitValue = {
  email: "",
  telefono: "",
  nombre: ""
}

interface Value {
  user: {
    email: string,
    telefono?: string,
    nombre: string
  },
  setUser?: any
}

const userContext = createContext<Value>({
  user: userInitValue,
  setUser: ()=>{}
});
const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState(userInitValue);
  useEffect(() => {
    const lcUser = localStorage.getItem("_us")
    if (!lcUser) return;
    try {
      setUser(JSON.parse(lcUser))
    } catch (error) {
      setUser(userInitValue)
    }
  }, [])

  const value:Value = { user, setUser };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export { UserProvider };
export default userContext
