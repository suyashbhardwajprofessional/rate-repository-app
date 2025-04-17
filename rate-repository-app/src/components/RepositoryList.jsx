import { FlatList, Pressable, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import useRepositories from '../hooks/useRepositories';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { useNavigate } from 'react-router-native';
import { Button, Menu, Divider, PaperProvider, Searchbar } from 'react-native-paper';

const ItemSeparator = () => <View style={styles.separator} />;
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const TopMenu = ({ userQuery, setUserQuery }) => {
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedValue] = useDebounce(searchQuery, 500);
  const [theSelectedOne, setTheSelectedOne] = useState('latest repositories');
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleMenuAction = selectedOne => {
    switch (selectedOne) {
      case 1: {
        setUserQuery({ theOrderPrinciple: 'CREATED_AT', theOrderDirection: 'DESC' });
        closeMenu();
        setTheSelectedOne('latest repositories');
        break;
      }
      case 2: {
        setUserQuery({ theOrderPrinciple: 'RATING_AVERAGE', theOrderDirection: 'DESC' });
        closeMenu();
        setTheSelectedOne('highest rated repositories');
        break;
      }
      case 3: {
        setUserQuery({ theOrderPrinciple: 'RATING_AVERAGE', theOrderDirection: 'ASC' });
        closeMenu();
        setTheSelectedOne('lowest rated repositories');
        break;
      }
      default: {
        setUserQuery({ theOrderPrinciple: 'CREATED_AT', theOrderDirection: 'ASC' });
        closeMenu();
        setTheSelectedOne('latest repositories');
        break;
      }
    }
  };

  useEffect(() => {
    setUserQuery({ ...userQuery, searchKey: debouncedValue });
  }, [searchQuery]);

  return (
    <>
      <View
        style={{
          paddingTop: 5,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}
      >
        <Searchbar
          style={{ backgroundColor: 'white', paddingRight: 6, margin: 10, borderRadius: 4 }}
          inputStyle={{ backgroundColor: 'white', marginRight: 4 }}
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <Menu visible={visible} onDismiss={closeMenu} anchor={<Button onPress={openMenu}>{theSelectedOne}</Button>}>
          <Menu.Item onPress={() => handleMenuAction(1)} title="latest repositories" />
          <Menu.Item onPress={() => handleMenuAction(2)} title="highest rated repositories" />
          <Divider />
          <Menu.Item onPress={() => handleMenuAction(3)} title="lowest rated repositories" />
        </Menu>
      </View>
    </>
  );
};

const RepositoryListContainer = ({ repositories, userQuery, setUserQuery, onEndReach }) => {
  const { data, error, loading } = useQuery(ME, { fetchPolicy: 'cache-and-network' });
  const [loginStatus, setLoginStatus] = useState(false);
  // Get the nodes from the edges array
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];
  const navigate = useNavigate();

  useEffect(() => {
    data && data.me ? setLoginStatus(true) : setLoginStatus(false);
  }, [data]);

  return (
    <>
      {loginStatus ? (
        <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={<TopMenu userQuery={userQuery} setUserQuery={setUserQuery} />}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
              <RepositoryItem itemObj={item} key={item.id} singleRepositoryViewFlag={false} />
            </Pressable>
          )}
          keyExtractor={item => item.id}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
        />
      ) : (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ margin: 4 }}>Sorry! You are not logged in! Sign in to continue..</Text>
        </View>
      )}
    </>
  );
};

const RepositoryList = () => {
  const [userQuery, setUserQuery] = useState({ theOrderPrinciple: 'CREATED_AT', theOrderDirection: 'DESC', searchKey: '' });
  const { repositories, fetchMore } = useRepositories({ orderBy:userQuery.theOrderPrinciple, orderDirection:userQuery.theOrderDirection, searchKeyword:userQuery.searchKey, first:5 });
  const onEndReach = () => { console.log('fetching more...'); fetchMore(); };

  return <RepositoryListContainer repositories={repositories} userQuery={userQuery} setUserQuery={setUserQuery} onEndReach={onEndReach} />;
};

export default RepositoryList;
