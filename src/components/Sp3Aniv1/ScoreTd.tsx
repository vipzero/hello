import { useEffect, useRef, useState } from 'react'
import { Transition } from 'react-transition-group'

const duration = 300

const defaultStyle = {
	transition: `transform ${duration}ms ease-in-out`,
	transform: 'scale(2)',
}

const transitionStyles = {
	entering: { transform: `scale(2)` },
	entered: { transform: `scale(2)` },
	exiting: { transform: `scale(1)` },
	exited: { transform: `scale(1)` },
}
export const ScoreTd = ({ score }: { score: number }) => {
	const nodeRef = useRef(null)
	const [anim, setAnim] = useState(false)
	useEffect(() => {
		setAnim(true)
		setTimeout(() => {
			setAnim(false)
		}, duration)
	}, [score])

	return (
		<Transition nodeRef={nodeRef} in={anim} timeout={duration}>
			{(state) => (
				<td
					className="score"
					ref={nodeRef}
					style={{
						...defaultStyle,
						...transitionStyles[state],
					}}
				>
					{score}
				</td>
			)}
		</Transition>
	)
}
