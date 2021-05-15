class TransferValidator {
  constructor() {
    this.phishingAccounts = getPhishingAccounts();
  }
  async isPhishing(account) {
    return (await this.phishingAccounts).includes(account);
  }
  async getExchangeValidationWarning(account, currency, hasMemo) {
    const exchanges = [
      { account: "rudex-gateway", tokens: ["PPY"] },
      { account: "p2pb2b", tokens: ["PPY"] },
      { account: "livecoin.net", tokens: ["PPY"] }
    ];

    const exchange = exchanges.find(exchange => exchange.account === account);
    if (!exchange) return null;
    if (!exchange.tokens.includes(currency)) {
      return chrome.i18n.getMessage("popup_warning_exchange_deposit", [
        currency
      ]);
    }
    if (!hasMemo) return chrome.i18n.getMessage("popup_warning_exchange_memo");
    if (exchange.account == "bittrex") {
      const info = await getBittrexCurrency(currency);
      if (info && !info.IsActive) {
        return chrome.i18n.getMessage("popup_warning_exchange_wallet");
      }
    }
    return null;
  }

  async validate(account, currency, hasMemo) {
    let warning = null;
    if (await this.isPhishing(account)) {
      warning = chrome.i18n.getMessage("popup_warning_phishing");
    } else {
      warning = await this.getExchangeValidationWarning(
        account,
        currency,
        hasMemo
      );
    }
    if (warning) {
      $("#transfer_warning").text(warning);
      $("#confirm_send_div p").hide();
    } else {
      $("#transfer_warning").text("");
      $("#confirm_send_div p").show();
    }
  }
}
