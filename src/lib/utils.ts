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

export function calculateFutureDate(value: string) {
	const date = new Date();
	switch (value) {
		case '5m':
			return new Date(date.getTime() + 300000); // 5 minutes = 300,000 milliseconds
		case '1h':
			return new Date(date.getTime() + 3600000); // 1 hour = 3,600,000 milliseconds
		case '1d':
			return new Date(date.getTime() + 86400000); // 1 day = 86,400,000 milliseconds
		case '7d':
			return new Date(date.getTime() + 604800000); // 7 days = 604,800,000 milliseconds
		default:
			return new Date(date.getTime() + 60000); // 5 minutes = 300,000 milliseconds
	}
}
