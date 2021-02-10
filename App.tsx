import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [listData, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setPage] = useState<number>(1);
  const [lastPage, setLast] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getData();
    return () => {

    }
  }, [currentPage]);

  const renderFooter = () => {
    return(
      loading?
      <View style={styles.loader}>
        <ActivityIndicator size="large"/>      
      </View>: null
    )
  }

  const getData = async () => {
    const options:any = {
      method: 'GET',
      url: 'url'+currentPage,
      headers: {
        'Content-Type': 'multipart/form-data',
        userGroup: '1',
        Authorization: 'Bearer Token',
      }
    };
    const data = await axios.request(options).then((res:any) => {
      setData(listData.concat(res.data.data));
      setLoading(false);
    }).catch((error) => setLast(true));
    return data;
  }
  
  const handleLoadMore = () => {
    console.log("handleLoadMore");
    setLoading(true);
    if(!lastPage) return setPage(currentPage+1);
  }

  return (
      <FlatList
        style={styles.container}
        data={listData}
        renderItem={(data) => <Item data={data}/>}
        keyExtractor={(item,index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0}
      />
  );
}


const Item:React.FC<{data:any}> = ({data}) => {
  return(
    <View style={styles.itemRow}>
      <View style={styles.itemShow}>
        <Text>
          {data.item.id}
        </Text>
      </View>
      <Text>
      {data.item.title}
      </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: '#f5fcff'
  },
  itemRow: {
    borderBottomColor: '#ccc',
    marginBottom: 10,
    borderBottomWidth: 1
  },
  itemShow: {
    backgroundColor:'blue',
    width: '100%',
    height: 200,
  },
  loader: {
    marginTop: 10, alignItems: 'center'
  }
});
