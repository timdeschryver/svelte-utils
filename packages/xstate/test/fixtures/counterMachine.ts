import { Machine, assign } from 'xstate'

export const counterMachine = Machine<{ count: number }>({
	id: 'counter',
	initial: 'active',
	context: { count: 0 },
	states: {
		active: {
			on: {
				INC: { actions: assign({ count: ctx => ctx.count + 1 }) },
				SOMETHING: { actions: 'doSomething' },
			},
		},
	},
})
