import React from 'react'
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	FlatList,
	Dimensions
} from 'react-native'
import {THEME} from '../theme'
import {useSelector} from 'react-redux'
import {GunDetailScreen} from './GunDetailScreen'

const {width, height} = Dimensions.get('screen')

export const VersionScreen = ({navigation}) => {
	const item = navigation.getParam('item')
	return (
		<View style={styles.page}>
			{item.map((e, index) => {
				return (
					<TouchableOpacity
						key={index}
						style={(index === item.length - 1) ? styles.noWrapperEl : styles.wrapperEl}
						activeOpacity={0.8}
						onPress={() => navigation.navigate('GunList', {item: e.item})}
					>
						<Text style={[styles.el, {fontSize: 16}]}>{e.title}</Text>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}

export const GunListScreen = ({navigation}) => {
	const item = navigation.getParam('item')
	return (
		<View style={styles.page}>
			{item.map((e, index) => {
				return (
					<TouchableOpacity
						key={index}
						style={(index === item.length - 1) ? styles.noWrapperEl : styles.wrapperEl}
						activeOpacity={0.8}
						onPress={() => navigation.navigate('GunLoadout', {item: e.item, nameGun: e.title})}
					>
						<Text style={[styles.el, {fontSize: 13}]}>{e.title}</Text>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}

export const GunLoadoutScreen = ({navigation}) => {
	const item = navigation.getParam('item')
	const nameGun = navigation.getParam('nameGun')
	return (
		<View style={styles.page}>
			{item.map((e, index) => {
				return (
					<TouchableOpacity
						key={index}
						style={(index === item.length - 1) ? styles.noWrapperEl : styles.wrapperEl}
						activeOpacity={0.8}
						onPress={() => navigation.navigate('GunDetail', {item: e.item, nameGun: nameGun})}
					>
						<Text style={[styles.el, {fontSize: 13}]}>{e.title}</Text>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}

export const GunScreen = ({navigation}) => {
	const guns = useSelector(state => state.gun.gunInfo)
	return (
		<View style={styles.page}>
			{guns.map((e, index) => {
				return (
					<TouchableOpacity
						key={index}
						style={(index === guns.length - 1) ? styles.noWrapperEl : styles.wrapperEl}
						activeOpacity={0.8}
						onPress={() => navigation.navigate('GunVersion', {item: e.item})}
					>
						<Text style={[styles.el, {fontSize: 13}]}>{e.title}</Text>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}

GunScreen.navigationOptions = {
	headerTitle: 'Сборки',
}
VersionScreen.navigationOptions = {
	headerTitle: '',
}
GunListScreen.navigationOptions = {
	headerTitle: '',
}
GunLoadoutScreen.navigationOptions = ({navigation}) => {
	const nameGun = navigation.getParam('nameGun')
	return {
		headerTitle: nameGun,
	}
}

const styles = StyleSheet.create({
	page: {
		backgroundColor: THEME.MAIN_COLOR,
		flex: 1,
		justifyContent: 'space-between',
		padding: 10
	},
	wrapperEl: {
		flex: 1,
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderColor: '#181818'
	},
	noWrapperEl: {
		flex: 1,
		justifyContent: 'center',
	},
	el: {
		color: '#ccc',
		fontFamily: 'open-bold',
		textAlign: 'center'
	}
})