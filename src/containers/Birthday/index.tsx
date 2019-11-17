import * as React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'

const Fire = styled.div`
	margin: 0px;
	padding: 0px;
	background: #000;
	display: flex;
	justify-content: center;

	div {
		width: 100%;
		height: 100vh;
		transform: translateY(20%);
	}

	span {
		width: 100%;
		background-image: url('https://dl.dropbox.com/s/r2s8s2r17wi0xm6/flame.png?dl=0');
		background-position: 0 -1000px;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: fire 4s linear infinite;
	}

	h1 {
		color: #fff;
		font-size: 10vw;
		text-align: center;
	}

	@keyframes fire {
		0% {
			background-position: 0% -50%;
		}
		50% {
			background-position: 0% -25%;
		}
		100% {
			background-position: 0% -50%;
		}
	}
`

function Birthday() {
	const { search } = useLocation()
	const q = qs.parse(search)

	return (
		<Fire>
			<div>
				<h1>
					<p>
						<span>{q.name}</span>
					</p>
					<span>おめでとう</span>
				</h1>
			</div>
		</Fire>
	)
}

export default Birthday
