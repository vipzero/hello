import * as React from 'react'
import { connect } from 'react-redux'

import styled, { keyframes } from 'styled-components'

import { State as RootState } from '../../types'
import Business from './res/business_group_shock.png'
import Hera from './res/cooking_okonomiyaki_hera.png'
import HiroshimayakiImg from './res/food_hiroshimayaki.png'

const Wrap = styled.div``
const Top = styled.div`
	height: 100vh;
	width: 100vw;
`

const move = keyframes`
  0% {
		left: 0;
		top: 0;
  }

  100% {
		left: 0;
		top: 100%;
  }
`

const Hiroshimayaki = styled.img`
	height: 30vh;
	width: 30vh;
`

const Player = styled.img<{ x: number; y: number }>`
	width: 50%;
	position: absolute;
	left: ${p => p.x - 100}px;
`

const JkDiv = styled.div`
	position: relative;
	width: 1000px;
	height: 1000px;
	overflow: hidden;
`

const PlayerArea = styled.div`
	position: relative;
	height: 200px;
	width: 100%;
`

const Jk = styled.img`
	position: absolute;
	width: 200px;
	animation: ${move} 0.5s ease infinite alternate;
`

type Props = {}

type State = {
	x: number
	y: number
}

class Okonomiyaki extends React.Component<Props, State> {
	state = { x: 0, y: 0 }

	componentDidMount() {}

	render() {
		const { state } = this
		return (
			<Wrap>
				<Top>
					<Hiroshimayaki src={HiroshimayakiImg} alt="" />
					<JkDiv>
						<Jk src={Hera} alt="" />
					</JkDiv>
					<img src={Business} alt="" />
				</Top>
			</Wrap>
		)
	}
}

const ms = (state: RootState) => ({})

const conn = connect(
	ms,
	{},
)

export default conn(Okonomiyaki)
