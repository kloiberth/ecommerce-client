import { BasicLayout } from "@/layouts";
import { Home } from "@/components/Home";
import { BannerAd, BarTrust, Seo, Separator } from "@/components/Shared";
import { Container } from "semantic-ui-react";

const platformsId = {
    playStation: 1,
    xbox: 2,
    nintendo: 3,
    pc: 4,
}

export default function HomePage() {
    return (
        <>
            <Seo />
            <BasicLayout>
                <Home.BannerLastGamePublished />
                <Separator height={100} />

                <Container>
                    <Home.LatestGames title="Ultimos lanzamientos" />
                </Container>

                <Separator height={100} />
                <BarTrust />
                <Separator height={100} />

                <Container>
                    <Home.LatestGames title="PlayStation" limit={3} platformId={platformsId.playStation} />
                </Container>

                <Separator height={100} />

                <BannerAd
                    title="Registrate y obten los mejores precios y juegos"
                    subtitle="¡Escoge los mejores juegos del mercado!"
                    btnTitle="Entrar ahora"
                    btnLink="/account"
                    image="/images/BannerAd.png"
                />
                <Separator height={50} />
                <Container>
                    <Home.LatestGames title="Xbox" limit={3} platformId={platformsId.xbox} />
                </Container>
                <Separator height={100} />
            </BasicLayout>
        </>
    )
}