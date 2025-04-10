import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useState, useEffect } from 'react';
import useRepositories from '../hooks/useRepositories';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const ItemSeparator = () => <View style={styles.separator} />;
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const RepositoryList = () => {
  const { data, error, loading } = useQuery(ME, { fetchPolicy: 'cache-and-network' });
  const [loginStatus, setLoginStatus] = useState(false)
  const { repositories } = useRepositories();
  // Get the nodes from the edges array
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  useEffect(()=>{
    data && data.me ? setLoginStatus(true) : setLoginStatus(false)
  },[data])

  return (<>
    {loginStatus ? (
      <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem itemObj={item} key={item.id} />}
      keyExtractor={item => item.id}
    />
    ) : (<View style={{flex: 1, alignItems: 'center'}}><Text style={{margin: 4}}>Sorry! You are not logged in! Sign in to continue..</Text></View>)}
    
  </>);
};

export default RepositoryList;
