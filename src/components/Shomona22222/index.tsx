import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import Head from 'next/head'
import TeamSection from './TeamSection'
import GameSection from './GameSection'
import BoardSection from './BoardSection'

function Shomona22222() {
	return (
		<Style>
			<Head>
				<meta property="og:title" content="第二回しょうもな杯 Splatoon2" />
				<meta property="og:type" content="website " />
				<meta
					property="og:url"
					content="https://hello.vipper.dev/shomona22222"
				/>
				<meta
					property="og:image"
					content="https://hello.vipper.dev/shomona22222/thumbnail.png"
				/>
				<meta property="og:site_name" content="第二回しょうもな杯 Splatoon2" />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			<Container maxWidth="md">
				<header>
					<h1>
						<a href="#">SHOMONA CUP</a>
						<a href="#">
							2<span className="stop">0</span>2<span className="stop">0</span>
							<span className="stop">年令和</span>2
							<span className="stop">年</span>2
							<span className="stop">月第</span>2回
						</a>
					</h1>
					<h3 style={{ textAlign: 'right' }}>2020/02/09(日) 21:00</h3>
				</header>
				<div>
					<h2>大会について</h2>
					<ul>
						<li>
							試合ごとに俺が考えたしょうもない特殊ルールの抽選(今回は戦闘に関わるもののみ)
						</li>
						<li>その状況下で試合する</li>
						<li>最終的に勝ち数で優勝を決める</li>
						<li>4×4=16(試合)</li>
						<li>タチウオガンガゼBバスは除外</li>
					</ul>
				</div>
				<TeamSection />
				<GameSection />
				<BoardSection />
				<div>
					<h2>勝者</h2>
					<div>1位 やまおか</div>
					<div>2位 あの</div>
					<div>3位 むめい</div>
				</div>
				<footer>
					<ul>
						<li>
							<a href="http://hebi.5ch.net/test/read.cgi/news4vip/1581209829/l50">
								VIPスレ
							</a>
						</li>
						<li>
							<a href="https://www.twitch.tv/videos/549277349">配信: むめい</a>
						</li>
						<li>
							<a href="https://shomona.vipper.dev/">2019-05 しょうもな杯</a>
						</li>
						<li>
							<a href="https://tsuyunojin-splatoon2019.vipper.dev">
								2019-06 VIPダービー梅雨の陣
							</a>
						</li>
						<li>
							<a href="https://hello.vipper.dev" style={{ color: 'green' }}>
								made by vip000000
							</a>
						</li>
						<li>
							<a href="https://github.com/vipzero/hello/tree/master/src/components/Shomona22222">
								このサイトのコード
							</a>
						</li>
						<li>
							<a href="https://google.com" style={{ color: 'orange' }}>
								主催: やまおか
							</a>
						</li>
					</ul>
				</footer>
			</Container>
		</Style>
	)
}

const Style = styled.div`
	padding: 0;
	margin: 0;
	background-color: #000;
	color: white;

	background: repeating-linear-gradient(
		90deg,
		#030303,
		#030303 100px,
		#404040 100px,
		#404040 102px
	);
	display: grid;

	h1 {
		text-align: center;
		color: white;
		text-transform: uppercase;
		padding: 1px;
		margin-top: 10vh;
		margin-bottom: 10vh;
		font-family: 'Raleway', cursive;
		font-weight: 100;
		position: relative;
		background: linear-gradient(left, black, #eee, black);
		background: -webkit-linear-gradient(left, black, #eee, black);
		span.stop {
			font-size: 0.2rem;
		}
		&:before {
			content: '';
			position: absolute;
			left: 50%;
			top: -50px;
			width: 100%;
			margin-left: -300px;
			margin-top: -220px;
			height: 600px;
			z-index: -1;
		}
		a {
			background: black;
			display: block;
			padding: 20px;
			text-decoration: none;
			letter-spacing: 10px;
			color: white;
		}
	}
	h2 {
		position: relative;
		margin-bottom: 2rem;

		&:before {
			content: '';
			position: absolute;
			width: 0.5rem;
			height: 4px;
			background: yellow;
			bottom: -8px;
		}
	}
	ul > li {
		a {
			color: yellow;
		}
	}
`

export default Shomona22222
