import { Cart } from "@/api";
import { useAuth, useCart } from "@/hooks";
import { fn } from "@/utils";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { forEach, map } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import styles from "./Resume.module.scss";

const cartCtrl = new Cart();

export function Resume({ games, addressSelected }) {

    console.log(games);

    const [total, setTotal] = useState(null);
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const { deleteAllItem } = useCart();
    const router = useRouter();

    useEffect(() => {

        let totalTemp = 0;

        forEach(games, (game) => {
            const price = fn.calcDiscountedPrice(game.attributes.price, game.attributes.discount);

            totalTemp += price * game.quantity;
        });

        setTotal(totalTemp.toFixed(2));
    }, [games]);

    const onPay = async () => {
        setLoading(true);

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const result = await stripe.createToken(cardElement);

        console.log(result);

        if (result.error) {
            console.error(result.error.message);
        } else {
            const response = await cartCtrl.paymentCart(result.token, games, user.id, addressSelected);

            if (response.status === 200) {
                deleteAllItem();
                goToStepEnd();
            } else {
                console.error("LA TRANSACCION NO SE PUDO REALIZAR");
            }

        }
    }

    const goToStepEnd = () => {
        router.replace({ query: { ...router.query, step: 3 } })
    }

    if (!total) return null;

    return (
        <div className={styles.resume}>
            <h2>Resumen</h2>
            <div className={styles.block}>
                <div className={styles.products}>
                    {
                        map(games, (game) => (
                            <div key={game.id} className={styles.product}>
                                <div>
                                    <p>{game.attributes.title}</p>
                                    <span>{game.attributes.platform.data.attributes.title}</span>
                                </div>
                                <span>
                                    {game.quantity > 0 && `${game.quantity}x`}
                                    ${fn.calcDiscountedPrice(game.attributes.price, game.attributes.discount)}
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className={styles.blockTotal}>
                <div>
                    <span>Total: </span>
                    <span>${total}</span>
                </div>

                <Button primary fluid disabled={!addressSelected} onClick={onPay} loading={loading}>Pagar</Button>
            </div>
        </div>
    )
}