import * as React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'

const Fire = styled.div`
	margin: 0px;
	padding: 0px;
	background: #000;
	display: flex;
	justify-content: center;

	div {
		width: 100%;
		height: 90vh;
		/* transform: translateY(20%); */
	}

	span {
		width: 100%;
		background-image: url('https://dl.dropbox.com/s/r2s8s2r17wi0xm6/flame.png?dl=0');
		background-position: 0 -1000px;
		background-clip: text;
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
	const { name } = useRouter().query

	return (
		<Fire>
			<div>
				<h1>
					<p>
						<span>{name}</span>
					</p>
					<span>おめでとう</span>
				</h1>
			</div>
		</Fire>
	)
}
const BirthdayPage = () => (
	<Layout title="誕生日おめでとー">
		<Birthday />
	</Layout>
)

export default BirthdayPage
