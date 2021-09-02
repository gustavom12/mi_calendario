import { useEffect, useState } from "react";
function useWindowOffset (){
  const [windowOffset, setWindowOffset] = useState({count: 0})

  useEffect(()=>{
    const handleScroll = ()=>{
      setWindowOffset({count: window.pageYOffset})
    }
    window.addEventListener('scroll', handleScroll);
    //remove scroll event
    return ()=>{
      window.removeEventListener('scroll', handleScroll)
    }
  },[])

  return ( windowOffset.count )
}
export default useWindowOffset
