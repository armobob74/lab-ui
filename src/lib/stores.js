import { localStorageStore } from '@skeletonlabs/skeleton';
import { writable } from 'svelte/store';
export const instruments_store = localStorageStore('instruments', [
	{ name: 'Aqueous SPM', type: 'SPM', port: 5000 }
]);
