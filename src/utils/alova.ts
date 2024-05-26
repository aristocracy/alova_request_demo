import {createAlova, type AlovaMethodCreateConfig, type RequestBody} from "alova";
import GlobalFetch from "alova/GlobalFetch";
import VueHook from 'alova/vue';
import { parseUrl } from "@/utils/util";

const alovaInstance = createAlova({
    baseURL: import.meta.env.USAGI_API_BASE_URL,
    requestAdapter:GlobalFetch(),
    statesHook:VueHook,
    timeout:5000,
    errorLogger:true,
    cacheLogger:true,
    beforeRequest(method) {
        method.config.credentials="include";
        method.config.mode="cors";
        method.config.headers.token = ""; 
    },
    responded:{
        onSuccess: async (response,method) =>{
            if (response.status >= 400) {
                console.error(response.statusText);
              }
              const json = await response.json();
              if (json.code !== 200) {
                // 抛出错误或返回reject状态的Promise实例时，此请求将抛出错误
                console.warn(json.message);
              }
              // 解析的响应数据将传给method实例的transformData钩子函数，这些函数将在后续讲解
              return json;
        },
        onError: (err,method)=>{
            console.error(err.message,method);
        },
        onComplete: (method) =>{
            console.log(method);
        }
    }
});

export const METHODS = {
    get:(url:string,config?: AlovaMethodCreateConfig<unknown, unknown, { cache?: RequestCache | undefined; credentials?: RequestCredentials | undefined; integrity?: string | undefined; keepalive?: boolean | undefined; mode?: RequestMode | undefined; priority?: RequestPriority | undefined; redirect?: RequestRedirect | undefined; referrer?: string | undefined; referrerPolicy?: ReferrerPolicy | undefined; signal?: AbortSignal | null | undefined; window?: null | undefined; }, Headers> | undefined)=>{
        return alovaInstance.Get(parseUrl(url),{...config})
    },
    post:(url:string,data?:RequestBody,config?: AlovaMethodCreateConfig<unknown, unknown, { cache?: RequestCache | undefined; credentials?: RequestCredentials | undefined; integrity?: string | undefined; keepalive?: boolean | undefined; mode?: RequestMode | undefined; priority?: RequestPriority | undefined; redirect?: RequestRedirect | undefined; referrer?: string | undefined; referrerPolicy?: ReferrerPolicy | undefined; signal?: AbortSignal | null | undefined; window?: null | undefined; }, Headers> | undefined) => {
        return alovaInstance.Post(parseUrl(url),data,{...config})
    }
};
/*interface customRequestAdapterValue {
    response: () => Promise<Response>;
    headers: () => Promise<Headers>;
    onDownload?: (handler: ProgressUpdater) => void;
    onUpload?: (handler: ProgressUpdater) => void;
    abort: () => void;
};
const customRequestAdapter:AlovaRequestAdapter<any, any, RequestInit, Response, Headers>=():customRequestAdapterValue=>{
 return {
    response: () => new Promise((resolve,reject)=>{}),
    headers: () => new Promise((resolve,reject)=>{}),
    onDownload: (handler: ProgressUpdater) => {},
    onUpload: (handler: ProgressUpdater) => {},
    abort: ()=>{}
 };
};
const requestElement:RequestElements = {
    url:"",
    type:"POST",
    headers:{"user-agent":"xxxx"},
    data:JSON.stringify({})
};*/
