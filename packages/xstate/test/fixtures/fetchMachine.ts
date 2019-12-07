import { Machine, assign } from 'xstate'

const context = {
	data: undefined as any,
}

export const fetchMachine = Machine<typeof context>({
	id: 'fetch',
	initial: 'idle',
	context,
	states: {
		idle: {
			on: { FETCH: 'loading' },
		},
		loading: {
			invoke: {
				src: 'fetchData',
				onDone: {
					target: 'success',
					actions: assign({
						data: (_, e) => e.data,
					}),
					cond: (_, e) => e.data.length,
				},
			},
		},
		success: {
			type: 'final',
		},
	},
})
