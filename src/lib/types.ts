
export interface FiltersStore {
	files: File[];
	remove: (file: File) => void;
	addFiles: (files: FileList) => void;
}

export type UploadFile = {
	id: string;
	name: string;
	size: number;
	url: string;
	file: File;
};
