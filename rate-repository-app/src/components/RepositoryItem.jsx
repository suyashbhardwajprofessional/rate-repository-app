import { Text } from 'react-native'

const RepositoryItem = ({ itemObj }) => {
	return (<>
		<Text> Full name: {itemObj.fullName} </Text>
		<Text> Description: {itemObj.description} </Text>
		<Text> Langauge: {itemObj.language} </Text>
		<Text> Stars: {itemObj.stargazersCount} </Text>
		<Text> Forks: {itemObj.forksCount} </Text>
		<Text> Reviews: {itemObj.reviewCount} </Text>
		<Text> Ratings: {itemObj.ratingAverage} </Text>
		</>)
}

export default RepositoryItem