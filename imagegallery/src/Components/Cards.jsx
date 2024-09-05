import React, { useState } from "react";
import Modal from "./Modal"; 

const Card = ({ title, price, description, imageUrl, onClick }) => (
  <div onClick={onClick} className="cursor-pointer p-6 rounded-lg shadow-lg bg-gray-400">
    <img src={imageUrl} alt={title} className="w-full h-40 object-cover rounded-t-lg mb-4" />
    <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
    <p className="text-gray-700 mb-4">{price}</p>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Cards = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
    { title: "Samsung Memory", price: "$1099", description: "This is some description text for card 1.", imageUrl: "https://images.unsplash.com/photo-1721332154191-ba5f1534266e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8" },
    { title: "Samsung Airdots", price: "$1149", description: "This is some description text for card 2.", imageUrl: "https://images.unsplash.com/photo-1721864428830-7417b93831b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Ftc3VuZyUyMHBob25lfGVufDB8fDB8fHww" },
    { title: "Samsung S23", price: "$2199", description: "This is some description text for card 3.", imageUrl: "https://images.unsplash.com/photo-1691449808001-bb8c157f0094?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2Ftc3VuZyUyMHBob25lfGVufDB8fDB8fHww" },
    { title: "Samsung Z-fold", price: "$3249", description: "This is some description text for card 4.", imageUrl: "https://images.unsplash.com/photo-1721864428881-dbabb9ea0017?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNhbXN1bmclMjBwaG9uZXxlbnwwfHwwfHx8MA%3D%3D" },
    { title: "Samsung Silver", price: "$1599", description: "This is some description text for card 5.", imageUrl: "https://images.unsplash.com/photo-1713027420493-e675245ea725?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHNhbXN1bmclMjBwaG9uZXxlbnwwfHwwfHx8MA%3D%3D" },
    { title: "Samsung Laptop", price: "$3349", description: "This is some description text for card 6.", imageUrl: "https://images.unsplash.com/photo-1721864429251-bd8d200f20ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHNhbXN1bmclMjBwaG9uZXxlbnwwfHwwfHx8MA%3D%3D" },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-serif">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            price={card.price}
            description={card.description}
            imageUrl={card.imageUrl}
            onClick={() => setSelectedCard(card)}
          />
        ))}
      </div>

      <Modal
        isOpen={selectedCard !== null}
        onClose={() => setSelectedCard(null)}
        card={selectedCard}
      />
    </div>
  );
};

export default Cards;
