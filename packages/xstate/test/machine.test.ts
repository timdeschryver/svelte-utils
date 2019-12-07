import { render, fireEvent, waitForElement } from '@testing-library/svelte'
import { Machine, Interpreter, doneInvoke } from 'xstate'

import Fetcher from './fixtures/Fetcher.svelte'
import Service from './fixtures/Service.svelte'
import Spawner from './fixtures/Spawner.svelte'
import Toggle from './fixtures/Toggle.svelte'
import { fetchMachine } from './fixtures/fetchMachine'

const persistedFetchState = fetchMachine.transition(
	'loading',
	doneInvoke('fetchData', 'persisted data'),
)

it('should work with machine', async () => {
	const { getByText, getByTestId } = render(Fetcher, {
		props: {
			onFetch: () => new Promise(res => setTimeout(() => res('fake data'), 10)),
		},
	})

	const button = getByText('Fetch')
	await fireEvent.click(button)
	getByText(/Loading.../)
	await waitForElement(() => getByText(/Success/))
	const dataEl = getByTestId('data')
	expect(dataEl.textContent).toBe('fake data')
})

it('should work with machine (rehydrated state)', async () => {
	const { getByText, getByTestId } = render(Fetcher, {
		props: {
			onFetch: () => new Promise(res => res('fake data')),
			persistedState: persistedFetchState,
		},
	})

	await waitForElement(() => getByText(/Success/))
	const dataEl = getByTestId('data')
	expect(dataEl.textContent).toBe('persisted data')
})

it('should work with machine (rehydrated state config)', async () => {
	const persistedFetchStateConfig = JSON.parse(
		JSON.stringify(persistedFetchState),
	)
	const { getByText, getByTestId } = render(Fetcher, {
		props: {
			onFetch: () => new Promise(res => res('fake data')),
			persistedState: persistedFetchStateConfig,
		},
	})

	await waitForElement(() => getByText(/Success/))
	const dataEl = getByTestId('data')
	expect(dataEl.textContent).toBe('persisted data')
})

it('should provide the service', () => {
	const { component } = render(Service, {
		props: {
			stateMachine: fetchMachine,
		},
	})
	if (!(component.state.service instanceof Interpreter)) {
		throw new Error('service not instance of Interpreter')
	}
	expect(component.state.service.options.execute).toBe(true)
})

it('should provide options for the service', () => {
	const { component } = render(Service, {
		props: {
			stateMachine: fetchMachine,
			options: {
				execute: false,
			},
		},
	})

	expect(component.state.service.options.execute).toBe(false)
})

it('should support the immediate option when the initial state has a transient transition', done => {
	const testMachine = Machine({
		initial: 'bootstrap',
		states: {
			bootstrap: {
				on: {
					'': {
						target: 'idle',
					},
				},
			},
			idle: {},
		},
	})

	const { component } = render(Service, {
		props: {
			stateMachine: testMachine,
			options: {
				immediate: true,
			},
		},
	})

	component.state.subscribe((state: any) => {
		expect(state.value).toBe('idle')
		expect(component.state.service.initialized).toBe(true)
		done()
	})
})

it('should merge machine context with options.context', done => {
	const testMachine = Machine<{ foo: string; test: boolean }>({
		context: {
			foo: 'bar',
			test: false,
		},
		initial: 'idle',
		states: {
			idle: {},
		},
	})

	const { component } = render(Service, {
		props: {
			stateMachine: testMachine,
			options: {
				context: { test: true },
			},
		},
	})

	component.state.subscribe((state: any) => {
		expect(state.context).toEqual({
			foo: 'bar',
			test: true,
		})
		done()
	})
})

it('should not spawn actors until service is started', async done => {
	const { getByTestId } = render(Spawner)
	await waitForElement(() => getByTestId('success'))
	done()
})

it('actions should not have stale data', async () => {
	const { getByTestId } = render(Toggle, {
		prop: {
			doAction: (value: boolean) => expect(value).toBeTruthy(),
		},
	})

	const button = getByTestId('button')
	const extButton = getByTestId('extbutton')
	await fireEvent.click(extButton)

	await fireEvent.click(button)
})
