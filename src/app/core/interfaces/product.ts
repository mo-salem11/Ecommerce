export interface Product {
  sold?: number
  images: string[]
  subcategory: SubcategoryProduct[]
  ratingsQuantity?: number
  priceAfterDiscount?: number
  _id: string
  title: string
  slug?: string
  description?: string
  quantity?: number
  price: number
  imageCover?: string
  category: CategoryProduct
  brand: BrandProduct
  ratingsAverage: number
  createdAt?: string
  updatedAt?: string
  id: string
}

export interface SubcategoryProduct {
  _id: string
  name: string
  slug: string
  category: string
}

export interface CategoryProduct {
  _id: string
  name: string
  slug: string
  image: string
}

export interface BrandProduct {
  _id: string
  name: string
  slug: string
  image: string
}
