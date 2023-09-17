import GameCardListTypes from "@/components/GameCardList/types/GameCardList.interface"
import { dataTypes } from "@/json/data.interface"

type GameCardType = 
    Pick<dataTypes, "id" | "name"> & { iconSmall: dataTypes["icon_2"] } & Pick<GameCardListTypes, "setSelectedGameId" | "selectedGameId"> 

export default GameCardType