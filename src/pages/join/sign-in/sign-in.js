import { LoginForm } from "@/components/Auth/LoginForm/LoginForm";
import { Seo } from "@/components/Shared";
import { JoinLayout } from "@/layouts";
import Link from "next/link";
import styles from "./sign-in.module.scss";

export default function SignInPage() {
    return (
        <>
            <Seo title="Iniciar sesión" />
            <JoinLayout>
                <div className={styles.signIn}>
                    <h3>Iniciar sesión</h3>
                    <LoginForm />
                    <div className={styles.actions}>
                        <Link href="/join/sign-up">
                            ¿No tienes una cuenta?
                        </Link>
                    </div>
                </div>
            </JoinLayout>
        </>
    )
}