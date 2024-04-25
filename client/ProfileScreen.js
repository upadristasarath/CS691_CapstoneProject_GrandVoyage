import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  SafeAreaView,
} from "react-native";
import { auth } from "./firebaseConfig";

export default function ProfileScreen({ navigation, route }) {
  const user = route.params?.user;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.log("Logout Error:", error);
      Alert.alert("Logout Error", "An error occurred while logging out.");
    }
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>User data not available</Text>
        <Button
          title="Go to Login"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          }
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Profile</Text>
        <Button
          title="Edit"
          color="#097969"
          onPress={() => navigation.navigate("EditProfile", { user })}
        />
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{user.username.charAt(0)}</Text>
        </View>
        <Text style={styles.usernameText}>{user.username}</Text>
        <Text style={styles.emailText}>{user.email}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Age:</Text> {user.age}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Phone:</Text> {user.phoneNumber}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Gender:</Text> {user.gender}
          </Text>
        </View>
      </View>
      <Button title="Logout" onPress={handleLogout} color="#097969" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#097969",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  usernameText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emailText: {
    fontSize: 18,
    color: "#888",
    marginBottom: 16,
  },
  infoContainer: {
    width: "100%",
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    padding: 16,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
});
