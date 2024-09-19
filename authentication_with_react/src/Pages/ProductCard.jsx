import React, { useState } from "react";
import { Card, CardBody, Divider, Image, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export function ProductCard({ product, onAddToWishlist, onRemoveFromWishlist, isWishlist }) {
  const [isBought, setIsBought] = useState(false);

  const handleBuyNow = (e) => {
    e.preventDefault();

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!savedCart.find((item) => item.id === product.id)) {
      const newCart = [...savedCart, product];
      localStorage.setItem("cart", JSON.stringify(newCart));
      setIsBought(true); 
      alert(`${product.title} has been added to your cart!`);
    }
  };

  const { brand, price, title, description, id } = product;

  return (
    <Link to={`/products/${id}`}>
      <Card className="max-w-[400px] hover:shadow-xl transition-shadow duration-300 border border-gray-200 rounded-lg overflow-hidden">
        <Image
          alt={title}
          height={250}
          radius="none"
          src={product.images ? product.images[0] : "/default-image.png"}
          width="100%"
          className="object-fill"
        />
        <CardBody className="p-4">
          <h2 className="text-xl font-semibold mb-1">{title}</h2>
          <p className="text-sm text-gray-500">{brand}</p>
          <p className="text-lg font-bold text-green-500 my-2">${price}</p>
          <p className="text-sm text-gray-700 mb-4">{description}</p>

          <Divider className="bg-gray-300 mb-4" />

          <div className="flex justify-between items-center">
            {isWishlist ? (
              <Button
                auto
                flat
                color="error"
                className="shadow-md hover:shadow-lg transition"
                onClick={(e) => {
                  e.preventDefault(); 
                  onRemoveFromWishlist(); 
                }}
              >
                Remove from Wishlist
              </Button>
            ) : (
              <Button
                auto
                flat
                color="secondary"
                className="shadow-md hover:shadow-lg transition"
                onClick={(e) => {
                  e.preventDefault(); 
                  onAddToWishlist(); 
                }}
              >
                Add to Wishlist
              </Button>
            )}
            <Button
              auto
              flat
              color="success"
              className="shadow-md hover:shadow-lg transition"
              onClick={handleBuyNow}
              disabled={isBought} 
            >
              {isBought ? "Done" : "Buy Now"}
            </Button>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
