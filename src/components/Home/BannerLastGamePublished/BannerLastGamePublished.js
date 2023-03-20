import { Game } from "@/api";
import { Label } from "@/components/Shared";
import { ENV, fn } from "@/utils";
import { DateTime } from "luxon";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, Image } from "semantic-ui-react";
import styles from "./BannerLastGamePublished.module.scss";

const gameCtrl = new Game();

export function BannerLastGamePublished() {

    const [game, setGame] = useState(null);

    useEffect(() => {

        (async () => {

            try {

                const response = await gameCtrl.getLastPublished();
                setGame(response.data[0]);

            } catch (error) {
                console.error(error);
            }
        })()
    }, [])

    if (!game) return null;

    const wallpaper = game.attributes.wallpaper;
    const releaseData = new Date(game.attributes.releaseData).toISOString();

    const price = fn.calcDiscountedPrice(game.attributes.price, game.attributes.discount);

    return (
        <div className={styles.container}>
            <Image src={`${ENV.SERVER_HOST}${wallpaper.data.attributes.url}`} className={styles.wallpaper} />

            <Link className={styles.infoContainer} href={game.attributes.slug}>
                <Container>
                    <span className={styles.date}>
                        {DateTime.fromISO(releaseData).minus({ days: 1 }).toRelative()}
                    </span>
                    <h2>{game.attributes.title}</h2>
                    <p className={styles.price}>
                        {game.attributes.discount && <Label.Discount>-{game.attributes.discount}%</Label.Discount>}
                        <span className={styles.finalPrice}>
                            ${price}
                        </span>
                    </p>
                </Container>
            </Link>
        </div>
    )
}