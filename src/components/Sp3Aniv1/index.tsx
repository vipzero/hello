import { Box, Button, Grid, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import Head from 'next/head'
import styled from 'styled-components'
import BoardSection from './BoardSection'

const Waves = () => (
	<div className="wave">
		{/* prettier-ignore */}
		<svg data-name="Layer 1" viewBox="0 0 1200 120" preserveAspectRatio="none" >
		{/* prettier-ignore */}
		<path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
		{/* prettier-ignore */}
		<path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill" ></path>
		{/* prettier-ignore */}
		<path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill" ></path>
	</svg>
	</div>
)
const calendarLink =
	'https://www.google.com/calendar/render?action=TEMPLATE&text=%E3%82%B9%E3%83%97%E3%83%A9%E6%9D%AF&dates=20230909T210000/20230909T230000&sprop=https://hello.vipper.dev/splat3-aniv1-2023'

const title = 'Splatoon3発売1周年記念大会'
function Sp3Aniv1() {
	return (
		<Style>
			<Head>
				<meta property="og:title" content={title} />
				<meta property="og:type" content="website " />
				<meta
					property="og:url"
					content="https://hello.vipper.dev/splat3-aniv1-2023"
				/>
				{/* <meta
					property="og:image"
					content="https://hello.vipper.dev/shomona22222/thumbnail.png"
				/> */}
				<meta property="og:site_name" content={title} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			<Box
				className="eyecatch"
				sx={{ background: '#2b202e', marginBottom: '180px' }}
			>
				<Container maxWidth="md">
					<div>
						<header>
							<Grid container spacing={1}>
								<Grid item xs={12} sm={5}>
									<div className="logo-img">
										<div className="log-img-wrap">
											<img
												src="/static/img/splat3-aniv1-logo.png"
												alt="logo"
											></img>
										</div>
									</div>
								</Grid>
								<Grid item xs={12} sm={7}>
									<h1>
										<div className="logo">
											<div>(仮)VIPでドラフト</div>
											<span>Splatoon3発売1周年杯</span>
										</div>
									</h1>
								</Grid>
							</Grid>
						</header>
					</div>
					<div>
						<h2>日程</h2>
						<div style={{ display: 'flex' }}>
							<h4 className="sub">2023.9.2(土) 22:00</h4>
							<Box m={1}>
								<p>練習日</p>
							</Box>
						</div>
						<div style={{ display: 'flex' }}>
							<h4>2023.9.9(土) 21:00</h4>
							<Box m={1}>
								<p>
									21:00~ ドラフト{' '}
									<Button href={calendarLink}>Googleカレンダー追加</Button>
								</p>
								<p>22:00~ 本番</p>
							</Box>
						</div>
					</div>
				</Container>
				<Box style={{ position: 'relative' }}>
					<Waves />
				</Box>
			</Box>
			<Container maxWidth="md" className="second">
				<div>
					<h2>大会ルール</h2>
					<ul>
						<li>チーム: ドラフト制</li>
						<li>マッチ: 総当たり</li>
						<li>ステージ: ランダム(重複なし)</li>
					</ul>
				</div>
				<BoardSection />
				<footer>
					<h2>リンク</h2>
					<ul>
						<li>
							{/* <a href="http://hebi.5ch.net/test/read.cgi/news4vip/1581209829/l50">
								VIPスレ
							</a> */}
						</li>
						<li>
							<Typography>主催: Mira</Typography>
						</li>
						{/* <li>
							<a href="https://github.com/vipzero/hello/tree/master/src/components/Shomona22222">
								このサイトのコード
							</a>
						</li> */}
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
	.eyecatch {
		color: white;
	}
	.second {
		color: #492b4a;
		font-weight: bold;
	}

	/* --second: #5cc4d2;
	--second2: #38a3b3; */
	--second: #ffe9a7;
	--second2: #ffdf81;
	background-color: var(--second);

	background-image: linear-gradient(45deg, var(--second2) 25%, transparent 25%),
		linear-gradient(-45deg, var(--second2) 25%, transparent 25%);
	background-size: 40px 40px;
	background-position: 0 0, 20px 20px;

	background-image: linear-gradient(45deg, var(--second) 25%, transparent 25%),
		linear-gradient(315deg, var(--second) 25%, var(--second2) 25%);
	background-position: 10px 0, 20px 0, 0 0, 0 0;
	background-size: 20px 20px;
	background-repeat: repeat;

	display: grid;
	body {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #333;
		font-family: 'Arial', sans-serif;
	}

	.logo {
		font-size: 2rem;
		text-transform: uppercase;
		letter-spacing: 2px;
		background: -webkit-linear-gradient(left, #ffe700, #ffd700);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		position: relative;
	}

	.logo span {
		position: relative;
		top: -0.2rem;
		left: 0.2rem;
		color: #fff;
		text-shadow: 2px 2px 4px #98ff9888;
	}

	.wave {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		line-height: 0;

		svg {
			position: relative;
			display: block;
			width: calc(100% + 1.3px);
			height: 229px;
		}
		.shape-fill {
			fill: #2b202e;
		}
	}
	.logo-img {
		display: grid;
		justify-items: center;
		align-items: center;
		img {
			width: 100%;
		}
	}

	header {
		margin-top: 10vh;
		margin-bottom: 10vh;
	}
	h1 {
		text-align: center;
		color: white;
		text-transform: uppercase;
		padding: 1px;
		font-family: 'Raleway', cursive;
		font-weight: 100;
		position: relative;
		background: linear-gradient(left, black, #eee, black);

		span.stop {
			font-size: 0.2rem;
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
			width: 3rem;
			height: 4px;
			background: orange;
			bottom: -8px;
		}
	}
	ul > li {
		a {
			color: purple;
		}
	}
`

export default Sp3Aniv1
