import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';
import type { FiltersStore } from './types';

const FILES_CONTEXT_KEY = 'files_context_key';

export function initializeStores() {
	const filesStore = createFilesStore();
	setContext(FILES_CONTEXT_KEY, filesStore);
}

export function getFilesStore(): FiltersStore {
	return getContext<FiltersStore>(FILES_CONTEXT_KEY);
}

function createFilesStore(): FiltersStore {
	//@ts-ignore
	const { subscribe, update, set } = writable<FileList>([]);

	function remove(file: File) {
		update((files) => {
			const newFiles = new DataTransfer();

			for (let i = 0; i < files.length; i++) {
				const current = files.item(i);
				if (current && current != file) {
					newFiles.items.add(current);
				}
			}
			return newFiles.files;
		});
	}

	return {
		subscribe,
		update,
		set,
		remove
	};
}
