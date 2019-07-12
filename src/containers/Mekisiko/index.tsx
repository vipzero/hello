import * as React from 'react'

import styled, { keyframes } from 'styled-components'
import PatyImg from './res/paty.jpeg'
import SandImg from './res/sand.jpg'

class Mekisiko extends React.Component<{}, { search: string }> {
	state = { search: '' }
	componentDidMount() {}

	render() {
		return (
			<Page>
				<h2 style={{ margin: '12px 20px' }}>メキシコグロ画像大百科</h2>
				<div style={{ display: 'flex' }}>
					<Item>
						<MenuTitle>Sand 1</MenuTitle>
						<Img src={SandImg} alt="" />
					</Item>
					<Item>
						<MenuTitle>3Hands</MenuTitle>
						<Img src={PatyImg} alt="" />
					</Item>
				</div>
			</Page>
		)
	}
}

const blink = keyframes`
  from { transform: rotate(0deg) scale(1); }
	25% { transform: rotate(-30deg) scale(0.5); }
	50% { transform: rotate(0deg) scale(1); }
	75% { transform: rotate(30deg) scale(0.5); }
  to { transform: rotate(0deg) scale(1); }
`

const Item = styled.article`
	background: white;
	width: 40%;
	padding: 8px;
	margin: 8px;
	border: solid 1px #fd0;
	border-radius: 4px;
`

const Page = styled.div`
	background: orange;
	height: 100vh;
	width: 100vh;
`

const MenuTitle = styled.h2`
	padding-left: 1em;
	font-family: 'Major Mono Display', monospace;
`
const Img = styled.img`
	animation: ${blink} 5s linear infinite;
`

export default Mekisiko
