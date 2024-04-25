import React, { useState } from "react";
import axios from "axios";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";

export default function ImagePreviewScreen({ navigation, route }) {
  const { imageUri } = route.params;
  const [loading, setLoading] = useState(false);

  const handleRetake = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Convert the image URI to base64
      const base64Image = await convertToBase64(imageUri);

      // Prepare the request payload
      const payload = {
        model: "gpt-4-turbo",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "What fruits or vegetables are in this image in single paragraph?",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
      };

      // Send the request to the GPT-4 Vision API
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer sk-proj-07saghRJeF4XXbrxES8sT3BlbkFJUWSMyBU9NSRKvBt5K9Of",
          },
        },
      );

      // Extract the identified fruits or vegetables from the API response
      const identifiedItems = response.data.choices[0].message.content;

      // Navigate to the screen with the identified items
      navigation.navigate("IdentifiedItemsScreen", { items: identifiedItems });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to convert image URI to base64
  const convertToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      };
      reader.readAsDataURL(blob);
    });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRetake}>
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Identifying..." : "Submit"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#097969",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
