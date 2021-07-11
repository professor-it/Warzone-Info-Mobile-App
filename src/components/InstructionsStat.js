import React from 'react'
import {View, Text, Linking, TouchableOpacity, StyleSheet} from 'react-native'
import {THEME} from '../theme'
import {AppHeaderIcon} from './AppHeaderIcon'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'

export const InstructionsStat = props => (
	<View>
		<Text style={styles.text}>Все что Вам необходимо сделать, это перейти в свой игровой профиль → "Игровые Сети" и изменить настройки в разделе вашей игровой платформы так, как показано ниже.</Text>
		<TouchableOpacity
			activeOpacity={0.7}
			style={styles.button}
			onPress={() => Linking.openURL('https://profile.callofduty.com/cod/profile')}
		>
			<Text style={styles.buttonText}>Перейти в профиль CoD</Text>
			<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
				<Item
					title='arrow'
					color='#abcdef'
					iconName='arrow-forward-outline'
					onPress={() => Linking.openURL('https://profile.callofduty.com/cod/profile')}
				/>
			</HeaderButtons>
		</TouchableOpacity>
		<View style={styles.wrapperSet}>
			<View style={styles.setting}>
				<Text style={styles.settingText}>Sign On Visible:</Text>
				<Text style={styles.settingTextBold}>Friends</Text>
			</View>
			<View style={styles.setting}>
				<Text style={styles.settingText}>Searchable:</Text>
				<Text style={styles.settingTextBold}>All</Text>
			</View>
			<View style={styles.setting}>
				<Text style={styles.settingText}>Data Visible:</Text>
				<Text style={styles.settingTextBold}>All</Text>
			</View>
		</View>
		<Text style={styles.text}>
			Если вы сделали все верно, но профиль все еще закрыт, нужно подождать 1 час и повторить попытку.
		</Text>
	</View>
)

const styles = StyleSheet.create({
	text: {
		color: THEME.TEXT_COLOR,
		fontFamily: 'open-bold',
		textAlign: 'justify',
		marginVertical: 4,
		fontSize: 13,
		lineHeight: 19
	},
	wrapperSet: {
		borderLeftWidth: 3,
		borderColor: THEME.LIGHTGRAY_COLOR,
		paddingLeft: 15,
		marginBottom: 10
	},
	setting: {
		flexDirection: 'row'
	},
	settingText: {
		color: THEME.TEXT_COLOR,
		fontFamily: 'open-regular',
		fontSize: 14
	},
	settingTextBold: {
		color: THEME.TEXT_COLOR,
		fontFamily: 'open-bold',
		marginLeft: 10,
		fontSize: 16
	},
	button: {
		borderBottomWidth: 1,
		borderColor: THEME.LIGHTGRAY_COLOR,
		borderRadius: 6,
		paddingBottom: 10,
		paddingHorizontal: 15,
		marginVertical: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	buttonText: {
		color: THEME.LIGTHBLUE_COLOR,
		fontFamily: 'open-bold',
		fontSize: 16
	}
})