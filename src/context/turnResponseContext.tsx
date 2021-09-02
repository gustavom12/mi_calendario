import { createContext } from 'react';
import { useFetchPost } from '../helpers&hooks/useFetch';

const TurnResponseContext = createContext({});
const TurnResponseProvider = ({ children }: { children: any }) => {
  const { data, error, loading, Post, setData } = useFetchPost()
  const values = { data, error, loading, Post, setData };
  return <TurnResponseContext.Provider value={values}>{children}</TurnResponseContext.Provider>;
};

export { TurnResponseProvider };
export default TurnResponseContext
