import { Image, StyleSheet, Text, View } from 'react-native'
import theme from './theme';

const RepositoryItem = ({ itemObj }) => {
	const styles = StyleSheet.create({
		blockStyle: {
			padding:10,
			flexDirection:'column',
			justifyContent: 'space-between',
			alignContent: 'space-between',
			backgroundColor:'white',
		},
		spreadStyle: {
			flex:1,
			flexDirection: 'row',
			columnGap:5,
		}, 
		spreadStyleFooter: {
			flex:1,
			flexDirection: 'row',
			columnGap:5,
			justifyContent: 'space-around',
		}, 
		smallImage: {
			height: 50,
			width: 50,
			borderRadius: 5,
			overflow: 'hidden'
		},
		avatarBlock:{
			padding:5,
		},
		textBlackHeavy: {
			color: theme.colors.textBlack,
		    fontSize: theme.fontSizes.body,
		    fontFamily: theme.fonts.main,
		    fontWeight: theme.fontWeights.heavy
		},
		textGreyNormal: {
			color: theme.colors.textSecondary,
		    fontSize: theme.fontSizes.body,
		    fontFamily: theme.fonts.main,
		    fontWeight: theme.fontWeights.normal
		},
		textWhiteLabel: {
			color: theme.colors.textWhite,
		    fontSize: theme.fontSizes.body,
		    fontFamily: theme.fonts.main,
		    fontWeight: theme.fontWeights.normal,
		    backgroundColor:theme.colors.fillPrimary,
		},
		labelsContainer: {
			flex:1,
			flexDirection:'row',
			justifyContent:'flex-start'
		},
		buttonLikeLabel: {
			fontWeight: theme.fontWeights.normal,

		}
	})

	return (
		<View style={styles.blockStyle}>
			<View style={styles.spreadStyle}>
				<View style={styles.avatarBlock}>
					<Image
				        style={styles.smallImage}
				        source={{ uri: itemObj.ownerAvatarUrl }}
				    />
			    </View>
			    <View style={{flex: 1}}>
			    	<Text style={styles.textBlackHeavy}>{itemObj.fullName} </Text>
			    	<Text style={styles.textGreyNormal}>{itemObj.description} </Text>
				    <View style={styles.labelsContainer}>
			    		<Text style={styles.textWhiteLabel}>{itemObj.language} </Text>
			    	</View>
			    </View>
			</View>
			<View style={styles.spreadStyleFooter}>
	    		<View>
	    			<Text> {itemObj.stargazersCount} </Text>
	    			<Text>Stars</Text>
	    		</View>
	    		<View>
	    			<Text> {itemObj.forksCount} </Text>
	    			<Text>Forks</Text>
	    		</View>
	    		<View>
	    			<Text>{itemObj.reviewCount} </Text>
	    			<Text>reviews</Text>
	    		</View>
	    		<View>
	    			<Text>{itemObj.ratingAverage} </Text>
	    			<Text>Rating</Text>
	    		</View>
	    	</View>
		</View>)
}

export default RepositoryItem