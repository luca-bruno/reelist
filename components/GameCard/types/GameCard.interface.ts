import dataTypes from "@/json/data.interface"

type GameCardType = Pick<dataTypes, "name" | "iconSmall">

export default GameCardType