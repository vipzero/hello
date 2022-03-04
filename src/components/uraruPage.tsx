import { Alert, Box, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSearchParam } from 'react-use'

const currentUrl = () => {
	if (typeof location === 'undefined') return ''
	return location.protocol + '//' + location.host + location.pathname
}
const strrev = (s: string) => s.split('').reverse().join('')

function UraruPage() {
	// get query string
	const t = useSearchParam('t')
	const [url, setUrl] = useState<string>('')

	useEffect(() => {
		if (typeof t !== 'string') return

		const turl = strrev(decodeURIComponent(t))
		alert(turl)

		location.href = turl
	}, [t])
	const furl = encodeURIComponent(strrev(url) || '')

	const fullUrl = `${currentUrl()}?t=${furl}`

	return (
		<p>
			<Box>
				<TextField
					type="url"
					label="url"
					value={url}
					onChange={(e) => {
						setUrl(e.target.value)
					}}
				/>
				<Alert severity="info">{fullUrl}</Alert>
			</Box>
		</p>
	)
}

export default UraruPage
