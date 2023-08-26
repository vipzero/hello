import { useEffect, useState } from 'react'
import { subscribeBoards, updateBoard } from './firebase'
import { Battle, Board, Match } from './constants'

export const useDb = () => {
	const [board, setBoard] = useState<Board | null>(null)
	useEffect(() => {
		const t = subscribeBoards((board) => {
			console.log(board)
			setBoard(board)
		})
		return () => t()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return {
		board,
		updateTeamPlayer: (teamId: string, names: string[]) => {
			if (!board) return
			const teams = [...board.teams]
			const ti = board.teams.findIndex((t) => t.id === teamId)
			teams[ti].players = names

			updateBoard({ ...board, teams })
		},
		updateMatchResult: (team1: string, team2: string, results: number[]) => {
			if (!board) return
			const ti1 = board.matchs.findIndex(
				(m) => m.from === team1 && m.to === team2
			)
			if (ti1 === undefined) return
			const matchs = [...board.matchs]
			matchs[ti1].results = results
			updateBoard({ ...board, matchs })
		},
	}
}
