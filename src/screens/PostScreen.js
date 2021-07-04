import React from 'react'
import {ScrollView, View, Text, StyleSheet, Image} from 'react-native'
import {DATA} from '../data'
import {THEME} from '../theme'

export const PostScreen = ({navigation}) => {
	const post = navigation.getParam('post')


	return (
		<ScrollView style={styles.wrapperMain}>
			<View style={styles.insertBlock}>
				<Image source={{uri: post.img}} style={styles.img}/>
			</View>
			<View style={styles.wrapper}>
				<Text style={styles.title}>{post.text}</Text>
				<Text style={styles.desc}>{post.desc}</Text>
				<Text style={styles.text}>{post.text}</Text>
			</View>
		</ScrollView>
	)
}

PostScreen.navigationOptions = ({navigation}) => {
	return {
		headerTitle: '',
	}
}

const styles = StyleSheet.create({
	wrapperMain: {
		flex: 1,
		paddingVertical: 5,
		backgroundColor: THEME.MAIN_COLOR,
	},
	wrapper: {
		paddingHorizontal: 5,
	},
	title: {
		color: THEME.TEXT_COLOR,
		fontFamily: 'open-bold',
		fontSize: 22
	},
	desc: {
		color: '#ccc',
		fontFamily: 'open-bold',
		marginTop: 5,
		marginBottom: 15,
	},
	text: {
		color: THEME.TEXT_COLOR,
		fontSize: 14,
		textAlign: 'justify'
	},
	insertBlock: {
		height: 200,
		marginBottom: 15
	},
	img: {
		width: '100%',
		height: '100%',
	}
})