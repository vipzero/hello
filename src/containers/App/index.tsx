/* eslint import/max-dependencies: 0 */
import React from 'react'
import { createBrowserHistory } from 'history'
import { Route, Router } from 'react-router-dom'
import _flatten from 'lodash/flatten'

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
import { HandSpinner } from '../HandSpinner'
import BBSGacha from '../BBSGacha'
import { DigHash } from '../DigHash'
import Othelle from '../Othelle'
import Mikel from '../Mikel'
import Birthday from '../Birthday'
import Xmas from '../Xmas'
import NavBar from './NavBar'
import { MenuGroup } from './types'

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
			{ path: 'othelle', name: 'オセレ', Component: Othelle },
			{ path: 'birthday', name: 'バースデー', Component: Birthday },
			{ path: 'xmas', name: 'クリスマス', Component: Xmas },
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
			{ path: 'bbsgacha', name: '板ガチャ', Component: BBSGacha },
			{ path: 'mikel', name: 'マイコーズ', Component: Mikel },
		],
	},
]

const App = () => (
	<Router history={history}>
		<div>
			<NavBar menuGroups={menuGroups} />
			{_flatten(menuGroups.map(g => g.menus)).map(menu => (
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
