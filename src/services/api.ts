import axios from "axios";

export const api = axios.create({
  baseURL: "https://effycity-apf3exb2ewbrggg2.brazilsouth-01.azurewebsites.net",
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
});
