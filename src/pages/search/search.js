import { GridGames, NoResult, Pagination, Separator } from "@/components/Shared";
import { BasicLayout } from "@/layouts";
import { size } from "lodash";
import { useEffect } from "react";
import { Container } from "semantic-ui-react";

export default function SearchPage({ games, pagination, SearchText }) {

    const hasResult = size(games) > 0;

    useEffect(() => {

        document.getElementById("search-games").focus();
    }, []);

    return (
        <>
            <BasicLayout relative isOpenSearch>
                <Container>
                    <Separator height={50} />
                    <h2>Buscando: {SearchText}</h2>
                    {
                        hasResult ? (
                            <>
                                <GridGames games={games} />
                                <Separator height={30} />
                                <Pagination
                                    currentPage={pagination.page}
                                    totalPages={pagination.pageCount}
                                />
                            </>
                        ) : (
                            <NoResult text="No se ha encontrado resultado" />
                        )
                    }

                    <Separator height={100} />
                </Container>
            </BasicLayout>
        </>
    )
}