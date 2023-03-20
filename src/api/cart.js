import { authFetch, ENV } from "@/utils";
import { forEach } from "lodash";


export class Cart {

    add(gameId) {
        const games = this.getALl();

        const objIndex = games.findIndex((game) => game.id === gameId);

        if (objIndex < 0) {
            games.push({ id: gameId, quantity: 1, });
        } else {

            // const game = games[objIndex];
            games[objIndex].quantity += 1
        }

        localStorage.setItem(ENV.CART, JSON.stringify(games));
    }

    getALl() {

        const response = localStorage.getItem(ENV.CART);

        if (!response) {
            return [];
        } else {
            return JSON.parse(response);
        }
    }

    count() {

        const response = this.getALl();
        let count = 0;

        forEach(response, (item) => {
            count += item.quantity;
        })

        return count;
    }

    changeQuantity(gameId, quantity) {

        const games = this.getALl();
        const objIndex = games.findIndex((game) => game.id === gameId);

        games[objIndex].quantity = quantity;

        localStorage.setItem(ENV.CART, JSON.stringify(games));
    }

    delete(gameId) {
        const games = this.getALl();
        const updateGames = games.filter((game) => game.id !== gameId);

        localStorage.setItem(ENV.CART, JSON.stringify(updateGames));
    }

    deleteAll() {
        localStorage.removeItem(ENV.CART);
    }

    async paymentCart(token, products, idUser, address) {

        try {

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PAYMENT_ORDER}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    products,
                    idUser,
                    addressShiping: address
                }),
            };

            const response = await authFetch(url, params);

            return response;

        } catch (error) {
            throw error
        }
    }
}