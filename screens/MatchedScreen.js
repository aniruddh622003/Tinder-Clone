import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "tailwind-rn";

const MatchedScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  return (
    <View
      style={[
        tw("h-full flex-column justify-center bg-red-500"),
        { opacity: 0.9 },
      ]}
    >
      <View style={tw("justify-center px-10")}>
        <Image
          style={tw("h-16 w-full")}
          source={{ uri: "https://links.papareact.com/mg9" }}
        />
      </View>
      <Text style={tw("text-white text-center mt-5")}>
        You and {userSwiped.displayName} have liked each other.
      </Text>

      <View style={tw("flex-row justify-evenly mt-5")}>
        <Image
          style={tw("h-32 w-32 rounded-full")}
          source={{ uri: loggedInProfile.photoURL }}
        />
        <Image
          style={tw("h-32 w-32 rounded-full")}
          source={{ uri: userSwiped.photoURL }}
        />
      </View>

      <TouchableOpacity
        style={tw("bg-white m-10 px-5 py-5 rounded-full mt-20")}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text style={tw("text-center text-lg")}>Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchedScreen;
