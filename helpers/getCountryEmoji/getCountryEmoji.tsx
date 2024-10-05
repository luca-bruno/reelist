import Image from "next/image"

interface getCountryEmojiTypes {
  countryCode: string
  width?: number
  height?: number
  marginRight?: string
}

const getCountryEmoji = ({ countryCode, width = 16, height = 20, marginRight = "0.25rem" }: getCountryEmojiTypes): JSX.Element | string => {
  if (countryCode.length !== 2) {
    throw new Error("Country code must be exactly 2 characters.")
  }

  const uppercasedCode = countryCode.toUpperCase()

  const isFormerCountryWithNoEmoji = () => {
    switch (uppercasedCode) {
      case "SU": // Soviet Union
      case "YU": // Yugoslavia
      case "BU": // Burma
      case "XG": // East Germany
      case "AN": // Netherlands Antilles
      case "XI": // Northern Ireland
      case "ZR": // Zaire
        return true
      default:
        return false
    }
  }

  const isFormerCountryWithFallbackEmoji = () => {
    switch (uppercasedCode) {
      case "XC":
        return "CZ" // Czechoslovakia -> Czechia flag
      case "TP":
        return "TL" // East Timor -> Timur-Leste flag
      case "CS":
        return "RS" // Serbia and Montenegro -> Serbia flag
    }
  }

  const renderUnavailableEmoji = () => (
    <Image
      unoptimized
      src={`/unavailableFlags/${uppercasedCode}.png`}
      alt={`Flag of ${uppercasedCode}`}
      width={width}
      height={height}
      style={{ objectFit: "contain", userSelect: "none", marginRight }}
    />
  )

  const codePoints = uppercasedCode.split("").map(
    char =>
      // 'A'.charCodeAt(0) is 65, and the regional indicator A starts at 127462
      127462 + char.charCodeAt(0) - 65
  )

  if (isFormerCountryWithNoEmoji()) {
    return renderUnavailableEmoji()
  }

  const fallbackCode = isFormerCountryWithFallbackEmoji()

  if (fallbackCode) {
    return getCountryEmoji({ countryCode: fallbackCode, width, height, marginRight })
  }

  return String.fromCodePoint(...codePoints)
}

export default getCountryEmoji
