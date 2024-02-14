import { localStorageStore } from '@skeletonlabs/skeleton';
import { writable } from 'svelte/store';
export const instruments_store = localStorageStore('instruments', [
	{ name: 'Aqueous SPM', type: 'SPM', port: 5000 }
]);

export const tables_store = localStorageStore('tables', {
	//protocol: {
	//	columns: ['Instrument Name', 'Step', 'Args'],
	//	data: []
	//},
	//sourceDest: {
	//	columns: ['Type', 'Name', 'Valve', 'Port'],
	//	data: []
	//}
});

export const actions_store = localStorageStore('actions', [
	{
		action_title: 'Delay 6',
		action_url: 'https://httpbin.org/delay/6',
		request_method: 'POST',
		request_args: []
	}
]);
