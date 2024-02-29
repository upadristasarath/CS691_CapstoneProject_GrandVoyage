import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
  TextInput,
  Alert,
} from "react-native";
import LottieView from "lottie-react-native";

export default function LoginScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "Admin" && password === "admin") {
      // Use replace to reset the navigation stack and prevent going back to the Login screen
      navigation.replace("Home");
    } else {
      Alert.alert(
        "Invalid Credentials",
        "The username or password you entered is incorrect.",
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>MealMate</Text>
        <Text style={styles.subheading}>Scan and get recipe</Text>
      </View>

      <LottieView
        source={require("./assets/lottie/cooking.json")}
        autoPlay
        loop
        style={{ width: width * 0.9, height: 300 }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#097969",
  },
  subheading: {
    fontSize: 18,
    color: "#6e6e6e",
    marginTop: 10,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
  },
  button: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#097969",
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});
