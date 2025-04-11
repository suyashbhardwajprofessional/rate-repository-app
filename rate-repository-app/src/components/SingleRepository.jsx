import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY, GET_REPOSITORY_WITH_REVIEWS } from '../graphql/queries';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import RepositoryItem from './RepositoryItem';
import theme from './theme';

const styles = StyleSheet.create({
	blockStyle: {
		padding: 10,
		flexDirection: 'column',
		backgroundColor: 'white',
	},

	spreadStyleBody: {
		flexDirection: 'row',
		columnGap: 10,
		alignItems: 'flex-start',
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
	const [theRepositoryWithReviews, setTheRepositoryWithReviews] = useState();
	const { data, error, loading } = useQuery(GET_REPOSITORY_WITH_REVIEWS, {
		fetchPolicy: 'cache-and-network',
		variables: { repositoryId: id },
	});
	const repositoryNodes = theRepositoryWithReviews ? theRepositoryWithReviews.reviews.edges.map(edge => edge.node) : [];

	useEffect(() => {
		data && data.repository && setTheRepositoryWithReviews(data.repository);
	}, [data]);

	return (
		<FlatList
			data={repositoryNodes}
			renderItem={({ item }) => <ReviewItem review={item} />}
			keyExtractor={({ id }) => id}
			ListHeaderComponent={() => <RepositoryInfo repository={theRepositoryWithReviews} />}
		/>
	);
};

const RepositoryInfo = ({ repository }) => {
	return <View>{repository && <RepositoryItem itemObj={repository} singleRepositoryViewFlag={true} />}</View>;
};

const ReviewItem = ({ review }) => {
	// Single review item
	const theWidth = 20;
	const theHeight = 30;
	return (
		<View style={styles.blockStyle}>
			<View style={styles.spreadStyleBody}>
				{/*<View style={{ width: theWidth, height: theHeight }}>*/}
				<View>
					<Text
						style={{
							padding: 4,
							borderRadius: 10,
							borderColor: 'teal',
							borderStyle: 'solid',
							borderWidth: 2,
						}}
					>
						{review.rating}
					</Text>
				</View>
				<View>
					<Text style={styles.textBlackHeavy}>{review.user.username} </Text>
					<Text style={styles.textGreyNormal}>{review.createdAt} </Text>
					<Text style={styles.textGreyNormal}>{review.text} </Text>
				</View>
			</View>
		</View>
	);
};

export default SingleRepository;
