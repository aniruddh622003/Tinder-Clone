import React from "react";
import { View, Text, Image, TextInput } from "react-native";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";

const ModalScreen = () => {
  const { user } = useAuth();

  return (
    <View style={tw("flex-1 items-center pt-1")}>
      <Image
        style={tw("h-20 w-full")}
        resizeMode="contain"
        source={{
          uri: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c53b.png",
        }}
      />
      <Text style={tw("text-xl text-gray-500 p-2 font-bold")}>
        Welcome {user.displayName}
      </Text>

      <Text style={tw("text-center text-red-400 p-4 font-bold")}>
        Step 1: The Profile Pic
      </Text>
      <TextInput
        style={tw("text-center text-xl pb-2")}
        placeholder="Enter Profile Pic URL"
      />

      <Text style={tw("text-center text-red-400 p-4 font-bold")}>
        Step 2: The Job
      </Text>
      <TextInput
        style={tw("text-center text-xl pb-2")}
        placeholder="Enter an occupation"
      />

      <Text style={tw("text-center text-red-400 p-4 font-bold")}>
        Step 1: The Age
      </Text>
      <TextInput
        style={tw("text-center text-xl pb-2")}
        placeholder="Enter your age"
      />
    </View>
  );
};

export default ModalScreen;
