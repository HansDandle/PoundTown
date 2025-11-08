# Payment & Pricing Guide

## 💰 How to Add Markup and Accept Payment

### Option 1: Stripe Payment Integration (Recommended)

#### Why Stripe?
- Industry standard for e-commerce
- Supports credit cards, Apple Pay, Google Pay
- Built-in fraud protection
- Easy integration with Next.js
- PCI compliance handled for you

#### Setup Steps:

1. **Create Stripe Account**
   - Go to [stripe.com](https://stripe.com)
   - Sign up for an account
   - Complete verification

2. **Get API Keys**
   - Dashboard → Developers → API Keys
   - Copy **Publishable key** (starts with `pk_`)
   - Copy **Secret key** (starts with `sk_`)

3. **Add to Environment Variables**
   ```bash
   # .env.local
   PRINTFUL_API_TOKEN=your_printful_token
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

4. **Install Stripe**
   ```bash
   npm install stripe @stripe/stripe-js
   ```

5. **Implementation Code Below** (see sections)

---

## 💵 Setting Product Markup

You have several options for pricing:

### Option A: Percentage Markup (Simple)
```typescript
// In your product display/cart code
const MARKUP_PERCENTAGE = 0.30 // 30% markup

function calculateRetailPrice(printfulPrice: number) {
  return printfulPrice * (1 + MARKUP_PERCENTAGE)
}

// Example: Printful cost $20 → Your price $26
```

### Option B: Fixed Dollar Markup
```typescript
const MARKUP_AMOUNT = 5.00 // $5 per item

function calculateRetailPrice(printfulPrice: number) {
  return printfulPrice + MARKUP_AMOUNT
}
```

### Option C: Tiered Pricing
```typescript
function calculateRetailPrice(printfulPrice: number) {
  if (printfulPrice < 15) return printfulPrice + 5
  if (printfulPrice < 30) return printfulPrice + 8
  return printfulPrice + 10
}
```

### Option D: Use Printful's Retail Price
Printful already includes a suggested retail price in their API response:
```typescript
// Just use: variant.retail_price
// This already has markup built in
```

---

## 🔧 Payment Integration Code

### 1. Create Stripe Client (`src/lib/stripe.ts`)
```typescript
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})
```

### 2. Create Checkout Session API Route (`src/app/api/create-checkout/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { items, customerEmail } = await request.json()

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.productName,
            description: `${item.size} • ${item.color}`,
            images: item.imageUrl ? [item.imageUrl] : [],
          },
          unit_amount: Math.round(item.price * 100), // Stripe uses cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
      metadata: {
        // Store cart data for webhook processing
        items: JSON.stringify(items),
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
```

### 3. Update Checkout Page to Use Stripe
```typescript
// In checkout page, replace the order creation with:
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsProcessing(true)

  try {
    // Create checkout session
    const response = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items,
        customerEmail: formData.email,
      }),
    })

    const { sessionId } = await response.json()
    
    // Redirect to Stripe Checkout
    const stripe = await stripePromise
    await stripe?.redirectToCheckout({ sessionId })
  } catch (err) {
    setError('Payment failed. Please try again.')
  } finally {
    setIsProcessing(false)
  }
}
```

### 4. Create Webhook for Post-Payment Order Creation (`src/app/api/webhooks/stripe/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createOrder, confirmOrder } from '@/lib/printful'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    // Get cart items from metadata
    const items = JSON.parse(session.metadata.items)

    // Create Printful order AFTER payment succeeds
    const orderResult = await createOrder({
      recipient: {
        name: session.customer_details.name,
        email: session.customer_details.email,
        address1: session.customer_details.address.line1,
        address2: session.customer_details.address.line2 || '',
        city: session.customer_details.address.city,
        state_code: session.customer_details.address.state,
        country_code: session.customer_details.address.country,
        zip: session.customer_details.address.postal_code,
      },
      items: items.map((item: any) => ({
        sync_variant_id: item.variantId,
        quantity: item.quantity,
      })),
    })

    if (orderResult.success) {
      await confirmOrder(orderResult.order.id)
    }
  }

  return NextResponse.json({ received: true })
}
```

---

## 🎯 Recommended Flow

1. **Customer adds items to cart** (with your markup price)
2. **Customer goes to checkout page** (enters shipping info)
3. **Customer clicks "Pay Now"** → Redirected to Stripe
4. **Stripe processes payment**
5. **Webhook receives payment confirmation**
6. **Your backend creates Printful order** (using wholesale price)
7. **You keep the difference** (your profit margin)

---

## 📊 Profit Calculation Example

| Item | Printful Cost | Your Price (30% markup) | Profit |
|------|---------------|-------------------------|--------|
| T-Shirt | $15.00 | $19.50 | $4.50 |
| Mug | $12.00 | $15.60 | $3.60 |
| Sticker | $3.00 | $3.90 | $0.90 |

**Order Total:**
- Customer pays: $39.00
- Printful costs: $30.00
- Your profit: $9.00

---

## 🚨 Important Notes

1. **Test Mode First**: Use Stripe test keys (`sk_test_...`) until ready for production
2. **Webhook Security**: Verify webhook signatures to prevent fraud
3. **Error Handling**: Only create Printful order AFTER payment succeeds
4. **Refunds**: If customer requests refund, you may need to cancel Printful order manually
5. **Tax**: Consider using Stripe Tax for automatic sales tax calculation

---

## 🔐 Environment Variables Needed

```bash
# .env.local
PRINTFUL_API_TOKEN=your_printful_token
STRIPE_SECRET_KEY=sk_test_... (or sk_live_... for production)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... (or pk_live_...)
STRIPE_WEBHOOK_SECRET=whsec_... (get from Stripe Dashboard)
NEXT_PUBLIC_URL=http://localhost:3000 (or your production URL)
```

---

## ✅ Quick Start Checklist

- [ ] Create Stripe account
- [ ] Get API keys
- [ ] Add keys to `.env.local`
- [ ] Install Stripe packages
- [ ] Decide on markup strategy
- [ ] Update product prices with markup
- [ ] Create Stripe checkout API route
- [ ] Update checkout page to use Stripe
- [ ] Set up webhook endpoint
- [ ] Test with Stripe test cards
- [ ] Go live!

---

## 💳 Stripe Test Cards

For testing:
- Success: `4242 4242 4242 4242`
- Declined: `4000 0000 0000 0002`
- Any future expiry date, any CVC

---

## Alternative: PayPal

If you prefer PayPal over Stripe, the flow is similar:
1. Install `@paypal/checkout-server-sdk`
2. Create PayPal order instead of Stripe session
3. Use PayPal webhooks for payment confirmation
4. Same concept: collect payment first, then create Printful order
