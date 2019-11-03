import * as React from 'react'
import _ from 'lodash'
import Zdog from 'zdog'
import noisejs from 'noisejs'

const noise = new noisejs.Noise(Math.random())

type Props = {}

const WIDTH = 480
const CS = 5
const CW = WIDTH / 8 / CS

const generateMap = (n: number): number[][] => {
	return _.range(n).map(x =>
		_.range(n).map(y => {
			const nv: number = noise.perlin2(((x / n) * 2) % 2, ((y / n) * 2) % 2)

			return Math.min(Math.max(0, Math.floor((nv + 0.5) * 5)), 5)
		})
	)
}

export function Monument() {
	const canvasEl = React.useRef<HTMLCanvasElement>(null)
	const scene = new Zdog.Anchor({
		rotate: { x: -0.4 },
	})
	const lands = generateMap(CS)

	console.log(lands)

	lands.forEach((rows, x) =>
		rows.forEach((v, z) => {
			new Zdog.Box({
				centered: false,
				addTo: scene,
				width: CW - 3,
				height: CW - 3,
				depth: CW - 3,
				color: `hsla(${(360 / 5) * v},50%,50%,1.0)`,
				translate: {
					x: (x + 1 - CS / 2 - 0.5) * CW,
					z: (z + 1 - CS / 2 - 0.5) * CW,
					y: (v - 1) * CW,
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
