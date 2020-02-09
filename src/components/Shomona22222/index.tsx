import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import { teams, members } from './data'
import TeamSection from './teams'

function Shomona22222() {
	return (
		<Style>
			<Container>
				<header>
					<h1>SHOMONA CUP 2020年令和2年2月第2回</h1>
					<h3>2/9(日) 21:00</h3>
				</header>
				<div>
					<h2>大会について</h2>
					<ul>
						<li>
							試合ごとに俺が考えたしょうもない特殊ルールの抽選(今回は戦闘に関わるもののみ)
						</li>
						<li>その状況下で試合する</li>
						<li>最終的に勝ち数で優勝を決める</li>
					</ul>
				</div>
				<TeamSection />
				<div>
					<h2>ゲーム</h2>
				</div>
				<div>
					<h2>勝者</h2>
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
			</Container>
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
