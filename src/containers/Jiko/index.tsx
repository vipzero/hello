import * as React from 'react'

import styled, { keyframes } from 'styled-components'

import { useMouseMove } from 'react-use-mouse-move'
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

function Jiko() {
	const { x } = useMouseMove()

	return (
		<Wrap>
			<Top>
				<Hikinige src={HikinigeImg} alt="" />
				<PlayerArea>
					<Player
						style={{
							left: `${x - 100}px`,
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

export default Jiko
