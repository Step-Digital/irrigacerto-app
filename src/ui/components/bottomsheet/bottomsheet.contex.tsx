import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

export type BottomSheetData = {
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
  toggleBottomNavigationView: () => void;
}

export const BottomSheetContext = createContext<BottomSheetData>({} as BottomSheetData);

export const BottomSheetProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };
  return (
    <BottomSheetContext.Provider value={{
      setVisible,
      visible,
      toggleBottomNavigationView
    }}>
      {children}
    </BottomSheetContext.Provider>
  )
}

export const useBottomSheet = () => {
  return useContext(BottomSheetContext);
}