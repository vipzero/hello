import { Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'

const Wrap = styled.div`
	width: 400px;
	padding: 20px;
	background: black;
	color: white;
`
const NUM_RANGE = 100000
const NUM_NUM = 30
const FLUSH_INTERVAL = 100 // ms

const genNums = () =>
	[...Array(NUM_NUM).keys()].map(() => Math.floor(Math.random() * NUM_RANGE))

const sleep = (msec: number) =>
	new Promise((resolve) => setTimeout(resolve, msec))

function FlushEse() {
	const [num, setNum] = useState<string>('')
	const [nums, setNums] = useState<number[]>([])
	const [sum, setSum] = useState<number>(0)

	const [num2, setNum2] = useState<string>('')
	const [nums2, setNums2] = useState<number[]>([])
	const [sum2, setSum2] = useState<number>(0)

	useEffect(() => {
		if (nums.length === 0) return
		async function main() {
			for (const v of nums) {
				await sleep(FLUSH_INTERVAL)
				setNum(String(v))
			}
			setNums([])
		}
		async function main2() {
			for (const v of nums2) {
				await sleep(FLUSH_INTERVAL * 1.2)
				setNum2(String(v))
			}
			setNums2([])
		}
		main()
		main2()

		return () => {}
	}, [nums])

	const start = () => {
		const nums = genNums()
		const nums2 = genNums()

		setNums(nums)
		setSum(nums.reduce((a, b) => a + b, 0))
		setNums2(nums2)
		setSum2(nums2.reduce((a, b) => a + b, 0))
	}
	const started = nums.length > 0

	return (
		<Layout title="フラッシュ暗算">
			<Wrap>
				<div
					style={{
						display: 'grid',
						width: '100%',
						height: '100vh',
						gridAutoRows: '1fr 1fr max-content',
						alignItems: 'center',
					}}
				>
					{started ? (
						<Typography style={{ textAlign: 'center' }} variant="h2">
							{num}
						</Typography>
					) : (
						<Typography
							style={{ textAlign: 'center', color: 'blue' }}
							variant="h2"
						>
							{sum}
						</Typography>
					)}
					{started ? (
						<Typography style={{ textAlign: 'center' }} variant="h2">
							{num2}
						</Typography>
					) : (
						<Typography
							style={{ textAlign: 'center', color: 'orange' }}
							variant="h2"
						>
							{sum2}
						</Typography>
					)}
					<Button variant="contained" onClick={start}>
						{started ? '---' : '開始'}
					</Button>
				</div>
			</Wrap>
		</Layout>
	)
}

export default FlushEse
