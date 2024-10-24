import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import {AppContext} from '../context/AppContext'
const Navbar = () => {
    const navigate = useNavigate();
	const {openSignIn} = useClerk();
	const {isSignedIn, user} = useUser()


	useEffect(()=>{
		if(isSignedIn){
			loadCreditsdata();
		}
	},[isSignedIn])

	const {credit ,loadCreditsdata,} = useContext(AppContext)
	return (
		<div className="flex items-center justify-between mx-4 py-3 lg:mx-44">
			<Link to="/"><img className="w-12 sm:w-14" src={assets.logo_clear_Bg} alt="" /></Link>
			{
				isSignedIn 
				? <div className="flex items-center gap-2 sm:gap-3">
					<button onClick={()=>navigate('/buy')} className="flex items-center gap-2 bg-blue-200 px-4 sm:px-4 py-1.5 sm:py-2.5 rounded-full hover:scale-105 transition-all duration-700">
						<img className="w-5" src={assets.credit_icon} alt="" />
						<p className="text-xs sm:text-sm font-medium text-gray-600">Credits : {credit}</p>
					</button>
					<p className="text-gray-600 max-sm:hidden">Hi, {user.fullName}</p>
					<UserButton/>
				</div>
					:<button onClick={()=>openSignIn({})} className="bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full">
						Get Started <img className="w-3 sm:w-4" src={assets.arrow_icon} alt="" />{" "}
					</button>
			}
		</div>
	);
};

export default Navbar;
