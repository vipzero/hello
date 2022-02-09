import { createTheme } from '@mui/material'
import { indigo, orange } from '@mui/material/colors'

const theme = createTheme({
	palette: {
		primary: { ...indigo, main: '#5C6BC0' },
		error: orange,
		// secondary: lime,
	},
	typography: {},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					padding: '10px',
					marginBottom: '10px',
				},
			},
		},
		MuiSvgIcon: {
			styleOverrides: {
				root: {
					marginTop: '5px',
					marginRight: '5px',
				},
			},
		},
		MuiFormControl: {
			styleOverrides: {
				root: {
					width: '100%',
				},
			},
		},
	},
})

export default theme
