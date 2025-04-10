import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import RepositoryItem from '../../components/RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { ME } from '../../graphql/queries';
import { render } from '@testing-library/react-native';

const ItemSeparator = () => <View style={styles.separator} />;
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const RepositoryListContainer = ({ repositories }) => {
  const { data, error, loading } = useQuery(ME, { fetchPolicy: 'cache-and-network' });
  const [loginStatus, setLoginStatus] = useState(false);
  // Get the nodes from the edges array
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  useEffect(() => {
    data && data.me ? setLoginStatus(true) : setLoginStatus(false);
  }, [data]);

  return (
    <>
      {loginStatus ? (
        <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => <RepositoryItem itemObj={item} key={item.id} />}
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
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;

describe('Repository List', () => {
  it("renders repository's name, description, language, forks count, stargazers count, rating average, and review count correctly", () => {
    render(<RepositoryList />);

    screen.debug();

    expect(screen.getByText('JavaScript')).toBeDefined();
  });
});
