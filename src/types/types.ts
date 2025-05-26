export interface DimensionPrice {
  size: string
  price: number
}

export interface FrameDetailsProps {
  id: number
  type: string
  material: string
  dimensionPrice: DimensionPrice[]
  weight: number
  description: string
  image: any
  selectedDimension?: string
}

export interface ToyDataProps {
  id: number
  image: any
  name: string
  description: string
  price: number
  type: string
  scale: string
}

export interface Testimonial {
    username: string
    stars: number
    testimonial: string
}