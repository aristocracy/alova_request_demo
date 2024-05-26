/// <reference types="vite/client" />
import {useInstance} from "./src/utils/util"
import APIS from "@/services/api";

export const service = APIS;
export const instance=useInstance;