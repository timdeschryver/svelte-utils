<script>
	import { doneInvoke } from 'xstate'
	import { machine } from '../../src'
	import { fetchMachine } from './fetchMachine'

	export let onFetch = async () => {}
	export let persistedState = undefined

	const state = machine(fetchMachine, {
		services: {
			fetchData: onFetch,
		},
		state: persistedState,
	})
</script>

{#if $state.value === 'idle'}
	<button on:click={_ => state.send('FETCH')}>Fetch</button>
{:else if $state.value === 'loading'}
	<div>Loading...</div>
{:else if $state.value === 'success'}
	<div>
		Success! Data:
		<div data-testid="data">{$state.context.data}</div>
	</div>
{/if}
