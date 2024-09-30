const capitaliseEachWord = (string: string) => string.toLowerCase().replace(/^(.)|\s+(.)/g, c => c.toUpperCase())

export default capitaliseEachWord
