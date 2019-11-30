<script>
	import { service } from '../../src'

	export let counterRef

	$: state = service(counterRef)
</script>

<button data-testid="inc" on:click={_ => state.send('INC')} />
<div data-testid="count">{$state.context.count}</div>
