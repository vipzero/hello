import { TextareaAutosize, TextField } from '@material-ui/core'
import { range, shuffle } from 'lodash'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'

const Wrap = styled.div`
	width: 400px;
	padding: 20px;
	p {
		margin: 0;
	}
	.box {
		border: solid 1px;
		padding: 0.5rem 1rem;
		p {
			&:nth-child(4n),
			&:nth-child(4n + 1) {
				background: #c7c7c7;
			}
		}
	}
`

function YamiPrabe() {
	const [text, setText] = useState<string>('')
	const items = text.trim().split('\n')
	const shuffles = useMemo(() => {
		return range(16).map(() => shuffle([...items]))
	}, [items])

	return (
		<Layout title="シャッフルプラベ">
			<Wrap>
				<TextareaAutosize
					maxRows={8}
					onChange={(e) => setText(e.target.value)}
				/>
				<div>
					{items.map((item) => (
						<p key={item}>{item}</p>
					))}
				</div>

				<div style={{ display: 'flex', flexWrap: 'wrap' }}>
					{shuffles.map((items, i) => (
						<div key={i} className="box">
							<h3 style={{ margin: 0 }}>#{i + 1}</h3>
							{items.map((item) => (
								<p key={item}>{item}</p>
							))}
						</div>
					))}
				</div>
			</Wrap>
		</Layout>
	)
}

export default YamiPrabe
