import React from 'react'
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity
} from 'react-native'
import {THEME} from '../theme'
import {useDispatch, useSelector} from 'react-redux'
import {ads} from '../store/actions/gun'

import {AdMobInterstitial} from 'expo-ads-admob'

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

const adsInt = async () => {
	await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/8691691433')
	await AdMobInterstitial.requestAdAsync({servePersonalizedAds: true})
	await AdMobInterstitial.showAdAsync()
}

export const GunLoadoutScreen = ({navigation}) => {
	const item = navigation.getParam('item')
	const nameGun = navigation.getParam('nameGun')
	const adsView = useSelector(state => state.gun.ads)
	const dispatch = useDispatch()
	return (
		<View style={styles.page}>
			{item.map((e, index) => {
				return (
					<TouchableOpacity
						key={index}
						style={(index === item.length - 1) ? styles.noWrapperEl : styles.wrapperEl}
						activeOpacity={0.8}
						onPress={async () => {
							if (adsView === 1) {
								await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/8691691433')
								await AdMobInterstitial.requestAdAsync({servePersonalizedAds: true})
								await AdMobInterstitial.showAdAsync()
							}
							dispatch(ads())
							navigation.navigate('GunDetail', {item: e.item, nameGun: nameGun})
						}}
					>
						<Text style={[styles.el, {fontSize: 13}]}>{e.title}</Text>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}

export const ErrorGunScreen = () => (
	<View style={styles.errorPage}>
		<View style={styles.errorBorder}>
			<Text style={styles.errorText}>Просим прощения!</Text>
			<Text style={styles.errorText}>Оружие в этой категории ещё не добавлено.</Text>
			<Text style={styles.errorText}>Но в ближайших обновлениях мы это исправим.</Text>
		</View>
	</View>
)

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
						onPress={() => {
							if (!e.item) {
								navigation.navigate('ErrorGun')
							} else {
								navigation.navigate('GunVersion', {item: e.item})
							}
						}}
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
ErrorGunScreen.navigationOptions = {
	headerTitle: 'Упсс..',
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
	},
	errorPage: {
		backgroundColor: THEME.MAIN_COLOR,
		flex: 1,
		justifyContent: 'center',
		padding: 10
	},
	errorBorder: {
		borderWidth: 2,
		borderColor: 'red',
		borderRadius: 20,
		paddingVertical: 20,
		paddingHorizontal: 10
	},
	errorText: {
		color: '#fff',
		fontFamily: 'open-bold',
		textAlign: 'center',
		fontSize: 14,
		marginVertical: 3
	}
})