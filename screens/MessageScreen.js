import {
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import { useRoute } from "@react-navigation/native";
import tw from "tailwind-rn";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "../components/Message";

const MessageScreen = () => {
  const { params } = useRoute();
  const { user } = useAuth();

  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  const { matchDetails } = params;

  React.useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snap) =>
          setMessages(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      ),
    []
  );

  const sendMessage = () => {
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      photo: matchDetails.users[user.uid].photoURL,
      message: input,
    });
    setInput("");
  };

  return (
    <View style={[tw("flex-1"), { marginTop: StatusBar.currentHeight + 10 }]}>
      <Header
        title={getMatchedUserInfo(matchDetails?.users, user?.uid).displayName}
        callEnabled
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw("flex-1")}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
          <>
            <FlatList
              data={messages}
              inverted={-1}
              style={tw("pl-4")}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Message
                  key={item.id}
                  message={item}
                  type={item.userId == user.uid ? "Sender" : "Receiver"}
                />
              )}
            />
          </>
        </TouchableWithoutFeedback>

        <View
          style={tw(
            "flex-row justify-between items-center border-t border-gray-200 px-5 py-2 bg-white"
          )}
        >
          <TextInput
            style={tw("h-10 text-lg")}
            placeholder="Send a Message..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
          />
          <Button onPress={sendMessage} title="Send" color="#FF5864" />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default MessageScreen;
