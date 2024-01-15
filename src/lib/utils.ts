export function getFormattedFileSize(sizeInBytes: number) {
	const sizeInKB = sizeInBytes / 1024;
	const sizeInMB = sizeInKB / 1024;
	const sizeInGB = sizeInMB / 1024;

	if (sizeInGB >= 1) {
		return `${sizeInGB.toFixed(0)}GB`;
	} else if (sizeInMB >= 1) {
		return `${sizeInMB.toFixed(2)}MB`;
	} else {
		return `${sizeInKB.toFixed(2)}KB`;
	}
}
