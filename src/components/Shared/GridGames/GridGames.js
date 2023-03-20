import { map } from "lodash";
import Link from "next/link";
import { Label } from "@/components/Shared";
import styles from "./GridGames.module.scss";
import { ENV, fn } from "@/utils";

export function GridGames({ games }) {

    return (
        <div className={styles.gridGames}>
            {
                map(games, (game) => (
                    <Link key={game.id} href={game.attributes.slug} className={styles.game}>
                        <div>
                            <img src={`${ENV.SERVER_HOST}${game.attributes.cover.data.attributes.url}`}></img>
                            {game.attributes.discount > 0 && (
                                <Label.Discount className={styles.discount}>
                                    {`-${game.attributes.discount}%`}
                                </Label.Discount>
                            )}
                        </div>
                        <div>
                            <span>{game.attributes.title}</span>
                            <span className={styles.price}>${fn.calcDiscountedPrice(game.attributes.price, game.attributes.discount)}</span>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}