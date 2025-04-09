import MyText from './MyText';
import { Pressable, StyleSheet, View } from 'react-native';
import theme from './theme';
import { Link } from 'react-router-native';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
	tabStyle: {
		padding: 10,
		flexGrow: 0,
	},
});

const AppBarTab = ({ titled, leadTo }) => {
	const authStorage = useAuthStorage();
	return (
		<View style={styles.tabStyle}>
			{titled === 'SignIn' && (
				<Link to={`/${leadTo}`}>
					<MyText fontSize="subheading">{titled}</MyText>
				</Link>
			)}

			{titled === 'SignOut' && (
				<Pressable onPress={() => authStorage.removeAccessToken()}>
					<MyText fontSize="subheading">{titled}</MyText>
				</Pressable>
			)}
		</View>
	);
};

export default AppBarTab;
