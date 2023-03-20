import { Game } from "@/api";
import { Cart } from "@/components/Cart";
import { Seo } from "@/components/Shared";
import { useCart } from "@/hooks";
import { CartLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const gameCtrl = new Game();

export default function CartPage() {

    const { query: { step = 1 } } = useRouter();
    const currenStep = Number(step);
    const [games, setGames] = useState(null);
    const { cart } = useCart();

    useEffect(() => {

        (async () => {

            try {

                const data = [];

                for await (const item of cart) {
                    const response = await gameCtrl.getById(item.id);
                    data.push({ ...response.data, quantity: item.quantity })
                }

                setGames(data);

            } catch (error) {
                console.error(error);
            }
        })()
    }, [cart]);

    return (
        <>
            <Seo title="Carrito" />
            <CartLayout>
                {
                    currenStep === 1 && <Cart.StepOne games={games} />
                }
                {
                    currenStep === 2 && <Cart.StepTwo games={games} />
                }
                {
                    currenStep === 3 && <Cart.StepThree />
                }
            </CartLayout>
        </>
    )
}