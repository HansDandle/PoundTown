// Printful API types

export interface PrintfulProduct {
  id: number
  external_id?: string
  name: string
  variants: number
  synced: number
  thumbnail_url?: string
  is_ignored?: boolean
}

export interface PrintfulSyncProduct {
  id: number
  external_id: string
  name: string
  variants: number
  synced: number
  thumbnail_url: string
  is_ignored: boolean
}

export interface PrintfulVariant {
  id: number
  external_id: string
  sync_product_id: number
  name: string
  synced: boolean
  variant_id: number
  retail_price: string
  currency: string
  is_ignored: boolean
  sku: string | null
  product: {
    variant_id: number
    product_id: number
    image: string
    name: string
  }
  files: Array<{
    id: number
    type: string
    hash: string
    url: string
    filename: string
    mime_type: string
    size: number
    width: number
    height: number
    dpi: number
    status: string
    created: number
    thumbnail_url: string
    preview_url: string
    visible: boolean
  }>
  options: Array<{
    id: string
    value: string | number
  }>
}

export interface PrintfulProductWithVariants extends PrintfulSyncProduct {
  sync_variants: PrintfulVariant[]
}

export interface PrintfulApiResponse<T> {
  code: number
  result: T
  extra?: any
}
