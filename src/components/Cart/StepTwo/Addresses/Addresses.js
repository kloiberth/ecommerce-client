import { Address } from "@/api";
import { useAuth } from "@/hooks";
import classNames from "classnames";
import { map } from "lodash";
import { useEffect, useState } from "react";
import styles from "./Addresses.module.scss";

const addresCtrl = new Address();

export function Addresses({ addressSelected, setAddressSelected }) {

    const [addresses, setAddresses] = useState(null);

    const { user } = useAuth();

    useEffect(() => {

        (async () => {

            try {

                const response = await addresCtrl.getAll(user.id);
                setAddresses(response.data);

            } catch (error) {
                console.error(error);
            }
        })()
    }, []);

    return (
        <div className={styles.addresses}>
            <h2>Dirreción</h2>
            {
                map(addresses, (address) => (
                    <div
                        key={address.id}
                        className={classNames(styles.address, { [styles.active]: address.id === addressSelected?.id })}
                        onClick={() => setAddressSelected(address)}>
                        <p>{address.attributes.name} ({address.attributes.title})</p>
                        <p>
                            {address.attributes.address}, {address.attributes.postal_code}, {" "}
                            {address.attributes.state}, {address.attributes.city}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}