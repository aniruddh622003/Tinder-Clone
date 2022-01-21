import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import useAuth from "./hooks/useAuth";
import ChatScreen from "./screens/ChatScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MatchedScreen from "./screens/MatchedScreen";
import ModalScreen from "./screens/ModalScreen";

const stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth();
  return (
    <stack.Navigator>
      {user ? (
        <>
          <stack.Group>
            <stack.Screen name="Home" component={HomeScreen} />
            <stack.Screen name="Chat" component={ChatScreen} />
          </stack.Group>
          <stack.Group screenOptions={{ presentation: "modal" }}>
            <stack.Screen name="Modal" component={ModalScreen} />
          </stack.Group>
          <stack.Group
            screenOptions={{
              presentation: "transparentModal",
              headerShown: false,
            }}
          >
            <stack.Screen name="Match" component={MatchedScreen} />
          </stack.Group>
        </>
      ) : (
        <stack.Screen name="Login" component={LoginScreen} />
      )}
    </stack.Navigator>
  );
};

export default StackNavigator;
