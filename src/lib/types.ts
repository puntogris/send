import type { Writable } from 'svelte/store';

export interface FiltersStore {
	subscribe: Writable<FileList>['subscribe'];
	update: Writable<FileList>['update'];
	set: Writable<FileList>['set'];
	remove: (file: File) => void;
}
