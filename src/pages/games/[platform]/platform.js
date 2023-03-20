import { GridGames, NoResult, Separator, Pagination, Seo } from "@/components/Shared";
import { BasicLayout } from "@/layouts";
import { size } from "lodash";
import { Container } from "semantic-ui-react";


export default function PlatformPage({ games, platform, pagination }) {

    const hasProducts = size(games) > 0;

    return (
        <>
            <Seo title={`${platform.attributes.title}`} />
            <BasicLayout relative>
                <Container>
                    <Separator height={50} />
                    <h2>{platform.attributes.title}</h2>
                    {
                        hasProducts ? (
                            <>
                                <GridGames games={games} />
                                <Separator height={30} />
                                <Pagination currentPage={pagination.page} totalPages={pagination.pageCount} />
                            </>
                        ) : (
                            <NoResult text={`La categoria ${platform.attributes.title} no tiene producto.`} />
                        )
                    }
                    <Separator height={100} />
                </Container>
            </BasicLayout>
        </>
    )
}