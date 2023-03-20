import Link from "next/link";
import { Button, Container, Image } from "semantic-ui-react";
import styles from "./BannerAd.module.scss";

export function BannerAd({ title, subtitle, btnTitle, btnLink, image }) {

    return (
        <div className={styles.container}>
            <Container className={styles.containerImage}>
                <Image src={image} />
            </Container>

            <div className={styles.infoContainer}>
                <Container>
                    <h2>{title}</h2>
                    <h3>{subtitle}</h3>
                    <Button as={Link} href={btnLink} primary>
                        {btnTitle}
                    </Button>
                </Container>
            </div>
        </div>
    )
}