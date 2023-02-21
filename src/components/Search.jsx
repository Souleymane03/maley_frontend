import React,{useState,useEffect} from "react";

import {MasonryLayout, Spinner} from "./index";
import {client} from "../client";
import {feedQuery,searchQuery} from "../utils/data";

const Search = ({searchTerm}) => {
    const [pins,setPins] = useState(null);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        if(searchTerm){
            setLoading(true);
            const query = searchQuery(searchTerm.toLocaleLowerCase());

            client.fetch(query)
                .then((data) => {
                    setPins(data);
                    setLoading(false);
                })
        }else {
            client.fetch(feedQuery)
                .then((data) => {
                    setPins(data);
                    setLoading(false);
                })
        }

    },[searchTerm])
    return (
        <div>
            {loading && <Spinner message="Searching for pins"/>}
            {pins?.length !== 0 && <MasonryLayout pins={pins}/>}
            {pins?.length === 0 && searchTerm !== '' && !loading &&  (
                <div className="mt-10 text-center text-xl w-3/5 md:w-full rounded-lg h-auto py-2 bg-red-200">
                    No pins found!
                </div>
            )}
        </div>
    )
}

export default Search;