import axios from "axios";
import { server } from "../config/keys";

export const treeInstance = axios.create({
  baseURL: `${server}/tree`,
});
