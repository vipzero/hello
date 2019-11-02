import * as React from 'react'
import _ from 'lodash'
import Zdog from 'zdog'
import noisejs from 'noisejs'

const noise = new noisejs.Noise(Math.random())

type Props = {}

const WIDTH = 480
const CS = 8
const CW = WIDTH / 6 / CS

const generateMap = (n: number): number[][] => {
	return _.range(n).map(x => _.range(n).map(y => noise.perlin2(x / n, y / n)))
}

export function Monument() {
	const canvasEl = React.useRef<HTMLCanvasElement>(null)
	const scene = new Zdog.Anchor({
		rotate: { x: 0.4 },
	})
	const lands = generateMap(CS)

	console.log(lands)

	lands.forEach((rows, x) =>
		rows.forEach((cell, z) => {
			new Zdog.Box({
				centered: false,
				addTo: scene,
				width: CW,
				height: CW,
				depth: CW,
				translate: {
					x: (x + 1 - CS / 2 - 0.5) * CW,
					z: (z + 1 - CS / 2 - 0.5) * CW,
					y: cell * CW * 5,
				},
			})
		})
	)

	function render() {
		const canvas = canvasEl.current

		if (!canvas) {
			return
		}
		const { width, height } = canvas
		const ctx = canvas.getContext('2d')

		if (!ctx) {
			return
		}
		ctx.clearRect(0, 0, width, height)
		ctx.save()

		ctx.translate(width / 2, height / 2)
		ctx.scale(4, 4)
		ctx.lineJoin = 'round'
		ctx.lineCap = 'round'

		scene.renderGraphCanvas(ctx)
		ctx.restore()
	}

	function animate() {
		scene.rotate.y += 0.01
		scene.updateGraph()
		render()
		requestAnimationFrame(animate)
	}

	React.useEffect(() => {
		animate()
	}, [])

	return (
		<canvas
			style={{ border: '2px solid #aaa' }}
			ref={canvasEl}
			width={WIDTH}
			height={WIDTH}
		/>
	)
}
