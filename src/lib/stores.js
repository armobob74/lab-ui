import { writable } from 'svelte/store';
export const instruments_store = writable([{ name: 'Aqueous SPM', type: 'SPM', port: 5000 }]);
