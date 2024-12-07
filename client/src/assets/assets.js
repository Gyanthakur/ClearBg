import logo from './logo.svg'
import logo_clear_Bg from './logo_BG.png'
import logo_icon from './logo_icon.svg'
import arrow_icon from './arrow_icon.svg'
import header_img from './header_img.png'
import remove_bg_icon from './remove_bg_icon.svg'
import upload_btn_icon from './upload_btn_icon.svg'
import upload_icon from './upload_icon.svg'
import download_icon from './download_icon.svg'
import image_w_bg from './image_w_bg.png'
import image_wo_bg from './image_wo_bg.png'
import facebook_icon from './facebook_icon.svg'
import google_plus_icon from './google_plus_icon.svg'
import twitter_icon from './twitter_icon.svg'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import credit_icon from './credit_icon.png'
import abhishek from './abhishek.JPG'
import shreyansh from './shreyansh.JPG'


export const assets = {
    logo,
    logo_clear_Bg,
    logo_icon,
    arrow_icon,
    header_img,
    remove_bg_icon,
    upload_icon,
    download_icon,
    image_w_bg,
    image_wo_bg,
    facebook_icon,
    google_plus_icon,
    twitter_icon,
    upload_btn_icon,
    credit_icon,
    abhishek,
    shreyansh
}

export const testimonialsData = [
    {
        id: 1,
        text: "I've been using bg.removal for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
        author: "Abhishek Sherma",
        image: abhishek,
        jobTitle:'Web Developer'
    },
    {
        id: 2,
        text: "I've been using bg.removal for nearly 6 months, I had a fantastic experience. The quality is top-notch. I recommend others to try this app.",
        author: "Shreyansh Dubey",
        image: shreyansh,
        jobTitle:'UI Deginer'
    },
];

export const plans = [
    {
      id: 'Basic',
      price: 2,
      credits: 10,
      desc: 'Best for personal use.'
    },
    {
      id: 'Advanced',
      price: 5,
      credits: 50,
      desc: 'Best for business use.'
    },
    {
      id: 'Business',
      price: 25,
      credits: 500,
      desc: 'Best for enterprise use.'
    },
  ]