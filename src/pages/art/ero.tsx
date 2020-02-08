import styled from 'styled-components'
import Layout from '../../components/Layout'

const Wrap = styled.div``
const Code = styled.div`
	margin: 10px;
	padding: 5px;
	background: #ddd;
	border-radius: 3px;
	max-width: 600px;
`
const Line = styled.pre`
	font-size: 30px;
	font-family: 'Nova Mono', monospace;
	line-height: 35px;
	margin: 0;
`

const MakeRank = () => (
	<Layout title="ero code">
		<Wrap>
			<Code>
				<Line>import ero from {"'ero'"}</Line>
				<Line>import world from {"'world'"}</Line>
				<Line>ero.save(world)</Line>
			</Code>
		</Wrap>
	</Layout>
)

export default MakeRank
