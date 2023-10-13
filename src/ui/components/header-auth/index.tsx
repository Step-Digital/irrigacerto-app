import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import Icon from "@expo/vector-icons/Feather";
import { Button } from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../routes/types/StackNavigationProps";
import { Typography } from "../../components/typography";

export const HeaderAuth: React.FC<{
  hiddenBackButton?: boolean;
}> = ({ hiddenBackButton }) => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <View style={styles.container}>
      {!hiddenBackButton && (
        <Button
          bg-color="transparent"
          onPress={() => navigation.navigate("Home")}
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Typography
            color="neutral-4"
            size="normal"
            weight="bold"
            style={{
              paddingHorizontal: 16,
              marginTop: 30,
            }}
          >
            <Icon name="arrow-left" size={24} />
          </Typography>
        </Button>
      )}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 16,
        }}
      >
        <Image
          source={require("../../../../assets/blue-new-logo.png")}
          contentFit="contain"
          transition={1000}
          style={{
            width: 300,
            height: 200,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
});
