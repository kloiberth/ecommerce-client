import { ENV } from "@/utils";

export class Game {

    async getLastPublished() {

        try {

            const sort = "sort=publishedAt:desc";
            const pagination = "pagination[limit]=1";
            const populate = "populate=*";

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${sort}&${pagination}&${populate}`

            const response = await fetch(url);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }

    async getLatestPublished(limit = 9, platformId = null) {

        try {

            const filterPlatform = platformId && `filters[platform][id][$eq]=${platformId}`;
            const pagination = `pagination[limit]=${limit}`;
            const sort = "sort[0]=publishedAt:desc";
            const populate = "populate=*";

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${sort}&${pagination}&${filterPlatform}&${populate}`

            const response = await fetch(url);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }

    async getGameByPlatformsSlug(slug, page) {

        try {

            const filters = `filters[platform][slug][$eq]=${slug}`;
            const pagination = `pagination[page]=${page}&pagination[pageSize]=30`;
            const populate = "populate=*";

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${filters}&${pagination}&${populate}`

            const response = await fetch(url);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }

    async searchGames(text, page) {

        try {

            const filters = `filters[title][$contains]=${text}`;
            const pagination = `pagination[page]=${page}&pagination[pageSize]=30`;
            const populate = "populate=*";

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${filters}&${pagination}&${populate}`

            const response = await fetch(url);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error
        }
    }

    async getBySlug(slug) {

        try {

            const filter = `filters[slug][$eq]=${slug}`
            const populate = "populate[0]=wallpaper&populate[1]=cover&populate[2]=screenshots&populate[3]=platform&populate[4]=platform.icon";

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${filter}&${populate}`;

            const response = await fetch(url);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result.data[0];

        } catch (error) {
            throw error;
        }
    }

    async getById(id) {

        try {

            const populate = "populate[0]=cover&populate[1]=platform";

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}/${id}?${populate}`;

            const response = await fetch(url);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }
}