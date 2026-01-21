"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/CartContext"
import ColorSelector from "@/components/ColorSelector"

type Color = {
  name: string
  hex: string
}

export default function AddToCartWithColor({ product }: { product: any }) {
  const { addItem } = useCart()

  // Normalize colors: allow stored array or JSON string
  const parseColors = (c: any): Color[] => {
    if (!c) return []
    if (Array.isArray(c)) return c
    if (typeof c === "string") {
      try {
        const parsed = JSON.parse(c)
        return Array.isArray(parsed) ? parsed : []
      } catch {
        return []
      }
    }
    return []
  }

  const colors: Color[] = parseColors(product.colors)
  const [selectedColor, setSelectedColor] = useState<Color | null>(null)
  const [qty, setQty] = useState(1)

  // Auto-select first color if colors exist (good UX)
  useEffect(() => {
    if (colors.length > 0 && !selectedColor) {
      setSelectedColor(colors[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: selectedColor ? `${product.name} (${selectedColor.name})` : product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: qty,
    })
  }

  return (
    <div className="space-y-4">
      {/* Color selection (will not render if no colors) */}
      <ColorSelector
        colors={colors}
        selected={selectedColor?.name || null}
        onSelect={setSelectedColor}
      />

      {/* Quantity selector */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => setQty(Math.max(1, qty - 1))}>
          -
        </Button>

        <span className="text-lg font-medium">{qty}</span>

        <Button variant="outline" size="sm" onClick={() => setQty(qty + 1)}>
          +
        </Button>
      </div>

      {/* Only disable when there ARE colors and user hasn't selected one */}
      <Button
        size="lg"
        className="w-full"
        onClick={handleAdd}
        disabled={Array.isArray(colors) && colors.length > 0 && !selectedColor}
      >
        Add to Cart
      </Button>
    </div>
  )
        }
