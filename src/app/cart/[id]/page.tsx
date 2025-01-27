"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface Section {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  description: string;
  buttonText: string;
  capacities: { value: string; active: boolean }[];
  price: string;
  prev: string | null;
  next: string | null;
}

export default function CartPage() {
  const { id } = useParams();
  const { cart, removeFromCart } = useCart();
  const [localCart, setLocalCart] = useState<Section[]>([]);

  useEffect(() => {
    setLocalCart(cart.filter(item => item.id === id));
  }, [cart, id]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4"></h1>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-bold mb-4">Your Cart</h2>
        {localCart.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">No items in the cart.</p>
        ) : (
          <ul>
            {localCart.map((item) => (
              <li key={item.id} className="mb-2">
                <div className="flex justify-between items-center">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="mr-4"
                    style={{ width: "auto", height: "auto" }}
                  />
                  <span>{item.title}</span>
                  <span>{item.price}</span>
                  <Button
                    className="ml-4 bg-red-500 text-white hover:bg-red-600"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Удалить
                  </Button>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
              </li>
            ))}
          </ul>
        )}
        <Button className="mt-4">Proceed to Checkout</Button>
        <Link href="/">
          <Button className="mt-4 bg-blue-500 text-white hover:bg-blue-600">Домой</Button>
        </Link>
      </div>
    </div>
  );
}