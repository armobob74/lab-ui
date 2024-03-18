import { localStorageStore } from '@skeletonlabs/skeleton';
import { writable } from 'svelte/store';
export const instruments_store = localStorageStore('instruments', [
	{ name: 'Aqueous SPM', type: 'SPM', port: 5000, ip: '127.0.0.1' }
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
		action_title: 'Clean All',
		action_url: 'http://localhost:5005/clean',
		request_method: 'POST',
		request_args: []
	}
]);
