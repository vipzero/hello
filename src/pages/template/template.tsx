import { useState } from 'react'
import { Button } from '@material-ui/core'
import Layout from '../../components/Layout'

function Base() {
	const [count, setCount] = useState<number>(0)

	return (
		<div>
			<Button onClick={() => setCount((c) => c + 1)}>+1</Button>
			{count}
		</div>
	)
}

const BasePage = () => (
	<Layout title="タイトル">
		<Base />
	</Layout>
)

export default BasePage
