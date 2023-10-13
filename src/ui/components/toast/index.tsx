import { View } from "react-native";
import { ToastAndroid } from "react-native";

interface ToastProps {
  message: string;
}

export const ShowToast = ({message}: ToastProps) => {
  return (
    <View>
      {ToastAndroid.show(message, ToastAndroid.SHORT)}
    </View>
  )
}