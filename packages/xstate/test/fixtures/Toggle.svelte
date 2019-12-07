<script>
	import { Machine, assign, spawn, doneInvoke } from 'xstate'
	import { machine } from '../../src'

	export let doAction = val => {}

	let ext = false
	const toggleMachine = Machine({
		initial: 'inactive',
		states: {
			inactive: {
				on: { TOGGLE: 'active' },
			},
			active: {
				entry: 'doAction',
			},
		},
	})

	const state = machine(toggleMachine, {
		actions: {
			doAction,
		},
	})
</script>

{#if $state.value === 'start'}
	<span data-testid="start" />
{:else if $state.value === 'success'}
	<span data-testid="success" />
{/if}

<button
	data-testid="extbutton"
	onClick={_ => {
		ext = true
	}} />
<button
	data-testid="button"
	onClick={_ => {
		state.send('TOGGLE')
	}} />
