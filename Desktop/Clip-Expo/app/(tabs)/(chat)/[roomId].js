import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ChatRoom() {
  const { roomId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Room {roomId}</Text>
      {/* 채팅 내용 추가 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
  },
});
