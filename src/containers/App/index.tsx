/* eslint import/max-dependencies: 0 */
import React from 'react'
import { createBrowserHistory } from 'history'
import { Route, Router } from 'react-router-dom'
import _flatten from 'lodash/flatten'

import NavBar from './NavBar'
import menuGroups from './menuGroups'

export const history = createBrowserHistory()

const App = () => (
	<Router history={history}>
		<div>
			{_flatten(menuGroups.map(g => g.menus)).map(menu => (
				<Route
					key={menu.path}
					exact
					path={`/${menu.path}`}
					component={menu.Component}
				/>
			))}
			<NavBar />
		</div>
	</Router>
)

export default App
