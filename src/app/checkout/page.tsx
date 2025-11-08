'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/printful'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setError('')

    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address1: formData.address1,
            address2: formData.address2,
            city: formData.city,
            state_code: formData.state,
            country_code: formData.country,
            zip: formData.zip,
          },
          items: items.map(item => ({
            sync_variant_id: item.variantId,
            quantity: item.quantity,
          })),
        }),
      })

      const result = await response.json()

      if (result.success) {
        clearCart()
        router.push(`/order-confirmation?id=${result.order.id}`)
      } else {
        setError(result.error || 'Failed to create order. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Checkout error:', err)
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream py-16">
        <div className="container-custom max-w-2xl text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl rustic-heading mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some items to your cart before checking out.</p>
          <a href="/shop" className="btn-primary inline-block">
            Continue Shopping
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="container-custom max-w-6xl">
        <h1 className="text-4xl rustic-heading mb-8 text-center">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white p-6 rounded border-2 border-tan/30">
            <h2 className="text-2xl font-bold mb-6 text-primary">Shipping Information</h2>
            
            {error && (
              <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-tan rounded focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-tan rounded focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-tan rounded focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  name="address1"
                  required
                  value={formData.address1}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-tan rounded focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-tan rounded focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-tan rounded focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    maxLength={2}
                    placeholder="TX"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-tan rounded focus:border-primary focus:outline-none uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zip"
                    required
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-tan rounded focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Country *
                  </label>
                  <select
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-tan rounded focus:border-primary focus:outline-none"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="ES">Spain</option>
                    <option value="IT">Italy</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded border-2 border-tan/30 h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-6 text-primary">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-4 pb-4 border-b border-tan/30">
                  <div className="relative w-16 h-16 flex-shrink-0 bg-cream rounded">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.productName}
                        fill
                        className="object-contain p-1"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-2xl">
                        🎁
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm">{item.productName}</h3>
                    <p className="text-xs text-gray-600">
                      {item.size} • {item.color}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                  <div className="font-bold text-primary">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-tan pt-4 space-y-2">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Subtotal:</span>
                <span className="font-bold text-primary">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping:</span>
                <span>Calculated by Printful</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax:</span>
                <span>Calculated by Printful</span>
              </div>
              <div className="border-t-2 border-primary pt-2 mt-2">
                <div className="flex justify-between text-xl">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-primary">{formatPrice(total)}+</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Final total including shipping and tax will be calculated by Printful
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
