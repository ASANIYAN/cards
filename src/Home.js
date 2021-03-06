import { useEffect, useState } from "react";

const Home = () => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch('https://asaniyan.github.io/jsonapi/db.json', {signal: abortCont.signal })
        .then(res => {
            return res.json();
        })
        .then(data => {
            setData(data.allGiftCards);
            setIsPending(false);
            setError(null);
            //console.log(data.allGiftCards);
        }).catch(err => {
          if (err.name === 'AbortError') {
              console.log('fetch aborted');
          } else {
            setIsPending(false);
            setError(err.message);
          }
      })
        return () => abortCont.abort();

    }, [])



    return (
        <div className="container mx-auto w-full h-full">
            <div className="grid grid-cols-4 gap-4 content-hold">
                { isPending && <div> Loading... </div> }
                { error && <div> {error.message} </div> }
                { data && data.map((each) => (

                    <div className="card mt-7 mx-auto" key={each.id} style={{height: '25rem', width:'15rem'}}>
                        <div className="container" key={each.id}>
                            <h1 className="text-3xl pt-3" key={each.id}>
                                {each.title}
                            </h1>
                            <p className="text-xl pt-2"> Currencies: </p>
                            <div className="grid grid-cols-4 gap-2 currencies">
                                {each.currencies.map((currency) => (
                                    <p key={currency}>
                                        {currency}
                                    </p>
                                    ))}
                            </div>


                        </div>
                    </div>
                )) }


            </div>

        </div>
    );
}

export default Home;