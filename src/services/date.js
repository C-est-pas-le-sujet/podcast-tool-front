export const secondsToMMSS = (seconds) => `${(Math.floor(seconds / 60) + "").padStart(2, "0")}:${((seconds % 60) + "").padStart(2, "0")}`;
