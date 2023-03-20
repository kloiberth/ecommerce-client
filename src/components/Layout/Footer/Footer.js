import Link from "next/link";
import { Button, Container, Image } from "semantic-ui-react";
import styles from "./Footer.module.scss";

export function Footer() {
    return (
        <div className={styles.footer}>
            <Container>
                <div className={styles.columns}>
                    <div>
                        <Link href="/">
                            <Image src="/images/logo.png" alt="Gaming" />
                        </Link>
                    </div>

                    <div>
                        <ul>
                            <Link href="#">
                                Términos y condiciones
                            </Link>
                            <Link href="#">
                                Politicas de privacidad
                            </Link> <Link href="#">
                                Contacto
                            </Link>
                            <Link href="#">
                                FAQs
                            </Link>

                        </ul>
                    </div>

                    <div className={styles.social}>
                        <Button as="a" href="#" circular color="linkedin" icon="linkedin" />
                        <Button as="a" href="#" circular color="green" icon="whatsapp" />
                        <Button as="a" href="#" circular color="black" icon="github" />
                    </div>
                </div>
                <div className={styles.copyright}>
                    <span>Copyright &copy; 2023 Gaming - All rights reserved</span>
                </div>
            </Container>
        </div>
    )
}