import { useEffect, useState } from "react"
import appConfig from "../config"
import { get, post } from "./fetchHelper"

export const url = appConfig.onProduction ? appConfig.backendUrlProduction : appConfig.backendUrl
const useFetch = (url: string, options?: any) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  // const [error, setError] = useState(null)
  useEffect(() => {
    const fetchGet = async (endpoint: string, options?: any) => {
      const res = await get(endpoint, options)
      setData(res)
      setLoading(false)
    }
    fetchGet(url, options)
  }, [url, options])
  return { data, loading }
}

const useReFetch = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const reFetch = async (endpoint: string, options?: any) => {
    setLoading(true)
    const res = await get(endpoint, options)
    !res.ok
      ? setError(res)
      : setData(res)
    setLoading(false)
  }
  return { data, loading, error, reFetch }
}

const useFetchPost = () => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [options, Post] = useState({ url: ``, body: {} })
  useEffect(() => {
    if (!options.url) return;
    const doPost = async () => {
      setLoading(true)
      const res = await post(options.url, { body: options.body })
      res.status === "ok"
        ? setData(res)
        : setError(res)
      setLoading(false)
    }
    doPost()
  }, [options])
  return { data, setData, loading, error, Post }
}

const useFetchPut = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const put = async (endpoint: string, options?: any) => {
    setLoading(true)
    const res = await get(endpoint, options)
    !res.ok
      ? setError(res)
      : setData(res)
    setLoading(false)
  }
  return { data, loading, error, put }
}

const useFetchDelete = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchDelete = async (endpoint: string, options?: any) => {
    setLoading(true)
    const res = await get(endpoint, options)
    !res.ok
      ? setError(res)
      : setData(res)
    setLoading(false)
  }
  return { data, loading, error, fetchDelete }
}

export default useFetch

export { useReFetch, useFetchDelete, useFetchPost, useFetchPut }
