import Image from "next/image"

const getCountryEmoji = (countryCode: string): JSX.Element | string => {
  if (countryCode.length !== 2) {
    throw new Error("Country code must be exactly 2 characters.")
  }

  const uppercasedCode = countryCode.toUpperCase()
  const isSovietUnionOrYugoslavia = uppercasedCode !== "SU" && uppercasedCode !== "CS"

  const renderUnavailableEmoji = () => (
    <Image
      unoptimized
      src={`/unavailableFlags/${uppercasedCode}.png`}
      alt={`Flag of ${uppercasedCode}`}
      width={30}
      height={29}
      style={{ objectFit: "contain", userSelect: "none" }}
    />
  )

  const codePoints = uppercasedCode.split("").map(
    char =>
      // 'A'.charCodeAt(0) is 65, and the regional indicator A starts at 127462
      127462 + char.charCodeAt(0) - 65
  )

  return isSovietUnionOrYugoslavia ? String.fromCodePoint(...codePoints) : renderUnavailableEmoji()
}

export default getCountryEmoji
