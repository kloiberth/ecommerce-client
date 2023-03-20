import { BasicModal } from "@/components/Shared";
import { ENV, fn } from "@/utils";
import { forEach, map } from "lodash";
import { DateTime } from "luxon";
import { useState } from "react";
import { Image } from "semantic-ui-react";
import styles from "./Order.module.scss";

export function Order({ order }) {

    const [showModal, setShowModal] = useState(false);

    const createdAt = new Date(order.attributes.createdAt).toISOString();
    const products = order.attributes.products;
    const address = order.attributes.addressShiping;

    const openCLoseModal = () => setShowModal(!showModal);

    const getTotalProducts = () => {

        let total = 0;

        forEach(products, (product) => {

            total += product.quantity;
        })

        return total;
    }

    console.log(order.attributes.products[0].attributes.cover.data.attributes.url);

    return (
        <>
            <div className={styles.order} onClick={openCLoseModal}>
                <div>
                    <span>{DateTime.fromISO(createdAt, { locale: "es" }).toFormat("dd/MM/yy")}</span>
                    <p>{getTotalProducts()} productos</p>
                </div>
                <p>${order.attributes.totalPayment.toFixed(2)}</p>
            </div>

            <BasicModal show={showModal} onClose={openCLoseModal} title="Informacion del pedido">
                {
                    map(products, (product) => (
                        <div className={styles.product}>
                            <Image src={`${ENV.SERVER_HOST}${product.attributes.cover.data.attributes.url}`} />
                            <div>
                                <div className={styles.info}>
                                    <div>
                                        <p>{product.attributes.title}</p>
                                        <p>{product.attributes.platform.data.attributes.title}</p>
                                    </div>
                                </div>
                                <div className={styles.quantity}>
                                    <span>x{product.quantity}</span>
                                    <span>${fn.calcDiscountedPrice(product.attributes.price, product.attributes.discount)}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }

                <div className={styles.address}>
                    <div>
                        <p className={styles.title}>{address.attributes.title}</p>
                        <p className={styles.info}>
                            {address.attributes.name}, {address.attributes.address}, {" "}
                            {address.attributes.state}, {address.attributes.city}, {" "}
                            {address.attributes.postal_code}
                        </p>
                    </div>
                </div>

                <div className={styles.total}>
                    <p>TOTAL: ${order.attributes.totalPayment.toFixed(2)}</p>
                </div>
            </BasicModal>
        </>
    )
}