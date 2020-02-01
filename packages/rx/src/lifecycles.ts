import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte'
import { Subject, defer } from 'rxjs'
import { take, takeUntil } from 'rxjs/operators'

export const onMount$ = defer(() => {
	const subject = new Subject<void>()
	onMount(() => {
		subject.next()
	})
	return subject.asObservable().pipe(take(1))
})

export const onDestroy$ = defer(() => {
	const subject = new Subject<void>()
	onDestroy(() => {
		subject.next()
	})
	return subject.asObservable().pipe(take(1))
})

export const beforeUpdate$ = defer(() => {
	const subject = new Subject<void>()
	beforeUpdate(() => {
		subject.next()
	})
	return subject.asObservable().pipe(takeUntil(onDestroy$))
})

export const afterUpdate$ = defer(() => {
	const subject = new Subject<void>()
	afterUpdate(() => {
		subject.next()
	})
	return subject.asObservable().pipe(takeUntil(onDestroy$))
})
