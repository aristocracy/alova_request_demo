import { getCurrentInstance,type ComponentInternalInstance } from "vue";

export const parseUrl = (url:string):string =>  {
    let isDev = import.meta.env.MODE == "development"?true:false;
    let prefix = isDev?"":"";
    let _url = isDev? prefix + url:url
    return _url;
};

export const useInstance = () => {
    const {appContext} = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    return {proxy};
};
