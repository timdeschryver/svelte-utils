<script>
	import { service } from '../../src'

	export let counterRef
	let otherState = ''

	$: store = service(counterRef)
	$: counterRef.execute($store, {
		doSomething: () => {
			otherState = 'test'
		},
	})
</script>

<button
	data-testid="button-something"
	on:click={_ => store.send('SOMETHING')} />
<div data-testid="count">{$store.context.count}</div>
<div data-testid="other">{otherState}</div>
