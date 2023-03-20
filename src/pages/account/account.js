import { Info, Setting, Address, Wishlist, Orders } from "@/components/Account";
import { Seo, Separator } from "@/components/Shared";
import { useAuth } from "@/hooks";
import { BasicLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState } from "react";
import { Tab } from "semantic-ui-react";
import styles from "./account.module.scss";


export default function AccountPage() {

    const { logout, user } = useAuth();
    const router = useRouter();
    const [reload, setReload] = useState(false);

    if (!user) {
        router.push("/");
        return null;
    }

    const onReload = () => setReload(!reload);


    const panes = [
        {
            menuItem: "Mis pedidos",
            render: () => (
                <Tab.Pane attached={false}>
                    <Orders />
                    <Separator height={80} />
                </Tab.Pane>
            ),
        },
        {
            menuItem: "LIsta de deseos",
            render: () => (
                <Tab.Pane attached={false}>
                    <Wishlist />
                    <Separator height={80} />
                </Tab.Pane>
            ),
        },
        {
            menuItem: "Dirreciones",
            render: () => (
                <Tab.Pane attached={false}>
                    <Address.AddAddress onReload={onReload} />
                    <Address.ListAddresses reload={reload} onReload={onReload} />
                    <Separator height={80} />
                </Tab.Pane>
            ),
        },
        {
            menuItem: { key: 20, icon: "setting", content: "Configuracion" },
            render: () => (
                <Tab.Pane attached={false}>
                    <Setting.ChangeNameForm />
                    <div className={styles.containerForms}>
                        <Setting.ChangeEmailForm />
                        <Setting.ChangePasswordForm />
                    </div>
                    <Separator height={80} />
                </Tab.Pane>
            ),
        },
        {
            menuItem: {
                key: 21,
                icon: "log out",
                content: "",
                onClick: logout,
            }
        },
    ];

    return (
        <>
            <Seo title={"Mi Cuenta"} />
            <BasicLayout isContainer relative>
                <Info />
                <Tab
                    menu={{ secondary: true, pointing: true }}
                    panes={panes}
                    className={styles.tabs}
                />
            </BasicLayout>
        </>
    )
}