import React from 'react'
import {View, Text, StyleSheet, Image, Linking, ScrollView, FlatList} from 'react-native'
import {THEME} from '../theme'
import {useSelector} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {AppHeaderIcon} from '../components/AppHeaderIcon'


export const GunDetailScreen = ({navigation}) => {
	const itemBase = navigation.getParam('item')
	const textUI = useSelector(state => state.gun.textUI)
	const modules = useSelector(state => state.gun.modules)
	const authorSoc = useSelector(state => state.gun.authorSoc).find(e => e.title === itemBase.title)
	const arrModules = Object.keys(modules)

	function moduleView(module, index) {
		const moduleObj = Object.keys(modules[module]).find(e => e === itemBase[module])

		return (
			<View key={index} style={styles.wrapperItemBlock}>
				<Text style={styles.h2}>
					{modules[module].title}
				</Text>
				<View style={styles.wrapperSocBlock}>
					<Image
						style={styles.itemImg}
						source={{uri: modules[module][moduleObj].img}}
					/>
					<Text style={styles.desc}>{modules[module][moduleObj].title}</Text>
				</View>
			</View>
		)
	}

	return (
		<ScrollView style={styles.wrapper}>
			<Image
				style={styles.mainImg}
				source={{uri: itemBase.img}}
			/>
			<View style={styles.wrapperSocBlock}>
				<Text style={styles.descBold}>{textUI.author}: </Text>
				<Text style={styles.desc}>{itemBase.author}</Text>
				{authorSoc.youtube ?
					<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
						<Item title='Gun' iconName='logo-youtube'
							  onPress={() => Linking.openURL(authorSoc.youtube)}/>
					</HeaderButtons>
					: null}
				{authorSoc.twitch ?
					<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
						<Item title='Gun' iconName='logo-twitch'
							  onPress={() => Linking.openURL(authorSoc.twitch)}/>
					</HeaderButtons>
					: null}
			</View>
			<View style={styles.wrapperSocBlock}>
				<Text>
					<Text style={styles.descBold}>{textUI.goal}: </Text>
					<Text style={styles.desc}>{itemBase.goal}.</Text>
				</Text>
			</View>
			<Text style={styles.h1}>{textUI.setup}</Text>
			{arrModules.map((e, index) => itemBase[e] ? moduleView(e, index) : null)}
		</ScrollView>
	)
}

GunDetailScreen.navigationOptions = ({navigation}) => {
	const nameGun = navigation.getParam('nameGun')
	return {
		headerTitle: nameGun,
	}
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: THEME.MAIN_COLOR,
		paddingHorizontal: 10
	},
	mainImg: {
		width: '100%',
		height: 125,
		marginTop: 45,
		marginBottom: 10,
		resizeMode: 'contain',
	},
	itemImg: {
		width: 50,
		height: 50,
		resizeMode: 'contain',
		marginRight: 10
	},
	wrapperSocBlock: {
		flexDirection: 'row',
		alignSelf: 'flex-start',
		alignItems: 'center',
		width: '100%',
	},
	wrapperItemBlock: {
		alignSelf: 'flex-start',
		width: '100%',
		borderBottomWidth: 1,
		borderColor: '#181818',
		marginBottom: 15
	},
	desc: {
		color: THEME.TEXT_COLOR,
		fontFamily: 'open-regular',
		fontSize: 14,
		marginRight: 'auto',
	},
	descBold: {
		color: THEME.TEXT_COLOR,
		fontFamily: 'open-bold',
		fontSize: 14,
	},
	h1: {
		color: THEME.TEXT_COLOR,
		fontFamily: 'open-bold',
		fontSize: 23,
		marginVertical: 20,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#181818',
		width: '100%',
		textAlign: 'center',
		paddingVertical: 7,
	},
	h2: {
		color: THEME.TEXT_COLOR,
		fontFamily: 'open-bold',
		fontSize: 16,
		marginBottom: 15
	},
})