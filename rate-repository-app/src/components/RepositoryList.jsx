import { FlatList, Pressable, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useState, useEffect } from 'react';
import useRepositories from '../hooks/useRepositories';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { useNavigate } from 'react-router-native';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';

const ItemSeparator = () => <View style={styles.separator} />;
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const TopMenu = ({ setUserQuery }) => {
  const [visible, setVisible] = useState(false);
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

  return (
    <>
      <View
        style={{
          paddingTop: 5,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
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

const RepositoryListContainer = ({ repositories, setUserQuery }) => {
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
          ListHeaderComponent={<TopMenu setUserQuery={setUserQuery} />}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
              <RepositoryItem itemObj={item} key={item.id} singleRepositoryViewFlag={false} />
            </Pressable>
          )}
          keyExtractor={item => item.id}
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
  const [userQuery, setUserQuery] = useState({ theOrderPrinciple: 'CREATED_AT', theOrderDirection: 'DESC' });
  const { repositories } = useRepositories(userQuery.theOrderPrinciple, userQuery.theOrderDirection);

  return <RepositoryListContainer repositories={repositories} setUserQuery={setUserQuery} />;
};

export default RepositoryList;
