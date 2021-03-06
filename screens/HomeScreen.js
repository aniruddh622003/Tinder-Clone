import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
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
import { Ionicons, Entypo } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import generateID from "../lib/generateID";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const swipeRef = useRef(null);
  const [profiles, setProfiles] = React.useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
    onSnapshot(doc(db, "user", user.uid), (snap) => {
      if (!snap.exists()) {
        navigation.navigate("Modal");
      }
    });
  }, []);

  React.useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, "user", user.uid, "passes")
      ).then((snap) => snap.docs.map((doc) => doc.id));

      const swipes = await getDocs(
        collection(db, "user", user.uid, "swipes")
      ).then((snap) => snap.docs.map((doc) => doc.id));

      const passedUserIDs = passes.length ? passes : ["test"];
      const swipedUserIDs = swipes.length ? swipes : ["test"];

      unsub = onSnapshot(
        query(
          collection(db, "user"),
          where("id", "not-in", [...passedUserIDs, ...swipedUserIDs])
        ),
        (snap) => {
          // console.log(snap.docs);
          setProfiles(
            snap.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc, id) => {
                return { id: doc.id, ...doc.data() };
              })
          );
        }
      );
    };
    fetchCards();
    return unsub;
  }, []);

  // console.log("Profiles" + profiles);

  const swipeLeft = async (index) => {
    if (!profiles[index]) return;
    const userSwiped = profiles[index];
    console.log(`Swiped PASS on ${userSwiped.displayName}`);
    setDoc(doc(db, "user", user.uid, "passes", userSwiped.id), userSwiped);
  };

  const swipeRight = async (index) => {
    if (!profiles[index]) return;
    const userSwiped = profiles[index];
    const loggedInProfile = await (
      await getDoc(doc(db, "user", user.uid))
    ).data();

    getDoc(doc(db, "user", userSwiped.id, "swipes", user.uid)).then(
      (documentSnap) => {
        if (documentSnap.exists()) {
          console.log(`You have Matched with ${userSwiped.displayName}`);
          setDoc(
            doc(db, "user", user.uid, "swipes", userSwiped.id),
            userSwiped
          );

          setDoc(doc(db, "matches", generateID(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });

          navigation.navigate("Match", {
            loggedInProfile,
            userSwiped,
          });
        } else {
          console.log(`Swiped MATCH on ${userSwiped.displayName}`);
          setDoc(
            doc(db, "user", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
        }
      }
    );
  };

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
        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image
            style={tw("h-14 w-14")}
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
          ref={swipeRef}
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
          cards={profiles}
          renderCard={(card) =>
            card ? (
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
                      {card.displayName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                style={[
                  tw(
                    "relative bg-white h-3/4 rounded-xl justify-center items-center"
                  ),
                  styles.cardShadow,
                ]}
              >
                <Text style={tw("font-bold pb-5")}>No more Profiles</Text>
                <Image
                  style={tw("h-20 w-20")}
                  height={100}
                  width={100}
                  source={{ uri: "https://links.papareact.com/6gb" }}
                />
              </View>
            )
          }
          onSwiped={(cardIndex) => {
            console.log(cardIndex);
          }}
          onSwipedLeft={(cardIndex) => swipeLeft(cardIndex)}
          onSwipedRight={(cardIndex) => swipeRight(cardIndex)}
        />
      </View>

      <View style={tw("flex flex-row justify-evenly mb-5")}>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={tw(
            "justify-center items-center rounded-full w-16 h-16 bg-red-200"
          )}
        >
          <Entypo name="cross" size={25} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={tw(
            "justify-center items-center rounded-full w-16 h-16 bg-green-200"
          )}
        >
          <Entypo name="heart" size={25} color="green" />
        </TouchableOpacity>
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
