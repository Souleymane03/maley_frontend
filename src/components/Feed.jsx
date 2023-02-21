import React, {useState,useEffect} from "react";
import {useParams} from "react-router-dom";

import {client} from "../client";
import {MasonryLayout,Spinner} from "../components";
import {feedQuery, searchQuery} from "../utils/data";

const Feed = () => {

    const [loading,setLoading] = useState(false);
    const [pins,setPins] = useState([])
    const {categoryId} = useParams();

    useEffect(() => {
        setLoading(true);
        if(categoryId){
            const query = searchQuery(categoryId);
            client.fetch(query)
                .then((data) => {
                    setPins(data);
                    setLoading(false);

                })
        }else{
            client.fetch(feedQuery)
                .then((data) => {
                    setLoading(false);
                    setPins(data);
                })
        }
    },[categoryId]);

    if(loading) return <Spinner message="We are adding new ideas to yours feed!"/>
    if(pins?.length === 0) return <h2 className="w-3/5 md:w-full rounded-lg h-auto py-2 bg-red-200 text-xl  text-center">No pins available</h2>
    return (
        <div>
            {pins && <MasonryLayout pins={pins}/>}
        </div>
    )
}

export default Feed;