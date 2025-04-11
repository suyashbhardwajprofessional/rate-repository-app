import { View } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import RepositoryItem from './RepositoryItem';

const RepositoryInfo = () => {
	const id = useParams().id
	const [theRepository, setTheRepository] = useState({});
	const { data, error, loading } = useQuery(GET_REPOSITORY, 
		{ fetchPolicy: 'cache-and-network', variables: { repositoryId: id } }
		);

	useEffect(() => {
	    data && data.repository && setTheRepository(data.repository);
	  }, [data]);

	return (
		<View>
			<RepositoryItem itemObj={theRepository} singleRepositoryViewFlag={true}/>
		</View>
	)
}

export default RepositoryInfo