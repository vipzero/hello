import _ from 'lodash'
import * as React from 'react'

class Syukan extends React.Component<{}> {
	render() {
		return (
			<div>
				<h2 style={{ margin: '12px 20px' }}>火曜日の次は水曜日</h2>
				<code>
					<pre>
						{`
{_.range(1, 101)
  .map(n => ({ n, v: Math.pow(8, n) }))
  .map(({ n, v }) => (
    <div>
      8 ^ {n} % 7 = {v % 7} ({v})
    </div>
  ))}
`}
					</pre>
				</code>
				{_.range(1, 101)
					.map(n => ({ n, v: Math.pow(8, n) }))
					.map(({ n, v }) => (
						<div key={n}>
							8 ^ {n} % 7 = {v % 7} ({v})
						</div>
					))}
			</div>
		)
	}
}

export default Syukan
