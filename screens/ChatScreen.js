import React from "react";
import { View, Text, StatusBar } from "react-native";
import ChatList from "../components/ChatList";
import Header from "../components/Header";

const ChatScreen = () => {
  return (
    <View style={{ marginTop: StatusBar.currentHeight + 10 }}>
      <Header title="Chat" />
      <ChatList />
    </View>
  );
};

export default ChatScreen;
