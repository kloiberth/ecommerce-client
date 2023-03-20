import { FullModal, Separator } from "@/components/Shared";
import { ENV } from "@/utils";
import { map } from "lodash";
import { useState } from "react";
import Slider from "react-slick";
import { Image } from "semantic-ui-react";
import styles from "./Gallery.module.scss";

export function Gallery({ screenshots }) {

    const [show, setShow] = useState(false);

    const screenshotsClone = [...screenshots];
    const principalImage = screenshotsClone.shift();

    const onOpenClose = () => {
        setShow(!show);
    }

    const settings = {
        dots: true,
        dotsClass: styles.dots,
        Infinite: true,
        slidersToShow: 1,
        slidersToScroll: 1,
        arrows: false,
        customPaging: function (index) {
            return <Image src={`${ENV.SERVER_HOST}${screenshots[index].attributes.url}`} />
        }
    };

    return (
        <>
            <div className={styles.gallery}>
                <div className={styles.principal}>
                    <Image src={`${ENV.SERVER_HOST}${principalImage.attributes.url}`} onClick={onOpenClose} />
                </div>
                <div className={styles.grid}>
                    {
                        map(screenshotsClone, (screenshot) => (

                            <div key={screenshot.id}>
                                <Image src={`${ENV.SERVER_HOST}${screenshot.attributes.url}`} onClick={onOpenClose} />
                            </div>
                        ))
                    }
                </div>
            </div>

            <FullModal show={show} onClose={onOpenClose}>
                <div className={styles.carouselContainer}>
                    <Slider {...settings}>
                        {
                            map(screenshots, (screenshot) => (
                                <div key={screenshot.id}>
                                    <Image src={`${ENV.SERVER_HOST}${screenshot.attributes.url}`} />
                                </div>
                            ))
                        }
                    </Slider>
                </div>
            </FullModal>
        </>
    )
}