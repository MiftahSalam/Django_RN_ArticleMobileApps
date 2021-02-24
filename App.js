import React from "react";
import { View, StyleSheet, Text } from "react-native";

import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./Screens/Home";
import Create from "./Screens/Create";
import Detail from "./Screens/Details";
import Edit from "./Screens/Edit";

const stack = createStackNavigator();
const myStyle = {
  // title: "Article List",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "blue",
  },
};

function App() {
  return (
    <View style={styles.container}>
      <stack.Navigator>
        <stack.Screen
          name="Home"
          component={Home}
          options={{ ...myStyle, title: "Article List" }}
        />
        <stack.Screen
          name="Create"
          component={Create}
          options={{ ...myStyle, title: "Create" }}
        />
        <stack.Screen
          name="Detail"
          component={Detail}
          options={{ ...myStyle, title: "Detail" }}
        />
        <stack.Screen
          name="Edit"
          component={Edit}
          options={{ ...myStyle, title: "Edit" }}
        />
      </stack.Navigator>
    </View>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eddfdf",
    marginTop: Constants.statusBarHeight,
  },
  textStyle: {
    fontSize: 25,
    color: "red",
  },
});
