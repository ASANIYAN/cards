import axios from "axios";
import { useEffect, useState } from "react";


const FetchCardInfo = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);


    const controller = new AbortController();

    const api = axios.create({
        baseURL: url
    })


    useEffect(() => {
        api.get('/', {
          signal: controller.signal
       })
        .then(res => {
          setData(res.data)
          setIsPending(false);
          setError(null);
        })
         .catch(function (error) {
           if (error.response) {
        //     // The request was made and the server responded with a status code
             // that falls out of the range of 2xx
            //  console.log(error.response.data);
            //  console.log(error.response.status);
            //  console.log(error.response.headers);
           } else if (error.request) {
             // The request was made but no response was received
             // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
             // http.ClientRequest in node.js
            //  console.log(error.request);
           } else {
             // Something happened in setting up the request that triggered an Error
            //  console.log('Error', error.message);
           }
           //console.log(error.config);
           setError(error.message);
         })
         return () => controller.abort();
      }, [url] )


    return { data, isPending, error }
}

export default FetchCardInfo;