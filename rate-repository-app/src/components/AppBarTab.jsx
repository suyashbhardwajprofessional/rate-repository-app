import MyText from './MyText';
import { StyleSheet, View } from 'react-native';
import theme from './theme';
import { Link } from 'react-router-native'

const styles = StyleSheet.create({
  tabStyle: {
    padding: 10,
    flexGrow: 0,
  },
});

const AppBarTab = ({ titled, leadTo }) => {
	return (
			<View style={styles.tabStyle}>
				<Link to={`/${leadTo}`} >
					<MyText fontSize='subheading'>
						{titled}
					</MyText>
				</Link>
			</View>
		)
}

export default AppBarTab