import { Footer, TopBar } from "@/components/Layout";
import classNames from "classnames";
import { Container } from "semantic-ui-react";
import styles from "./BasicLayout.module.scss";

export function BasicLayout({ children, isOpenSearch = false, isContainer = false, relative = false }) {
    return (
        <>
            <TopBar isOpenSearch={isOpenSearch} />
            <Container fluid>
                <div className={classNames({ [styles.relative]: relative })}>
                    {isContainer ? <Container>{children}</Container> : children}
                </div>
            </Container>
            <Footer />
        </>
    )
}