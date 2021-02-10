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
    getData(currentPage);
  }, []);

  const renderFooter = () => {
    return(
      loading?
      <View style={styles.loader}>
        <ActivityIndicator size="large"/>      
      </View>: null
    )
  }

  const getData = async (page: number) => {
    if (loading) return;
    if (!lastPage) return setLoading(false);

    setLoading(true);

    const data = await axios.get('url'); //<-- do api request
    if (!data) {
        setLast(true);
        setLoading(false);
        return;
    };

    setPage(page);
    setData(listData.concat(data));
    return setLoading(false);
}
  
  const handleLoadMore = () => {
     getData(currentPage+1);
  };

  return (
      <FlatList
        style={styles.container}
        data={listData}
        renderItem={(data) => <Item data={data}/>}
        keyExtractor={(item,index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.1}
        onEndReached={handleLoadMore}
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
