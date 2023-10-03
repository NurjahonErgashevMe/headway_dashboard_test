import axios from "axios";
import { url } from "../../helpers";


const Instance = axios.create({
  baseURL: url,
  timeout: Infinity,
});

export { Instance  };
