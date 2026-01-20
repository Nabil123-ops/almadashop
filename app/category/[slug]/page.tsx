// 1. REMOVE "use client" - This allows the use of @/lib/supabase/server
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  // In Next.js 15+, params is a Promise
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Await the params
  const { slug } = await params
  
  // Initialize the Server Client
  const supabase = await createClient()

  // Fetch Category
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!category) notFound()

  // Fetch Products
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", category.id)
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* CATEGORY TITLE */}
          <div className="mb-8">
            <h1 className="mb-2 font-serif text-3xl font-bold">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-muted-foreground">{category.description}</p>
            )}
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
                No products in this category yet.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
                            }
      
