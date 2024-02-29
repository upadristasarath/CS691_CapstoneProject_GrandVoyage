import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function ProfileScreen({ navigation }) {
  // For demonstration, setting a static username. In a real app, this might come from your app's state or AsyncStorage.
  const [username, setUsername] = useState("Admin");

  const handleLogout = () => {
    // Perform any cleanup or state-resetting actions here
    // For demonstration, simply navigating to the 'Login' screen
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Username: {username}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});
