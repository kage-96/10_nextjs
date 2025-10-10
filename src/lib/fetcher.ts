export const fetcher = (url:string) => fetch(url).then(res => res.json())

export const adminFetcher = (token:string | null) =>  (url:string) => fetch(url,{
  headers:{
    Authorization: token ?? "",
  }
}).then(res =>res.json())