import axios from "axios";
import { url } from "../../helpers";

const Instance = axios.create({
  baseURL: url,
  timeout: Infinity,
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",

    "Access-Control-Allow-Methods": "POST, PUT, PATCH, GET, DELETE, OPTIONS",

    "Access-Control-Allow-Headers": "*",
    Authorization: "",
  },
});

export { Instance };
