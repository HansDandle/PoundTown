import { NextRequest, NextResponse } from 'next/server'
import { createOrder, confirmOrder } from '@/lib/printful'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.recipient || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create draft order with Printful
    const orderResult = await createOrder(body)

    if (!orderResult.success) {
      return NextResponse.json(
        { success: false, error: orderResult.error },
        { status: 500 }
      )
    }

    // Automatically confirm the order for fulfillment
    const confirmResult = await confirmOrder(orderResult.order.id)

    if (!confirmResult.success) {
      // Order was created but not confirmed - still return success
      // User can manually confirm later if needed
      console.warn('Order created but not confirmed:', confirmResult.error)
    }

    return NextResponse.json({
      success: true,
      order: orderResult.order,
    })
  } catch (error: any) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
