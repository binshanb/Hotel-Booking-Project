import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'

export const Footer=()=> {
  return (
    // <div className="py-4 bg-blue-700 mt-auto">
    // <div className="container-fluid px-4">
    //   <div className="flex align-items-center justify-content-between">
    //     <div className="text-white">Copyright &copy; Stay-On</div>
    //     <div>
    //       <a href="#" className="text-white mx-2">Privacy Policy</a>
    //       <a href="#" className="text-white mx-2">Terms &amp; Conditions</a>
    //     </div>
    //   </div>
    <div className="bg-gray-900 text-white p-8">
    <div className="sb_footer_padding grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Section 1: For Business */}
      <div className="sb_footer-links_div">
        <h4 className="text-xl font-semibold mb-4">Explore Our Hotel</h4>
        <a href="/rooms" className="block text-gray-300 hover:text-white mb-2">Rooms & Suites</a>
        <a href="#" className="block text-gray-300 hover:text-white mb-2">Dining Options</a>
        <a href="/services" className="block text-gray-300 hover:text-white mb-2">Amenities</a>
      </div>
  
      {/* Section 2: Resource Center */}
      <div className="sb_footer-links_div">
        <h4 className="text-xl font-semibold mb-4">Resource Center</h4>
        <a href="#" className="block text-gray-300 hover:text-white mb-2">Testimonials</a>
        <a href="#" className="block text-gray-300 hover:text-white mb-2">Individual</a>
      </div>
  
      {/* Section 3: Partners */}
      <div className="sb_footer-links_div">
        <h4 className="text-xl font-semibold mb-4">Partners</h4>
        <a href="#" className="block text-gray-300 hover:text-white mb-2">Sea Mark</a>
      </div>
  
      {/* Section 4: Company */}
      <div className="sb_footer-links_div">
        <h4 className="text-xl font-semibold mb-4">Hotel</h4>
        <a href="/about" className="block text-gray-300 hover:text-white mb-2">About</a>
       
        <a href="/contact" className="block text-gray-300 hover:text-white mb-2">Contact</a>
      </div>
  
     </div>
    
 
        <hr></hr>
        <div className="sb_footer-below sb_footer_padding flex flex-col lg:flex-row justify-center items-center text-center lg:text-left">
  {/* Section 1: Social Media (Left) */}
  <div className="sb_footer-links_div lg:mr-auto mb-4">
    <h4 className="text-xl font-semibold mb-2 lg:mb-4">Social Media Links</h4>
    <div className="socialmedia flex space-x-4">
    <a href="https://www.facebook.com/your-facebook-page" target="_blank" rel="noopener noreferrer">
    <BsFacebook size={24} className="text-blue-700" />
    </a>
    <a href="https://twitter.com/your-twitter-account" target="_blank" rel="noopener noreferrer">
      <BsTwitter size={24} className="text-blue-700" />
      </a>
      <a href="https://www.linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer">
      <BsLinkedin size={24} className="text-blue-700" />
      </a>
      <a href="https://www.instagram.com/your-instagram-account" target="_blank" rel="noopener noreferrer">
      <BsInstagram size={24} className="text-blue-700" />
      </a>
    </div>
  </div>

  {/* Section 2: Copyright (Center) */}
  <div className="sb_footer-links_div mb-4 lg:mb-0 flex justify-center items-center w-full">
    <div className="sb_footer-copyright text-center">
      <p>&#169; {new Date().getFullYear()} Luxury Hotel. All rights reserved.</p>
    </div>
  </div>

  {/* Section 3: Below Links (Right) */}
  <div className="sb_footer-below-links lg:flex-col space-y-4 lg:w-2/5">
    <a href="#"><p>Terms and Conditions</p></a>
    <a href="#"><p>Privacy</p></a>
    <a href="#"><p>Security</p></a>
   
  </div>
</div>

  </div>
 
  );
}

export default Footer;