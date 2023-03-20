import { authFetch, ENV } from "@/utils";

export class Order {

    async getAll(userId) {

        try {

            const filters = `filters[user][id][$eq]=${userId}`
            const sort = "sort[0]=createdAt:desc";
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDER}?${filters}&${sort}`

            const response = await authFetch(url);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }
}