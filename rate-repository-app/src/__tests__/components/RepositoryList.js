import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import RepositoryItem from '../../components/RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { ME } from '../../graphql/queries';

import { render, screen, within } from '@testing-library/react-native';
import { ErrorBoundary } from "react-error-boundary"

const ItemSeparator = () => <View style={styles.separator} />;
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const RepositoryListContainer = ({ repositories }) => {
  /*const { data, error, loading } = useQuery(ME, { fetchPolicy: 'cache-and-network' });
  const [loginStatus, setLoginStatus] = useState(false);*/
  const [loginStatus, setLoginStatus] = useState(true);
  // Get the nodes from the edges array
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  /*useEffect(() => {
    data && data.me ? setLoginStatus(true) : setLoginStatus(false);
  }, [data]);*/

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

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here
      const { queryByTestId } = render(
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <RepositoryListContainer repositories={repositories}/>
        </ErrorBoundary>
        );

      // screen.debug();
      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      // expect something from the first and the second repository item
      // expect(firstRepositoryItem).toHaveTextContent('jaredpalmer/formik', { exact: false})
      expect(within(firstRepositoryItem).getByText('jaredpalmer/formik')).toBeTruthy()
      expect(within(firstRepositoryItem).getByText('Build forms in React, without the tears')).toBeTruthy()
      expect(within(firstRepositoryItem).getByText('TypeScript')).toBeTruthy()
      expect(within(firstRepositoryItem).getByText('1.62k')).toBeTruthy()
      expect(within(firstRepositoryItem).getByText('21.9k')).toBeTruthy()
      expect(within(firstRepositoryItem).getByText('88')).toBeTruthy()
      expect(within(firstRepositoryItem).getByText('3')).toBeTruthy()

      expect(within(secondRepositoryItem).getByText('async-library/react-async')).toBeTruthy()
      expect(within(secondRepositoryItem).getByText('Flexible promise-based React data loader')).toBeTruthy()
      expect(within(secondRepositoryItem).getByText('JavaScript')).toBeTruthy()
      expect(within(secondRepositoryItem).getByText('69')).toBeTruthy()
      expect(within(secondRepositoryItem).getByText('1.76k')).toBeTruthy()
      expect(within(secondRepositoryItem).getByText('72')).toBeTruthy()
      expect(within(secondRepositoryItem).getByText('3')).toBeTruthy()
    });
  });
});