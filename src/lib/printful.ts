// Printful API Client

const PRINTFUL_API_BASE = 'https://api.printful.com'
const API_TOKEN = process.env.PRINTFUL_API_TOKEN

if (!API_TOKEN) {
  console.warn('Warning: PRINTFUL_API_TOKEN is not set. Add it to .env.local')
}

async function fetchPrintful(endpoint: string, options: RequestInit = {}) {
  const url = `${PRINTFUL_API_BASE}${endpoint}`
  
  const headers = {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const response = await fetch(url, {
    ...options,
    headers,
    // Cache for 1 hour in production, no cache in development
    next: { revalidate: process.env.NODE_ENV === 'production' ? 3600 : 0 },
  })

  if (!response.ok) {
    throw new Error(`Printful API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function getStoreProducts() {
  try {
    const data = await fetchPrintful('/store/products')
    return data.result || []
  } catch (error) {
    console.error('Error fetching Printful products:', error)
    return []
  }
}

export async function getProductById(id: string) {
  try {
    const data = await fetchPrintful(`/store/products/${id}`)
    return data.result
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error)
    return null
  }
}

export async function getProductVariants(id: string) {
  try {
    const data = await fetchPrintful(`/store/products/${id}`)
    return data.result?.sync_variants || []
  } catch (error) {
    console.error(`Error fetching variants for product ${id}:`, error)
    return []
  }
}

// Helper to format price
export function formatPrice(price: string | number, currency: string = 'USD'): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(numPrice)
}

// Helper to get unique sizes from variants
export function getSizesFromVariants(variants: any[]): string[] {
  const sizes = variants
    .map(v => v.options?.find((o: any) => o.id === 'size')?.value)
    .filter(Boolean)
  return [...new Set(sizes)] as string[]
}

// Helper to get unique colors from variants
export function getColorsFromVariants(variants: any[]): string[] {
  const colors = variants
    .map(v => v.options?.find((o: any) => o.id === 'color')?.value)
    .filter(Boolean)
  return [...new Set(colors)] as string[]
}

// Calculate shipping cost estimate
export async function calculateShipping(countryCode: string, stateCode?: string) {
  try {
    const data = await fetchPrintful('/shipping/rates', {
      method: 'POST',
      body: JSON.stringify({
        recipient: {
          country_code: countryCode,
          state_code: stateCode,
        },
      }),
    })
    return data.result || []
  } catch (error) {
    console.error('Error calculating shipping:', error)
    return []
  }
}

// Create order with Printful
export async function createOrder(orderData: {
  recipient: {
    name: string
    address1: string
    address2?: string
    city: string
    state_code: string
    country_code: string
    zip: string
    email: string
    phone?: string
  }
  items: Array<{
    sync_variant_id: number
    quantity: number
  }>
}) {
  try {
    const data = await fetchPrintful('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
    return { success: true, order: data.result }
  } catch (error: any) {
    console.error('Error creating order:', error)
    return { 
      success: false, 
      error: error.message || 'Failed to create order' 
    }
  }
}

// Confirm order (submit for fulfillment)
export async function confirmOrder(orderId: string) {
  try {
    const data = await fetchPrintful(`/orders/${orderId}/confirm`, {
      method: 'POST',
    })
    return { success: true, order: data.result }
  } catch (error: any) {
    console.error('Error confirming order:', error)
    return { 
      success: false, 
      error: error.message || 'Failed to confirm order' 
    }
  }
}

// Get order by ID
export async function getOrder(orderId: string) {
  try {
    const data = await fetchPrintful(`/orders/${orderId}`)
    return data.result
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error)
    return null
  }
}
