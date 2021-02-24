import React from "react";
import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";
import { Button } from "react-native-paper";

const Detail = (props) => {
  const data = props.route.params.data;
  //   console.log(props.route.params.data);
  const deleteData = () => {
    fetch(`http://192.168.43.173:8000/api/articles/${data.id}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((dataRespon) => {
        // console.log(dataRespon);
        props.navigation.navigate("Home");
      })
      .catch((error) => Alert.alert("Error", error.toString()));
  };
  return (
    <ScrollView>
      <View style={styles.detailView}>
        <Text style={{ fontSize: 25 }}>{data.title}</Text>
        <Text style={{ fontSize: 20 }}>{data.description}</Text>
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
