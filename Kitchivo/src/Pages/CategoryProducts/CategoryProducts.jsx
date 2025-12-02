import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import ProductCard from '../../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductsByCategory, createWishlist } from '../../redux/slices/CommanSlice';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { getProfile } from '../../redux/slices/AuthSlice';
import SEO from '../../components/SEO';

const CategoryProducts = () => {
  const { category_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryProducts, loading } = useSelector((state) => state.commanStore);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [search, setSearch] = useState('');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const currentFilters = {
    category_id,
    page,
    priceRange,
    sortBy,
    search,
  };

  useEffect(() => {
    setPage(1);
    setSortBy('');
    setPriceRange('');
    setSearch('');
  }, [category_id]);

  useEffect(() => {
    if (!category_id) return;
    dispatch(fetchAllProductsByCategory(currentFilters));
  }, [dispatch, category_id, page, priceRange, sortBy, search]);

  const handleAddToWishlist = async (product) => {
    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire({
        title: 'Login required',
        text: 'Please login first to add products to your wishlist.',
        icon: 'warning',
        confirmButtonText: 'Login',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }

    // if (product?.is_wishlisted) {
    //   return;
    // }

    const productId = product?.id;
    if (!productId) {
      return;
    }

    try {
      const resultAction = await dispatch(createWishlist({ product_id: productId }));
      if (resultAction?.payload?.status == 1) {
        toast.success(resultAction?.payload?.message || 'Added to wishlist');
        dispatch(fetchAllProductsByCategory(currentFilters));
        dispatch(getProfile());
      } else {
        toast.error(resultAction?.payload?.message || 'Failed to add to wishlist');
      }
    } catch (error) {
      toast.error('Failed to add to wishlist');
    }
  };

  const categoryInfo = categoryProducts?.category;
  const products = categoryProducts?.products || [];
  const pagination = categoryProducts?.pagination;
  const displayCategoryName = categoryInfo?.name || 'Category';

  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${displayCategoryName} Products`,
    "description": categoryInfo?.description || `Browse our collection of ${displayCategoryName.toLowerCase()} products`,
    "url": `${window.location.origin}/category/${category_id}`
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <SEO
        title={`${displayCategoryName} Products | Shop Quality ${displayCategoryName} - Kitchivo`}
        description={categoryInfo?.description || `Explore our wide range of ${displayCategoryName.toLowerCase()} products. Find the best ${displayCategoryName.toLowerCase()} for your kitchen and home at great prices.`}
        keywords={`${displayCategoryName}, ${displayCategoryName.toLowerCase()} products, buy ${displayCategoryName.toLowerCase()}, ${displayCategoryName.toLowerCase()} online, kitchivo ${displayCategoryName.toLowerCase()}`}
        canonicalUrl={`${window.location.origin}/category/${category_id}`}
        schema={categorySchema}
      />
      <Navbar />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Categories', href: '/#categories' },
          { label: displayCategoryName }
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            {displayCategoryName}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Filters</h2>

              {/* Sort By - Custom Dropdown */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Sort By</h3>
                <div className="relative">
                  <button
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-left text-sm text-gray-700 hover:border-lima-600 focus:outline-none focus:ring-2 focus:ring-lima-600 focus:border-transparent transition-all duration-200 flex items-center justify-between"
                  >
                    <span className="font-medium">
                      {sortBy === '' && 'Featured'}
                      {sortBy === 'latest' && 'Latest'}
                      {sortBy === 'price_low_to_high' && 'Price: Low to High'}
                      {sortBy === 'price_high_to_low' && 'Price: High to Low'}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${sortDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {sortDropdownOpen && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setSortDropdownOpen(false)}
                      />

                      {/* Dropdown List */}
                      <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                        <button
                          onClick={() => {
                            setSortBy('');
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-lima-50 transition-colors ${sortBy === '' ? 'bg-lima-50 text-lima-700 font-semibold' : 'text-gray-700'
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Featured</span>
                            {sortBy === '' && (
                              <svg className="w-4 h-4 text-lima-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setSortBy('latest');
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-lima-50 transition-colors ${sortBy === 'latest' ? 'bg-lima-50 text-lima-700 font-semibold' : 'text-gray-700'
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Latest</span>
                            {sortBy === 'latest' && (
                              <svg className="w-4 h-4 text-lima-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setSortBy('price_low_to_high');
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-lima-50 transition-colors ${sortBy === 'price_low_to_high' ? 'bg-lima-50 text-lima-700 font-semibold' : 'text-gray-700'
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Price: Low to High</span>
                            {sortBy === 'price_low_to_high' && (
                              <svg className="w-4 h-4 text-lima-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setSortBy('price_high_to_low');
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-lima-50 transition-colors ${sortBy === 'price_high_to_low' ? 'bg-lima-50 text-lima-700 font-semibold' : 'text-gray-700'
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>Price: High to Low</span>
                            {sortBy === 'price_high_to_low' && (
                              <svg className="w-4 h-4 text-lima-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value=""
                      checked={priceRange === ''}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">All Prices</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="under-1000"
                      checked={priceRange === 'under-1000'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Under ₹1,000</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="1000-5000"
                      checked={priceRange === '1000-5000'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">₹1,000 - ₹5,000</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="5000-10000"
                      checked={priceRange === '5000-10000'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">₹5,000 - ₹10,000</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="above-10000"
                      checked={priceRange === 'above-10000'}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4 text-lima-600 focus:ring-lima-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Above ₹10,000</span>
                  </label>
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSortBy('');
                  setPriceRange('');
                  setPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center py-16 text-gray-500 text-sm">
                Loading products...
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToWishlist={handleAddToWishlist}
                    />
                  ))}
                </div>
                {pagination && pagination.total_pages > 1 && (
                  <div className="flex items-center justify-center mt-8 gap-4">
                    <button
                      disabled={pagination.current_page <= 1}
                      onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-600">
                      Page {pagination.current_page} of {pagination.total_pages}
                    </span>
                    <button
                      disabled={pagination.current_page >= pagination.total_pages}
                      onClick={() =>
                        setPage((prev) =>
                          pagination.total_pages ? Math.min(pagination.total_pages, prev + 1) : prev + 1
                        )
                      }
                      className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-6 text-center">
                  No products match your current filters. Try adjusting your filters.
                </p>
                <button
                  onClick={() => {
                    setSortBy('');
                    setPriceRange('');
                    setPage(1);
                  }}
                  className="px-6 py-2 bg-lima-600 text-white rounded-lg font-semibold hover:bg-lima-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryProducts;
