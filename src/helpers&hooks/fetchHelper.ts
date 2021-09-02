const customFetch = (url:string, options:any)=>{
  const defaultHeader = {
    Accept: "application/json"
  }
  const controller = new AbortController();
  options.signal = controller.signal;
  options.method = options.method || "GET";
  // Mix between headers and default headers
  options.headers = options.headers ? {...defaultHeader, ...options.headers} : defaultHeader
  //if body, it automatically stringifies it
  options.body = JSON.stringify(options.body) || false
  //if not body, delete it
  if(!options.body) delete options.body
  //if after 4 seg, backends didn't send any response, abort fetch
  return fetch(url, options)
    .then(res=>
            res.json()
      )
    .catch(err=>{
      console.warn({err})
      return err
    })
}

const get = (url: string, options:any = {}) => customFetch(url,options)
const post = (url: string, options:any = {}) => {
  options.method = "POST"
  return customFetch(url,options)
}
const put = (url: string, options:any = {}) => {
  options.method = "PUT"
  return customFetch(url,options)
}
const del = (url: string, options:any = {}) => {
  options.method = "DELETE"
  return customFetch(url,options)
}
export {get, post, put, del}
