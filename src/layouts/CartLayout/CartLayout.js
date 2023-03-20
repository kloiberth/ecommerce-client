import { Footer, HeaderCart } from "@/components/Layout";
import { Separator } from "@/components/Shared";
import { Container } from "semantic-ui-react";


export function CartLayout({ children }) {

    return (
        <>
            <HeaderCart />
            <Separator height={150} />
            <Container>{children}</Container>
            <Separator height={70} />
            <Footer />
        </>
    )
}