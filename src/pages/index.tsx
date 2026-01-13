import styled, { keyframes } from 'styled-components'
import { Typography } from '@mui/material'
import { FC } from 'react'

import config from '../config'
import Layout from '../components/Layout'

const HEIGHT = '340px'
const WIDTH = '450px'

const faces: { name: string; icon: string }[] = [
	{ name: 'あの', icon: '/static/img/faces/ano.png' },
	{ name: 'vipzero', icon: '/static/img/faces/vipzero.png' },
	{ name: 'もしゃ', icon: '/static/img/faces/mosha.png' },
]

const LinkItem: FC<{ id: string; link: string }> = ({ id, link, children }) => (
	<li>
		<Typography variant="h6">
			<Link data-content={id} href={link}>
				{children}
			</Link>
		</Typography>
	</li>
)

function FaceBox() {
	return (
		<Faces>
			{faces.map((face, i) => (
				<FaceItem key={i}>
					<Icon
						src={face.icon}
						alt={`アイコン ${face.name}`}
					/>
					<FaceName>{face.name}</FaceName>
				</FaceItem>
			))}
		</Faces>
	)
}

function Home() {
	return (
		<Wrap>
			<Center>
				<Box>
					<FaceBox />
					<TagLine>_vip_splatoon2_web_programming_</TagLine>
					<TagLine>__vim_minecraft_design_</TagLine>
					<Links>
						<LinkItem id="github" link="https://github.com/vipzero">
							<ruby>
								{'<'}ギ{' />'}
								<rt>GitHub</rt>
							</ruby>
						</LinkItem>
						<LinkItem id="twitter" link="https://twitter.com/ano_v0">
							<ruby>
								{'x('}エ{')'}
								<rt>X/Twitter</rt>
							</ruby>
						</LinkItem>
					</Links>
				</Box>
				<ScanLine />
			</Center>
		</Wrap>
	)
}

const glowPulse = keyframes`
	0%, 100% { opacity: 1; text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff; }
	50% { opacity: 0.8; text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff; }
`

const scanAnimation = keyframes`
	0% { top: 0; }
	100% { top: 100%; }
`

const iconFloat = keyframes`
	0%, 100% { transform: translateY(0); }
	50% { transform: translateY(-5px); }
`

const Wrap = styled.div`
	width: 100vw;
	height: calc(100vh - ${config.headerHeihgt});
	background: linear-gradient(
			90deg,
			rgba(0, 255, 255, 0.02) 1px,
			transparent 1px
		),
		linear-gradient(rgba(0, 255, 255, 0.02) 1px, transparent 1px),
		radial-gradient(ellipse at center, #0a0a1a 0%, #000005 100%);
	background-size: 30px 30px, 30px 30px, 100% 100%;
`

const Center = styled.div`
	position: absolute;
	top: calc(50vh - ${HEIGHT} / 2);
	left: calc(50vw - ${WIDTH} / 2);
`

const Box = styled.div`
	position: relative;
	width: 100vw;
	max-width: ${WIDTH};
	min-height: ${HEIGHT};
	padding: 20px;
	background: linear-gradient(
			90deg,
			rgba(0, 255, 255, 0.05) 1px,
			transparent 1px
		),
		linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
		rgba(10, 10, 20, 0.9);
	background-size: 20px 20px, 20px 20px, 100% 100%;
	border: 1px solid rgba(0, 255, 255, 0.4);
	box-shadow: 0 0 30px rgba(0, 255, 255, 0.15),
		0 0 60px rgba(0, 255, 255, 0.05), inset 0 0 30px rgba(0, 255, 255, 0.03);
	color: #e0e0e0;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(
			90deg,
			transparent,
			#00ffff,
			#ff00ff,
			#00ffff,
			transparent
		);
		box-shadow: 0 0 10px #00ffff;
	}
`

const ScanLine = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 2px;
	background: linear-gradient(
		90deg,
		transparent,
		rgba(0, 255, 255, 0.3),
		transparent
	);
	animation: ${scanAnimation} 4s linear infinite;
	pointer-events: none;
`

const Faces = styled.div`
	overflow: hidden;
	padding: 20px 0;
	display: flex;
	text-align: center;
	justify-content: space-evenly;
`

const FaceItem = styled.div`
	transition: all 0.3s ease;

	&:hover {
		transform: scale(1.05);
	}
`

const Icon = styled.img`
	width: 100px;
	height: 100px;
	border-radius: 50%;
	border: 2px solid rgba(0, 255, 255, 0.5);
	box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
	transition: all 0.3s ease;
	animation: ${iconFloat} 3s ease-in-out infinite;

	&:hover {
		border-color: #00ffff;
		box-shadow: 0 0 25px rgba(0, 255, 255, 0.6);
	}
`

const FaceName = styled(Typography)`
	color: #00ffff;
	font-family: 'Courier New', 'Monaco', monospace;
	font-size: 14px;
	margin-top: 8px;
	text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
`

const TagLine = styled(Typography)`
	font-family: 'Courier New', 'Monaco', monospace;
	font-size: 12px;
	color: #888;
	text-align: center;
	letter-spacing: 2px;
	animation: ${glowPulse} 4s ease-in-out infinite;
`

const Links = styled.ul`
	list-style: none;
	padding: 16px 0 0 0;
	margin: 0;
	display: flex;
	text-align: center;
	justify-content: center;
	gap: 24px;
`

const Link = styled.a`
	text-decoration: none;
	font-size: 16px;
	font-family: 'Courier New', 'Monaco', monospace;
	transition: all 0.3s ease;
	position: relative;

	&[data-content='github'] {
		color: #00ff00;
		text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);

		&:hover {
			text-shadow: 0 0 15px #00ff00, 0 0 30px #00ff00;
		}
	}

	&[data-content='twitter'] {
		color: #00bfff;
		text-shadow: 0 0 5px rgba(0, 191, 255, 0.5);

		&:hover {
			text-shadow: 0 0 15px #00bfff, 0 0 30px #00bfff;
		}
	}
`

const HomePage = () => (
	<Layout title="">
		<Home />
	</Layout>
)

export default HomePage
