// @flow
import * as React from 'react'
import _ from 'lodash'

type Props = {}

const Pack = (props: { title: string }) => {
	const cols = []
	for (let i = 0; i < 10; i++) {
		cols.push(props.children)
	}
	const line = <div style={{ display: 'flex' }}>{cols}</div>
	const rows = []
	for (let i = 0; i < 10; i++) {
		rows.push(line)
	}

	return (
		<div style={{ border: 'solid 1px' }}>
			<span>{props.title}</span>
			{rows}
		</div>
	)
}

class Y500million extends React.PureComponent<Props> {
	render() {
		return (
			<Pack title="1万年">
				<Pack title={'100年'}>□</Pack>
			</Pack>
		)
	}
}

export default Y500million
