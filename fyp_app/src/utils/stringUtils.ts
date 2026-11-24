export function truncateText(str: string, maxLength: number): string {

    if (str.length > maxLength) {
        return str.substring(0, maxLength) + '...';
    }
    return str;

}

export function formatTime(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC',
    });
}

console.log(formatTime('Sat 21 Nov 2026 14:06:28 GMT+0000')); // "02:06 PM"