import frame from '../assets/frame.jpeg'

export interface FrameDetailsProps {
  id: number
  type: string
  material: string
  dimensions: {
    width: number
    height: number
    depth: number
  }
  weight: number
  description: string
  image: any
  price: number
}

export const frameData: FrameDetailsProps[] = [
  {
    id: 1,
    type: 'Basic Box (Regular)',
    material: 'Hard Plastic',
    dimensions: {
      width: 20,
      height: 30,
      depth: 6,
    },
    weight: 1.2,
    description:
      'A versatile box frame with maximum depth, perfect for displaying 3D objects and creating depth in your displays. Ideal for showcasing small sculptures or layered artwork.',
    image: frame,
    price: 1500,
  },
  {
    id: 2,
    type: 'Free Fall',
    material: 'Hard Plastic',
    dimensions: {
      width: 20,
      height: 30,
      depth: 4.5,
    },
    weight: 0.9,
    description:
      'Medium-depth frame designed for objects that need to appear suspended in space. Great for creating dynamic displays with falling or floating elements.',
    image: frame,
    price: 1800,
  },
  {
    id: 3,
    type: 'Wall Hanging',
    material: 'Hard Plastic',
    dimensions: {
      width: 20,
      height: 30,
      depth: 3,
    },
    weight: 0.7,
    description:
      'Slim profile frame perfect for wall mounting. Features a secure hanging mechanism and minimal depth for a clean, modern look on any wall.',
    image: frame,
    price: 1200,
  },
  {
    id: 4,
    type: 'Edge Square',
    material: 'Hard Plastic',
    dimensions: {
      width: 20,
      height: 30,
      depth: 5,
    },
    weight: 1.0,
    description:
      'Specially designed frame for displaying toys in a falling or dynamic pose. Features adjustable depth for various toy sizes and secure mounting points.',
    image: frame,
    price: 1600,
  },
  {
    id: 5,
    type: 'Gravity Hold',
    material: 'Hard Plastic',
    dimensions: {
      width: 20,
      height: 30,
      depth: 2.5,
    },
    weight: 0.6,
    description:
      'Ultra-slim frame optimized for displaying images with a falling or cascading effect. Perfect for creating visual depth in photographs and artwork.',
    image: frame,
    price: 1400,
  },
  {
    id: 6,
    type: 'Edge Cut',
    material: 'Hard Plastic',
    dimensions: {
      width: 20,
      height: 30,
      depth: 4,
    },
    weight: 0.8,
    description:
      'Versatile hanging box frame with medium depth, ideal for displaying small objects while maintaining a clean, boxed presentation. Features secure hanging mechanism.',
    image: frame,
    price: 1700,
  },
  {
    id: 7,
    type: 'Edge Cut Square',
    material: 'Hard Plastic',
    dimensions: {
      width: 20,
      height: 30,
      depth: 5.5,
    },
    weight: 1.1,
    description:
      'Deep frame specifically designed for hanging toys and collectibles. Includes multiple mounting points and adjustable depth for various toy sizes.',
    image: frame,
    price: 1900,
  },
  {
    id: 8,
    type: 'Flate open box',
    material: 'Hard Plastic',
    dimensions: {
      width: 20,
      height: 30,
      depth: 3.5,
    },
    weight: 0.75,
    description:
      'Contemporary open-frame design with moderate depth, perfect for displaying objects that need to be easily accessible or viewed from multiple angles.',
    image: frame,
    price: 1300,
  },
]
