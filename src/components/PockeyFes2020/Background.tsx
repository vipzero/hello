import React from 'react'
import styled from 'styled-components'

function Background() {
	return (
		<Style>
			{[...Array(20).keys()].map((i) => (
				<div
					key={i}
					style={{
						left: `${Math.random() * 100}%`,
						animationDelay: `${i}s`,
					}}
					className="item"
				>
					<Pockey />
				</div>
			))}
		</Style>
	)
}
const Style = styled.div`
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	position: fixed;
	overflow: hidden;
	.item {
		position: fixed;
		display: block;
		list-style: none;
		animation: animate 25s ease-in-out infinite;
		bottom: -20vh;
	}
	@keyframes animate {
		0% {
			transform: translateY(0) rotate(0deg);
		}

		50% {
			transform: translateY(-120vh) rotate(720deg);
		}

		100% {
			transform: translateY(0) rotate(0deg);
		}
	}
`

const Pockey = () => (
	<PockeyStyle>
		<div />
		<div />
	</PockeyStyle>
)
const PockeyStyle = styled.div`
	padding: 4px;
	div {
		height: 90px;
		border-left: solid #993430 6px;
	}
	div:first-child {
		height: 30px;
		border-left: solid #eec570 4px;
		margin-left: 1px;
	}
`

export default Background
