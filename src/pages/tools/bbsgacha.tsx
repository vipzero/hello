import * as React from 'react'

import {
	ListItem,
	Button,
	Typography,
	List,
	Slider,
	ListItemText,
} from '@material-ui/core'

import _sampleSize from 'lodash/sampleSize'
import Layout from '../../components/Layout'

// eslint-disable-next-line
const boardlist: BoardLink[] = require('../res/boardlist.json')

export type BoardLink = {
	name: string
	url: string
}

function BBSGacha() {
	const [boards, setBoards] = React.useState<BoardLink[]>([])
	const [num, setNum] = React.useState<number>(5)

	return (
		<Layout title="5ch 板ガチャ話題ツール">
			<div style={{ margin: '0 20px' }}>
				<h2 style={{ margin: '12px 20px' }}>板ガチャ</h2>
				<div
					style={{
						display: 'grid',
						gridGap: '8px',
						gridTemplateColumns: 'max-content max-content max-content',
						justifyContent: 'flex-start',
					}}
				>
					<Button
						size="large"
						variant="contained"
						onClick={() => {
							const boards = _sampleSize(boardlist, 20)

							setBoards(boards)
						}}
					>
						引く！
					</Button>
					<Typography variant="h5">{num}個</Typography>
					<div>
						<Slider
							style={{ width: '200px' }}
							defaultValue={num}
							aria-labelledby="discrete-slider"
							valueLabelDisplay="auto"
							marks
							onChange={(_e, v) => {
								if (typeof v === 'number') {
									setNum(v)
								}
							}}
							min={1}
							max={20}
						/>
					</div>
				</div>
				<List>
					{boards.map((board, i) => (
						<ListItem
							key={board.name}
							style={{ background: i < num ? 'white' : 'gray' }}
						>
							<ListItemText
								primary={board.name}
								secondary={board.url}
							></ListItemText>
						</ListItem>
					))}
				</List>
			</div>
		</Layout>
	)
}

export default BBSGacha
