import { useLinkProps } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";

function Create(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createData = () => {
    fetch("http://192.168.43.173:8000/api/articles/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    })
      .then((response) => {
        console.log(response.status);
        return response.json();
      })
      .then(function (respData) {
        console.log(respData);
        props.navigation.navigate("Home");
      })
      .catch((error) => Alert.alert("Error", error.toString()));
  };
  return (
    <View>
      <TextInput
        style={styles.inputStyle}
        label="Title"
        value={title}
        mode="outlined"
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.inputStyle}
        label="Description"
        value={description}
        mode="outlined"
        multiline
        numberOfLines={10}
        onChangeText={(text) => setDescription(text)}
      />
      <Button
        style={{ margin: 10 }}
        icon="pencil"
        mode="contained"
        onPress={() => createData()}
      >
        Insert Article
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    padding: 10,
    margin: 5,
  },
});
export default Create;
