import React from 'react'
import { MenuGroup } from './types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import _ from 'lodash'

const MenuItem = styled(Link)`
	margin-right: 10px;
`

type Props = {
	menuGroups: MenuGroup[]
}
function NavBar(props: Props) {
	return (
		<div style={{ display: 'flex' }}>
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
