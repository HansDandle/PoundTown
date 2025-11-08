'use client'

import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/printful'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Cart() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, clearCart, total, isOpen, closeCart } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={closeCart}
      ></div>

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-tan/30 bg-gradient-to-r from-primary to-secondary">
          <h2 className="text-2xl font-bold text-cream">Your Cart</h2>
          <button
            onClick={closeCart}
            className="text-cream hover:text-white text-3xl leading-none"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-600 text-lg">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="mt-4 text-primary hover:text-rust font-semibold hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.variantId}
                  className="flex gap-4 p-3 bg-cream rounded border-2 border-tan/30"
                >
                  {/* Product Image */}
                  <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded">
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

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-gray-800 truncate">
                      {item.productName}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      {item.size} • {item.color}
                    </p>
                    <p className="text-sm font-semibold text-primary mt-1">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center bg-tan hover:bg-primary hover:text-cream rounded text-sm font-bold"
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center bg-tan hover:bg-primary hover:text-cream rounded text-sm font-bold"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="ml-auto text-xs text-red-600 hover:text-red-800 font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t-2 border-tan/30 p-4 bg-cream">
            {/* Subtotal */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-gray-800">Subtotal:</span>
              <span className="text-2xl font-bold text-primary">{formatPrice(total)}</span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                closeCart()
                router.push('/checkout')
              }}
              className="w-full btn-primary mb-2"
            >
              Proceed to Checkout
            </button>

            {/* Clear Cart */}
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear your cart?')) {
                  clearCart()
                }
              }}
              className="w-full text-sm text-gray-600 hover:text-red-600 font-semibold"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}
