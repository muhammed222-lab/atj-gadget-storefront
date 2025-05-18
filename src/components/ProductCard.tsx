
import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  colors?: string[];
  brand: string;
  category: string;
  tags?: string[];
  featured?: boolean;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="product-card group animate-enter">
      <div className="product-img-container">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            {discount}% OFF
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center mb-1 text-sm text-gray-500">
          <span>{product.brand}</span>
          <span className="mx-2">•</span>
          <span>{product.category}</span>
        </div>
        <h3 className="font-medium text-gray-800 mb-1 truncate">
          {product.name}
        </h3>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  className={`${
                    i < Math.floor(product.rating) 
                      ? "text-yellow-400 fill-yellow-400" 
                      : "text-gray-300"
                  }`}
                />
              ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviewCount})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium text-atj">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-gray-400 text-sm line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {/* Color options indicator */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex -space-x-1">
              {product.colors.slice(0, 3).map((color, idx) => (
                <div 
                  key={idx} 
                  className="w-4 h-4 rounded-full border border-white" 
                  style={{ backgroundColor: color }}
                  aria-label={`Color: ${color}`}
                />
              ))}
              {product.colors.length > 3 && (
                <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[8px] text-gray-600">
                  +{product.colors.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
