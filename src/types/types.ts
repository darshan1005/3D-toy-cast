export interface DimensionPrice {
  size: string
  price: number
  preview: { id: number; image: any }[]
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

export interface Toy {
  id: number
  name: string
  price: number
  scale: string
}

export interface Frame {
  type: string
  price: number
  selectedDimension: string
}

export interface Image {
  name: string
  size: number
  type: string
  data: string
}

export interface TruncatedTextWithTooltipProps {
  text: string
  maxLength: number
}
