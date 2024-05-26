import {METHODS} from "@/utils/alova";
import type { AlovaMethodCreateConfig } from "alova";

const getSoftwareList = (url:string,config: AlovaMethodCreateConfig<unknown, unknown, { cache?: RequestCache | undefined; credentials?: RequestCredentials | undefined; integrity?: string | undefined; keepalive?: boolean | undefined; mode?: RequestMode | undefined; priority?: RequestPriority | undefined; redirect?: RequestRedirect | undefined; referrer?: string | undefined; referrerPolicy?: ReferrerPolicy | undefined; signal?: AbortSignal | null | undefined; window?: null | undefined; }, Headers> | undefined) => {
    return METHODS.get(url,config);
};

export default {
    getSoftwareList,
};