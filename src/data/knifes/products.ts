import { products as all } from '../products'
import type { Product } from '../types'

export const products: Product[] = all.filter((p) => p.category === 'knifes')
