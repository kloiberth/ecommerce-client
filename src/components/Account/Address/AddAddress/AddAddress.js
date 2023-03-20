import { BasicModal } from "@/components/Shared";
import { useState } from "react";
import { Button } from "semantic-ui-react";
import { AddAddressForm } from "../AddAddressForm";
import styles from "./AddAddress.module.scss";

export function AddAddress({ onReload }) {

    const [show, setShow] = useState(false);

    const onOpenClose = () => setShow(!show);


    return (
        <>

            <Button primary className={styles.addBtn} onClick={onOpenClose}>
                Crear
            </Button>

            <BasicModal show={show} onClose={onOpenClose} title={"Nueva dirección"}>
                <AddAddressForm onClose={onOpenClose} onReload={onReload}/>
            </BasicModal>
        </>
    )
}