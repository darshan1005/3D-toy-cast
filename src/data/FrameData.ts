import frame from '../assets/frame.jpeg'

export interface DimensionPrice {
  size: string
  price: number
}

export interface FrameDetailsProps {
  id: number
  type: string
  material: string
  dimensionPrices: DimensionPrice[]
  weight: number
  description: string
  image: any
  selectedDimension?: string
}

export const frameData: FrameDetailsProps[] = [
  {
    id: 1,
    type: 'Basic Box (Regular)',
    material: 'Hard Plastic',
    dimensionPrices: [
      { size: '20 X 30 cm', price: 500 },
      { size: '18 X 27 cm', price: 450 },
      { size: '16 X 24 cm', price: 400 },
      { size: '14 X 21 cm', price: 350 },
      { size: '12 X 18 cm', price: 300 },
    ],
    weight: 1.2,
    description:
      'A versatile box frame with maximum depth, perfect for displaying 3D objects and creating depth in your displays. Ideal for showcasing small sculptures or layered artwork.',
    image: frame,
  },
  {
    id: 2,
    type: 'Free Fall',
    material: 'Hard Plastic',
    dimensionPrices: [
      { size: '20 X 30 cm', price: 650 },
      { size: '18 X 27 cm', price: 600 },
      { size: '16 X 24 cm', price: 500 },
      { size: '14 X 21 cm', price: 450 },
    ],
    weight: 0.9,
    description:
      'Medium-depth frame designed for objects that need to appear suspended in space. Great for creating dynamic displays with falling or floating elements.',
    image: frame,
  },
  {
    id: 3,
    type: 'Free Fall Board',
    material: 'Hard Plastic',
    dimensionPrices: [
      { size: '20 X 30 cm', price: 700 },
      { size: '18 X 27 cm', price: 650 },
      { size: '16 X 24 cm', price: 600 },
      { size: '14 X 21 cm', price: 550 },
    ],
    weight: 0.7,
    description:
      'Slim profile frame perfect for wall mounting. Features a secure hanging mechanism and minimal depth for a clean, modern look on any wall.',
    image: frame,
  },
  {
    id: 4,
    type: 'Edge Square',
    material: 'Hard Plastic',
    dimensionPrices: [
      { size: '20 X 30 cm', price: 450 },
      { size: '18 X 27 cm', price: 400 },
      { size: '16 X 24 cm', price: 350 },
      { size: '14 X 21 cm', price: 300 },
    ],
    weight: 1.0,
    description:
      'Specially designed frame for displaying toys in a falling or dynamic pose. Features adjustable depth for various toy sizes and secure mounting points.',
    image: frame,
  },
  {
    id: 5,
    type: 'Gravity Hold',
    material: 'Hard Plastic',
    dimensionPrices: [
      { size: '20 X 30 cm', price: 700 },
      { size: '18 X 27 cm', price: 650 },
      { size: '16 X 24 cm', price: 600 },
      { size: '14 X 21 cm', price: 550 },
    ],
    weight: 0.6,
    description:
      'Ultra-slim frame optimized for displaying images with a falling or cascading effect. Perfect for creating visual depth in photographs and artwork.',
    image: frame,
  },
  {
    id: 6,
    type: 'Edge Cut',
    material: 'Hard Plastic',
    dimensionPrices: [
      { size: '20 X 30 cm', price: 400 },
      { size: '18 X 27 cm', price: 350 },
      { size: '16 X 24 cm', price: 300 },
      { size: '14 X 21 cm', price: 250 },
      { size: '12 X 18 cm', price: 200 },
    ],
    weight: 0.8,
    description:
      'Versatile hanging box frame with medium depth, ideal for displaying small objects while maintaining a clean, boxed presentation. Features secure hanging mechanism.',
    image: frame,
  },
  {
    id: 7,
    type: 'Edge Cut Board',
    material: 'Hard Plastic',
    dimensionPrices: [
      { size: '20 X 30 cm', price: 500 },
      { size: '18 X 27 cm', price: 450 },
      { size: '16 X 24 cm', price: 400 },
      { size: '14 X 21 cm', price: 350 },
      { size: '12 X 18 cm', price: 300 },
    ],
    weight: 1.1,
    description:
      'Deep frame specifically designed for hanging toys and collectibles. Includes multiple mounting points and adjustable depth for various toy sizes.',
    image: frame,
  },
  {
    id: 8,
    type: 'Open box',
    material: 'Hard Plastic',
    dimensionPrices: [
      { size: '12 X 18 cm', price: 100 },
      { size: '10 X 15 cm', price: 250 },
      { size: '8 X 12 cm', price: 200 },
    ],
    weight: 0.75,
    description:
      'Contemporary open-frame design with moderate depth, perfect for displaying objects that need to be easily accessible or viewed from multiple angles.',
    image: frame,
  },
]
