// eslint-disable-next-line
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { TextField, Typography } from '@material-ui/core'
import Layout from '../../components/Layout'

function Kabu() {
	const [start, setStart] = useState<number>(100)
	const [first, setFirst] = useState<number>(100)
	const [second, setSecond] = useState<number>(100)
	const [third, setThird] = useState<number>(100)

	const firstPer = first / start

	return (
		<Layout title="あつ森 株チェックツール" hasNavbar={false}>
			<Style>
				<Typography variant="h4">あつ森 株チェッカー</Typography>
				<Typography>火曜午前までのデータを入力してね</Typography>

				<div className="form">
					<TextField type="number" value={start} label="買値" />
					<TextField type="number" value={first} label="月曜午前" />
					<TextField type="number" value={second} label="月曜午後" />
					<TextField type="number" value={third} label="火曜午前" />
				</div>
				<Typography>買値: {}</Typography>
			</Style>
		</Layout>
	)
}
const Style = styled.div`
	margin: 8px;
	.form {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
`

export default Kabu
