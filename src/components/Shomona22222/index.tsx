import { useState } from 'react'
import { Button } from '@material-ui/core'
import styled from 'styled-components'
import { teams } from './data'

function Shomona22222() {
	const [count, setCount] = useState<number>(0)

	return (
		<Style>
			<header>
				<h1>SHOMONA CUP 2020年令和2年2月第2回</h1>
				<h3>2/9(日) 21:00</h3>
			</header>
			<div>
				<h2>大会ルール</h2>
			</div>
			<div>
				<h2>チーム</h2>
			</div>
			<div>
				<h2>結果</h2>
			</div>
			<div>
				<h2>結果</h2>
			</div>
			<footer>
				<ul>
					<li>
						<a href="http://hebi.5ch.net/test/read.cgi/news4vip/1581209829/l50">
							スレ
						</a>
					</li>
					<li>
						<a href="">配信？</a>
					</li>
					<li>
						<a href="https://shomona.vipper.dev/">2019-05 しょうもな杯</a>
					</li>
					<li>
						<a href="https://tsuyunojin-splatoon2019.vipper.dev">
							2019-06 VIPダービー梅雨の陣
						</a>
					</li>
					<li>
						<a href="https://hello.vipper.dev">0000-00 vip0</a>
					</li>
					<li>
						<a href="https://google.com">主催: やまおか</a>
					</li>
				</ul>
			</footer>
		</Style>
	)
}

const Style = styled.div`
	padding: 0;
	margin: 0;
	background-color: #4bb0b8;
	background-image: liner-gradient(45deg, transparent 48%, #bfdece 48%),
		liner-gradient(135deg, transparent 48%, #bfdece 48%);

	background-size: 100px 100px;
	display: grid;
`

export default Shomona22222
