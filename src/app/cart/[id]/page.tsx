"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import OrderForm from "@/components/OrderForm";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    cartCount,
    totalPrice,
  } = useCart();

  const [localCart, setLocalCart] = useState(cart);
  const [showOrderForm, setShowOrderForm] = useState(false);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center dark:text-white">
          Корзина
        </h1>

        {localCart.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl mb-4">
              В корзине нет товаров
            </p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base">
                Вернуться на главную
              </Button>
            </Link>
          </div>
        ) : (
          // На мобильных всё в столбик, на ПК (≥ lg) карточки и итог слева, форма заказа справа
          <div className="flex flex-col lg:flex-row gap-6">
            {/* ЛЕВАЯ ЧАСТЬ (список карточек + блок с суммой и кнопкой) */}
            <div className="w-full lg:w-3/5 space-y-4 sm:space-y-6">
              {/* Список карточек */}
              {localCart.map((item, index) => {
                const priceValue =
                  parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;

                return (
                  <Card
                    key={item.id}
                    className="hover:shadow-lg transition-shadow rounded-lg"
                  >
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex flex-row w-full gap-3 sm:gap-4">
                        {/* Изображение слева */}
                        <div className="relative w-1/2 min-h-[100px]">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="rounded-lg object-cover"
                            sizes="(max-width: 640px) 80px, 128px"
                            priority={index === 0}
                          />
                        </div>

                        {/* Текст, кнопки и цена справа */}
                        <div className="flex-1 w-full space-y-2">
                          <h3 className="text-base sm:text-lg font-semibold dark:text-white">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {item.description}
                          </p>

                          {/* Блок управления количеством и кнопкой удаления */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-xs sm:text-sm"
                                onClick={() => decrementQuantity(item.id)}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </Button>
                              <span className="font-medium w-5 sm:w-6 text-center text-sm sm:text-base">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-xs sm:text-sm"
                                onClick={() => incrementQuantity(item.id)}
                              >
                                +
                              </Button>
                            </div>

                            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4">
                              <span className="text-sm sm:text-lg font-bold text-primary">
                                {formatPrice(priceValue * item.quantity)}
                              </span>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="h-8 px-2 sm:px-3 text-xs sm:text-sm"
                                onClick={() => removeFromCart(item.id)}
                              >
                                Удалить
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* ИТОГИ + КНОПКА "Оформить заказ" */}
              <Card className="bg-gray-50 dark:bg-gray-900">
                <CardFooter className="flex flex-col p-4 sm:p-6">
                  <div className="w-full mb-4 sm:mb-6 space-y-2">
                    <div className="flex justify-between text-sm sm:text-base font-semibold dark:text-white">
                      <span>Товаров в корзине:</span>
                      <span>{cartCount}</span>
                    </div>
                    <div className="flex justify-between text-base sm:text-lg font-bold text-primary">
                      <span>Общая сумма:</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-end w-full gap-3">
                    <Link href="/" className="w-full sm:w-auto">
                      <Button
                        variant="outline"
                        className="w-full h-11 sm:h-12 dark:text-white text-sm sm:text-base"
                      >
                        Продолжить покупки
                      </Button>
                    </Link>
                    <Button
                      className="w-full sm:w-auto bg-green-600 hover:bg-green-700 h-11 sm:h-12 text-sm sm:text-base"
                      onClick={() => setShowOrderForm(true)}
                    >
                      Оформить заказ
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>

            {/* ПРАВАЯ ЧАСТЬ (форма заказа), отображается, если showOrderForm === true */}
            <div className="w-full lg:w-2/1">
              {/* Можно либо показать форму, либо пустую колонку */}
              {showOrderForm && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 h-fit">
                  <OrderForm />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


