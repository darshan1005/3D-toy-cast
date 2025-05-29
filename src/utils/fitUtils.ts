export function parseDimension(size: string): { width: number; height: number } {
  // Expects format "20 X 30 cm" or "8 X 12 cm"
  const match = size.match(/(\d+)\s*X\s*(\d+)/i)
  if (!match) return { width: 0, height: 0 }
  return { width: Number(match[1]), height: Number(match[2]) }
}

export function getToyMaxLength(scale: string): number {
  // Expects format "1:24 (16-20 cm)" or "1:32 (10-15 cm)"
  const match = scale.match(/\((\d+)-?(\d+)?\s*cm\)/i)
  if (!match) return 0
  // Use the max value if range, else the single value
  return match[2] ? Number(match[2]) : Number(match[1])
}

export function canToyFitInFrame(
  toyScale: string,
  frameType: string,
  frameDimension: string
): boolean {
  const toyMax = getToyMaxLength(toyScale)
  const { width, height } = parseDimension(frameDimension)

  // Special logic for dual-box frames
  const dualBoxTypes = ['Free Fall', 'Free Fall Board', 'Gravity Hold']
  if (dualBoxTypes.includes(frameType)) {
    // Each box is height of the frame's height, chain is always 4cm
    // Toy must fit in one box (height)
    return toyMax <= height
    // If you want to allow spanning chain: return toyMax <= (height * 2 + 4)
  } else {
    // Single-cardboard: toy must fit in the smallest side
    const minSide = Math.min(width, height)
    return toyMax <= minSide
  }
}