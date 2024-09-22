import { movieTypes } from "@/json/data.interface"

interface CarouselTypes {
    title: string
    subtitle?: string
    list?: movieTypes[]
    listKey?: string
}

export default CarouselTypes
