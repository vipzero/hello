import Head from 'next/head'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import styled from 'styled-components'
import { FC } from 'react'
import theme from '../theme'
import { GlobalStyle } from '../config/init'
import NavBar from './NavBar'

type Props = {
	title?: string
}

const Layout: FC<Props> = ({
	children,
	title = 'This is the default title',
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
			<Screen>
				<div>
					<main>{children}</main>
					<footer>
						<NavBar />
					</footer>
				</div>
			</Screen>
		</MuiThemeProvider>
	</div>
)

const Screen = styled.div``

export default Layout
