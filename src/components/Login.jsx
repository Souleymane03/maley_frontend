import React from "react";
import {useNavigate} from "react-router-dom";
import {FcGoogle} from "react-icons/fc";
import {GoogleLogin} from "@react-oauth/google";
import jwtDecode from "jwt-decode";


import shareVideo from "../assets/share.mp4"
import logo from "../assets/logowhite.png"
import {client} from "../client";


const Login = () => {

    const navigate = useNavigate();
    const responseGoogle = (response) => {
        const userObj = jwtDecode(response.credential);
        localStorage.setItem("User",JSON.stringify(userObj));
        console.log(userObj);
        const {email, sub,name,picture} = userObj;
        const doc = {
            _id:sub,
            _type:'user',
            userName:name,
            image:picture
        }

        client.createIfNotExists(doc)
            .then(() => {
                navigate('/',{replace:true});
            })

    }
    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <video
                    src={shareVideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className="w-full h-full object-cover"
                />
                <div
                    className="absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay">
                    <div className="p-5">
                        <img src={logo} alt="logo" width="130px"/>
                    </div>
                    <div className="shadow-2xl">
                        <GoogleLogin
                            render={(renderProps) => (
                                <button
                                    type="button"
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none">
                                    <FcGoogle className="mr-4"/> Sign In With Google
                                </button>
                            )}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy="single_host_origin"
                        />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Login;