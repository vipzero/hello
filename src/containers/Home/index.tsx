import * as React from 'react'

import styled from 'styled-components'
import { useMouse } from 'react-use'
import { Typography } from '@material-ui/core'
import config from '../../config'

import IconVipzero from './res/vipzero.png'
import IconAno from './res/ano.png'
import IconMosha from './res/mosha.png'

const HEIGHT = '300px'
const WIDTH = '400px'

const faces: { name: string; icon: string }[] = [
	{ name: 'あの', icon: IconAno },
	{ name: 'もしゃ', icon: IconMosha },
	{ name: 'vipzero', icon: IconVipzero },
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

function Home() {
	const ref = React.useRef(null)
	const { docX, docY, posX, posY, elX, elY, elW, elH } = useMouse(ref)

	return (
		<Wrap>
			<Center>
				<Box>
					<Faces>
						{faces.map(face => (
							<div key={face.name}>
								<Icon src={face.icon}></Icon>
								<Typography>{face.name}</Typography>
							</div>
						))}
					</Faces>
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
	background: #222;
	color: white;
`

const Faces = styled.div`
	padding: 28px 0;
	color: white;
	display: flex;
	text-align: center;
	justify-content: space-evenly;
`

const Links = styled.div`
	list-style: none;
	padding-top: 12px;
	color: white;
	display: flex;
	text-align: center;
	justify-content: flex-end;
`

const Icon = styled.img`
	width: 100px;
	border-radius: 4px;
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
