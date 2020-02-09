type Member = { name: string; comment: string; wepon: string }
type Team = { name: string; members: MemberId[]; logo: string }

export type MemberId = 'a' | 'e' | 'm' | 'y' | 'l' | 'f' | 's' | 'g'
export const members: Record<MemberId, Member> = {
	a: { name: 'あの', comment: '仲良くねえよしね', wepon: '黒ZAP H3' },
	e: {
		name: 'めぎゅかす♥',
		comment: 'ようちえん辞めていいですか？',
		wepon: 'バケツ ローラー',
	},
	m: {
		name: 'むめぃ',
		comment: 'スプラトゥーーーーーーーン',
		wepon: 'ハンコ',
	},
	y: { name: 'やまおか', comment: '竹・プライム', wepon: 'しょうもな' },
	l: {
		name: 'lemon',
		comment: 'もし寝過したらごめんね♡',
		wepon: 'ZAP ノーチラス',
	},
	f: { name: 'ふみん', comment: 'ドラクエガイジ', wepon: '知らん' },
	s: {
		name: 'ニートのしたちくび',
		comment: 'ボールドマーカー茹でたらボイルドマーカー',
		wepon: 'ボールド無印',
	},
	g: { name: 'がお', comment: '💩💩', wepon: '竹' },
} as const

export const teams: Team[] = [
	{
		name: 'alpha',
		logo: '/static/img/ikapur.png',
		members: ['a', 'e', 'm', 'y'],
	},
	{
		name: 'ベータベータベータベータベータ',
		logo: '/static/img/octshield.png',
		members: ['l', 'f', 's', 'g'],
	},
]

export const gameRules = [
	'初期ギアのみ',
	'下の人の得意ブキを使う',
	'サブ禁止',
	'キル取ったらリスジャン',
	'スプラトゥーンが嫌いなやつ全員はサブ禁止',
	'デスしたらリスポンから5秒間マップを開き続ける',
	'デスしたらサブのみ使える状態になる(キル/アシストで解除)',
	'山岡以外デスしたらサブのみ使える状態になる(キル/アシストで解除)',
	'山岡以外初期ギア',
	'2勢は相手チームの得意武器',
	'俺の得意ブキを使う',
	'得意武器以外を使う',
	'?',
	'α全員&β12の2400以上はサブスペ禁止',
] as const
export type GameRule = typeof gameRules[number] | undefined

export type Game = {
	rule: GameRule
	order: string
	win: -1 | 0 | 1
	winText: string
	aMembers: MemberId[]
	bMembers: MemberId[]
}
export const games: Game[] = [
	{
		// ほこあまび
		order: '1-1',
		rule: '俺の得意ブキを使う',
		win: 1,
		winText: '60',
		aMembers: ['y', 'm', 'f', 'e'],
		bMembers: ['a', 'l', 'g', 's'],
	},
	{
		// エリアほっけ
		order: '1-2',
		rule: '2勢は相手チームの得意武器',
		win: 1,
		winText: 'K.O',
		aMembers: ['y', 'l', 'g', 's'],
		bMembers: ['m', 'f', 'a', 'e'],
	},
	{
		// ヤグラマンタ
		order: '1-3',
		rule: '山岡以外デスしたらサブのみ使える状態になる(キル/アシストで解除)',
		win: 1,
		winText: '',
		aMembers: ['y', 'l', 'g', 's'],
		bMembers: ['m', 'f', 'a', 'e'],
	},
	{
		// エリアほっけ
		order: '1-4',
		rule: 'α全員&β12の2400以上はサブスペ禁止',
		win: 1,
		winText: '77',
		aMembers: ['m', 'f', 'g', 's'],
		bMembers: ['y', 'a', 'l', 'e'],
	},
	{
		// ホコほっけ
		order: '2-1',
		rule: '得意武器以外を使う',
		win: 0,
		winText: '?',
		aMembers: ['y', 'l', 's', 'e'],
		bMembers: ['f', 'g', 'a', 'm'],
	},
	{
		// エリアモンガラ
		order: '2-2',
		rule: 'スプラトゥーンが嫌いなやつ全員はサブ禁止',
		win: 0,
		winText: 'K.O',
		aMembers: ['y', 'g', 's', 'e'],
		bMembers: ['m', 'f', 'a', 'l'],
	},
	{
		// ヤグラスメシ
		order: '2-3',
		rule: '?',
		win: 0,
		winText: '?',
		aMembers: ['y', 'm', 'a', 'g'],
		bMembers: ['f', 'l', 's', 'e'],
	},
	{
		// アサリ
		order: '2-4',
		rule: '?',
		win: 0,
		winText: '?',
		aMembers: ['m', 'y', 'a', 'l'],
		bMembers: ['s', 'm', 'f', 'g'],
	},
	{
		// アサリ
		order: '3-1',
		rule: '?',
		win: 0,
		winText: '',
		aMembers: ['y', 'f', 'm', 'a'],
		bMembers: ['l', 's', 'g', 'e'],
	},
	{
		// アサリ
		order: '3-2',
		rule: '山岡以外初期ギア',
		win: 1,
		winText: '',
		aMembers: ['a', 'l', 'g', 'e'],
		bMembers: ['y', 'm', 'f', 's'],
	},
	{
		// アサリ
		order: '3-3',
		rule: '?',
		win: 0,
		winText: '',
		aMembers: ['y', 'a', 'l', 'g'],
		bMembers: ['m', 'f', 's', 'e'],
	},
	{
		// アサリ
		order: '3-4',
		rule: '?',
		win: 1,
		winText: '',
		aMembers: ['m', 'f', 'a', 's'],
		bMembers: ['y', 'l', 'g', 'm'],
	},
]

/*

	{
		// エリアほっけ
		order: '1-3',
		rule: '',
		win: undefined,
		winText: '',
		aMembers: ['y', 'l', 'g', 's'],
		bMembers: ['m', 'f', 'a', 'e'],
	},
*/
