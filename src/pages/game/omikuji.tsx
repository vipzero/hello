import { Typography, Button } from '@mui/material'
import { useLocalStorage } from 'react-use'
import Layout from '../../components/Layout'

export type BoardLink = {
	name: string
	url: string
}

const list = [
	'円',
	'ドル	',
	'ポンド',
	'ルピー',
	'ルピア',
	'エジプト・ポンド',
	'コロン　ドル',
	'豪州ドル',
	'ガーナセディ',
	'カナダドル',
	'ケツァル',
	'シリア・ポンド',
	'シンガポール・ドル',
	'スイスフラン',
	'バーツ',
	'トルコ・リラ',
	'ネパール・ルピー',
	'パキスタン・ルピー',
	'レアル',
	'ベルギーフラン',
	'レンピーラ',
	'リンギ',
	'ペソ',
	'ヨルダン・ディナール',
	'ユーロ',
	'ホンコンドル(HK$)',
	'ニュー台湾ドル(NT$)',
	'台湾元　圓',
	'ウォン',
	'トグログ',
	'ジンバブエドル',
	'gの金',
	'kgの鉄',
	'BTC',
]

// return x (1 <= x <= N)
const randNum = (n: number) => Math.ceil(Math.random() * n)

const year = new Date().getFullYear()

function Omikuji() {
	const [money, setMoney] = useLocalStorage<number>(`${year}-money`, 0)
	const [unit, setUnit] = useLocalStorage<string>(`${year}-unit`, '')

	return (
		<div
			style={{
				padding: '0 20px',
				background:
					'linear-gradient(0deg, rgb(234, 255, 168) 0%, rgba(255,147,147,1) 100%)',
			}}
		>
			<Typography variant="h5" style={{ color: 'white' }}>
				お年玉だよー({year})
			</Typography>
			<div style={{ display: 'flex', padding: '10vh 1vh' }}>
				{money === 0 ? (
					<Button
						size="large"
						color="primary"
						variant="contained"
						onClick={() => {
							setMoney(10 ** randNum(4) * randNum(100))
						}}
					>
						引く
					</Button>
				) : (
					<Typography
						variant="h3"
						style={{
							color: '#ff6f2c',
							fontWeight: 'bold',
						}}
					>
						{money}
					</Typography>
				)}
				<div style={{ alignSelf: 'flex-end' }}>
					{unit === '' ? (
						<Button
							variant="contained"
							color="primary"
							size="medium"
							onClick={() => {
								setUnit(list[randNum(list.length) - 1])
							}}
						>
							引く
						</Button>
					) : (
						<Typography variant="h5">
							<a
								href={`https://www.google.co.jp/search?q=${
									money || 1
								}${unit}%20円`}
							>
								{unit}
							</a>
						</Typography>
					)}
				</div>
			</div>
		</div>
	)
}

const OmikujiPage = () => (
	<Layout title="正月おみくじ">
		<Omikuji />
	</Layout>
)

export default OmikujiPage
