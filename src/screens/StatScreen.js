import React from 'react'
import {View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator, ScrollView} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {THEME} from '../theme'
import {changeBattleNick, changePlatform, loadStat} from '../store/actions/stat'

const formatDate = (date) => {
	const dd = new Date(date)

	let d = dd;
	d = [
		'0' + d.getDate(),
		'0' + (d.getMonth() + 1),
	].map(component => component.slice(-2));
	const c = '' + dd.getFullYear()

	return d.slice(0, 3).join('.') + '.' + c;
}

const stats = (allStats) => {
	return (
		<View>
			<View style={styles.wrapperStatsDate}>
				<Text style={styles.titleStatDate}>{allStats.date.title}:</Text>
				<Text style={styles.textStatDate}>{formatDate(allStats.date.value)}</Text>
			</View>
			<View style={styles.wrapperStats}>
				<Text style={styles.titleStat}>{allStats.gamesPlayed.title}:</Text>
				<View style={styles.textStat}>
					<Text style={styles.textStatWrapper}>{allStats.gamesPlayed.value}</Text>
				</View>
			</View>
			<View style={styles.wrapperStats}>
				<Text style={styles.titleStat}>{allStats.kdRatio.title}:</Text>
				<View style={styles.textStat}>
					<Text style={styles.textStatWrapper}>{allStats.kdRatio.value}</Text>
				</View>
			</View>
			<View style={styles.wrapperStats}>
				<Text style={styles.titleStat}>{allStats.avgKillsGame.title}:</Text>
				<View style={styles.textStat}>
					<Text style={styles.textStatWrapper}>{allStats.avgKillsGame.value}</Text>
				</View>
			</View>
			<View style={styles.wrapperStats}>
				<Text style={styles.titleStat}>{allStats.kills.title}:</Text>
				<View style={styles.textStat}>
					<Text style={styles.textStatWrapper}>{allStats.kills.value}</Text>
				</View>
			</View>
			<View style={styles.wrapperStats}>
				<Text style={styles.titleStat}>{allStats.deaths.title}:</Text>
				<View style={styles.textStat}>
					<Text style={styles.textStatWrapper}>{allStats.deaths.value}</Text>
				</View>
			</View>
			<View style={styles.wrapperStats}>
				<Text style={styles.titleStat}>{allStats.wins.title}:</Text>
				<View style={styles.textStat}>
					<Text style={styles.textStatWrapper}>{allStats.wins.value}</Text>
				</View>
			</View>
			<View style={styles.wrapperStats}>
				<Text style={styles.titleStat}>{allStats.wlRatio.title}:</Text>
				<View style={styles.textStat}>
					<Text style={styles.textStatWrapper}>{allStats.wlRatio.value}</Text>
				</View>
			</View>
			<View style={styles.wrapperStats}>
				<Text style={styles.titleStat}>{allStats.timePlayed.title}:</Text>
				<View style={styles.textStat}>
					<Text style={styles.textStatWrapper}>{allStats.timePlayed.value}</Text>
				</View>
			</View>
			<View style={styles.wrapperStats}>
				<Text style={styles.titleStat}>{allStats.averageLife.title}:</Text>
				<View style={styles.textStat}>
					<Text style={styles.textStatWrapper}>
						{`${allStats.averageLife.value.hours}:${allStats.averageLife.value.min}:${allStats.averageLife.value.sec}`}
					</Text>
				</View>
			</View>
			<View style={styles.wrapperStats}>
				<Text style={styles.titleStat}>{allStats.top5.title}:</Text>
				<View style={styles.textStat}>
					<Text style={styles.textStatWrapper}>{allStats.top5.value}</Text>
				</View>
			</View>
			<View style={styles.wrapperStats}>
				<Text style={styles.titleStat}>{allStats.top10.title}:</Text>
				<View style={styles.textStat}>
					<Text style={styles.textStatWrapper}>{allStats.top10.value}</Text>
				</View>
			</View>
			<View style={styles.wrapperStats}>
				<Text style={styles.titleStat}>{allStats.top25.title}:</Text>
				<View style={styles.textStat}>
					<Text style={styles.textStatWrapper}>{allStats.top25.value}</Text>
				</View>
			</View>
		</View>
	)
}

const InfoProfile = (infoProfile) => {
	return (
		<View style={styles.infoProfile}>
			{infoProfile.map((e, index) => {
				return (
					<Text key={index} style={styles.noUserText}>{e.text}</Text>
				)
			})}
		</View>
	)
}

const NUser = (nuser, infoProfile) => {
	return (
		<View>
			<View style={styles.noUser}>
				{nuser.map((e, index) => {
					return (
						<Text key={index} style={styles.noUserText}>{e.text}</Text>
					)
				})}
			</View>
			{InfoProfile(infoProfile)}
		</View>
	)
}

export const StatScreen = () => {
	const user = useSelector(state => state.stat.user)
	const platform = useSelector(state => state.stat.platform)
	const data = useSelector(state => state.stat.data)
	const nuser = useSelector(state => state.stat.noUser)
	const infoProfile = useSelector(state => state.stat.infoProfile)

	const dispatch = useDispatch()

	React.useEffect(() => {
		dispatch(loadStat(user.platform, user.battleNick))
	}, [])

	const allStats = useSelector(state => state.stat.stats)
	const loading = useSelector(state => state.stat.loading)
	const error = useSelector(state => state.stat.error)

	const loader = () => {
		return (
			<View style={{
				flex: 0.1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: THEME.MAIN_COLOR
			}}>
				<ActivityIndicator
					color={THEME.TEXT_COLOR}
				/>
			</View>
		)
	}

	return (
		<ScrollView style={styles.wrapper}>
			<View style={styles.wrapperPlatform}>
				{platform.map((item, index) => {
					return(
						<Pressable
							key={index}
							style={[styles.platform, {
								backgroundColor: user.platform === item.value ? THEME.LIGHTGRAY_COLOR : null
							}]}
							onPress={() => dispatch(changePlatform(item.value))}
						>
							<Text style={styles.platformText}>{item.label}</Text>
						</Pressable>
					)
				})}
			</View>
			<TextInput
				style={styles.input}
				placeholder={data.input}
				placeholderTextColor={'#999'}
				autoCompleteType={'off'}
				autoCorrect={false}
				keyboardAppearance={'dark'}
				returnKeyType={'send'}
				textAlign={'center'}
				value={user.battleNick.replace(/%23/g, '#')}
				onChangeText={text => dispatch(changeBattleNick(text))}
			/>
			<Pressable
				style={({pressed}) => [
					{
						backgroundColor: pressed
							? '#111'
							: null
					},
					styles.button
				]}
				onPress={() => {
					dispatch(loadStat(user.platform, user.battleNick, true))
				}}
			>
				<Text style={styles.buttonText}>{data.button}</Text>
			</Pressable>
			{loading
				? loader()
				: allStats
					? stats(allStats)
					: error
						? NUser(nuser, infoProfile)
						: InfoProfile(infoProfile)
			}
		</ScrollView>
	)
}

StatScreen.navigationOptions = {
	headerTitle: 'Статистика',
}

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: THEME.MAIN_COLOR,
		flex: 1,
		paddingHorizontal: 10,
	},
	input: {
		borderBottomWidth: 1,
		borderTopWidth: 1,
		borderColor: THEME.LIGHTGRAY_COLOR,
		height: 60,
		fontSize: 20,
		fontFamily: 'open-bold',
		color: '#fff',
	},
	wrapperPlatform: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 15
	},
	platform: {
		color: '#fff',
		borderWidth: 2,
		borderColor: THEME.LIGHTGRAY_COLOR,
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 10,
	},
	platformText: {
		color: '#fff',
		fontFamily: 'open-regular',
		fontSize: 13
	},
	button: {
		marginVertical: 20,
		borderWidth: 1,
		borderColor: THEME.LIGHTGRAY_COLOR,
		borderRadius: 50,
		paddingVertical: 15,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontFamily: 'open-bold'
	},
	h1: {
		color: '#fff',
		fontFamily: 'open-bold',
		fontSize: 20
	},
	wrapperStats: {
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: THEME.LIGHTGRAY_COLOR,
		paddingHorizontal: 10,
		paddingVertical: 5,
		marginVertical: 5,
		borderRadius: 10,
		backgroundColor: '#0B0B0B',
		alignItems: 'center'
	},
	titleStat: {
		color: '#fff',
		fontFamily: 'open-bold',
		width: '50%',
		fontSize: 16,
	},
	textStat: {
		width: '50%',
		alignItems: 'center'
	},
	textStatWrapper: {
		color: '#fff',
		fontFamily: 'open-bold',
		fontSize: 16,
		backgroundColor: '#2B2B2B',
		paddingVertical: 7,
		paddingHorizontal: 15,
		borderRadius: 50,
		borderWidth: 1,
		borderColor: THEME.BORDER_COLOR
	},
	wrapperStatsDate: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginVertical: 5,
	},
	titleStatDate: {
		color: '#fff',
		fontFamily: 'open-bold',
		marginRight: 5,
		letterSpacing: 1,
		fontSize: 10
	},
	textStatDate: {
		color: '#fff',
		fontFamily: 'open-regular',
		letterSpacing: 1,
		fontSize: 10
	},
	noUser: {
		borderWidth: 3,
		borderColor: 'red',
		borderRadius: 10,
		paddingVertical: 15,
		paddingHorizontal: 20,
		marginBottom: 20
	},
	noUserText: {
		color: '#fff',
		fontFamily: 'open-bold',
		textAlign: 'justify',
		marginVertical: 4,
		fontSize: 12
	},
	noUserTextH1: {
		color: '#fff',
		fontFamily: 'open-bold',
		textAlign: 'justify',
		marginVertical: 4,
		fontSize: 20
	},
	infoProfile: {
		borderWidth: 3,
		borderColor: '#fff',
		borderRadius: 10,
		paddingVertical: 15,
		paddingHorizontal: 20
	},
})