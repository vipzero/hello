import { ThunkAction as _ThunkAction } from 'redux-thunk'
import { AnyAction } from 'typescript-fsa'
import { State as _State } from './state'

export type State = _State

export type GetState = () => State

export type ThunkAction = _ThunkAction<
	void | Promise<void>,
	State,
	undefined,
	AnyAction
>
