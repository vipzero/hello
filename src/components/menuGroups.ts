import AnkaChord from '../containers/AnkaChord'
import EroJS from '../containers/EroJS'
import Home from '../containers/Home'
import Jiko from '../containers/Jiko'
import LaiarGame from '../containers/LaiarGame'
import MakeRank from '../containers/MakeRank'
import Mekisiko from '../containers/Mekisiko'
import Mili from '../containers/Mili'
import Okonomiyaki from '../containers/Okonomiyaki'
import Syukan from '../containers/Syukan'
import Uji from '../containers/Uji'
import Y500million from '../containers/Y5000million'
import { YamiPrabe } from '../containers/YamiSplatoon'
import Probability from '../containers/Probability'
import BBSGacha from '../containers/BBSGacha'
import { DigHash } from '../containers/DigHash'
import Othelle from '../containers/Othelle'
import Mikel from '../containers/Mikel'
import Birthday from '../containers/Birthday'
import Xmas from '../containers/Xmas'
import Joya from '../containers/Joya'
import Omikuji from '../containers/Omikuji'
import { MenuGroup } from '../containers/App/types'

const menuGroups: MenuGroup[] = [
	{
		name: 'トップ',
		menus: [{ path: '', name: '俺', Component: Home }],
	},
	{
		name: 'ゲーム',
		menus: [
			{ path: 'omikuji', name: 'おみくじ', Component: Omikuji },
			{ path: 'xmas', name: 'クリスマス', Component: Xmas },
			{ path: 'joya', name: '除夜', Component: Joya },
		],
	},
	{
		name: '芸術',
		menus: [
			{ path: 'jiko', name: '事故', Component: Jiko },
			{ path: 'uji', name: 'uji', Component: Uji },
			{ path: 'ero.js', name: 'ero.js', Component: EroJS },
			{ path: 'okonomiyaki', name: 'お好み焼き', Component: Okonomiyaki },
			{ path: 'mekisiko', name: 'お朝飯前', Component: Mekisiko },
			{ path: 'othelle', name: 'オセレ', Component: Othelle },
			{ path: 'birthday', name: 'バースデー', Component: Birthday },
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

export default menuGroups
