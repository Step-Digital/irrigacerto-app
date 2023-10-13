import React, { ReactNode, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Button } from "react-native";
import { BottomSheet as Bottom } from "react-native-btr";
import { useBottomSheet } from "./bottomsheet.contex";

export const BottomSheet: React.FC<{
  children: ReactNode
}> = ({ children }) => {
  const { visible, toggleBottomNavigationView } = useBottomSheet();

  return (
    <Bottom
      visible={visible}
      onBackButtonPress={toggleBottomNavigationView}
      onBackdropPress={toggleBottomNavigationView}
    >
      <View style={styles.bottomNavigationView}>
        {children}
      </View>
    </Bottom>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    zIndex: 9999,
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: 250,
    padding: 40
  },
});
