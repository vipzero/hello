import { useState } from 'react'
import { Button } from '@material-ui/core'
import styled from 'styled-components'
import { teams } from './data'

function Shomona22222() {
	const [count, setCount] = useState<number>(0)

	return (
		<Style>
			<header>
				<h1>SHOMONA CUP 2020年令和2年2月第2回</h1>
			</header>
			<footer>
				<ul>
					<li>
						<a href="">スレ: TODO</a>
					</li>
				</ul>
			</footer>
		</Style>
	)
}

const Style = styled.div`
	padding: 0;
	margin: 0;
	background-color: #4bb0b8;
	background-image: liner-gradient(45deg, transparent 48%, #bfdece 48%),
		liner-gradient(135deg, transparent 48%, #bfdece 48%);

	background-size: 100px 100px;
	display: grid;
`

export default Shomona22222
