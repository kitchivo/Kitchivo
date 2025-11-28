import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import { fetchProductDetails, createWishlist } from '../../redux/slices/CommanSlice';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productDatails, loading } = useSelector((state) => state.commanStore);
  const product = productDatails;

  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedThumbIndex, setSelectedThumbIndex] = useState(0);
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [activeTab, setActiveTab] = useState('description');

  // Fetch product details from API
  useEffect(() => {
    if (!id) return;
    dispatch(fetchProductDetails({ product_id: id }));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  // Initialize selections when product loads
  useEffect(() => {
    if (!product) return;

    if (product.available_sizes?.length && !selectedSizeId) {
      setSelectedSizeId(product.available_sizes[0].id);
    }
    if (product.available_colors?.length && !selectedColorId) {
      setSelectedColorId(product.available_colors[0].id);
    }

    if (!selectedImageUrl) {
      const fromCommon = product.common_images?.[0]?.url;
      const fromVariant =
        product.variants?.[0]?.images?.find((img) => img.is_primary)?.url ||
        product.variants?.[0]?.images?.[0]?.url;
      const fallback = product.featured_image || fromCommon || fromVariant || null;

      if (fallback) {
        setSelectedImageUrl(fallback);
        setSelectedThumbIndex(0);
      }
    }
  }, [product, selectedSizeId, selectedColorId, selectedImageUrl]);

  // Active variant from selected size + color
  const activeVariant = useMemo(() => {
    if (!product?.variants || !selectedSizeId || !selectedColorId) return null;
    return (
      product.variants.find(
        (v) => v.size?.id === selectedSizeId && v.color?.id === selectedColorId
      ) || null
    );
  }, [product, selectedSizeId, selectedColorId]);

  // When variant changes, prefer its primary image
  useEffect(() => {
    if (!activeVariant) return;
    const primary =
      activeVariant.images?.find((img) => img.is_primary) ||
      activeVariant.images?.[0];

    if (primary?.url) {
      setSelectedImageUrl(primary.url);
      setSelectedThumbIndex(-1);
    }
  }, [activeVariant]);

  const thumbnails = useMemo(() => {
    if (!product) return [];
    if (product.common_images?.length) return product.common_images;
    if (product.featured_image) {
      return [{ id: 'featured', url: product.featured_image }];
    }
    return [];
  }, [product]);

  const handleThumbnailClick = (url, index) => {
    setSelectedImageUrl(url);
    setSelectedThumbIndex(index);
  };

  const totalStock =
    product?.variants?.reduce(
      (sum, v) => sum + (Number(v.stock_quantity) || 0),
      0
    ) || 0;
  const inStock = totalStock > 0;
  const isWishlisted = !!product?.is_wishlisted;

  const handleWishlistClick = async () => {
    if (!product) return;

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

    try {
      const resultAction = await dispatch(
        createWishlist({ product_id: product.id })
      );
      if (resultAction?.payload?.status === 1) {
        toast.success(resultAction?.payload?.message || 'Wishlist updated');
        dispatch(fetchProductDetails({ product_id: product.id }));
      } else {
        toast.error(
          resultAction?.payload?.message || 'Failed to update wishlist'
        );
      }
    } catch (error) {
      toast.error('Failed to update wishlist');
    }
  };

  const handleBuyOnAmazon = () => {
    if (product?.url) {
      window.open(product.url, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading && !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-white">
          <p className="text-gray-500 text-sm">Loading product details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-white">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Product not found
            </h2>
            <p className="text-gray-600 mb-4">
              We couldn&apos;t find the product you&apos;re looking for.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-2 bg-lima-600 text-white rounded-lg font-semibold hover:bg-lima-700 transition-colors"
            >
              Back to Products
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const displayMrp = product.mrp;
  const displaySalePrice = product.sale_price;
  const displayUsdMrp = product.price_in_dolor;
  const displayUsdSale = product.sale_price_in_dollar;

  const isMrpZero =
    !product.mrp ||
    product.mrp === '0' ||
    product.mrp === '0.00' ||
    product.mrp === 'null';

  const isSalePriceZero =
    !product.sale_price ||
    product.sale_price === '0' ||
    product.sale_price === '0.00' ||
    product.sale_price === 'null';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: product.category?.name || 'Products', href: '/products' },
          { label: product.name || 'Product Details' },
        ]}
      />

      <main className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Product Detail Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side - Image Gallery */}
            <div className="flex flex-col-reverse lg:flex-row gap-4">
              {/* Thumbnail Gallery */}
              <div className="flex flex-row lg:flex-col gap-2 lg:gap-3 overflow-x-auto lg:overflow-visible">
                {thumbnails.map((img, index) => (
                  <button
                    key={img.id || index}
                    onClick={() => handleThumbnailClick(img.url, index)}
                    className={`shrink-0 w-16 h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedThumbIndex === index
                        ? 'border-lima-600 ring-2 ring-lima-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 rounded-lg overflow-hidden relative">
                <div className="aspect-square bg-gray-50 flex items-center justify-center">
                  {selectedImageUrl ? (
                    <img
                      src={selectedImageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-gray-400 text-sm">No image available</div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className="space-y-5">
              {/* Product Title */}
              <div>
                {product.category?.name && (
                  <p className="text-xs uppercase tracking-wider text-lima-600 font-semibold mb-1">
                    {product.category.name}
                  </p>
                )}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>

                {/* Reviews placeholder */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${
                          star <= 4 ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">4.0 (120 reviews)</span>
                </div>

                {/* Product Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {product.description}
                </p>

                {/* Price (₹ / $ logic) */}
                <div className="mb-2">
                  <div className="flex items-center gap-2">
                    {isMrpZero ? (
                      <p className="text-sm sm:text-base font-normal text-gray-400 line-through">
                        $ {displayUsdMrp}
                      </p>
                    ) : (
                      <p className="text-sm sm:text-base font-normal text-gray-400 line-through">
                        ₹ {displayMrp}
                      </p>
                    )}

                    {isSalePriceZero ? (
                      <p className="text-base sm:text-lg font-semibold text-san-felix-800">
                        $ {displayUsdSale}
                      </p>
                    ) : (
                      <p className="text-base sm:text-lg font-semibold text-san-felix-800">
                        ₹ {displaySalePrice}
                      </p>
                    )}
                  </div>

                  {/* <p
                    className={`mt-2 text-sm font-medium ${
                      inStock ? 'text-emerald-600' : 'text-red-600'
                    }`}
                  >
                    {inStock ? 'In stock' : 'Out of stock'}
                  </p> */}
                </div>
              </div>

              {/* Variants: Sizes */}
              {product.available_sizes?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.available_sizes.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSizeId(size.id)}
                        className={`px-4 py-2 min-w-12 border-2 rounded font-medium text-sm transition-all ${
                          selectedSizeId === size.id
                            ? 'border-lima-600 bg-lima-600 text-white'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variants: Colors */}
              {product.available_colors?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.available_colors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColorId(color.id)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColorId === color.id
                            ? 'border-gray-900 ring-2 ring-offset-2 ring-gray-900'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        aria-label={color.name}
                      >
                        <div
                          className="w-full h-full rounded-full"
                          style={{ backgroundColor: color.hex_code || '#e5e7eb' }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleBuyOnAmazon}
                  className="w-full bg-orange-500 text-white py-3 px-6 rounded font-semibold text-base hover:bg-orange-600 transition-all duration-300 inline-flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 2h9a5 5 0 0 1 3.995 8.08A5.5 5.5 0 0 1 17.5 21H7a5 5 0 0 1-1-9.9V7a5 5 0 0 1 5-5z" />
                  </svg>
                  Buy on Amazon
                </button>

                <div className="flex items-center gap-4 text-sm">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-lima-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Size Guide
                  </button>
                  <button
                    onClick={handleWishlistClick}
                    className={`flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-lg border transition-colors ${
                      isWishlisted
                        ? 'border-lima-600 bg-lima-600 text-white'
                        : 'border-gray-300 text-gray-700 hover:border-lima-600 hover:text-lima-700'
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill={isWishlisted ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="border-t pt-5 space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-gray-600">Category:</span>
                  <span className="text-gray-900">
                    {product.category?.name || 'N/A'}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-12 border-t">
            <div className="flex md:gap-4 lg:gap-8 border-b">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${activeTab === 'description'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${activeTab === 'details'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${activeTab === 'reviews'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
              >
                Reviews
              </button>
            </div>
            <div className="py-8">
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    This premium quality product ensures durability and comfort for everyday use.
                    Made with the finest materials and crafted with attention to detail.
                  </p>
                </div>
              )}
              {activeTab === 'details' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-700 min-w-[120px]">Material:</span>
                      <span className="text-gray-600">Premium Pima Cotton</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-700 min-w-[120px]">Weight:</span>
                      <span className="text-gray-600">0.5 kg</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-700 min-w-[120px]">Dimensions:</span>
                      <span className="text-gray-600">25cm x 15cm x 10cm</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-700 min-w-[120px]">Care:</span>
                      <span className="text-gray-600">Machine washable, tumble dry low</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-700 min-w-[120px]">Warranty:</span>
                      <span className="text-gray-600">1 Year Manufacturer Warranty</span>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                  <div className="space-y-6">
                    {/* Review 1 */}
                    <div className="border-b pb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-700">John Doe</span>
                        <span className="text-sm text-gray-400">- 2 days ago</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Excellent product! The quality is outstanding and it exceeded my expectations.
                        Highly recommend to anyone looking for a reliable and durable product.
                      </p>
                    </div>
                    {/* Add review button */}
                    <button className="text-lima-600 hover:text-lima-700 font-medium text-sm">
                      Write a review
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;


