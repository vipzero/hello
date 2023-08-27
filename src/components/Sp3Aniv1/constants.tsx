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
