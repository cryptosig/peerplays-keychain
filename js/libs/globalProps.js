class GlobalProps {
  constructor() {
    this.props = hive.api.getDynamicGlobalPropertiesAsync();
    this.median = hive.api.getCurrentMedianHistoryPriceAsync();
    this.fund = hive.api.getRewardFundAsync("post");
    this.prices = this.initGetPrice();
  }
  async getProp(key) {
    return (await this.props)[key];
  }
  async getMedian() {
    return await this.median;
  }
  async getFund(key) {
    return (await this.fund)[key];
  }
  async getPPYPrice() {
    const median = await this.getMedian();
    return (
      parseFloat(median.base.replace(" pBTC", "")) /
      parseFloat(median.quote.replace(" PPY", ""))
    );
  }
  async initGetPrice() {
    return await getPricesAsync();
  }
  async getPrices() {
    let { ppy, btc } = await this.prices;
    console.log(ppy, btc);
    ppy = hive.result["Bid"];
    btc = btc.result["Bid"];
    return [ppy * btc];
  }
}
