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
	const { subscribe, update, set } = writable<FileList>([] as FileList);

	function remove(file: File) {
		update((files) => {
			const dt = new DataTransfer();

			for (let i = 0; i < files.length; i++) {
				const current = files.item(i);
				if (current && current != file) {
					dt.items.add(current);
				}
			}
			return dt.files;
		});
	}

	function addFiles(files: FileList) {
		update((storeFiles) => {
			const dt = new DataTransfer();
			const allFiles = [...files, ...storeFiles];

			allFiles
				.reduce((acc, file) => {
					if (!acc.some((f) => f.name === file.name)) {
						acc.push(file);
					}
					return acc;
				}, [] as File[])
				.forEach((f) => dt.items.add(f));

			return dt.files;
		});
	}

	return {
		subscribe,
		update,
		set,
		remove,
		addFiles
	};
}
