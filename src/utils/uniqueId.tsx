export function generateUniqueId(name: string, phone: string): string {
  const timestamp = Date.now(); // Milliseconds since epoch
  const cleanName = name.trim().replace(/\s+/g, '').toLowerCase(); // e.g., "John Doe" → "johndoe"
  return `${cleanName}_${phone}_${timestamp}`;
}
