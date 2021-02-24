import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { api_connection } from "../constants/api";

function Edit(props) {
  const data = props.route.params.data;
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);

  const updateData = () => {
    fetch(api_connection.url + `/api/articles/${data.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    })
      .then((resp) => {
        console.log(resp.status);
        return resp.json();
      })
      .then((dataaaa) => {
        console.log(dataaaa);
        props.navigation.navigate("Home");
      })
      .catch(function (error) {
        return Alert.alert("Error", error.toString());
      });
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
        icon="update"
        mode="contained"
        onPress={() => updateData()}
      >
        Update Article
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

export default Edit;
