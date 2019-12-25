declare module '*.png'

declare module 'noisejs' {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	class Noise {
		constructor(seed: number)
		perlin2(x: number, y: number): number
	}
}
