
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard, { Product } from '@/components/ProductCard';
import { getAllProducts, getProductsByCategory, filterProducts } from '@/services/DataService';

const ProductsPage = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState({
    brands: [] as string[],
    colors: [] as string[],
    minPrice: '',
    maxPrice: '',
    minRating: 0,
  });
  
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Apply URL params to filters on initial load
  useEffect(() => {
    const brandParam = searchParams.get('brand');
    const colorParam = searchParams.get('color');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const ratingParam = searchParams.get('rating');
    
    const newFilters = { ...filters };
    
    if (brandParam) {
      newFilters.brands = brandParam.split(',');
    }
    
    if (colorParam) {
      newFilters.colors = colorParam.split(',');
    }
    
    if (minPriceParam) {
      newFilters.minPrice = minPriceParam;
    }
    
    if (maxPriceParam) {
      newFilters.maxPrice = maxPriceParam;
    }
    
    if (ratingParam) {
      newFilters.minRating = Number(ratingParam);
    }
    
    setFilters(newFilters);
  }, [searchParams]);
  
  // Fetch products based on category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let productData: Product[];
        
        if (categoryName) {
          productData = await getProductsByCategory(categoryName);
        } else {
          productData = await getAllProducts();
        }
        
        setProducts(productData);
        setFilteredProducts(productData);
        
        // Extract available filter options
        const brands = Array.from(new Set(productData.map(p => p.brand)));
        setAvailableBrands(brands);
        
        const colors = Array.from(
          new Set(productData.flatMap(p => p.colors || []))
        );
        setAvailableColors(colors);
        
        const prices = productData.map(p => p.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        setPriceRange({ min: minPrice, max: maxPrice });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [categoryName]);
  
  // Apply filters whenever they change
  useEffect(() => {
    const applyFilters = async () => {
      try {
        if (products.length === 0) return;
        
        const minPrice = filters.minPrice ? parseFloat(filters.minPrice) : undefined;
        const maxPrice = filters.maxPrice ? parseFloat(filters.maxPrice) : undefined;
        
        const filtered = await filterProducts({
          category: categoryName,
          brand: filters.brands.length > 0 ? filters.brands[0] : undefined, // API only supports one brand filter
          colors: filters.colors,
          minPrice,
          maxPrice,
          minRating: filters.minRating > 0 ? filters.minRating : undefined,
        });
        
        setFilteredProducts(filtered);
        
        // Update URL params
        const params = new URLSearchParams();
        
        if (filters.brands.length > 0) {
          params.set('brand', filters.brands.join(','));
        }
        
        if (filters.colors.length > 0) {
          params.set('color', filters.colors.join(','));
        }
        
        if (filters.minPrice) {
          params.set('minPrice', filters.minPrice);
        }
        
        if (filters.maxPrice) {
          params.set('maxPrice', filters.maxPrice);
        }
        
        if (filters.minRating > 0) {
          params.set('rating', filters.minRating.toString());
        }
        
        setSearchParams(params);
        
      } catch (error) {
        console.error('Error applying filters:', error);
      }
    };
    
    applyFilters();
  }, [filters, products, categoryName, setSearchParams]);
  
  const handleBrandFilterChange = (brand: string) => {
    setFilters(prev => {
      const newBrands = prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand];
      
      return { ...prev, brands: newBrands };
    });
  };
  
  const handleColorFilterChange = (color: string) => {
    setFilters(prev => {
      const newColors = prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color];
      
      return { ...prev, colors: newColors };
    });
  };
  
  const handlePriceFilterChange = (
    type: 'min' | 'max', 
    value: string
  ) => {
    setFilters(prev => ({
      ...prev,
      [type === 'min' ? 'minPrice' : 'maxPrice']: value
    }));
  };
  
  const handleRatingFilterChange = (rating: number) => {
    setFilters(prev => ({
      ...prev,
      minRating: prev.minRating === rating ? 0 : rating
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      brands: [],
      colors: [],
      minPrice: '',
      maxPrice: '',
      minRating: 0,
    });
    setSearchParams({});
  };
  
  const hasActiveFilters = () => {
    return (
      filters.brands.length > 0 ||
      filters.colors.length > 0 ||
      filters.minPrice !== '' ||
      filters.maxPrice !== '' ||
      filters.minRating > 0
    );
  };

  const renderFiltersPanel = () => (
    <div className="space-y-6">
      {/* Filter header (mobile only) */}
      <div className="flex items-center justify-between lg:hidden">
        <h3 className="text-lg font-medium">Filters</h3>
        <button
          onClick={() => setIsMobileFilterOpen(false)}
          className="text-gray-500"
        >
          <X size={24} />
        </button>
      </div>
      
      {/* Brands filter */}
      <div>
        <h3 className="text-lg font-medium mb-3">Brands</h3>
        <div className="space-y-2">
          {availableBrands.map(brand => (
            <div key={brand} className="flex items-center">
              <input
                type="checkbox"
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandFilterChange(brand)}
                className="h-4 w-4 rounded border-gray-300 text-atj focus:ring-atj"
              />
              <label htmlFor={`brand-${brand}`} className="ml-2 text-gray-600">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price filter */}
      <div>
        <h3 className="text-lg font-medium mb-3">Price Range</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="min-price" className="text-sm text-gray-600">
              Min Price
            </label>
            <input
              type="number"
              id="min-price"
              min={priceRange.min}
              max={priceRange.max}
              value={filters.minPrice}
              onChange={e => handlePriceFilterChange('min', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              placeholder={`$${priceRange.min}`}
            />
          </div>
          <div>
            <label htmlFor="max-price" className="text-sm text-gray-600">
              Max Price
            </label>
            <input
              type="number"
              id="max-price"
              min={priceRange.min}
              max={priceRange.max}
              value={filters.maxPrice}
              onChange={e => handlePriceFilterChange('max', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              placeholder={`$${priceRange.max}`}
            />
          </div>
        </div>
      </div>
      
      {/* Colors filter */}
      {availableColors.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {availableColors.map(color => (
              <div
                key={color}
                className={`
                  w-8 h-8 rounded-full cursor-pointer border-2
                  ${filters.colors.includes(color) ? 'border-atj' : 'border-gray-200'}
                `}
                style={{ backgroundColor: color }}
                onClick={() => handleColorFilterChange(color)}
                aria-label={`Filter by color: ${color}`}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Rating filter */}
      <div>
        <h3 className="text-lg font-medium mb-3">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map(rating => (
            <div key={rating} className="flex items-center">
              <input
                type="checkbox"
                id={`rating-${rating}`}
                checked={filters.minRating === rating}
                onChange={() => handleRatingFilterChange(rating)}
                className="h-4 w-4 rounded border-gray-300 text-atj focus:ring-atj"
              />
              <label htmlFor={`rating-${rating}`} className="ml-2 text-gray-600">
                {rating}+ Stars
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {hasActiveFilters() && (
        <Button
          onClick={clearFilters}
          variant="outline"
          className="w-full mt-4"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto">
            <h1 className="text-3xl font-medium">
              {categoryName 
                ? `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}` 
                : 'All Products'}
            </h1>
            <p className="text-gray-600 mt-2">
              {filteredProducts.length} products
            </p>
          </div>
        </div>
        
        <div className="container mx-auto py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="lg:w-1/4 hidden lg:block">
              {renderFiltersPanel()}
            </div>
            
            {/* Products */}
            <div className="lg:w-3/4">
              {/* Mobile filter button and active filters */}
              <div className="mb-6 lg:hidden">
                <Button 
                  onClick={() => setIsMobileFilterOpen(true)}
                  variant="outline"
                  className="flex items-center"
                >
                  <Filter size={16} className="mr-2" />
                  Filters
                  {hasActiveFilters() && (
                    <span className="ml-2 bg-atj text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {filters.brands.length + filters.colors.length + (filters.minPrice ? 1 : 0) + (filters.maxPrice ? 1 : 0) + (filters.minRating ? 1 : 0)}
                    </span>
                  )}
                </Button>
              </div>
              
              {/* Active filters display */}
              {hasActiveFilters() && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {filters.brands.map(brand => (
                    <div
                      key={brand}
                      className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
                    >
                      <span className="text-sm">{brand}</span>
                      <button
                        onClick={() => handleBrandFilterChange(brand)}
                        className="ml-2 text-gray-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  
                  {filters.colors.map(color => (
                    <div
                      key={color}
                      className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
                    >
                      <span
                        className="h-3 w-3 rounded-full mr-1"
                        style={{ backgroundColor: color }}
                      />
                      <button
                        onClick={() => handleColorFilterChange(color)}
                        className="ml-2 text-gray-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  
                  {filters.minPrice && (
                    <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                      <span className="text-sm">Min ${filters.minPrice}</span>
                      <button
                        onClick={() => handlePriceFilterChange('min', '')}
                        className="ml-2 text-gray-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  
                  {filters.maxPrice && (
                    <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                      <span className="text-sm">Max ${filters.maxPrice}</span>
                      <button
                        onClick={() => handlePriceFilterChange('max', '')}
                        className="ml-2 text-gray-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  
                  {filters.minRating > 0 && (
                    <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                      <span className="text-sm">{filters.minRating}+ Stars</span>
                      <button
                        onClick={() => handleRatingFilterChange(filters.minRating)}
                        className="ml-2 text-gray-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  
                  <button
                    onClick={clearFilters}
                    className="text-atj text-sm hover:underline"
                  >
                    Clear All
                  </button>
                </div>
              )}
              
              {/* Products grid */}
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-pulse">Loading products...</div>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-500">{error}</p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="mt-4"
                  >
                    Try Again
                  </Button>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filter criteria.
                  </p>
                  <Button onClick={clearFilters}>Clear All Filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Mobile filters panel (slide-in) */}
      <div 
        className={`
          fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden transition-opacity 
          ${isMobileFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setIsMobileFilterOpen(false)}
      >
        <div 
          className={`
            absolute top-0 bottom-0 left-0 w-4/5 max-w-xs bg-white p-6 overflow-y-auto
            transition-transform transform 
            ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {renderFiltersPanel()}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
