import * as React from 'react'
import _range from 'lodash/range'
import NavBar from '../../components/NavBar'
import Layout from '../../components/Layout'

type PackProps = {
	title: string
	size: number
	children?: React.ReactElement<PackProps>
}

const Pack: React.SFC<PackProps> = ({ title, size, children }) => {
	const e = `${size}`.length
	const height = `${(size * 1.2) / 3}vmax`
	const width = `${size / 3}vmax`
	const boxStyle = {
		height,
		width,
		border: `solid ${e}px`,
		display: 'block',
		overflow: 'hidden',
	}
	const dummy = (
		<div style={{ ...boxStyle }}>{children && children.props.title}</div>
	)
	const line1 = (
		<div style={{ display: 'flex', width: `${(size * 10) / 3}vmax` }}>
			<div style={boxStyle}>{children}</div>
			{_range(9).map(() => dummy)}
		</div>
	)
	const lineX = (
		<div style={{ display: 'flex' }}>{_range(10).map(() => dummy)}</div>
	)

	return (
		<div style={{ border: 'solid 1px', width: `${(size * 10) / 3}vmax` }}>
			<span>{title}</span>
			{line1}
			{_range(9).map(() => lineX)}
		</div>
	)
}

const Y500million = () => (
	<Layout title="5億年可視化">
		<NavBar />
		<Pack title={'1億年'} size={1000}>
			<Pack title={'100万年'} size={100}>
				<Pack title={'1万年'} size={10}>
					<Pack title={'100年'} size={1} />
				</Pack>
			</Pack>
		</Pack>
	</Layout>
)

export default Y500million
