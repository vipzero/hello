import * as React from 'react'

import styled, { keyframes } from 'styled-components'

import Business from '../../res/irasutoya/business_group_shock.png'
import Hera from '../../res/irasutoya/cooking_okonomiyaki_hera.png'
import HiroshimayakiImg from '../../res/irasutoya/food_hiroshimayaki.png'
import Layout from '../../components/Layout'
import NavBar from '../../components/NavBar'

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

const JkDiv = styled.div`
	position: relative;
	width: 1000px;
	height: 1000px;
	overflow: hidden;
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

const Okonomiyaki = () => (
	<Layout title="okonomiyakijksyakai">
		<NavBar />
		<Wrap>
			<Top>
				<Hiroshimayaki src={HiroshimayakiImg} alt="" />
				<JkDiv>
					<Jk src={Hera} alt="irasutoya jk" />
				</JkDiv>
				<img src={Business} alt="irasutoya business" />
			</Top>
		</Wrap>
	</Layout>
)

export default Okonomiyaki
