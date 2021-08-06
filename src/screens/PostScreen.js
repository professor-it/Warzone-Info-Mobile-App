import React from 'react'
import {ScrollView, View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native'
import {THEME} from '../theme'
import * as showdown from 'showdown'
import HTML, {defaultSystemFonts} from 'react-native-render-html'

export const PostScreen = ({navigation}) => {
	const post = navigation.getParam('post')

	const converter = new showdown.Converter({
		tables: true,
		simplifiedAutoLink: false,
		strikethrough: true,
		tasklists: true,
		noHeaderId: true,
	})
	const htmlPost = converter.makeHtml(post.text)
	const contentWidth = useWindowDimensions().width;
	const fonts = [...defaultSystemFonts, 'open-regular', 'open-bold']

	return (
		<ScrollView style={styles.wrapperMain}>
			<View style={styles.insertBlock}>
				<Image source={{uri: post.img}} style={styles.img}/>
			</View>
			<View style={styles.wrapper}>
				<Text style={styles.title}>{post.title}</Text>
				<Text style={styles.desc}>{post.desc}</Text>
				<HTML source={{html: htmlPost}} contentWidth={contentWidth} systemFonts={fonts} tagsStyles={stylesText} enableUserAgentStyles={true}/>
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
		fontSize: 11
	},
	text: {
		color: THEME.TEXT_COLOR,
		fontFamily: 'open-regular',
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

const stylesText = {
	body: {
		color: '#ffffff',
		fontFamily: 'open-regular'
	},
	p: {
		marginTop: 0,
		marginVertical: '0.4em'
	},
	h3: {
		color: '#fff',
		fontFamily: 'open-bold',
		fontSize: '1.17em',
		marginVertical: '1em'
	},
	h2: {
		color: '#fff',
		fontFamily: 'open-bold',
		fontSize: '1.5em',
		marginVertical: '0.83em'
	},
	h1: {
		color: '#fff',
		fontFamily: 'open-bold',
		fontSize: '2em',
		marginVertical: '0.67em'
	},
	a: {
		color: '#fff',
	},
	blockquote: {
		color: '#fff',
		marginVertical: '1.12em',
		backgroundColor: 'rgba(0,0,0,0.8)',
		fontStyle: 'italic',
	},
	table: {
		color: '#fff',
		fontFamily: 'open-regular'
	}
}