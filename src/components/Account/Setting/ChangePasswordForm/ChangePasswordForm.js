import { User } from "@/api";
import { useFormik } from "formik";
import { useAuth } from "@/hooks";
import { Form } from "semantic-ui-react";
import { initiaValues, validationSchema } from "./ChangePasswordForm.form";
import styles from "./ChangePasswordForm.module.scss";

const userCtrl = new User();

export function ChangePasswordForm() {

    const { user, logout } = useAuth();

    const formik = useFormik({
        initialValues: initiaValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {

            try {

                await userCtrl.update(user.id, {password: formValue.password});
                logout();

            } catch (error) {
                throw error;
            }
        }
    })

    return (
        <Form onSubmit={formik.handleSubmit} className={styles.form}>
            <label>Contraseña</label>
            <Form.Input
                type="password"
                name="password"
                placeholder="Nueva contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
            />
            <Form.Input
                type="password"
                name="repeatPassword"
                placeholder="Repetir contraseña"
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
                error={formik.errors.repeatPassword}
            />
            <Form.Button type="submit" loading={formik.isSubmitting}>
                Enviar
            </Form.Button>
        </Form>
    )
}