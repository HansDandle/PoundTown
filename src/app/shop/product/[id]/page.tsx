import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductById, getStoreProducts } from '@/lib/printful'
import ProductDetailClient from '@/components/ProductDetailClient'

type Props = {
  params: { id: string }
}

export async function generateStaticParams() {
  const products = await getStoreProducts()
  
  return products.map((product: any) => ({
    id: product.id.toString(),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductById(params.id)
  
  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} | Pound Town, TX Gift Shop`,
    description: `Shop ${product.name} from Pound Town, Texas. Unique gifts and merchandise from Dripping Springs, TX 78620.`,
    openGraph: {
      title: product.name,
      description: `${product.name} - Unique gift from Pound Town, Texas`,
      images: product.thumbnail_url ? [product.thumbnail_url] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}
