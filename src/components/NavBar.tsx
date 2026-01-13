import { Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled, { keyframes } from 'styled-components'
import menuGroups from './menuGroups'

const glowPulse = keyframes`
	0%, 100% { opacity: 1; }
	50% { opacity: 0.7; }
`

const Wrapper = styled.div`
	display: flex;
	overflow: hidden;
	flex-wrap: wrap;
	padding: 8px 0;
	background: linear-gradient(
			90deg,
			rgba(0, 255, 255, 0.03) 1px,
			transparent 1px
		),
		linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px), #0a0a0f;
	background-size: 20px 20px;
	border-bottom: 1px solid rgba(0, 255, 255, 0.3);
	box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
`

const Group = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	margin-left: 12px;
	padding-right: 12px;
	border-right: 1px solid rgba(0, 255, 255, 0.2);

	&:last-child {
		border-right: none;
	}
`

const Tab = styled(Typography)`
	background: transparent;
	font-size: 14px;
	font-weight: bold;
	color: #00ffff;
	padding: 4px 10px;
	margin-right: 4px;
	border: 1px solid rgba(0, 255, 255, 0.5);
	text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
	font-family: 'Courier New', 'Monaco', monospace;
	letter-spacing: 1px;
	animation: ${glowPulse} 3s ease-in-out infinite;
`

const MenuItem = styled.div`
	cursor: pointer;
	padding: 4px 8px;
	text-decoration: none;
	color: #888;
	transition: all 0.3s ease;
	font-family: 'Courier New', 'Monaco', monospace;
	font-size: 13px;
	position: relative;

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 0;
		height: 1px;
		background: #00ffff;
		box-shadow: 0 0 5px #00ffff;
		transition: all 0.3s ease;
		transform: translateX(-50%);
	}

	&:hover {
		color: #00ffff;
		text-shadow: 0 0 10px #00ffff;

		&::after {
			width: 100%;
		}
	}

	a {
		color: inherit;
		text-decoration: none;
	}
`

type Props = {}
function NavBar(_: Props) {
	const { pathname } = useRouter()

	const fixed = pathname === '/'

	return (
		<Wrapper data-fixed={fixed}>
			{menuGroups.map((g) => (
				<Group key={g.name}>
					<Tab>{g.name}</Tab>
					{g.menus.map((menu) => (
						<MenuItem key={menu.path}>
							<Link href={`${menu.path}`}>
								<Typography component="span">{menu.name}</Typography>
							</Link>
						</MenuItem>
					))}
				</Group>
			))}
		</Wrapper>
	)
}

export default NavBar
