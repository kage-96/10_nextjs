import useSWR from "swr"

export const useFetcher = <T>(url:string | null,token?:string | null) => {
  const fetcher = async (url:string) => {
    const res = await fetch(url,{
      headers: token ? {Authorization: token } : {},
    })
    if(!res.ok){
      throw new Error("Fetch Error")
    }
    return res.json() as Promise<T>
  }
  const { data, error, isLoading} = useSWR<T>(url,fetcher)
  return { data, error, isLoading}
}