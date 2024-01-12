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
