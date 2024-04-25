import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function IdentifiedItemsScreen({ route }) {
  const { items } = route.params;
  const [editedItems, setEditedItems] = useState(items);
  const navigation = useNavigation();

  const handleTextChange = (text) => {
    setEditedItems(text);
  };

  const handleSubmit = () => {
    navigation.navigate("Recipe", { items: editedItems });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.innerContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("Camera")}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text style={styles.backButtonText}>Retake</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Identified Fruits or Vegetables</Text>
        <View style={styles.itemContainer}>
          <TextInput
            style={styles.itemText}
            value={editedItems}
            onChangeText={handleTextChange}
            multiline={true}
            numberOfLines={10}
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    color: "black",
    fontSize: 16,
    marginLeft: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    borderRadius: 10,
    flex: 1,
    backgroundColor: "#f9f9f9",
    borderColor: "#ccc",
    borderWidth: 1,
    marginHorizontal: 4,
    marginBottom: 20,
  },
  itemText: {
    color: "black",
    fontSize: 18,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#097969",
    padding: 10,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
