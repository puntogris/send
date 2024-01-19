export function getFormattedFileSize(sizeInBytes: number) {
	const sizeInKB = sizeInBytes / 1024;
	const sizeInMB = sizeInKB / 1024;
	const sizeInGB = sizeInMB / 1024;

	if (sizeInGB >= 1) {
		return `${sizeInGB.toFixed(2)}GB`;
	} else if (sizeInMB >= 1) {
		return `${sizeInMB.toFixed(1)}MB`;
	} else {
		return `${sizeInKB.toFixed(0)}KB`;
	}
}

export async function writeToClipboard(data: string) {
	if (navigator) {
		await navigator.clipboard.writeText(data);
	}
}
