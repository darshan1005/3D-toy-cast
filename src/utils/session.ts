const OrderTypeKey = 'OrderType'

export const setOrderType = (key: string, value: '3d' | 'frame' | 'toy') => {
  sessionStorage.setItem(key, value);
}

export const getOrderType = () => {
  const orderedType = sessionStorage.getItem(OrderTypeKey);
  return orderedType
}

export const setFilters = (key: string, value: any) => {
  sessionStorage.setItem(key, value)
}

export const getFilters = (key: string) => {
  const uploadedImage = sessionStorage.getItem(key);
  return uploadedImage
}

export const remove = (key: string) => {
  sessionStorage.removeItem(key)
}

export const clear = () => {
  sessionStorage.clear()
}