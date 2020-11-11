import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Container from '@material-ui/core/Container'
import Head from 'next/head'

const title = 'VIPポッキーフェス2020 Splatoon2'

function PockyFes2020() {
	return (
		<Style>
			<Head>
				<meta property="og:title" content={title} />
				<meta property="og:type" content="website " />
				<meta property="og:site_name" content={title} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			<GlobalStyle />
			<Container maxWidth="md">
				<section className="board">
					<h1>PockyFes2020</h1>
					<section>
						<h3>日時場所</h3>
						<p>
							2020年11月11日 21時〜
							<span className="rainbow">✨なんとONLINE開催✨</span>
						</p>
					</section>
					<section>
						<h3>ルール</h3>
						<p>
							チーム戦
							<br />
							ナワバリ3戦→ヤグラ5戦→ナワバリ3戦
							<br />
							「1」を稼ぎまくれ！
						</p>
					</section>
					<section>
						<h3>得点計算</h3>
						<ul>
							<li>チャーロラ武器の数 x 1pt</li>
							<li>試合勝利 + 11pt</li>
							<ul>
								メンバー毎に
								<li>塗りポイントに含まれる1の数 x 1pt</li>
								<li>キル数デス数スペシャル回数に含まれる1の数 x 1pt</li>
							</ul>
						</ul>
					</section>
				</section>
				<iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTZuOFPwwmR3FW35WuFqIiGziaNnZYxURnpvkzAoQ-AkD3hBAUysIK25JrNGxOc7OS4VGy9b8CEOcr-/pubhtml?gid=0&amp;single=false&amp;widget=false&amp;headers=false"></iframe>
			</Container>
		</Style>
	)
}

const GlobalStyle = createGlobalStyle`
	html, body {
		background: #ec524b !important;
	}
`

const Style = styled.div`
	section {
		padding: 8px 1rem;
	}
	.board {
		margin: 20px 0;
		background: white !important;
		color: brown;
		h3 {
			border-bottom: dashed 2px;
			width: 10rem;
		}
		p {
			font-weight: bold;
		}
		h1 {
			text-align: center;
			font-family: 'Baloo Bhaina', cursive; /* 使うgoogle fontによって変更 */
			font-size: 5rem;
			font-weight: bold;
			margin: 0px;
			text-shadow: 3px 3px 0 #f7d572, 6px 6px 0 #f6c561, 9px 9px 0 #f5b461;
			transform: skewY(-4deg);
			padding-top: 50px;
		}
	}
	iframe {
		width: 100%;
		height: 730px;
	}
	.rainbow {
		animation: rainbow 2.5s linear;
		animation-iteration-count: infinite;
	}
	@keyframes rainbow {
		100%,
		0% {
			color: rgb(255, 0, 0);
		}
		33% {
			color: rgb(255, 127, 0);
		}
		66% {
			color: rgb(255, 255, 0);
		}
	}
`

export default PockyFes2020
