
import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/components/ProductCard';
import { addProduct, updateProduct } from '@/services/DataService';

interface AdminProductFormProps {
  product: Product | null;
  onClose: () => void;
}

const AdminProductForm: React.FC<AdminProductFormProps> = ({ product, onClose }) => {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: '',
      price: 0,
      originalPrice: undefined,
      images: [''],
      rating: 0,
      reviewCount: 0,
      colors: [],
      brand: '',
      category: 'Headsets',
      tags: [],
      featured: false,
      inStock: true,
    }
  );
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'price' || name === 'originalPrice' || name === 'rating' || name === 'reviewCount') {
      setFormData({ ...formData, [name]: value === '' ? undefined : Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleAddImage = () => {
    setFormData({
      ...formData,
      images: [...(formData.images || []), '']
    });
  };
  
  const handleRemoveImage = (index: number) => {
    const newImages = [...(formData.images || [])];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };
  
  const handleImageChange = (index: number, value: string) => {
    const newImages = [...(formData.images || [])];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };
  
  const handleAddColor = () => {
    setFormData({
      ...formData,
      colors: [...(formData.colors || []), '#000000']
    });
  };
  
  const handleRemoveColor = (index: number) => {
    const newColors = [...(formData.colors || [])];
    newColors.splice(index, 1);
    setFormData({ ...formData, colors: newColors });
  };
  
  const handleColorChange = (index: number, value: string) => {
    const newColors = [...(formData.colors || [])];
    newColors[index] = value;
    setFormData({ ...formData, colors: newColors });
  };
  
  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData({ ...formData, tags });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.brand || !formData.category) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (!formData.images || formData.images.length === 0 || !formData.images[0]) {
      setError('At least one image is required');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      if (product) {
        // Update existing product
        await updateProduct(product.id, formData);
      } else {
        // Add new product
        await addProduct(formData as Omit<Product, 'id'>);
      }
      
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
      setError('Failed to save product');
      setLoading(false);
    }
  };
  
  const categories = ['Headsets', 'Ring Lights', 'Cameras', 'Mice', 'Home Tools'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X size={20} />
        </Button>
      </div>
      
      {error && (
        <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand *
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand || ''}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category || ''}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price || ''}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Original Price ($)
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice || ''}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating || ''}
                  onChange={handleInputChange}
                  step="0.1"
                  min="0"
                  max="5"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Review Count
                </label>
                <input
                  type="number"
                  name="reviewCount"
                  value={formData.reviewCount || ''}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={(formData.tags || []).join(', ')}
                onChange={(e) => handleTagsChange(e.target.value)}
                placeholder="gaming, wireless, premium"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured || false}
                  onChange={handleInputChange}
                  className="h-4 w-4 border-gray-300 rounded text-atj focus:ring-atj"
                />
                <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                  Featured Product
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inStock"
                  name="inStock"
                  checked={formData.inStock || false}
                  onChange={handleInputChange}
                  className="h-4 w-4 border-gray-300 rounded text-atj focus:ring-atj"
                />
                <label htmlFor="inStock" className="ml-2 text-sm text-gray-700">
                  In Stock
                </label>
              </div>
            </div>
          </div>
          
          {/* Images and Colors */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Images (URLs) *
              </label>
              <div className="space-y-3">
                {(formData.images || []).map((image, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atj"
                      required={index === 0}
                    />
                    {(formData.images?.length || 0) > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveImage(index)}
                        className="text-red-500"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddImage}
                  className="mt-2"
                >
                  <Plus size={16} className="mr-1" />
                  Add Image
                </Button>
              </div>
            </div>
            
            <div>
              <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
                <span>Colors</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleAddColor}
                  className="text-atj"
                >
                  <Plus size={16} className="mr-1" />
                  Add Color
                </Button>
              </label>
              
              <div className="flex flex-wrap gap-3">
                {(formData.colors || []).map((color, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className="w-10 h-10 p-1 border rounded mr-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveColor(index)}
                      className="text-red-500"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-atj text-white hover:bg-atj-light"
            disabled={loading}
          >
            {loading ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
