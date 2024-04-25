import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Markdown from "react-native-markdown-display";

const RecipeDetailsScreen = ({ route }) => {
  const { recipe } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <Text style={styles.title}>{recipe.name}</Text> */}
        <Markdown
          style={styles.recipeContent}
          styles={{ heading1: { fontSize: 24 }, text: { fontSize: 16 } }}
        >
          {recipe.content}
        </Markdown>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  recipeContent: {
    marginBottom: 10,
  },
});

export default RecipeDetailsScreen;
