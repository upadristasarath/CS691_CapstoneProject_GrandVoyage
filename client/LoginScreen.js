import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import LottieView from "lottie-react-native";
import { auth } from "./firebaseConfig";

export default function LoginScreen({ navigation }) {
  const { width } = useWindowDimensions();

  const handleSignIn = () => {
    // Navigate to the Sign in screen
    navigation.navigate("SignIn");
  };

  const handleSignUp = () => {
    // Navigate to the Sign up screen
    navigation.navigate("SignUp");
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign up</Text>
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
  buttonContainer: {
    width: "80%",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#097969",
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});
