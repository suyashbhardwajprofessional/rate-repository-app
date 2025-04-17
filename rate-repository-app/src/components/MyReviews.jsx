import { Text } from 'react-native-paper';
import { ME } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { ReviewItem } from './SingleRepository';
import { FlatList } from 'react-native';
import { useEffect, useState } from 'react';

const MyReviews = () => {
	const [theUserReviews, setTheUserReviews] = useState();
	const { data, error, loading } = useQuery(ME, { fetchPolicy: 'cache-and-network', variables: { includeReviews: true } });

	const userReviewNodes = theUserReviews ? theUserReviews.reviews.edges.map(edge => edge.node) : [];
	useEffect(() => { data && data.me && setTheUserReviews(data.me); }, [data]);

	return (<FlatList
			data={userReviewNodes}
			renderItem={({ item }) => <ReviewItem review={item} showRepoName />}
			keyExtractor={({ id }) => id}
		/>);
};

export default MyReviews;
