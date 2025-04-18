import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';
import { GET_REPOSITORY, GET_REPOSITORY_WITH_REVIEWS } from '../graphql/queries';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import RepositoryItem from './RepositoryItem';
import theme from './theme';
import { format } from 'date-fns';
import MyText from './MyText';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
	blockStyle: {
		padding: 10,
		flexDirection: 'column',
		backgroundColor: 'white',
	},

	spreadStyleBody: {
		flexDirection: 'row',
		columnGap: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	spreadStyleFooter: {
		flexDirection: 'row',
		columnGap: 5,
		marginTop: 5,
		justifyContent: 'space-around',
	},

	thumbnailImage: {
		height: 30,
		width: 30,
		borderRadius: 5,
		overflow: 'hidden',
	},
	avatarBlock: {
		padding: 5,
	},

	textBlackHeavy: {
		color: theme.colors.textBlack,
		fontSize: theme.fontSizes.body,
		fontFamily: theme.fonts.main,
		fontWeight: theme.fontWeights.heavy,
	},
	textGreyNormal: {
		color: theme.colors.textSecondary,
		fontSize: theme.fontSizes.body,
		fontFamily: theme.fonts.main,
		fontWeight: theme.fontWeights.normal,
	},

	labelsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	textWhiteLabel: {
		color: theme.colors.textWhite,
		fontSize: theme.fontSizes.body,
		fontFamily: theme.fonts.main,
		fontWeight: theme.fontWeights.normal,
		backgroundColor: theme.colors.fillPrimary,
		padding: 3,
		borderRadius: 5,
	},
});

const SingleRepository = () => {
	const id = useParams().id;
	const variables = { repositoryId: id, first: 4 };
	const [theRepositoryWithReviews, setTheRepositoryWithReviews] = useState();
	const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY_WITH_REVIEWS, {
		fetchPolicy: 'cache-and-network',
		variables
	});
	const repositoryNodes = theRepositoryWithReviews ? theRepositoryWithReviews.reviews.edges.map(edge => edge.node) : [];
	const handleFetchMore = () => {
	    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

	    if (!canFetchMore) {
	      return;
	    }

	    fetchMore({
	      variables: {
	        after: data.repository.reviews.pageInfo.endCursor,
	        ...variables,
	      },
	    });
	};

	const onEndReach = () => { console.log('fetching more reviews...'); handleFetchMore(); };

	useEffect(() => {
		data && data.repository && setTheRepositoryWithReviews(data.repository);
	}, [data]);

	return (
		<FlatList
			data={repositoryNodes}
			renderItem={({ item }) => <ReviewItem review={item} />}
			keyExtractor={({ id }) => id}
			ListHeaderComponent={() => <RepositoryInfo repository={theRepositoryWithReviews} />}
			onEndReached={onEndReach}
          	onEndReachedThreshold={0.5}
		/>
	);
};

const RepositoryInfo = ({ repository }) => {
	return <View>{repository && <RepositoryItem itemObj={repository} singleRepositoryViewFlag={true} />}</View>;
};

export const ReviewItem = ({ review, showForReviews }) => {
	// Single review item
	const theWidth = 50;
	const theHeight = 50;
	const navigate = useNavigate();
	const [mutate, result] = useMutation(DELETE_REVIEW);
	return (
		<View style={styles.blockStyle}>
			<View style={styles.spreadStyleBody}>
				<View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', width: theWidth, height: theHeight }}>
					<Text
						style={{
							padding: 15,
							borderRadius: theWidth / 2,
							borderColor: 'teal',
							borderStyle: 'solid',
							borderWidth: 2,
						}}
					>
						{review.rating}
					</Text>
				</View>
				<View style={{ flex: 8 }}>
					<Text style={styles.textBlackHeavy}>{showForReviews ? review.repository.fullName : review.user.username}</Text>
					<Text style={styles.textGreyNormal}>{format(review.createdAt, 'MM.dd.yyyy')} </Text>
					<View>
						<Text style={styles.textGreyNormal}>{review.text} </Text>
					</View>
				</View>
				<View style={{ flex: 0, justifyContent: 'center' }}></View>
			</View>
			{showForReviews && (
			<View style={styles.spreadStyleBody}>
				<Pressable onPress={() => navigate(`/repositories/${review.repository.id}`)} style={{flexGrow:1}}>
					<View
						style={{
							backgroundColor: 'blue',
							margin: 4,
							borderRadius: 3,
							padding: 6,
						}}
					>
						<MyText>View repository</MyText>
					</View>
				</Pressable>
				<Pressable onPress={() => Alert.alert('Delete Review', 'Are you sure you want to delete this review?',
				    [
				      {
				        text: 'Cancel',
				        onPress: () => Alert.alert('Cancel Pressed'),
				        style: 'cancel',
				      },
				      {
				        text: 'Delete',
				        onPress: async () => {
				        	const { data, refetch } = await mutate({ variables: { deleteReviewId: review.id } });
				        	Alert.alert('Deleted a review!');
				        	refetch();
				        },
				        style: 'delete',
				      }, 
				    ],
				    {
				      cancelable: true,
				      onDismiss: () =>
				        Alert.alert(
				          'This alert was dismissed by tapping outside of the alert dialog.',
				        ),
				    })
				}>
					<View
						style={{
							backgroundColor: 'red',
							margin: 4,
							borderRadius: 3,
							padding: 6,
						}}
					>
						<MyText>Delete review</MyText>
					</View>
				</Pressable>
			</View>
			)}
		</View>
	);
};

export default SingleRepository;
