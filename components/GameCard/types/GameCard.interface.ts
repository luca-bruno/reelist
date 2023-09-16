import GameCardListTypes from "@/components/GameCardList/types/GameCardList.interface"
import { dataTypes } from "@/json/data.interface"

type GameCardType = Pick<dataTypes, "id" | "name" | "iconSmall"> & GameCardListTypes

export default GameCardType