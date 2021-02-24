import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";
import { Button } from "react-native-paper";

import { api_connection } from "../constants/api";

const Detail = (props) => {
  const data = props.route.params.data;
  const [msg, setMsg] = useState("");

  const deleteData = () => {
    console.log("try delete");
    fetch(api_connection.url + `/api/articles/${data.id}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => {
        if (resp.status >= 400) {
          setMsg(resp.statusText);
        }
        return resp.json();
      })
      .then((dataRespon) => {
        setMsg("");
        props.navigation.navigate("Home");
      })
      .catch((error) => Alert.alert("Error", error.toString()));
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.detailView}>
          <Text
            style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}
          >
            {data.title}
          </Text>
          <Text style={{ fontSize: 20, paddingTop: 10 }}>
            {data.description}
          </Text>
          <View style={styles.btnStyle}>
            <Button
              style={{ paddingHorizontal: 10 }}
              icon="update"
              mode="contained"
              onPress={() => props.navigation.navigate("Edit", { data: data })}
            >
              Edit
            </Button>
            <Button icon="delete" mode="contained" onPress={() => deleteData()}>
              Delete
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  detailView: {
    padding: 10,
    margin: 10,
  },
  btnStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 15,
    padding: 10,
  },
});
export default Detail;
