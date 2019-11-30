import { Machine, Actor, assign, spawn } from 'xstate'

interface TC {
	promise?: Actor<number>
}

export const promiseMachine = Machine<TC>({
	context: {
		promise: undefined,
	},
	initial: 'active',
	states: {
		active: {
			entry: assign({
				promise: () => spawn(Promise.resolve(42)),
			}),
		},
	},
})
