import { useEffect, useState } from "react";
import { Wishlist as WishlistCtrl } from "@/api";
import styles from "./Wishlist.module.scss";
import { useAuth } from "@/hooks";
import { NoResult } from "@/components/Shared";
import { GridGames } from "./GridGames";
import { size } from "lodash";

const wishlistCtrl = new WishlistCtrl();

export function Wishlist() {

    const [wishlist, setWishlist] = useState(null);
    const [reload, setReload] = useState(false);
    const { user } = useAuth();

    const onReload = () => setReload(!reload);

    useEffect(() => {

        (async () => {

            try {

                const response = await wishlistCtrl.getAll(user.id);
                setWishlist(response);

            } catch (error) {
                console.error(error);
            }
        })()
    }, [reload]);

    return size(wishlist) === 0 ? (
        <NoResult text={"No tienes ningun juego añadido"} />
    ) : (
        <GridGames wishlist={wishlist} onReload={onReload}/>
    )
}