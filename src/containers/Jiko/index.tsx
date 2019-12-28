import * as React from 'react'

import styled, { keyframes } from 'styled-components'

import PlayerImg from './res/figure_tousenbo.png'
import HikinigeImg from './res/jiko_car_hikinige.png'
import JkImg from './res/smartphone_schoolgirl_stand_smile.png'

const Wrap = styled.div``
const Top = styled.div`
	width: 50%;
`

const move = keyframes`
  0% {
		left: 0;
		top: 0;
  }
  25% {
		left: 100%;
		top: 0;
	}
  50% {
		left: 100%;
		top: 100%;
	}

  75% {
		left: 0;
		top: 100%;
  }

  100% {
		left: 0;
		top: 0;
  }
`

const Hikinige = styled.img`
	width: 50%;
`

const Player = styled.img`
	width: 50%;
	position: absolute;
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
	animation: ${move} 3s linear infinite;
`

type Props = {}

type State = {
	x: number
	y: number
}

class Home extends React.Component<Props, State> {
	state = { x: 0, y: 0 }

	_onMouseMove(e) {
		console.log(e)
		console.log(e.clientX, e.clientY)
		this.setState({ x: e.clientX, y: e.clientY })
	}

	render() {
		const { state } = this

		return (
			<Wrap>
				<Top>
					<Hikinige src={HikinigeImg} alt="" />
					<PlayerArea onMouseMove={e => this._onMouseMove(e)}>
						<Player
							style={{
								left: `${state.x - 100}px`,
							}}
							src={PlayerImg}
							alt="irasutoya player"
						/>
					</PlayerArea>
					<JkDiv>
						<Jk src={JkImg} alt="" />
					</JkDiv>
				</Top>
			</Wrap>
		)
	}
}

export default Home
