import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {postReducer} from './reducers/post'
import {gunReducer} from './reducers/gun'
import {statReducer} from './reducers/stat'

const rootReducer = combineReducers({
	post: postReducer,
	gun: gunReducer,
	stat: statReducer
})

export default createStore(rootReducer, applyMiddleware(thunk))
