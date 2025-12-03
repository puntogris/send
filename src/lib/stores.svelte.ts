import { getContext, setContext } from 'svelte';
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
	let files = $state<File[]>([]);

	function remove(file: File) {
		files = files.filter((f) => f.name !== file.name);
	}

	function addFiles(newFiles: FileList) {
		for (let i = 0; i < newFiles.length; i++) {
			const toAdd = newFiles.item(i);
			if (!toAdd) continue;

			const exists = files.some((f) => f.name === toAdd.name);
			if (!exists) files.push(toAdd);
		}
	}

	return {
		get files() {
			return files;
		},
		remove,
		addFiles
	};
}
