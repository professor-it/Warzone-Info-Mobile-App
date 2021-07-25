import React, {useRef, useEffect} from 'react'
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Animated,
	Dimensions,
	ActivityIndicator
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {Post} from '../components/Post'
import {THEME} from '../theme'
import {loadPosts} from '../store/actions/post'

const {width, height} = Dimensions.get('screen')

const tabName = [
	{
		id: 1,
		title: 'Новости',
		rub: 'news',
		ref: React.createRef()
	},
	{
		id: 2,
		title: 'Статьи',
		rub: 'articles',
		ref: React.createRef()
	}
]

const Indicator = ({measures, scrollX}) => {
	const inputRange = tabName.map((_, i) => i * width)
	const indicatorWidth = scrollX.interpolate({
		inputRange,
		outputRange: measures.map(e => e.width),
	})
	const translateX = scrollX.interpolate({
		inputRange,
		outputRange: measures.map(e => e.x),
	})
	return <Animated.View
		style={{
			position: 'absolute',
			height: '100%',
			borderRadius: THEME.BORDER_RADIUS,
			backgroundColor: THEME.LIGHTGRAY_COLOR,
			left: 0,
			width: indicatorWidth,
			transform: [{
				translateX
			}]
		}}
	/>
}

const Tabs = ({scrollX, onItemPres}) => {
	const [measures, setMeasures] = React.useState([])
	const containerRef = React.useRef()
	React.useEffect(() => {
		const m = []
		tabName.forEach(item => {
			item.ref.current.measureLayout(containerRef.current, (x, y, width, height) => {
				m.push({
					x, y, width, height
				})

				if (m.length === tabName.length) {
					setMeasures(m)
				}
			})
		})
	}, [containerRef.current])
	return (
		<View
			style={{
				flexDirection: 'row'
			}}
			ref={containerRef}
		>
			{measures.length > 0 && <Indicator measures={measures} scrollX={scrollX}/>}

			{tabName.map((item, index) => {
				return (
					<TouchableOpacity
						key={`NewsTab-${item.id}`}
						style={{
							flex: 1
						}}
						onPress ={() => onItemPres(index)}
					>
						<View
							style={{
								paddingHorizontal: 15,
								alignItems: 'center',
								justifyContent: 'center',
								height: 35
							}}
							ref={item.ref}
						>
							<Text
								style={{
									color: THEME.TEXT_COLOR,
									fontFamily: 'open-bold',
									fontSize: 14
								}}
							>{item.title}</Text>
						</View>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}

export const HomeScreen = ({navigation}) => {
	const scrollX = useRef(new Animated.Value(0)).current
	const ref = React.useRef()
	const onItemPres = React.useCallback((itemIndex) => {
		ref?.current?.scrollToOffset({
			offset: itemIndex * width,
		})
	})

	const openPostHandler = post => {
		navigation.navigate('Post', {post})
	}

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadPosts())
	}, [dispatch])

	const allPosts = useSelector(state => state.post.allPosts)
	const loading = useSelector(state => state.post.loading)


	if (loading) {
		return (
			<View style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: THEME.MAIN_COLOR
			}}>
				<ActivityIndicator
					color={THEME.TEXT_COLOR}
					size='large'
				/>
			</View>
		)
	}

	function renderTabBar() {
		return (
			<View
				style={{
					backgroundColor: THEME.BG_COLOR,
					borderRadius: THEME.BORDER_RADIUS,
					marginVertical: 5,
					marginHorizontal: 10
				}}
			>
				<Tabs scrollX={scrollX} onItemPres={onItemPres}/>
			</View>
		)
	}

	return (
		<View style={styles.wrapper}>
			{renderTabBar()}
			<Animated.FlatList
				ref={ref}
				data={tabName}
				keyExtractor={el => el.id.toString()}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={Animated.event([
						{nativeEvent: {contentOffset: {x: scrollX}}}
					], {useNativeDriver: false}
				)}
				renderItem={({item}) => {
					const post = allPosts.filter(i => i.rub === item.rub)

					if (!post.length && item.rub === 'news') {
						return (
							<View style={styles.view}>
								<Text
									style={styles.text}
								>
									Новости пока что отсутствуют.
								</Text>
							</View>
						)
					} else if (!post.length && item.rub === 'articles') {
						return (
							<View style={styles.view}>
								<Text
									style={styles.text}
								>
									Статьи пока что отсутствуют.
								</Text>
							</View>
						)
					}

					return (
						<View style={{width, paddingHorizontal: 10}}>
							<FlatList
								data={post.sort((a, b) => new Date(b.date) - new Date(a.date))}
								refreshing={true}
								keyExtractor={(el, index) => index.toString()}
								renderItem={({item}) => <Post post={item} onOpen={openPostHandler}/>}
							/>
						</View>
					)
				}}
			/>
		</View>
	)
}

HomeScreen.navigationOptions = {
	headerTitle: 'Лента',
}

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: THEME.MAIN_COLOR,
		flex: 1,
	},
	view: {
		width,
		paddingHorizontal: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		color: '#ccc',
		fontSize: 16,
	}
})