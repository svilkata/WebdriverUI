class ReviewPage {

    get chosenProductPrices() {
        return $$("//tr/td[4]/strong");
    }

    get totalPrice(){
        return $("h3 strong").getText();
    }

    async sumPriceOfProducts() {
        return (await Promise.all(await this.chosenProductPrices.map(async productPrice =>
            parseInt((await productPrice.getText()).split(".")[1].trim()))))
            .reduce((acc, price) => acc + price, 0);
    }

    async totalFormattedIntegerValue() {
        return parseInt((await this.totalPrice).split(".")[1].trim());
    }

}

export default new ReviewPage();