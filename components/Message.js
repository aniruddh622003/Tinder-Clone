import { View, Text, Image } from "react-native";
import React from "react";
import tw from "tailwind-rn";

const Message = ({ key, message, type }) => {
  return (
    <View
      style={[
        tw("rounded-lg px-5 py-3 mx-3 my-1"),
        type === "Sender"
          ? [
              tw("bg-blue-600 rounded-tr-none"),
              { alignSelf: "flex-start", marginLeft: "auto" },
            ]
          : [
              tw("bg-red-400 rounded-tl-none ml-12"),
              { alignSelf: "flex-start" },
            ],
      ]}
    >
      {type === "Receiver" && (
        <Image
          style={tw("h-10 w-10 rounded-full absolute top-0 -left-12")}
          source={{ uri: message.photo }}
        />
      )}
      <Text style={tw("text-white")}>{message.message}</Text>
    </View>
  );
};

export default Message;
