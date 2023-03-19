class ShopPage {

    get checkout() {
        return $("*=Checkout");
    }

    get cards() {
        return $$("div[class='card h-100']");
    }

    async addProductsToCart(products) {
        for (let i = 0; i < await this.cards.length; i++) {
            const cardTitle = await this.cards[i].$("div h4 a").getText();

            if (products.includes(cardTitle)) {
                await this.cards[i].$(".card-footer button").click();
            }
        }
    }

}

export default new ShopPage();