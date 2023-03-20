import { Wishlist } from "@/api";
import { useAuth } from "@/hooks";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";
import styles from "./WishlistIcon.module.scss";

const wishlistCtrl = new Wishlist();

export function WishlistIcon({ gameId, className, removeCallback }) {

    const [hasWishlist, setHasWishlist] = useState(null);
    const { user } = useAuth();

    useEffect(() => {

        (async () => {

            try {

                const response = await wishlistCtrl.check(user.id, gameId);
                setHasWishlist(response);

            } catch (error) {
                setHasWishlist(false);
                console.error(error);
            }
        })()

    }, [gameId]);

    const addWishlist = async () => {

        const response = await wishlistCtrl.add(user.id, gameId);
        setHasWishlist(response);

    }

    const deleteWishlist = async () => {

        try {

            await wishlistCtrl.delete(hasWishlist.id);
            setHasWishlist(false);

            if (removeCallback) {
                removeCallback();
            }

        } catch (error) {
            console.error(error);
        }
    }

    if (hasWishlist === null) return null;

    return (
        <div>
            <Icon
                name={hasWishlist ? "heart" : "heart outline"}
                onClick={hasWishlist ? deleteWishlist : addWishlist}
                className={classNames(styles.wishlistIcon, { [className]: className })} />
        </div>
    )
}