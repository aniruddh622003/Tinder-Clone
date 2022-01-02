import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import ChatScreen from "./screens/ChatScreen";
import HomeScreen from "./screens/HomeScreen";

const stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <stack.Navigator>
      <stack.Screen name="Home" component={HomeScreen} />
      <stack.Screen name="Chat" component={ChatScreen} />
    </stack.Navigator>
  );
};

export default StackNavigator;
