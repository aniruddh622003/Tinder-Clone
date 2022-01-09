import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
const DUMMY_DATA = [
  {
    firstName: "Aniruddh",
    lastName: "Upadhyay",
    job: "Student",
    age: 27,
    photoURL:
      "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg",
    key: 1,
  },
  {
    firstName: "Aniruddh",
    lastName: "Upadhyay",
    job: "Student",
    age: 27,
    photoURL:
      "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg",
    key: 2,
  },
  {
    firstName: "Aniruddh",
    lastName: "Upadhyay",
    job: "Student",
    age: 27,
    photoURL:
      "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg",
    key: 3,
  },
  {
    firstName: "Aniruddh",
    lastName: "Upadhyay",
    job: "Student",
    age: 27,
    photoURL:
      "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg",
    key: 4,
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <SafeAreaView
      style={[tw("flex-1"), { marginTop: StatusBar.currentHeight + 10 }]}
    >
      <View style={tw("flex-row items-center justify-between relative px-5")}>
        <TouchableOpacity onPress={logout}>
          <Image
            style={tw("h-10 w-10 rounded-full")}
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={tw("h-10 w-14")}
            source={{
              uri: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c53b.png",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={25} color="#ff5864" />
        </TouchableOpacity>
      </View>

      <View style={tw("flex-1 -mt-6")}>
        <Swiper
          containerStyle={{
            backgroundColor: "transparent",
          }}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          overlayLabels={{
            left: {
              title: "Sorry",
              style: {
                label: {
                  backgroundColor: "red",
                  borderColor: "red",
                  color: "white",
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: -10,
                },
              },
            },
            right: {
              title: "Match",
              style: {
                label: {
                  backgroundColor: "green",
                  borderColor: "green",
                  color: "white",
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: 10,
                },
              },
            },
          }}
          cards={DUMMY_DATA}
          renderCard={(card) => (
            <View
              key={card.id}
              style={[
                tw("relative bg-white h-3/4 rounded-xl"),
                styles.cardShadow,
              ]}
            >
              <Image
                style={tw("absolute top-0 h-full w-full rounded-xl")}
                source={{ uri: card.photoURL }}
              />
              <View
                style={tw(
                  "absolute bottom-0 bg-white w-full h-20 justify-between items-center flex-row px-6 py-2 rounded-b-xl"
                )}
              >
                <View>
                  <Text style={tw("text-xl font-bold")}>
                    {card.firstName} {card.lastName}
                  </Text>
                  <Text>{card.job}</Text>
                </View>
                <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
              </View>
            </View>
          )}
          onSwiped={(cardIndex) => {
            console.log(cardIndex);
          }}
          onSwipedLeft={() => console.log("Pass")}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
