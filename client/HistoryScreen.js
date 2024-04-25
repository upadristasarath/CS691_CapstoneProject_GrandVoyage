import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { auth, db } from "./firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const HistoryScreen = () => {
  const [historyData, setHistoryData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const recipesCollection = db
            .collection("users")
            .doc(currentUser.uid)
            .collection("recipes");

          const snapshot = await recipesCollection
            .orderBy("timestamp", "desc")
            .get();
          const recipes = [];
          snapshot.forEach((doc) => {
            const recipe = doc.data();
            recipes.push({
              id: doc.id,
              title: recipe.name,
              date: recipe.timestamp.toDate().toLocaleDateString(),
            });
          });
          setHistoryData(recipes);
        } else {
          console.log("No user is currently logged in.");
        }
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    fetchHistoryData();
  }, []);

  const handleRecipePress = async (recipeId) => {
    try {
      const recipeRef = db
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("recipes")
        .doc(recipeId);

      const recipeDoc = await recipeRef.get();
      const recipe = recipeDoc.data();

      navigation.navigate("RecipeDetails", { recipe });
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const renderHistoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.historyButton}
      onPress={() => handleRecipePress(item.id)}
    >
      <View style={styles.historyItem}>
        <Text style={styles.historyTitle}>{item.title}</Text>
        <Text style={styles.historyDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>History</Text>
      <FlatList
        data={historyData}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    margin: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: 10,
  },
  flatListContent: {
    paddingBottom: 16,
  },
  historyButton: {
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    elevation: 2,
  },
  historyItem: {
    padding: 16,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  historyDate: {
    fontSize: 14,
    color: "#666",
  },
});

export default HistoryScreen;
