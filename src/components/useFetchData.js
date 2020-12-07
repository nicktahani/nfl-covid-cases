import React, { useState, useEffect } from 'react'

export default function useFetchData (url, deserializer) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    fetch(url)
      .then(deserializer)
      .then(data => {
        setIsFetching(false)
        setData(data)
      })
      .catch(error => {
        setIsFetching(false)
        setError(error)
      })
  }, [url, deserializer])

  return { data, error, isFetching }

}

// useEffect(() => {
//   async function fetchData() {
//     try {
//       const res = await fetchFn(url)
//       if (!res.ok) {
//         throw Error(`Looks like there was a problem. Status Code: ${res.status}`)
//       }
//       const covidData = await res.json()
//       setIsLoading(false)
//       setErrors(false)
//       // console.log(covidData)
//       setData(covidData)
      
//     } catch (e) {
//       setIsLoading(false)
//       setErrors(e)
//       console.error(e)
//     }
//   }

//   fetchData()
// }, [location])