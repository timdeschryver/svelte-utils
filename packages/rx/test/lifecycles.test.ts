import { render } from '@testing-library/svelte'

import Fixture from './fixtures/Fixture.svelte'

test('integration', async () => {
	const eventLog: string[] = []
	const { component, unmount } = render(Fixture, {
		props: {
			name: 'world',
			log: (evt: string) => eventLog.push(evt),
		},
	})

	component.name = 'monde'
	unmount()

	expect(eventLog).toEqual([
		'next:beforeUpdate$',
		'next:onMount$',
		'complete:onMount$',
		'next:afterUpdate$',
		'next:beforeUpdate$',
		'next:afterUpdate$',
		'complete:beforeUpdate$',
		'complete:afterUpdate$',
		'next:onDestroy$',
		'complete:onDestroy$',
	])
})

test('respects the lifecycles  order', async () => {
	const eventLog: string[] = []
	const { component, unmount } = render(Fixture, {
		props: {
			name: 'world',
			log: (evt: string) => eventLog.push(evt),
		},
	})

	component.name = 'monde'
	unmount()

	const nextLog = eventLog
		.filter(evt => evt.startsWith('next:'))
		.map(evt => evt.replace('next:', ''))
	expect(nextLog).toEqual([
		'beforeUpdate$',
		'onMount$',
		'afterUpdate$',
		'beforeUpdate$',
		'afterUpdate$',
		'onDestroy$',
	])
})

test('onMount$ unsubscribes after mount', async () => {
	const { component } = render(Fixture)
	expect(component.mount$.closed).toBeTruthy()
})

test('beforeUpdate$ unsubscribes after destroy', async () => {
	const eventLog: string[] = []
	const { component, unmount } = render(Fixture, {
		props: {
			log: (evt: string) => eventLog.push(evt),
		},
	})

	expect(component.before$.closed).toBeFalsy()
	unmount()

	expect(eventLog).toContain('complete:beforeUpdate$')
})

test('afterUpdate$ unsubscribes after destroy', async () => {
	const eventLog: string[] = []
	const { component, unmount } = render(Fixture, {
		props: {
			log: (evt: string) => eventLog.push(evt),
		},
	})

	expect(component.after$.closed).toBeFalsy()
	unmount()

	expect(eventLog).toContain('complete:afterUpdate$')
})

test('onDestroy$ unsubscribes after destroy', async () => {
	const eventLog: string[] = []
	const { component, unmount } = render(Fixture, {
		props: {
			log: (evt: string) => eventLog.push(evt),
		},
	})

	expect(component.destroy$.closed).toBeFalsy()
	unmount()

	expect(eventLog).toContain('complete:onDestroy$')
})
