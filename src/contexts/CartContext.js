import { Cart } from "@/api/cart";
import { createContext, useEffect, useState } from "react";

const cartCtrl = new Cart();

export const CartContext = createContext();

export function CartProvided({ children }) {

    const [cart, SetCart] = useState(null);
    const [total, SetTotal] = useState(cartCtrl.count());

    useEffect(() => {

        const response = cartCtrl.getALl();
        SetCart(response);
    }, []);

    const addCart = (gameId) => {
        cartCtrl.add(gameId);
        refreshTotalCart();
    }

    const changeQuantityItem = (gameId, quantity) => {
        cartCtrl.changeQuantity(gameId, quantity);
        refreshTotalCart();
    }

    const deleteItem = (gameId) => {
        cartCtrl.delete(gameId);
        refreshTotalCart();
    }

    const deleteAllItem = () => {
        cartCtrl.deleteAll();
        refreshTotalCart();
    }

    const refreshTotalCart = () => {
        SetTotal(cartCtrl.count());
        SetCart(cartCtrl.getALl());
    }

    const data = {
        cart,
        addCart,
        total,
        deleteItem,
        deleteAllItem,
        changeQuantityItem,
    };

    return <CartContext.Provider value={data}>{children}</CartContext.Provider>
}