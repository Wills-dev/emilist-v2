export const shortenIdentifier = (value: string) => value.length > 9 ? `${value.slice(0, 4)}…${value.slice(-4)}` : value;
