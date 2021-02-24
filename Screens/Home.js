import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { Card, FAB } from "react-native-paper";

const mydata = [
  { id: 1, title: "First title", description: "First Description" },
  { id: 2, title: "2nd title", description: "2nd Description" },
  { id: 3, title: "3rd title", description: "3rd Description" },
  { id: 4, title: "First title", description: "First Description" },
  { id: 5, title: "2nd title", description: "2nd Description" },
  { id: 6, title: "3rd title", description: "3rd Description" },
  { id: 7, title: "First title", description: "First Description" },
  { id: 8, title: "2nd title", description: "2nd Description" },
  { id: 9, title: "3rd title", description: "3rd Description" },
];

export default function Home(props) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    fetch("http://192.168.43.173:8000/api/articles/", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((dataaaa) => {
        // console.log(dataaaa);
        setData(dataaaa);
        setLoading(false);
      })
      .catch(function (error) {
        // console.log(error);
        return Alert.alert("Error", error.toString());
      });
  };

  useEffect(() => {
    loadData();
  }, []);
  function itemClicked(item) {
    // console.log(item);
    props.navigation.navigate("Detail", { data: item });
  }
  const renderData = (item) => {
    {
      //   console.log(item);
    }
    return (
      <Card style={styles.cardStyle} onPress={() => itemClicked(item)}>
        <Text style={{ fontSize: 25 }}>{item.title}</Text>
      </Card>
    );
  };

  return (
    <View style={{ flex: 1 }}>
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
