import createHistory from 'history/createBrowserHistory'
import React from 'react'
import { Link, Route, Router } from 'react-router-dom'
import styled from 'styled-components'

import AnkaChord from '../AnkaChord'
import EroJS from '../EroJS'
import Home from '../Home'
import Jiko from '../Jiko'
import LaiarGame from '../LaiarGame'
import MakeRank from '../MakeRank'
import Mekisiko from '../Mekisiko'
import Mili from '../Mili'
import Mushimegane from '../Mushimegane'
import Ping from '../Ping'
import Syukan from '../Syukan'
import Uji from '../Uji'
import Y500million from '../Y5000million'

export const history = createHistory()
const MenuItem = styled(Link)`
	margin-left: 10px;
`

const App = () => (
	<Router history={history}>
		<div>
			<div>
				<MenuItem to="/">俺</MenuItem>
				<MenuItem to="/jiko">jiko</MenuItem>
				<MenuItem to="/uji">uji</MenuItem>
				<MenuItem to="/makerank">makerank</MenuItem>
				<MenuItem to="/5000000000000year">5億年</MenuItem>
				<MenuItem to="/ero.js">ero JS</MenuItem>
				<MenuItem to="/laiargame">Laiar Game</MenuItem>
				<MenuItem to="/mekisiko">朝飯前</MenuItem>
				<MenuItem to="/anchord">安価コード進行</MenuItem>
				<MenuItem to="/syukan">週間</MenuItem>
				<MenuItem to="/mili">コンママスター</MenuItem>
				<MenuItem to="/ping">Ping</MenuItem>
				{/* <MenuItem to="/mushimegane">見てるぞ</MenuItem> */}
			</div>
			<Route exact path="/" component={Home} />
			<Route exact path="/anchord" component={AnkaChord} />
			<Route exact path="/syukan" component={Syukan} />
			<Route exact path="/jiko" component={Jiko} />
			<Route exact path="/uji" component={Uji} />
			<Route exact path="/makerank" component={MakeRank} />
			<Route exact path="/5000000000000year" component={Y500million} />
			<Route exact path="/ero.js" component={EroJS} />
			<Route exact path="/laiargame" component={LaiarGame} />
			<Route exact path="/mekisiko" component={Mekisiko} />
			<Route exact path="/mili" component={Mili} />
			<Route exact path="/ping" component={Ping} />
			<Route exact path="/mushimegane" component={Mushimegane} />
		</div>
	</Router>
)
export default App
