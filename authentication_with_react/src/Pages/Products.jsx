import axios from "axios";
import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import CategoryChip from "./CategoryChip";

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [choosenCategory, setChoosenCategory] = useState("All");
  const [visibleProducts, setVisibleProducts] = useState(9); 

  useEffect(() => {
    // Fetch products based on the selected category
    const url =
      choosenCategory === "All"
        ? "https://dummyjson.com/products"
        : `https://dummyjson.com/products/category/${choosenCategory}`;

    axios
      .get(url)
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
        setVisibleProducts(9); 
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [choosenCategory]);

  useEffect(() => {
    // Fetch categories
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);



  // Add to Wishlist function
  const addToWishlist = (product) => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!savedWishlist.find((item) => item.id === product.id)) {
      const newWishlist = [...savedWishlist, product];
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      alert(`${product.title} has been added to your wishlist!`);
    } else {
      alert(`${product.title} is already in your wishlist.`);
    }
  };

  // Function to load more products when "See More" is clicked
  const handleSeeMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 9); // Show 9 more products
  };

  return (
    <div className="text-2xl mx-auto text-red-600 font-bold">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-500"></div>
        </div>
      ) : (
        <div>
          {/* Category Chips */}
          <div className="flex flex-wrap md:gap-x-2 gap-x-1 md:gap-y-1 md:m-2 m-1 shadow">
            <CategoryChip
              isChoosen={choosenCategory === "All"}
              category={{ name: "All", slug: "All" }}
              onClick={() => setChoosenCategory("All")}
            />

            {categories.map((category) => (
              <CategoryChip
                onClick={() => setChoosenCategory(category.slug)}
                isChoosen={category === choosenCategory}
                key={category}
                category={category}
              />
            ))}
          </div>

          {/* Product Cards */}
          <div className="flex flex-wrap gap-4 shadow">
            {products.slice(0, visibleProducts).map((product) => (
              <ProductCard
                product={product}
                key={product.id}
                onAddToWishlist={() => addToWishlist(product)} // Add to wishlist handler
              />
            ))}
          </div>

          {/* "See More" Button */}
          {visibleProducts < products.length && (
            <div className="text-center mt-6">
              <button
                className="bg-gray-500 text-white py-2 my-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
                onClick={handleSeeMore}
              >
                See More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
