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
	yam: { name: 'やまおか', comment: '', wepon: '' },
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
