import React from 'react'
import {
	View,
	StyleSheet,
	Text
} from 'react-native'
import {THEME} from '../theme'

export const InfoScreen = ({navigation}) => {
	return (
		<View style={styles.wrapper}>
			<View style={styles.view}>
				<Text style={styles.textBold}>Версия:</Text>
				<Text style={styles.text}>1.0.0</Text>
			</View>
			<View style={styles.view}>
				<Text style={styles.textBold}>Автор:</Text>
				<Text style={styles.text}>Николаенко Дмитрий</Text>
			</View>
		</View>
	)
}

InfoScreen.navigationOptions = {
	headerTitle: 'О приложении',
}

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: THEME.MAIN_COLOR,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	view: {
		flexDirection: 'row'
	},
	textBold: {
		color: THEME.TEXT_COLOR,
		fontFamily: 'open-bold',
		lineHeight: 32,
		fontSize: 15,
		marginRight: 5
	},
	text: {
		color: THEME.TEXT_COLOR,
		fontFamily: 'open-regular',
		fontStyle: 'italic',
		lineHeight: 32,
		fontSize: 15
	}
})