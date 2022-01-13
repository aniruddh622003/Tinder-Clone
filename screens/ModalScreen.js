import { useNavigation } from "@react-navigation/native";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import tw from "tailwind-rn";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [image, setImage] = React.useState(null);
  const [job, setJob] = React.useState(null);
  const [age, setAge] = React.useState(null);

  const incompleteForm = !image || !job || !age;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Update Your Profile",
      headerStyle: {
        backgroundColor: "#ff5864",
      },
      headerTitleStyle: { color: "white" },
    });
  });

  const updateUser = () => {
    setDoc(doc(db, "user", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job: job,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((err) => alert(error.message));
  };

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
        value={image}
        onChangeText={(t) => setImage(t)}
        style={tw("text-center text-xl pb-2")}
        placeholder="Enter Profile Pic URL"
      />

      <Text style={tw("text-center text-red-400 p-4 font-bold")}>
        Step 2: The Job
      </Text>
      <TextInput
        value={job}
        onChangeText={(t) => setJob(t)}
        style={tw("text-center text-xl pb-2")}
        placeholder="Enter an occupation"
      />

      <Text style={tw("text-center text-red-400 p-4 font-bold")}>
        Step 3: The Age
      </Text>
      <TextInput
        value={age}
        onChangeText={(t) => setAge(t)}
        style={tw("text-center text-xl pb-2")}
        placeholder="Enter your age"
        keyboardType="numeric"
        maxLength={2}
      />

      <TouchableOpacity
        onPress={updateUser}
        disabled={incompleteForm}
        style={[
          tw("w-64 p-3 rounded-xl absolute bottom-10"),
          incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
        ]}
      >
        <Text style={tw("text-center text-white text-xl")}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
