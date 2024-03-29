import { MenuGroup } from '../types/menu'

const menuGroups: MenuGroup[] = [
	{
		name: 'トップ',
		menus: [{ path: '', name: '俺' }],
	},
	{
		name: 'ゲーム',
		menus: [
			{ path: '/game/omikuji', name: 'おみくじ' },
			{ path: '/game/xmas', name: 'クリスマス' },
			{ path: '/game/joya', name: '除夜' },
		],
	},
	{
		name: '芸術',
		menus: [
			{ path: '/art/jiko', name: '事故' },
			{ path: '/art/ero', name: 'ero.js' },
			{ path: '/art/okonomiyaki', name: 'お好み焼き' },
			{ path: '/art/mekisiko', name: 'お朝飯前' },
			{ path: '/art/othelle', name: 'オセレ' },
			{ path: '/art/birthday', name: 'バースデー' },
		],
	},
	{
		name: '検証',
		menus: [
			{ path: '/exp/laiargame', name: 'Laiar Game' },
			{ path: '/exp/makerank', name: 'makerank' },
			{ path: '/exp/5000000000000year', name: '5億年' },
			{ path: '/exp/syukan', name: '週間' },
			{ path: '/exp/anchord', name: '安価コード進行' },
		],
	},
	{
		name: 'ツール',
		menus: [
			{ path: '/tool/mili', name: 'コンママスター' },
			{ path: '/tool/flushese', name: 'フラッシュ暗算' },
			{ path: '/tool/yamipurabe', name: '闇プラベ' },
			{ path: '/tool/splatoon-shuffle8', name: 'シャッフルプラベ' },
			{ path: '/tool/probability', name: 'コンマ確率グラフ' },
			{ path: '/tool/dighash', name: 'Hash採掘' },
			{ path: '/tool/bbsgacha', name: '板ガチャ' },
			{ path: '/tool/mikel', name: 'マイコーズ' },
			{ path: '/tool/words-regex', name: '正規表現メーカー' },
			{ path: '/tool/ruru', name: 'るるさん' },
			{ path: '/tool/uraru', name: 'yuuaarueru' },
			{ path: '/tool/column', name: '2列テキストツール' },
			{ path: '/tool/pastable-url', name: 'レスできるURL生成' },
			{ path: '/tool/trueskill-rate', name: 'TrueSkill' },
		],
	},
	{
		name: 'LP',
		menus: [
			{ path: '/pockeyfes2020', name: 'ポッキーフェス2020' },
			{ path: '/shomona22222', name: 'しょうもな杯2' },
			{ path: 'https://shomona.vipper.dev', name: 'しょうもな杯' },
			{
				path: 'https://tsuyunojin-splatoon2019.vipper.dev/',
				name: 'VIPダービー梅雨の陣',
			},
			{
				path: '/splat3-aniv1-2023',
				name: 'Splat3VIP2023',
			},
			{
				path: 'https://github.com/vipzero/rekka-haikei',
				name: '暇アニ背景',
			},
		],
	},
]

export default menuGroups
