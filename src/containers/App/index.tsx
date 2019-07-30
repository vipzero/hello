import React from 'react'
import { createBrowserHistory } from 'history'
import { Route, Router } from 'react-router-dom'
import _ from 'lodash'

import AnkaChord from '../AnkaChord'
import EroJS from '../EroJS'
import Home from '../Home'
import Jiko from '../Jiko'
import LaiarGame from '../LaiarGame'
import MakeRank from '../MakeRank'
import Mekisiko from '../Mekisiko'
import Mili from '../Mili'
import Okonomiyaki from '../Okonomiyaki'
import Syukan from '../Syukan'
import Uji from '../Uji'
import Y500million from '../Y5000million'
import { YamiPrabe } from '../YamiSplatoon'
import Probability from '../Probability'
import { MenuGroup } from './types'
import NavBar from './NavBar'
import { DigHash } from '../DigHash'
import { HandSpinner } from '../HandSpinner'

export const history = createBrowserHistory()

const menuGroups: MenuGroup[] = [
	{
		name: 'トップ',
		menus: [{ path: '', name: '俺', Component: Home }],
	},
	{
		name: '芸術',
		menus: [
			{ path: 'jiko', name: '事故', Component: Jiko },
			{ path: 'uji', name: 'uji', Component: Uji },
			{ path: 'ero.js', name: 'ero.js', Component: EroJS },
			{ path: 'okonomiyaki', name: 'お好み焼き', Component: Okonomiyaki },
			{ path: 'mekisiko', name: 'お朝飯前', Component: Mekisiko },
			{ path: 'handspinner', name: 'ハンドスピナー', Component: HandSpinner },
		],
	},
	{
		name: '検証',
		menus: [
			{ path: 'laiargame', name: 'Laiar Game', Component: LaiarGame },
			{ path: 'makerank', name: 'makerank', Component: MakeRank },
			{ path: '5000000000000year', name: '5億年', Component: Y500million },
			{ path: 'syukan', name: '週間', Component: Syukan },
			{ path: 'anchord', name: '安価コード進行', Component: AnkaChord },
		],
	},
	{
		name: 'ツール',
		menus: [
			{ path: 'mili', name: 'コンママスター', Component: Mili },
			{ path: 'yamipurabe', name: '闇プラベ', Component: YamiPrabe },
			{ path: 'probability', name: 'コンマ確率グラフ', Component: Probability },
			{ path: 'dighash', name: 'Hash採掘', Component: DigHash },
		],
	},
]

const App = () => (
	<Router history={history}>
		<div>
			<NavBar menuGroups={menuGroups} />
			{_.flatten(menuGroups.map(g => g.menus)).map(menu => (
				<Route
					key={menu.path}
					exact
					path={`/${menu.path}`}
					component={menu.Component}
				/>
			))}
		</div>
	</Router>
)
export default App
