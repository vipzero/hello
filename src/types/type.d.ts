declare module '*.png'

declare module 'noisejs' {
	class Noise {
		constructor(seed: number)
		perlin2(x: number, y: number): number
	}
}
