import { Game } from "@/components/Game";
import { Seo, Separator } from "@/components/Shared";
import { BasicLayout } from "@/layouts";
import { ENV } from "@/utils";


export default function GamePage({ game }) {

    return (
        <>
            <Seo title={game.attributes.title} description={game.attributes.summary} />
            <BasicLayout>
                <Game.HeaderWallpaper image={`${ENV.SERVER_HOST}${game.attributes.wallpaper.data.attributes.url}`} />
                <Game.Panel gameId={game.id} game={game.attributes} />
                <Separator height={50} />
                <Game.Info game={game.attributes} />
                <Separator height={30} />
                <Game.Media video={game.attributes.video} screenshots={game.attributes.screenshots.data} />
                <Separator height={50} />
            </BasicLayout>
        </>
    )
}