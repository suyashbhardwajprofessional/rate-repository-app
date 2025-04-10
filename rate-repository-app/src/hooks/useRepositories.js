import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, { fetchPolicy: 'cache-and-network' });
  const [repositories, setRepositories] = useState();
  // const [loading, setLoading] = useState(false);

  /*const fetchRepositories = async () => {
    setLoading(true);

    const response = await fetch('http://192.168.38.64:5000/api/repositories');
    const json = await response.json();

    setLoading(false);
    setRepositories(json);
  };*/

  useEffect(() => {
    data && setRepositories(data.repositories);
  }, [data]);

  return { repositories, loading };
};

export default useRepositories;
