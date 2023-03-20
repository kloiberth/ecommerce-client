import ReactPlayer from "react-player";
import styles from "./Video.module.scss";

export function Video({ video }) {

    return (
        <ReactPlayer url={video} className={styles.video} width="100%" height={634} />
    )
}