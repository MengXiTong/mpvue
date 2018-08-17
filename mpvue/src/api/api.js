var Fly = require("flyio/dist/npm/wx");
var fly = new Fly();

fly.config.baseURL = process.env.GATEWAY_URL;

const api = {
  fly,
  setFlyHeader(token) {
    this.fly.config.headers = {
      "content-type": "application/json",
      Authorization: token,
      Accept: "application/json, text/plain, */*"
    };
  }
};
export default api;
