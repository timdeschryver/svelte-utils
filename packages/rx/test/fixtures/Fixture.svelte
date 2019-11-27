<script>
	import { onMount$, beforeUpdate$, afterUpdate$, onDestroy$ } from '../../src'

	export let name = 'world'
	export let log = evt => {}

	const createLog = event => ({
		next() {
			log('next:' + event)
		},
		complete() {
			log('complete:' + event)
		},
	})

	export let mount$ = onMount$.subscribe(createLog('onMount$'))
	export let before$ = beforeUpdate$.subscribe(createLog('beforeUpdate$'))
	export let after$ = afterUpdate$.subscribe(createLog('afterUpdate$'))
	export let destroy$ = onDestroy$.subscribe(createLog('onDestroy$'))
</script>

Hello {name} 👋
