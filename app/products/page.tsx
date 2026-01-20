"use client"

import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"

interface Product {
  id: number
  name: string
  slug: string
  price: number
  original_price?: number
  image_url: string
  is_featured?: boolean
}

export default async function ProductsPage() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from<Product>("products")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* PAGE TITLE */}
          <div className="mb-8">
            <h1 className="mb-2 font-serif text-3xl font-bold">All Products</h1>
            <p className="text-muted-foreground">
              Browse our complete collection of quality products
            </p>
          </div>

          {/* PRODUCTS GRID */}
          {products && products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  originalPrice={product.original_price}
                  imageUrl={product.image_url}
                  isFeatured={product.is_featured}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-xl text-muted-foreground">
                No products available at the moment.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
      }
