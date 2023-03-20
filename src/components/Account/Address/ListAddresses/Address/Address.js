import { Address as AddressCtrl } from "@/api";
import { BasicModal, Confirm } from "@/components/Shared";
import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { AddAddressForm } from "../../AddAddressForm";
import styles from "./Address.module.scss";

const addressCtrl = new AddressCtrl();

export function Address({ addressId, address, onReload }) {

    const [showEdit, setShowEdit] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const openCloseEdit = () => setShowEdit(!showEdit);
    const openCloseConfirm = () => setShowConfirm(!showConfirm);

    const onDelete = async () => {

        try {

            await addressCtrl.delete(addressId);
            onReload();

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>

            <div className={styles.address}>
                <div>
                    <p className={styles.title}>
                        {address.title}:
                    </p>
                    <p className={styles.addressInfo}>
                        {address.name}, {address.address}, {address.state}, {address.city}, {address.postal_code}
                    </p>
                </div>
                <div className={styles.actions}>
                    <Button primary icon onClick={openCloseEdit}>
                        <Icon name="pencil" />
                    </Button>
                    <Button primary icon onClick={openCloseConfirm}>
                        <Icon name="delete" />
                    </Button>
                </div>
            </div>

            <Confirm
                open={showConfirm}
                onCancel={openCloseConfirm}
                onConfirm={onDelete}
                content={"¿Quieres eliminar la dirreción?"}
            />

            <BasicModal show={showEdit} onClose={openCloseEdit} title={"Editar dirreción"}>
                <AddAddressForm onClose={openCloseEdit} onReload={onReload} addressId={addressId} address={address} />
            </BasicModal>
        </>
    )
}