<script>
	import { promiseMachine } from './promiseMachine'
	import { actor, machine } from '../../src'

	const state = machine(promiseMachine)
	const msg = actor($state.context.promise)
</script>

<div data-testid="count">{$msg}</div>
