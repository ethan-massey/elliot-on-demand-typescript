export const getFileNameFromCurrentDateTime = () => {
    const date = new Date();
    const estOffset = -5 * 60 * 60 * 1000; // EST is UTC-5
    const estDate = new Date(date.getTime() + estOffset);

    return `${estDate.toISOString().substring(0, 19)}.mp3`
}
