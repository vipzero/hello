import * as React from 'react'
import { connect } from 'react-redux'

import styled, { keyframes } from 'styled-components'

import Bug from '../../components/bug_uji.png'
import waniClose from '../../components/wani_close.png'
import waniOpen from '../../components/wani_open.png'
import { State as RootState } from '../../types'

const Wrap = styled.div`
	display: flex;
`
const Left = styled.div`
	width: 80%;
`

const move = keyframes`
  from {
    transform: rotate(0deg);
		left: 0;
  }

  to {
		left: 80%;
    transform: rotate(360deg);
  }
`

const Uji = styled.img`
	position: absolute;
	width: 5em;
	animation: ${move} 0.3s linear infinite;
`

const Wani = styled.div`
	width: 30%;
`

const appear = keyframes`
  0 { z-index: 0; }
  49% { z-index: 0; }
  50% { z-index: 1; }
  100% { z-index: 1; }
`

const Open = styled.div`
	position: absolute;
	top: 0;
	opacity: 1;
	animation: ${appear} 1s infinite alternate;
`

const Close = styled.div`
	position: absolute;
	top: 0;
`

type Props = {}

class Home extends React.Component<Props> {
	render() {
		// const {} = this.props
		return (
			<Wrap>
				<Left>
					<Uji src={Bug} alt="" />
				</Left>

				<Wani>
					<Open>
						<img src={waniOpen} alt="" />
					</Open>
					<Close>
						<img src={waniClose} alt="" />
					</Close>
				</Wani>
			</Wrap>
		)
	}
}

const ms = (state: RootState) => ({})

const conn = connect(
	ms,
	{},
)

export default conn(Home)
