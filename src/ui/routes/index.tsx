import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { MakeHome } from "../../core/main/factories/pages/home/home.factory";
import { LoginScreen } from "../pages/login";
import { MakeLogin } from "../../core/main/factories/pages/login/login.factory";
import { MakeHomeLogged } from "../../core/main/factories/pages/home-logged/home-logged.factory";
import { HomeLogged } from "../pages/home-logged";
import { SignupScreen } from "../pages/signup";
import { ResetPasswordScreen } from "../pages/reset-password";
import { MakeSignup } from "../../core/main/factories/pages/signup";
import { MakeNewProperty } from "../../core/main/factories/pages/newProperty/newProperty.factory";
import { MakeGroundInfo } from "../../core/main/factories/pages/GroundInfo/groundInfo.factory";
import { MakeBombInfo } from "../../core/main/factories/pages/bombInfo/bombInfo.factory";
import { MakeSystemInfo } from "../../core/main/factories/pages/systemInfo/systemInfo.factory";
import { MakeCulture } from "../../core/main/factories/pages/Culture/culture.factory";
import { MakeMenu } from "../../core/main/factories/pages/menu/menu.factory";
import { MakeProfile } from "../../core/main/factories/pages/profile/profile.factory";
import { MakePropertyRegistered } from "../../core/main/factories/pages/property-registered/property-registered.factory";
import { MakeCultureRegistered } from "../../core/main/factories/pages/culture-registered/culture-registered.factory";
import { MakeProperties } from "../../core/main/factories/pages/properties/properties.factory";
import { About } from "../pages/About";
import { Properties } from "../pages/Properties";

const Stack = createNativeStackNavigator();

export const GlobalRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={MakeHome} />
      <Stack.Screen name="Login" component={MakeLogin} />
      <Stack.Screen name="HomeLogged" component={MakeHomeLogged} />
      <Stack.Screen name="Signup" component={MakeSignup} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="NewProperty" component={MakeNewProperty} />
      <Stack.Screen name="GroundInfo" component={MakeGroundInfo} />
      <Stack.Screen name="BombInfo" component={MakeBombInfo} />
      <Stack.Screen name="SystemInfo" component={MakeSystemInfo} />
      <Stack.Screen name="PropertyRegistered" component={MakePropertyRegistered} />
      <Stack.Screen name="CultureInfo" component={MakeCulture} />
      <Stack.Screen name="CultureRegistered" component={MakeCultureRegistered} />
      <Stack.Screen name="Menu" component={MakeMenu} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Profile" component={MakeProfile} />
      <Stack.Screen name="Properties" component={MakeProperties} />
      

    </Stack.Navigator>
  );
};
