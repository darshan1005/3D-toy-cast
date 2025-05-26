
// Constants for pricing strategy
export const DISCOUNTS = {
  THREE_D: 0.32, // 32% for 3D Design (Toys + Frames)
  TOYS_ONLY: 0.12, // 12% for Toys Only
  FRAMES_ONLY: 0.22, // 22% for Frames Only
} as const

export const MIN_PROFIT_MARGIN = 0.3 // 30% minimum profit margin

/**
 * Calculates the required selling price to maintain minimum profit margin
 * @param costPrice - The cost price of the product
 * @param maxDiscount - Maximum discount that can be applied (default: 32%)
 * @param minProfit - Minimum profit margin required (default: 15%)
 * @returns The calculated selling price rounded up to nearest rupee
 */
export function calculateSellingPrice(
  costPrice: number,
  maxDiscount: number = DISCOUNTS.THREE_D,
  minProfit: number = MIN_PROFIT_MARGIN,
): number {
  const price = costPrice / ((1 - maxDiscount) * (1 - minProfit))
  return Math.ceil(price) // Round up to nearest rupee
}

/**
 * Calculates the final price after applying discount
 * @param sellingPrice - The base selling price
 * @param discount - The discount to apply
 * @returns The final price after discount
 */
export function calculateDiscountedPrice(sellingPrice: number, discount: number): number {
  return sellingPrice * (1 - discount)
}

/**
 * Calculates the profit margin percentage
 * @param sellingPrice - The base selling price
 * @param costPrice - The cost price
 * @param discount - The applied discount
 * @returns The profit margin percentage
 */
export function calculateProfitMargin(
  sellingPrice: number,
  costPrice: number,
  discount: number,
): number {
  const discountedPrice = calculateDiscountedPrice(sellingPrice, discount)
  return ((discountedPrice - costPrice) / discountedPrice) * 100
}

// Get Frame costs from FrameData
export const GET_FRAME_COSTS_from_DATA = frameJsonData.frames.reduce((acc, frame) => {
  acc[frame.type] = frame.dimensionPrice.reduce((dimAcc, dim) => {
    dimAcc[dim.size] = Math.round(dim.price)
    return dimAcc
  }, {} as Record<string, number>)
  return acc
}, {} as Record<string, Record<string, number>>)

// Calculate selling prices for frames with dimensions
export const CALCULATE_FRAME_PRICES = Object.entries(GET_FRAME_COSTS_from_DATA).reduce((acc, [frameType, dimensions]) => {
  acc[frameType] = Object.entries(dimensions).reduce((dimAcc, [size, cost]) => {
    dimAcc[size] = calculateSellingPrice(cost)
    return dimAcc
  }, {} as Record<string, number>)
  return acc
}, {} as Record<string, Record<string, number>>)

// Helper function to get frame price by type and dimension
export function getFramePrice(frameType: string, dimension: string): number {
  return CALCULATE_FRAME_PRICES[frameType]?.[dimension] || 0
}

