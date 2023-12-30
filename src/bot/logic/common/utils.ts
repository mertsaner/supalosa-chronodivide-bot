export type DebugLogger = (message: string, sayInGame?: boolean) => void;

// Thanks use-strict!
export function formatTimeDuration(timeSeconds: number, skipZeroHours = false) {
    let h = Math.floor(timeSeconds / 3600);
    timeSeconds -= h * 3600;
    let m = Math.floor(timeSeconds / 60);
    timeSeconds -= m * 60;
    let s = Math.floor(timeSeconds);

    return [...(h || !skipZeroHours ? [h] : []), pad(m, "00"), pad(s, "00")].join(":");
}

export function pad(n: any, format = "0000") {
    let str = "" + n;
    return format.substring(0, format.length - str.length) + str;
}

// So we don't need lodash

export function maxBy<T>(array: T[], predicate: (arg: T) => number | null): T | null {
    if (array.length === 0) {
        return null;
    }
    let maxIdx = 0;
    let maxVal = predicate(array[0]);
    for (let i = 1; i < array.length; ++i) {
        const newVal = predicate(array[i]);
        if (maxVal === null || (newVal !== null && newVal > maxVal)) {
            maxIdx = i;
            maxVal = newVal;
        }
    }
    return array[maxIdx];
}

export function uniqBy<T>(array: T[], predicate: (arg: T) => string | number): T[] {
    return Object.values(
        array.reduce(
            (prev, newVal) => {
                const val = predicate(newVal);
                if (!prev[val]) {
                    prev[val] = newVal;
                }
                return prev;
            },
            {} as Record<string, T>,
        ),
    );
}

export function countBy<T>(array: T[], predicate: (arg: T) => string | undefined): { [key: string]: number } {
    return array.reduce(
        (prev, newVal) => {
            const val = predicate(newVal);
            if (val === undefined) {
                return prev;
            }
            if (!prev[val]) {
                prev[val] = 0;
            }
            prev[val] = prev[val] + 1;
            return prev;
        },
        {} as Record<string, number>,
    );
}
