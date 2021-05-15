const exchanges = [
  {
    name: "RuDEX",
    tokens: ["PPY"],
    url_hive: "https://market.rudex.org/?focus=PPY#/market/PPY_RUDEX.BTC"
  },
  {
    name: "p2pb2b",
    tokens: ["PPY"],
    url_hive: "https://p2pb2b.io/trade/PPY_BTC/"
  }
];

const renderExchangesList = crypto => {
  let exchangesList = exchanges.filter(e => e.tokens.includes(crypto));
  console.log(crypto, exchangesList);
  const COLS_PER_ROW = 2;
  const rows = Math.ceil(exchangesList.length / COLS_PER_ROW);
  console.log(rows);
  let html = "";
  for (let i = 0; i < rows; i++) {
    html += '<div class="row_exchange">';
    console.log(html);
    for (let j = 0; j < COLS_PER_ROW; j++) {
      if (!exchangesList[i * COLS_PER_ROW + j]) break;
      html += renderExchange(
        exchangesList[i * COLS_PER_ROW + j],
        crypto.toLowerCase()
      );
    }
    html += "</div>";
  }
  $("#buy_exchanges div").html(html);
};

const renderExchange = (exchange, crypto) => {
  return `
  <a href="${exchange[`url_${crypto}`]}" target="_blank">
  <div class="img_wrapper"><div>
  <img src="../images/${exchange.name}.png"/>
  </div></div>
  </a>
  `;
};
