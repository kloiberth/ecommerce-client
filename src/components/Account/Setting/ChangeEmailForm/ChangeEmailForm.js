import { User } from "@/api";
import { useAuth } from "@/hooks";
import { useFormik } from "formik";
import { Form } from "semantic-ui-react";
import { initiaValues, validationSchema } from "./ChangeEmailForm.form";
import styles from "./ChangeEmailForm.module.scss";

const UserCtrl = new User();

export function ChangeEmailForm() {

    const { user, updateUser } = useAuth();

    const formik = useFormik({
        initialValues: initiaValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {

            try {

                await UserCtrl.update(user.id, { email: formValue.email });
                updateUser("email", formValue.email);
                formik.handleReset();

            } catch (error) {
                console.error(error);
            }
        }
    })

    return (
        <Form onSubmit={formik.handleSubmit} className={styles.form}>
            <label>Correo electronico</label>
            <Form.Input
                name="email"
                placeholder="Correo Electronico"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
            />
            <Form.Input
                name="repeatEmail"
                placeholder="Repetir correo electronico"
                value={formik.values.repeatEmail}
                onChange={formik.handleChange}
                error={formik.errors.repeatEmail}
            />
            <Form.Button type="submit" loading={formik.isSubmitting}>
                Enviar
            </Form.Button>
        </Form>
    )
}