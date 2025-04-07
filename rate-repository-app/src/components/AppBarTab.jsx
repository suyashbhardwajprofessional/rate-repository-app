import MyText from './MyText';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
  tabStyle: {
    padding: 20,
  },
});

const AppBarTab = ({ titled }) => {
	return (
		<Pressable onPress={()=>Alert.alert('Will lead you to somewhere soon..')}>
			<View style={styles.tabStyle}>
				<MyText fontSize='subheading'>
					{titled}
				</MyText>
			</View>
		</Pressable>
		)
}

export default AppBarTab