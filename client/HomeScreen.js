import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import CameraScreen from "./CameraScreen";
import ProfileNavigator from "./ProfileNavigator";
import HistoryScreen from "./HistoryScreen";
import ImagePreviewScreen from "./ImagePreviewScreen";
import IdentifiedItemsScreen from "./IdentifiedItemsScreen";
import RecipeScreen from "./RecipeScreen";
import RecipeDetailsScreen from "./RecipeDetailsScreen";

const Tab = createBottomTabNavigator();
const CameraStack = createStackNavigator();
const HistoryStack = createStackNavigator();

function CameraStackScreen() {
  return (
    <CameraStack.Navigator>
      <CameraStack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
      <CameraStack.Screen
        name="ImagePreview"
        component={ImagePreviewScreen}
        options={{ headerShown: false }}
      />
      <CameraStack.Screen
        name="IdentifiedItemsScreen"
        component={IdentifiedItemsScreen}
        options={{ headerTitle: "Identified Items", headerShown: false }}
      />
      <CameraStack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{ headerTitle: "Recipe", headerShown: false }}
      />
    </CameraStack.Navigator>
  );
}

function HistoryStackScreen() {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen
        name="History"
        component={HistoryScreen}
        options={{ headerShown: false }}
      />
      <HistoryStack.Screen
        name="RecipeDetails"
        component={RecipeDetailsScreen}
        options={({ route }) => ({
          title: route.params.recipe.name,
        })}
      />
    </HistoryStack.Navigator>
  );
}

function HomeScreen({ route }) {
  return (
    <Tab.Navigator
      initialRouteName="Camera"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Camera") {
            iconName = focused ? "camera" : "camera-outline";
          } else if (route.name === "History") {
            iconName = focused ? "time" : "time-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="History" component={HistoryStackScreen} />
      <Tab.Screen name="Camera" component={CameraStackScreen} />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        initialParams={{ user: route.params.user }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBar: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default HomeScreen;
