import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { Card, FAB, HelperText } from "react-native-paper";

// import { ConnContext } from "../contextsVar";
import { api_connection } from "../constants/api";
// import { article_dummy_data } from "../constants/dummy";

export default function Home(props) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [connect, setConnect] = useState(false);

  const loadData = () => {
    console.log("load", connect);
    fetch(api_connection.url + "/api/articles/", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((dataaaa) => {
        setData(dataaaa);
        setLoading(false);
        setConnect(true);
      })
      .catch(function (error) {
        console.log("fetch error", connect);
        setConnect(false);
        setLoading(false);
        return Alert.alert("Error", error.toString());
      });
  };

  useEffect(() => {
    loadData();
  }, []);
  function itemClicked(item) {
    props.navigation.navigate("Detail", { data: item });
  }
  const renderData = (item) => {
    console.log("renderData", connect);

    return (
      <Card style={styles.cardStyle} onPress={() => itemClicked(item)}>
        <Text style={{ fontSize: 25 }}>{item.title}</Text>
      </Card>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {connect || <HelperText type="error">Not connected</HelperText>}
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return renderData(item);
        }}
        keyExtractor={function (item) {
          return `${item.id}`;
        }}
        onRefresh={() => loadData()}
        refreshing={loading}
      />
      <FAB
        style={styles.fab}
        small={false}
        icon="plus"
        onPress={() => props.navigation.navigate("Create")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardStyle: {
    padding: 10,
    margin: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "blue",
  },
});
