import GameCardListTypes from "@/components/GameCardList/types/GameCardList.interface"
import { dataTypes } from "@/json/data.interface"

type GameCardType = Pick<dataTypes, "id" | "name"> & { iconSmall: dataTypes["icon_2"] } & Omit<GameCardListTypes, "query"> 

export default GameCardType