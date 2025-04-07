import { Image, StyleSheet, Text, View } from 'react-native';
import theme from './theme';
import MyText from './MyText';

const RepositoryItem = ({ itemObj }) => {
	const styles = StyleSheet.create({
		blockStyle: {
			padding: 10,
			flexDirection: 'column',
			backgroundColor: 'white',
		},

		spreadStyleBody: {
			flex: 1,
			flexDirection: 'row',
			columnGap: 10,
			alignItems: 'flex-start',
		},
		spreadStyleFooter: {
			flex: 1,
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
			flex: 1,
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

	return (
		<View style={styles.blockStyle}>
			<View style={styles.spreadStyleBody}>
				<View>
					<Image style={styles.thumbnailImage} source={{ uri: itemObj.ownerAvatarUrl }} />
				</View>
				<View style={{ flex: 1 }}>
					<Text style={styles.textBlackHeavy}>{itemObj.fullName} </Text>
					<Text style={styles.textGreyNormal}>{itemObj.description} </Text>
					<View style={styles.labelsContainer}>
						<Text style={styles.textWhiteLabel}>{itemObj.language} </Text>
					</View>
				</View>
			</View>
			<View style={styles.spreadStyleFooter}>
				<View>
					<MyText fontWeight="bold" color="textLight">
						{' '}
						{itemObj.stargazersCount > 1000
							? `${(itemObj.stargazersCount / 1000).toPrecision(3)}k`
							: itemObj.stargazersCount}{' '}
					</MyText>
					<MyText color="textSecondary">Stars</MyText>
				</View>
				<View>
					<MyText fontWeight="bold" color="textLight">
						{' '}
						{itemObj.forksCount > 1000 ? `${(itemObj.forksCount / 1000).toPrecision(3)}k` : itemObj.forksCount}{' '}
					</MyText>
					<MyText color="textSecondary">Forks</MyText>
				</View>
				<View>
					<MyText fontWeight="bold" color="textLight">
						{' '}
						{itemObj.reviewCount > 1000 ? `${(itemObj.reviewCount / 1000).toPrecision(3)}k` : itemObj.reviewCount}{' '}
					</MyText>
					<MyText color="textSecondary">Reviews</MyText>
				</View>
				<View>
					<MyText fontWeight="bold" color="textLight">
						{' '}
						{itemObj.ratingAverage > 1000 ? `${(itemObj.ratingAverage / 1000).toPrecision(3)}k` : itemObj.ratingAverage}{' '}
					</MyText>
					<MyText color="textSecondary">Ratings</MyText>
				</View>
			</View>
		</View>
	);
};

export default RepositoryItem;
