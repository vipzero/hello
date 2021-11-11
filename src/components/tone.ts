import { useRef, useEffect } from 'react'
import { Synth } from 'tone'

const makeSynth = () =>
	new Synth({
		oscillator: {},
		envelope: {
			attackCurve: 'exponential',
			attack: 0.1,
			decay: 0.1,
			sustain: 0.1,
			release: 0.1,
		},
		portamento: 0.05,
		volume: -20,
	}).toDestination()

const sound = (freq: string, synth: Synth) => {
	synth.triggerAttackRelease(freq, '8n')
}

export function useSynth() {
	const ref = useRef<Synth>()
	useEffect(() => {
		ref.current = makeSynth()
	}, [])

	return {
		sound: () => {
			if (!ref.current) return
			sound('C6', ref.current)
		},
	}
}
