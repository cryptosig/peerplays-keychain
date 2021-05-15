class Rpcs {
  constructor() {
    this.currentRpc = "https://api.mainnet.peerblock.trade/";
    this.awaitRollback = false;
    this.DEFAULT_RPC_API = "https://api.peerplays-keychain.com/ppy/rpc";
    this.list = this.initList();

    peerplays.config.set("rebranded_api", true);
  }
  getCurrent() {
    return this.currentRpc;
  }
  async initList() {
    let listRPC = [];
    const RPCs = [
      "DEFAULT",
      "https://peerplaysblockchain.net/mainnet/api",
      "https://api.eifos.org",
      "https://pma.blockveritas.co/ws",
      "https://ppyapi.spacemx.tech",
      "TESTNET"
    ];

    return new Promise(resolve => {
      chrome.storage.local.get(["rpc", "current_rpc"], items => {
        const local = items.rpc;
        listRPC = local != undefined ? JSON.parse(local).concat(RPCs) : RPCs;
        const currentrpc = items.current_rpc || "DEFAULT";
        const list = [currentrpc].concat(
          listRPC.filter(e => {
            return e != currentrpc;
          })
        );
        resolve(list);
      });
    });
  }

  async getList() {
    return await this.initList();
  }

  async setOptions(rpc, awaitRollback = false) {
    if (rpc === this.currentRpc) {
      //console.log("Same RPC");
      return;
    }
    const list = await this.getList();
    const newRpc = list.includes(rpc) ? rpc : this.currentRpc;
    if (newRpc === "TESTNET") {

    } else {
      if (newRpc === "DEFAULT") {
        let rpc;
        try {
          rpc = (await this.getDefaultRPC()).rpc || this.list[1];
          console.log(`Using ${rpc} as default.`);
        } catch (e) {
          rpc = "https://api.peerplays.com/";
        }

        peerplays.api.setOptions({
          url: rpc,
          useAppbaseApi: true
        });
      } else {
        peerplays.api.setOptions({
          url: newRpc,
          useAppbaseApi: true
        });
      }
    }
    this.previousRpc = this.currentRpc;
    this.currentRpc = newRpc;
    console.log(`Now using ${this.currentRpc}, previous: ${this.previousRpc}`);
    this.awaitRollback = awaitRollback;

    return;
  }

  rollback() {
    if (this.awaitRollback) {
      console.log("Rolling back to user defined rpc");
      this.setOptions(this.previousRpc);
      this.awaitRollback = false;
    }
    return;
  }

  async getDefaultRPC() {
    return $.ajax({
      url: this.DEFAULT_RPC_API,
      type: "GET"
    });
  }
}
