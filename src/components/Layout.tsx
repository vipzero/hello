import Head from 'next/head'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import styled from 'styled-components'
import { FC } from 'react'
import theme from '../theme'
import { GlobalStyle } from '../config/init'
import NavBar from './NavBar'

type Props = {
	title?: string
	hasNavbar?: false
}

const Layout: FC<Props> = ({
	children,
	title = 'This is the default title',
	hasNavbar = true,
}) => (
	<div>
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
		<CssBaseline />
		<GlobalStyle />
		<MuiThemeProvider theme={theme}>
			{hasNavbar ? (
				<Screen>
					<div>
						<main>{children}</main>
						<footer>
							<NavBar />
						</footer>
					</div>
				</Screen>
			) : (
				<main>{children}</main>
			)}
		</MuiThemeProvider>
	</div>
)

const Screen = styled.div`
	> div {
		min-height: 100vh;
		display: grid;
		grid-template-rows: 1fr auto;
	}
	main {
	}
	footer {
		grid-row-start: 2;
		grid-row-end: 3;
	}
`

export default Layout
