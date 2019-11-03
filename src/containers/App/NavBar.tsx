import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import config from '../../config'
import { MenuGroup } from './types'

const MenuItem = styled(Link)`
	margin-right: 10px;
`

type Props = {
	menuGroups: MenuGroup[]
}
function NavBar(props: Props) {
	return (
		<div style={{ display: 'flex', height: config.headerHeihgt }}>
			{props.menuGroups.map(g => (
				<div key={g.name}>
					<div>{g.name}</div>
					{g.menus.map(menu => (
						<MenuItem key={menu.path} to={`/${menu.path}`}>
							{menu.name}
						</MenuItem>
					))}
				</div>
			))}
		</div>
	)
}

export default NavBar
