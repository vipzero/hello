import _shuffle from 'lodash/shuffle'
import { Typography, Button } from '@material-ui/core'
import { useMemo, useState } from 'react'
import Layout from '../../components/Layout'

export type BoardLink = {
	name: string
	url: string
}

function Xmas() {
	const presents = useMemo(() => {
		const v = [
			{ title: '昼　飯', items: _shuffle(['🍩', '🍔', '🦞', '💩', '🍖']) },
			{ title: '夕　飯', items: _shuffle(['🍖', '🍕', '🍡', '💩', '🌷']) },
			{ title: '生活品', items: _shuffle(['🎮', '🚘', '📷', '🔫', '🌂']) },
			{ title: 'ペット', items: _shuffle(['🐈', '🐧', '🐎', '🦧', '🦙']) },
			{ title: '旅行先', items: _shuffle(['⛩', '⛰', '🕋', '🌕', '🏛']) },
		]

		v.forEach(v => (v.items[3] = '🗿'))
		return v
	}, [])

	const [open, setOpen] = useState<Record<number, number>>({})
	const [bomb, setBomb] = useState<Record<string, boolean>>({})
	const [del, setDel] = useState<Record<string, boolean>>({})
	const genRect = (h: number, w: number, val: boolean) => {
		const range = [-1, 0, 1]
		const k: { [k: string]: boolean } = {}

		range.forEach(hw =>
			range.forEach(dw => {
				k[`${h + hw}_${w + dw}`] = val
			})
		)
		return k
	}

	return (
		<div style={{ margin: '0 20px' }}>
			<Typography variant="h5">
				クリスマスプレゼント(それぞれ1個まで！)
			</Typography>
			<div
				style={{
					display: 'grid',
					gridGap: '8px',
					// justifyContent: 'flex-start',
				}}
			>
				{presents.map(({ title, items }, n) => (
					<div key={title} style={{ display: 'flex' }}>
						<Typography style={{ paddingTop: '8px' }} variant="h6">
							{title}
						</Typography>
						{items.map((part, i) => {
							if (bomb[`${n}_${i}`]) {
								return (
									<Button
										key={part + `${i}`}
										style={{ height: '47px' }}
										size="large"
									>
										<span role="img" aria-label="sheep">
											💥
										</span>
									</Button>
								)
							} else if (del[`${n}_${i}`]) {
								return (
									<Button key={part} style={{ height: '47px' }} size="large">
										_
									</Button>
								)
							} else if (open[n] === i) {
								return (
									<Button style={{ height: '47px' }} size="large" key={part}>
										<span role="img" aria-label="sheep">
											{part}
										</span>
									</Button>
								)
							}
							return (
								<Button
									key={part}
									size="large"
									onClick={() => {
										if (open[n] === undefined) {
											setOpen(s => ({ ...s, [n]: i }))
										} else {
											setBomb(s => Object.assign({}, s, genRect(n, i, true)))
											setTimeout(() => {
												setBomb(s => Object.assign({}, s, genRect(n, i, false)))
												setDel(s => Object.assign({}, s, genRect(n, i, true)))
											}, 1000)
										}
									}}
								>
									<Typography variant="h5">
										<span role="img" aria-label="sheep">
											🎁
										</span>
									</Typography>
								</Button>
							)
						})}
					</div>
				))}
			</div>
		</div>
	)
}
const XmasPage = () => (
	<Layout title="クリスマス🎁">
		<Xmas />
	</Layout>
)

export default XmasPage
