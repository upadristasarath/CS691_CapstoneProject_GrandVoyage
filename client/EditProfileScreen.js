import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function EditProfileScreen({ navigation, route }) {
  const { user } = route.params;
  const [phone, setPhone] = useState(user.phoneNumber);

  const handleSaveChanges = () => {
    // You can implement the logic to update the user's phone number here
    console.log("New phone number:", phone);
    // After updating the phone number, you can navigate back to the profile screen
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <Button
          title="Save Changes"
          onPress={handleSaveChanges}
          color="#097969"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  formContainer: {
    marginTop: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});
