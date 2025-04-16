import { Text } from 'react-native-paper';
import { ME } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const MyReviews = () => {
	const { data, error, loading } = useQuery(ME, { fetchPolicy: 'cache-and-network', variables: { includeReviews: true } });
	return <Text variant="displaySmall">Hahaha! My reviews</Text>;
};

export default MyReviews;
