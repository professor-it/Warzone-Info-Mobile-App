import React from 'react'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {Ionicons} from '@expo/vector-icons'
import {HomeScreen} from '../screens/HomeScreen'
import {PostScreen} from '../screens/PostScreen'
import {THEME} from '../theme'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {AppHeaderIcon} from '../components/AppHeaderIcon'
import {GunListScreen, GunLoadoutScreen, GunScreen, VersionScreen} from '../screens/GunScreen'
import {InfoScreen} from '../screens/InfoScreen'
import {GunDetailScreen} from '../screens/GunDetailScreen'
import {StatScreen} from '../screens/StatScreen'


const styleTopNav = {
	defaultNavigationOptions: ({navigation}) => ({
		headerStyle: {
			backgroundColor: THEME.MAIN_COLOR,
			borderBottomWidth: 1,
			borderBottomColor: THEME.BORDER_COLOR,
		},
		headerTitleStyle: {
			fontSize: 26,
			fontFamily: 'open-bold'
		},
		headerTintColor: THEME.TEXT_COLOR,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
				<Item title='Gun' iconName='information-circle-outline'
					  onPress={() => navigation.navigate('Info')}/>
			</HeaderButtons>
		),
	})
}

const PostNavigator = createStackNavigator({
	Home: HomeScreen,
	Post: PostScreen,
	Info: InfoScreen
}, styleTopNav)

const GunNavigator = createStackNavigator({
	Gun: GunScreen,
	GunVersion: VersionScreen,
	GunList: GunListScreen,
	GunLoadout: GunLoadoutScreen,
	GunDetail: GunDetailScreen,
	Info: InfoScreen
}, styleTopNav)

const StatNavigator = createStackNavigator({
	Gun: StatScreen,
	Info: InfoScreen
}, styleTopNav)


const BottomNavigator = createBottomTabNavigator({
	Post: {
		screen: PostNavigator,
		navigationOptions: {
			tabBarLabel: 'Лента',
			tabBarIcon: info => <Ionicons
				name='newspaper-outline'
				size={22}
				color={info.tintColor}
			/>
		}
	},
	Gun: {
		screen: GunNavigator,
		navigationOptions: {
			tabBarLabel: 'Сборки',
			tabBarIcon: info => <Ionicons
				name='cube-outline'
				size={22}
				color={info.tintColor}
			/>
		}
	},
	Stat: {
		screen: StatNavigator,
		navigationOptions: {
			tabBarLabel: 'Статистика',
			tabBarIcon: info => <Ionicons
				name='stats-chart-outline'
				size={22}
				color={info.tintColor}
			/>
		}
	},
}, {
	tabBarOptions: {
		activeTintColor: THEME.TEXT_COLOR,
		style: {
			borderTopWidth: 1,
			borderTopColor: THEME.BORDER_COLOR,
			backgroundColor: THEME.MAIN_COLOR,
			paddingTop: 5,
			height: 55,
		},
		labelStyle: {
			fontFamily: 'open-regular',
			fontSize: 10
		}
	}
})

export const AppNavigation = createAppContainer(BottomNavigator)