import Head from "next/head";

export function Seo({ title = "Gaming - juegos", description = "Tus juegos favoritos para Steam, Playstation, Xbox, Switch al mejor precio." }) {

    return (
        <Head>
            <title>{title}</title>
            <meta property="description" content={description} />
        </Head>
    )
}