import superCar from "../assets/supercar.png";
import bikeImage from "../assets/Bike.svg";

export interface ToyDataProps {
  id: number;
  image: any;
  name: string;
  description: string;
  price: number;
  type: string;
  scale: string;
}

export const ToyData: ToyDataProps[] = [
  {
    id: 1,
    image: superCar,
    name: "Ferrari F40",
    description: "The legendary Italian supercar that dominated the 80s with its twin-turbo V8 engine and iconic design.",
    price: 129.99,
    type: "Car",
    scale: '1:18'
  },
  {
    id: 2,
    image: superCar,
    name: "Porsche 911",
    description: "The timeless German sports car that combines daily usability with track-ready performance.",
    price: 119.99,
    type: "Car",
    scale: '1:24'
  },
  {
    id: 3,
    image: superCar,
    name: "Lamborghini Countach",
    description: "The wedge-shaped Italian supercar that defined the 80s with its aggressive styling and powerful V12.",
    price: 139.99,
    type: "Car",
    scale: '1:18'
  },
  {
    id: 4,
    image: superCar,
    name: "Ford Mustang",
    description: "America's iconic muscle car that brings raw power and classic styling to the streets.",
    price: 89.99,
    type: "Car",
    scale: '1:32'
  },
  {
    id: 5,
    image: superCar,
    name: "Bugatti Veyron",
    description: "The engineering marvel that redefined speed limits with its quad-turbo W16 engine.",
    price: 149.99,
    type: "Car",
    scale: '1:24'
  },
  {
    id: 6,
    image: superCar,
    name: "McLaren F1",
    description: "The revolutionary British supercar that held the production car speed record for over a decade.",
    price: 159.99,
    type: "Car",
    scale: '1:43'
  },
  {
    id: 7,
    image: superCar,
    name: "Audi R8",
    description: "The German supercar that combines quattro all-wheel drive with stunning performance.",
    price: 129.99,
    type: "Car",
    scale: '1:18'
  },
  {
    id: 8,
    image: superCar,
    name: "Mercedes-Benz 300SL",
    description: "The iconic Gullwing doors and elegant design make this German classic a true automotive legend.",
    price: 119.99,
    type: "Car",
    scale: '1:43'
  },
  {
    id: 9,
    image: superCar,
    name: "Jaguar E-Type",
    description: "Enzo Ferrari called it the most beautiful car ever made, a British masterpiece of design.",
    price: 109.99,
    type: "Car",
    scale: '1:18'
  },
  {
    id: 10,
    image: superCar,
    name: "Aston Martin DB5",
    description: "The quintessential British GT car, made famous by James Bond and its elegant styling.",
    price: 139.99,
    type: "Car",
    scale: '1:18'
  },
  {
    id: 11,
    image: superCar,
    name: "Chevrolet Corvette",
    description: "America's sports car that delivers supercar performance at a fraction of the price.",
    price: 99.99,
    type: "Car",
    scale: '1:18'
  },
  {
    id: 12,
    image: superCar,
    name: "Koenigsegg Agera",
    description: "The Swedish hypercar that pushes the boundaries of automotive engineering and speed.",
    price: 169.99,
    type: "Car",
    scale: '1:18'
  },
  {
    id: 13,
    image: superCar,
    name: "Pagani Huayra",
    description: "The Italian hypercar that combines art and engineering with its handcrafted carbon-titanium chassis.",
    price: 179.99,
    type: "Car",
    scale: '1:18'
  },
  {
    id: 14,
    image: superCar,
    name: "Rolls-Royce Phantom",
    description: "The ultimate luxury car that sets the standard for opulence and refinement in automotive design.",
    price: 189.99,
    type: "Car",
    scale: '1:18'
  },
  {
    id: 15,
    image: superCar,
    name: "Bentley Continental GT",
    description: "The perfect blend of British luxury and performance in a grand touring package.",
    price: 149.99,
    type: "Car",
    scale: '1:18'
  },
  {
    id: 16,
    image: superCar,
    name: "Audi Continental RT",
    description: "The perfect blend of British luxury and performance in a grand touring package.",
    price: 149.99,
    type: "Car",
    scale: '1:18'
  },
  {
    id: 17,
    image: bikeImage,
    name: "Ducati Panigale V4",
    description: "The Italian superbike that combines cutting-edge technology with breathtaking performance.",
    price: 99.99,
    type: "Bike",
    scale: '1:18'
  },
  {
    id: 18,
    image: bikeImage,
    name: "Kawasaki Ninja H2R",
    description: "The track-only hyperbike with a supercharged engine and unmatched speed.",
    price: 129.99,
    type: "Bike",
    scale: '1:18'
  },
  {
    id: 19,
    image: bikeImage,
    name: "Harley-Davidson Fat Boy",
    description: "The iconic cruiser that defines the spirit of freedom and adventure.",
    price: 89.99,
    type: "Bike",
    scale: '1:64'
  },
  {
    id: 20,
    image: bikeImage,
    name: "BMW S1000RR",
    description: "The German superbike that delivers precision engineering and blistering performance.",
    price: 119.99,
    type: "Bike",
    scale: '1:64'
  },
  {
    id: 21,
    image: bikeImage,
    name: "Yamaha YZF-R1",
    description: "The Japanese superbike that brings MotoGP technology to the streets.",
    price: 109.99,
    type: "Bike",
    scale: '1:64'
  }
];