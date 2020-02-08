import * as React from 'react'

import styled, { keyframes } from 'styled-components'

import Layout from '../../components/Layout'

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

const Jiko = () => (
	<Layout title="事故だ！">
		<Wrap>
			<Top>
				<Hikinige src={'/static/img/irasutoya/jiko_car_hikinige.png'} alt="" />
				<PlayerArea>
					<Player
						style={{
							left: `${400 - 100}px`,
						}}
						src={'/static/img/irasutoya/smartphone_schoolgirl_stand_smile.png'}
						alt="irasutoya player"
					/>
				</PlayerArea>
				<JkDiv>
					<Jk src={'/static/img/irasutoya/'} alt="" />
				</JkDiv>
			</Top>
		</Wrap>
	</Layout>
)

export default Jiko
