const getCountryNameFromEmoji = (emoji: string, onlyReturnCode?: boolean) => {
  const codePoints = [...emoji].map(char => char.codePointAt(0))
  const countryCode = String.fromCharCode(codePoints[0]! - 127397) + String.fromCharCode(codePoints[1]! - 127397)

  // Use Intl.DisplayNames to get the full country name
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" })

  return onlyReturnCode ? countryCode : regionNames.of(countryCode) || "Unknown Country"
}

export default getCountryNameFromEmoji
