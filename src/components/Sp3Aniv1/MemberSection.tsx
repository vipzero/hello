import { Box, Card, Typography } from '@mui/material'
import { useState } from 'react'
import styled from 'styled-components'
import { useDb, useMembers } from './useDb'
import { getImagePath } from '../../data/splatoon3-weapon-lib'
import { Member } from './constants'

const MemberSection = () => {
	const { board, tableData, teamById, activeTeams } = useDb()
	const { members } = useMembers()
	const [hilTeam, setHilTeam] = useState<string>('')

	if (board === null || members === null) return <div>loading</div>
	let least: Member[] = [...members]
	board.teams.forEach((t) => {
		t.players.forEach((p) => {
			least = least.filter((m) => m.name !== p)
		})
	})

	return (
		<Style data-hilight={hilTeam}>
			<div>
				<h2>メンバー</h2>
				<Box>
					{board.teams.map((team) => (
						<Box key={team.id}>
							<Typography>{team.name}</Typography>
							<Box display="flex" flexWrap={'wrap'}>
								{team.players.map((p) => {
									const member = members.find((m) => m.name === p)
									if (!member) return null

									return (
										<Card key={member.name}>
											<Box width={'200px'}>
												<Typography>{member.name}</Typography>
												{member.weapons.map((w) => {
													const [wname, opt] = w.split(':')
													const weaponPath = getImagePath(wname)
													return wname === 'All' ? (
														<div className="all" style={{ width: '3rem' }}>
															全能
														</div>
													) : (
														<img
															data-opt={opt}
															style={{ width: '2rem' }}
															key={w}
															src={`/badge/${weaponPath}`}
														/>
													)
												})}
											</Box>
										</Card>
									)
								})}
							</Box>
						</Box>
					))}
				</Box>
				{least.length > 0 && <Typography>残り</Typography>}
				<Box display="flex" flexWrap={'wrap'}>
					{least.map((member) => {
						return (
							<Card key={member.name}>
								<Box width={'200px'}>
									<Typography>{member.name}</Typography>
									{member.weapons.map((w) => {
										const [wname, opt] = w.split(':')
										const weaponPath = getImagePath(wname)
										return wname === 'All' ? (
											<div className="all" style={{ width: '3rem' }}>
												全能
											</div>
										) : (
											<img
												data-opt={opt}
												style={{ width: '2rem' }}
												key={w}
												src={`/badge/${weaponPath}`}
											/>
										)
									})}
								</Box>
							</Card>
						)
					})}
				</Box>
			</div>
		</Style>
	)
}

const Style = styled.div`
	img {
		&[data-opt='all'],
		.all {
			border: orange dashed 1px;
		}
	}
`

export default MemberSection
