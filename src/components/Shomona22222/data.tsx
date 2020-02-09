type Member = { name: string; comment: string; wepon: string }
type Team = { name: string; members: MemberId[]; logo: string }

type MemberId = 'ano' | 'meg' | 'mum' | 'yam' | 'lem' | 'kab' | 'shi' | 'gao'
export const members: Record<MemberId, Member> = {
	ano: { name: 'あの', comment: '仲良くねえよしね', wepon: '黒ZAP H3' },
	meg: {
		name: 'めぎゅかす♥',
		comment: 'ようちえん辞めていいですか？',
		wepon: 'バケツ ローラー',
	},
	mum: {
		name: 'むめぃ',
		comment: 'スプラトゥーーーーーーーン',
		wepon: 'ハンコ',
	},
	yam: { name: 'やまおか', comment: '竹・プライム', wepon: 'しょうもな' },
	lem: {
		name: 'lemon',
		comment: 'もし寝過したらごめんね♡',
		wepon: 'ZAP ノーチラス',
	},
	kab: { name: 'かばん', comment: 'ドラクエガイジ', wepon: 'スシコラ' },
	shi: {
		name: 'ニートのしたちくび',
		comment: 'ボールドマーカー茹でたらボイルドマーカー',
		wepon: 'ボールド無印',
	},
	gao: { name: 'がお', comment: '💩💩', wepon: '竹' },
} as const

export const teams: Team[] = [
	{
		name: 'alpha',
		logo: '/static/img/ikapur.png',
		members: ['ano', 'meg', 'mum', 'yam'],
	},
	{
		name: 'ベータベータベータベータベータ',
		logo: '/static/img/octshield.png',
		members: ['lem', 'kab', 'shi', 'gao'],
	},
]

export const gameRules = [
	'初期ギアのみ',
	'下の人の得意ブキを使う',
	'サブ禁止',
	'キル取ったらリスジャン',
	'デスしたらリスポンから5秒間マップを開き続ける',
	'デスしたらサブのみ使える状態になる(キル/アシストで解除)',
	'俺の得意ブキを使う',
] as const
export type GameRule = typeof gameRules[number] | undefined

export type Game = {
	rule: GameRule
	order: number
	win: undefined | 0 | 1
	winText: string
}
export const games: Game[] = [
	{
		order: 1,
		rule: 'デスしたらサブのみ使える状態になる(キル/アシストで解除)',
		win: 1,
		winText: 'KO',
	},
	{
		order: 2,
		rule: 'デスしたらサブのみ使える状態になる(キル/アシストで解除)',
		win: 0,
		winText: '90',
	},
	{
		order: 2,
		rule: 'デスしたらサブのみ使える状態になる(キル/アシストで解除)',
		win: undefined,
		winText: '',
	},
]
