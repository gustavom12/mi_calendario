import { createContext, useState } from 'react';

const SelectedDataContext = createContext({});
const SelectedDataProvider = ({ children }: { children: any }) => {
  const [selectedType, setSelectedType] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null)

  const values = { selectedType, setSelectedType, selectedTime, setSelectedTime };
  return <SelectedDataContext.Provider value={values}>{children}</SelectedDataContext.Provider>;
};

export { SelectedDataProvider };
export default SelectedDataContext
