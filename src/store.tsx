// @HACKME enable flow
import { applyMiddleware, compose, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import reducer from './reducer'

import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

const persistConfig = {
	key: 'primary',
	storage,
	whitelist: [],
}

export default () => {
	const middleware = [thunk]
	const enhancers = [] as any[]

	if (process.env.NODE_ENV === 'development') {
		enhancers.push(
			(window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
				(window as any).__REDUX_DEVTOOLS_EXTENSION__(),
		)
	}

	// HACKME:
	const composer = compose(
		applyMiddleware(...middleware),
		...enhancers,
	)

	const persistedReducer = persistReducer(persistConfig, reducer)
	const store = createStore(persistedReducer, composer)
	const persistor = persistStore(store)
	return { store, persistor }
}
