<script>
	import { Machine, assign, spawn, doneInvoke } from 'xstate'
	import { machine } from '../../src'

	const spawnMachine = Machine({
		id: 'spawn',
		initial: 'start',
		context: { ref: undefined },
		states: {
			start: {
				entry: assign({
					ref: () => spawn(new Promise(res => res(42)), 'my-promise'),
				}),
				on: {
					[doneInvoke('my-promise')]: 'success',
				},
			},
			success: {
				type: 'final',
			},
		},
	})

	const state = machine(spawnMachine)
</script>

{#if $state.value === 'start'}
	<span data-testid="start" />
{:else if $state.value === 'success'}
	<span data-testid="success" />
{/if}
