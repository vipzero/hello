import * as React from 'react'

import styled from 'styled-components'
import { useWindowSize, useMedia } from 'react-use'
import { Typography } from '@material-ui/core'

import config from '../../config'
import IconVipzero from './res/vipzero.png'
import IconAno from './res/ano.png'
import IconMosha from './res/mosha.png'
// import { useMouseMove } from 'react-use-mouse-move'

const useMouseMove = (_v: number) => ({ x: 0, y: 0 })

const HEIGHT = '300px'
const WIDTH = '400px'

const faces: { name: string; icon: string }[] = [
	{ name: 'あの', icon: IconAno },
	{ name: 'vipzero', icon: IconVipzero },
	{ name: 'もしゃ', icon: IconMosha },
]

const LinkItem: React.SFC<{ id: string; link: string }> = ({
	id,
	link,
	children,
}) => (
	<li>
		<Typography variant="h6">
			<Link data-content={id} href={link}>
				{children}
			</Link>
		</Typography>
	</li>
)

const soul = (
	wx: number,
	wy: number,
	px: number,
	py: number
): [number, number, number] => {
	const distance = (a: number, b: number) => Math.abs(a - b)
	const overcut = (v: number, min: number, max: number) =>
		Math.min(Math.max(v, min), max)
	const normalize = (v: number, min: number, max: number) => {
		return (v - min) / (max - min)
	}

	const wp = (v: number) =>
		normalize(overcut((0.5 - distance(v, 0.5)) * 2, 0.2, 0.8), 0.2, 0.8)

	return [wp(px / wx), 1, wp(py / wy)]
}

function FaceBox() {
	const { width, height } = useWindowSize()
	const pos = useMouseMove(2)
	const isWide = useMedia('(min-width: 480px)')

	const souls = isWide ? soul(width, height, pos.x, pos.y) : [1, 1, 1]

	return (
		<Faces>
			{faces.map((face, i) => (
				<div key={i}>
					<Icon
						src={face.icon}
						alt={`アイコン ${face.name}`}
						style={{
							borderRadius: `calc(20px + 60px * ${
								souls[i]
							}) 20px / 20px calc(20px + 60px * ${1 - souls[i]})`,
						}}
					/>
					<Typography>{face.name}</Typography>
				</div>
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
					<Typography>_vip_splatoon2_web_programming_</Typography>
					<Typography>__vim_minecraft_design_</Typography>
					<Links>
						<LinkItem id="github" link="https://github.com/vipzero">
							<ruby>
								{'<'}ギッ{' />'}
								<rt>GitHub</rt>
							</ruby>
						</LinkItem>
						<LinkItem id="twitter" link="https://twitter.com/vip_a_no">
							<ruby>
								{'o('}ツイ{')'}
								<rt>Twitter</rt>
							</ruby>
						</LinkItem>
					</Links>
				</Box>
			</Center>
		</Wrap>
	)
}

const Wrap = styled.div`
	width: 100vw;
	height: calc(100vh - ${config.headerHeihgt});
`

const Center = styled.div`
	position: absolute;
	top: calc(50vh - ${HEIGHT} / 2);
	left: calc(50vw - ${WIDTH} / 2);
`

const Box = styled.div`
	width: 100vw;
	max-width: ${WIDTH};
	height: ${HEIGHT};
	background: linear-gradient(
			225deg,
			transparent 0%,
			transparent 95%,
			#fafafa 95%
		),
		linear-gradient(30deg, #111, #444);
	color: white;
`

const Faces = styled.div`
	overflow: hidden;
	height: 185px;
	padding: 28px 0;
	color: white;
	display: flex;
	text-align: center;
	justify-content: space-evenly;
`

const Links = styled.ul`
	list-style: none;
	padding-top: 12px;
	color: white;
	display: flex;
	text-align: center;
	justify-content: flex-end;
`

const Icon = styled.img`
	width: 100px;
`

const Link = styled.a`
	text-decoration: none;
	font-size: 16px;
	color: white;
	margin: 0 12px;
	&[data-content='github'] {
		color: #bfbfbf;
	}
	&[data-content='twitter'] {
		color: #49cdff;
	}
`

export default Home
