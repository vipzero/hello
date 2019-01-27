import * as React from 'react'
import { connect } from 'react-redux'

import styled, { keyframes } from 'styled-components'
import PatyImg from './res/paty.jpeg'
import SandImg from './res/sand.jpg'

import { State as RootState } from '../../types'

class Hoge extends React.Component<{}, { search: string }> {
	state = { search: '' }
	componentDidMount() {}

	render() {
		const { search } = this.state
		return (
			<div>
				<h2>メキシコグロ画像大百科</h2>
				<div style={{ display: 'flex' }}>
					<div>
						<h1>サンドイッチ</h1>
						<Img src={SandImg} alt="" />
					</div>
					<div>
						<h1>パーティ</h1>
						<Img src={PatyImg} alt="" />
					</div>
				</div>
			</div>
		)
	}
}

const blink = keyframes`
  from {
    transform: rotate(0deg);
		background: yellow;
  }

  to {
    transform: rotate(360deg);
		background: yellowgreen;
  }
`

const Img = styled.img`
	animation: ${blink} 10s linear infinite;
`

const ms = (state: RootState) => ({})

const conn = connect(
	ms,
	{},
)

export default conn(Hoge)
