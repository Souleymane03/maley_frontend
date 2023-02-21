import React, {useState,useEffect} from "react";
import {AiOutlineLogout} from "react-icons/ai";
import {useParams,useNavigate } from "react-router-dom";
import {googleLogout} from "@react-oauth/google";

import {userCreatedPinsQuery,userQuery,userSavedPinsQuery} from "../utils/data";
import {client} from "../client";
import {MasonryLayout} from "./index";
import {Spinner} from "./index";

const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology'

const activeBtnStyle = "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyle = "bg-primary mr-4 text-black text-back font-bold p-2 rounded-full w-20 outline-none"
const UserProfile = () => {
    const [user,setUser] = useState(null);
    const [pins,setPins] = useState(null);
    const [text,setText] = useState('Created');
    const [activeBtn,setActiveBtn] = useState('created');
    const navigate = useNavigate();
    const {userId} = useParams();

    const logout = () => {
        googleLogout();
        localStorage.clear();
        navigate('/login');
    }

    useEffect(() => {
        const query = userQuery(userId);

        client.fetch(query)
            .then((data) => {
                setUser(data[0])
            });

    },[userId]);

    useEffect(() => {
        if(text === 'Created'){
            const createdPinQuery = userCreatedPinsQuery(userId);

            client.fetch(createdPinQuery)
                .then((data) => {
                    setPins(data)
                });
        }else {
            const savedPinQuery = userSavedPinsQuery(userId);

            client.fetch(savedPinQuery)
                .then((data) => {
                    setPins(data);
                });
        }

    },[text,userId]);

    if(!user)
        return <Spinner message="Loading profile..."/>
    return (
        <div className="relative pb-2 h-full  justify-center items-center">
            <div className="flex flex-col pb-5">
                <div className="relative flex flex-col mb-7">
                    <div className="flex flex-col justify-center items-center">
                        <img
                            src={randomImage}
                            alt="banner-pic"
                            className="w-full h-370 xl:h-510 shadow-lg object-cover"
                        />
                        <img
                            src={user.image}
                            alt=""
                            className="rounded-full w-30 h-30 -mt-10 shadow-xl object-cover"
                        />
                        <h1 className="font-bold text-3xl text-center mt-3">
                            {user.userName}
                        </h1>
                        <div className="absolute top-0 z-1 right-0 p-2">
                            {userId === user._id && (
                                <button
                                    type="button"
                                    onClick={logout}
                                    className="bg-mainColor flex justify-center items-center p-3 rounded-full cursor-pointer outline-none">
                                    <AiOutlineLogout/>
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="text-center mb-7">
                        <button
                            className={`${activeBtn === 'created' ? activeBtnStyle:  notActiveBtnStyle}`}
                            type="button"
                            onClick={(e) => {
                            setText(e.currentTarget.textContent);
                            setActiveBtn('created');
                            }}
                        >
                            Created
                        </button>
                        <button
                            className={`${activeBtn === 'saved' ? activeBtnStyle:  notActiveBtnStyle}`}
                            type="button"
                            onClick={(e) => {
                                setText(e.currentTarget.textContent);
                                setActiveBtn('saved');
                            }}
                        >
                            Saved
                        </button>
                    </div>
                    {pins?.length > 0 ? (
                        <div className="px-2">
                            <MasonryLayout pins={pins}/>
                        </div>
                    ):
                        (
                            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">No Pins Found!</div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default UserProfile;