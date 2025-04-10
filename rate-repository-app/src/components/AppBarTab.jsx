import MyText from './MyText';
import { Pressable, StyleSheet, View } from 'react-native';
import theme from './theme';
import { Link, useNavigate } from 'react-router-native';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
	tabStyle: {
		padding: 10,
		flexGrow: 0,
	},
});

const AppBarTab = ({ titled, leadTo }) => {
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();
	const navigate = useNavigate()
	return (
		<View style={styles.tabStyle}>
			{titled === 'SignOut' ? (
				<Pressable onPress={() => {
					authStorage.removeAccessToken();
					apolloClient.resetStore();
					navigate('/signin')
					}
				}>
					<MyText fontSize="subheading">{titled}</MyText>
				</Pressable>
			) : (
				<Link to={`/${leadTo}`}>
					<MyText fontSize="subheading">{titled}</MyText>
				</Link>
			)}
		</View>
	);
};

export default AppBarTab;
