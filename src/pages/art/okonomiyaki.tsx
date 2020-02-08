import * as React from 'react'

import styled, { keyframes } from 'styled-components'

import Layout from '../../components/Layout'
import NavBar from '../../components/NavBar'

const Wrap = styled.div``
const Top = styled.div`
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

const Okonomiyaki = () => (
	<Layout title="okonomiyakijksyakai">
		<NavBar />
		<Wrap>
			<Top>
				<Hiroshimayaki
					src={'/static/img/irasutoya/food_hiroshimayaki.png'}
					alt=""
				/>
				<JkDiv>
					<Jk
						src={'/static/img/irasutoya/cooking_okonomiyaki_hera.png'}
						alt="irasutoya jk"
					/>
				</JkDiv>
				<img
					src="/static/img/irasutoya/business_group_shock.png"
					alt="irasutoya business"
				/>
			</Top>
		</Wrap>
	</Layout>
)

export default Okonomiyaki
