import moment from 'moment';
import { createContext,useState } from 'react';

const ThemeContext = createContext({});
const ThemeProvider = ({ children }: {children:any}) => {
  const [selectedMonth, setSelectedMonth] = useState(moment())
  const [selectedDay, setSelectedDay] = useState(moment());
  const data = { selectedDay, setSelectedDay, selectedMonth, setSelectedMonth };

  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider };
export default ThemeContext
