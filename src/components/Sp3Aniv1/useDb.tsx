import { useCallback, useEffect, useState } from 'react'
import { Board, Match, MatchResult, Member } from './constants'
import { subscribeBoards, updateBoard } from './firebase'

export const flipResult = (r: MatchResult) => {
	if (!r) return r
	return { ...r, win: r.win === 1 ? 2 : r.win === 2 ? 1 : 0 }
}
const fliped = (match: Match) => ({
	...match,
	from: match.to,
	to: match.from,
	results: match.results.map((r) => flipResult(r)),
})
const initBoard: Board = {
	teams: [],
	battles: [],
	matchs: [],
	teamNum: 4,
}

export const useDb = () => {
	const [board, setBoard] = useState<Board | null>(null)
	const [members, setMembers] = useState<Member[] | null>(null)

	useEffect(() => {
		const t = subscribeBoards((board) => {
			setBoard({ ...initBoard, ...board })
		})
		return () => t()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const teamById = new Map(board?.teams.map((t) => [t.id, t]))

	const matchById = new Map(board?.matchs.map((m) => [m.from + '_' + m.to, m]))
	const activeTeams =
		(board?.teamNum === 3
			? board?.teams.slice(0, 3)
			: board?.teams.slice(0, 4)) || []
	const tableData = activeTeams.map((t1) => {
		const matchs = activeTeams.map((t2) => {
			const m1 = matchById.get(t1.id + '_' + t2.id)
			if (m1) return { to: t2, match: m1, flip: false }
			const m2 = matchById.get(t2.id + '_' + t1.id)
			if (m2) return { to: t2, match: fliped(m2), flip: true }
			return { to: t2, match: null, flip: false }
		})
		const matchWithScore = matchs.map((m) => {
			const winCount = m.match?.results.filter((r) => r?.win === 1).length || 0
			const loseCount = m.match?.results.filter((r) => r?.win === 2).length || 0
			return {
				...m,
				koCount:
					m.match?.results.filter((r) => r?.win === 1 && r?.ko).length || 0,
				winCount: m.match?.results.filter((r) => r?.win === 1).length || 0,
				win: winCount >= 3 ? 1 : loseCount >= 3 ? 2 : 0,
			}
		})

		return {
			matchs: matchWithScore,
			team: t1,
			point: matchWithScore.filter((m) => m.win === 1).length,
			pointBattle: matchWithScore
				.map((m) => m.winCount)
				.reduce((a, b) => a + b, 0),
			pointKo: matchWithScore.map((m) => m.koCount).reduce((a, b) => a + b, 0),
		}
	})

	const updateMatchResult = useCallback(
		(team1: string, team2: string, results: MatchResult[]) => {
			if (!board) return
			const ti1 = board.matchs.findIndex(
				(m) => m.from === team1 && m.to === team2
			)
			if (ti1 === undefined) return
			const matchs = [...board.matchs]
			matchs[ti1].results = results
			updateBoard({ ...board, matchs })
		},
		[board]
	)

	return {
		board,
		matchById,
		teamById,
		tableData,
		activeTeams,
		members,
		updateTeamPlayer: (teamId: string, names: string[]) => {
			if (!board) return
			const teams = [...board.teams]
			const ti = board.teams.findIndex((t) => t.id === teamId)
			teams[ti].players = names

			updateBoard({ ...board, teams })
		},
		updateTeamName: (teamId: string, name: string) => {
			if (!board) return
			const teams = [...board.teams]
			const ti = board.teams.findIndex((t) => t.id === teamId)
			teams[ti].name = name

			updateBoard({ ...board, teams })
		},
		updateMatchResult,
		updateMatchResultValue: (
			teamId1: string,
			teamId2: string,
			r: number,
			resultNum: number
		) => {
			if (!board) return

			const ti1 = board.matchs.findIndex(
				(m) => m.from === teamId1 && m.to === teamId2
			)
			if (ti1 === undefined) return
			const { results } = board.matchs[ti1]

			const res = [...(results || [])]

			res[resultNum] = { ...res[resultNum], win: r }
			updateMatchResult(
				teamId1,
				teamId2,
				[...res].map((v) => v || { win: 0, ko: false })
			)
		},
		updateMatchResultKoCheck: (
			teamId1: string,
			teamId2: string,
			resultNum: number,
			ko: boolean
		) => {
			if (!board) return
			const ti1 = board.matchs.findIndex(
				(m) => m.from === teamId1 && m.to === teamId2
			)
			if (ti1 === undefined) return

			const { results } = board.matchs[ti1]

			const res = [...(results || [])]

			res[resultNum] = { ...res[resultNum], ko }
			updateMatchResult(
				teamId1,
				teamId2,
				[...res].map((v) => v || { win: 0, ko: false })
			)
		},
		setTeamNum: (num: number) => {
			if (!board) return
			updateBoard({ ...board, teamNum: num })
		},
	}
}
