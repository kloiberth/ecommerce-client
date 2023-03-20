import { authFetch, ENV } from "@/utils";


export class User {
    async getMe() {

        try {

            const ulr = `${ENV.API_URL}/${ENV.ENDPOINTS.USER_ME}`

            const response = await authFetch(ulr);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {

        try {

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}/${id}`

            const params = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
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