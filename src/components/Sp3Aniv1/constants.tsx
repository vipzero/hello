export const battleRules = [
	{ id: 'a', name: 'エリア' },
	{ id: 'y', name: 'ヤグラ' },
	{ id: 'h', name: 'ホコ' },
	{ id: 's', name: 'アサリ' },
	{ id: 'n', name: 'ナワバリ' },
]

export type Team = {
	id: string
	name: string
	players: string[]
}

export type Battle = {
	from: string
	to: string
	win: boolean
}

export type MatchResult = { win: number; ko: boolean }
export type Match = {
	from: string
	to: string
	results: MatchResult[]
}

export type Board = {
	teams: Team[]
	battles: Battle[]
	matchs: Match[]
}

export const schedules = [
	{
		time: '22:00',
		match: [
			['t1', 't2'],
			['t3', 't4'],
		],
	},
	{
		time: '22:45',
		match: [
			['t1', 't3'],
			['t2', 't4'],
		],
	},
	{
		time: '23:30',
		match: [
			['t1', 't4'],
			['t2', 't3'],
		],
	},
]
