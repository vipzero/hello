import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import config from '../../config'
import { MenuGroup } from './types'

const Wrapper = styled.div`
	display: flex;
	overflow: hidden;
	flex-wrap: wrap;
	/* height: ${config.headerHeihgt}; */
	background: #eee;
	&[data-fiexed='true'] {
		position: 'absolute';
	}
`

const Group = styled.div`
	display: flex;
	border-bottom: 1px solid;
	margin-bottom: 4px;
	border-radius: 0 0 0 0.8em;
	margin-left: 8px !important;
	padding-right: 8px;
`

const Tab = styled(Typography)`
	background: black;
	font-size: 20px;
	color: white;
	padding: 0 8px;
	border-radius: 0 0 0 0.8em;
`

const MenuItem = styled(Link)`
	margin-left: 10px;
	text-decoration: none;
	color: #555;
	border-bottom: 1px double gray;

	&:visited {
		color: #222;
	}
`

type Props = {
	menuGroups: MenuGroup[]
}
function NavBar(props: Props) {
	const location = useLocation()

	const fixed = location.pathname === '/'

	return (
		<Wrapper data-fixed={fixed}>
			{props.menuGroups.map(g => (
				<Group key={g.name}>
					<Tab>{g.name}</Tab>
					{g.menus.map(menu => (
						<MenuItem key={menu.path} to={`/${menu.path}`}>
							<Typography>{menu.name}</Typography>
						</MenuItem>
					))}
				</Group>
			))}
		</Wrapper>
	)
}

export default NavBar
