interface CarouselListItemTypes {
    label: string
    src: string
}

interface CarouselTypes {
    title: string
    subtitle?: string
    list: CarouselListItemTypes[]
}

export default CarouselTypes
