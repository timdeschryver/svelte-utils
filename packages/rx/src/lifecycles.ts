import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte'
import { Subject, defer } from 'rxjs'

export const onMount$ = defer(() => {
	const subject = new Subject<void>()
	onMount(() => {
		subject.next()
		subject.complete()
	})
	return subject.asObservable()
})

export const onDestroy$ = defer(() => {
	const subject = new Subject<void>()
	onDestroy(() => {
		subject.next()
		subject.complete()
	})
	return subject.asObservable()
})

export const beforeUpdate$ = defer(() => {
	const subject = new Subject<void>()
	beforeUpdate(() => {
		subject.next()
	})
	onDestroy(() => {
		subject.complete()
	})
	return subject.asObservable()
})

export const afterUpdate$ = defer(() => {
	const subject = new Subject<void>()
	afterUpdate(() => {
		subject.next()
	})
	onDestroy(() => {
		subject.complete()
	})
	return subject.asObservable()
})
