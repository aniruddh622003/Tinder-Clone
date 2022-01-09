import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import useAuth from "./hooks/useAuth";
import ChatScreen from "./screens/ChatScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

const stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth();
  return (
    <stack.Navigator>
      {user ? (
        <>
          <stack.Screen name="Home" component={HomeScreen} />
          <stack.Screen name="Chat" component={ChatScreen} />
        </>
      ) : (
        <stack.Screen name="Login" component={LoginScreen} />
      )}
    </stack.Navigator>
  );
};

export default StackNavigator;
