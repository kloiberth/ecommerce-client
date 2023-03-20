import { ENV, authFetch } from "@/utils";

export class Address {

    async create(data, id) {

        try {

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}`

            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: {
                        ...data,
                        user: id,
                    }
                }),
            };

            const response = await authFetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }

    async getAll(id) {

        try {

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}?filters[user][id][$eq]=${id}`
            const response = await authFetch(url);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {

        try {

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}/${id}`

            const params = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data }),
            }

            const response = await authFetch(url, params);

            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }

    async delete(id) {

        try {

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}/${id}`

            const params = {
                method: "DELETE",
            }

            const response = await authFetch(url, params);

            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }
}