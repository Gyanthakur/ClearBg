import React from "react";
import { assets } from "../assets/assets";
import {
	FacebookLogo,
	GithubLogo,
	InstagramLogo,
	LinkedinLogo,
	TwitterLogo,
	WhatsappLogo,
} from "phosphor-react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="flex items-center justify-between gap-4 px-4 lg:px-44 py-3">
			<img className="w-12" src={assets.logo_clear_Bg} alt="" />
			<p className="flex-1  border-l border-gray-400 pl-4 text-sm text-gray-500  max-sm:hidden "> Copyright @Clera BG | All right reserved.</p>
			<div className="flex gap-1">
				<Link to="https://www.facebook.com/profile.php?id=100026766931684" target="_blank">
					<span className="hover:text-blue-600">
						<FacebookLogo size={32}  className="hover:scale-105 transition-all duration-500" />
					</span>
				</Link>

				<Link to="https://x.com/gps_96169" target="_blank">
					<span className="hover:text-blue-400">
						<TwitterLogo size={32}   className="hover:scale-105 transition-all duration-500"/>
					</span>
				</Link>

				<Link to="https://www.linkedin.com/in/gyan-pratap-singh-275785236/" target="_blank">
					<span className="hover:text-blue-700">
						<LinkedinLogo size={32}  className="hover:scale-105 transition-all duration-500" />
					</span>
				</Link>

				<Link to="https://github.com/Gyanthakur" target="_blank">
					<span className="hover:text-gray-800">
						<GithubLogo size={32}  className="hover:scale-105 transition-all duration-500" />
					</span>
				</Link>

				<Link to="https://wa.me/918957818597?text=Hey%20%F0%9F%91%8B%2C%20how%20can%20I%20help%20you%3F" target="_blank">
					<span className="hover:text-green-500">
						<WhatsappLogo size={32}  className="hover:scale-105 transition-all duration-500" />
					</span>
				</Link>
				<Link to="https://www.instagram.com/gp.singh.ro.ckstar4438/" target="_blank">
					<span className="hover:text-pink-800 ">
						<InstagramLogo size={32}  className="hover:scale-105 transition-all duration-500" />
					</span>
				</Link>
			</div>
		</div>
	);
};

export default Footer;
