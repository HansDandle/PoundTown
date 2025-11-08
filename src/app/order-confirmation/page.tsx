'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function OrderConfirmation() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('id')
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      // Optionally fetch order details from Printful
      // For now, just show the order ID
      setLoading(false)
    }
  }, [orderId])

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-xl text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="container-custom max-w-2xl">
        <div className="bg-white p-8 rounded border-2 border-tan/30 text-center">
          {/* Success Icon */}
          <div className="text-6xl mb-4">✅</div>
          
          <h1 className="text-4xl rustic-heading mb-4">Order Confirmed!</h1>
          
          <div className="h-1 w-24 bg-primary rounded mx-auto mb-6"></div>

          <p className="text-lg text-gray-700 mb-6">
            Thank you for your order from Pound Town, TX!
          </p>

          {orderId && (
            <div className="bg-cream p-4 rounded border-2 border-tan/30 mb-6">
              <p className="text-sm font-bold text-gray-700 mb-2">Order ID:</p>
              <p className="text-lg font-mono text-primary">{orderId}</p>
            </div>
          )}

          <div className="text-left bg-gradient-to-br from-tan/10 to-cream p-6 rounded mb-6">
            <h2 className="text-xl font-bold text-primary mb-3">What's Next?</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>You'll receive an email confirmation at the address you provided</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                <span>Printful will begin processing your order</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                <span>You'll receive tracking information once your order ships</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">4.</span>
                <span>Your unique Pound Town merchandise will arrive soon!</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-primary">
              Continue Shopping
            </Link>
            <Link href="/" className="btn-secondary">
              Back to Home
            </Link>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            Questions? Contact us at{' '}
            <a href="mailto:support@poundtowntx.com" className="text-primary hover:underline">
              support@poundtowntx.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
