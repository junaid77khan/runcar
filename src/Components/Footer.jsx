const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-10 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        
        {/* Left Section */}
        <div>
          <div className="flex justify-center md:justify-start items-center gap-2">
            <img 
              src="./logo.jpg" 
              alt="Logo" 
              className="max-w-[50px] sm:max-w-[50px] h-auto object-contain" 
            />
          </div>
          <p className="text-gray-400 mt-2">
            Run Car is your reliable intercity cab booking service, designed for smooth and comfortable travel between cities. 
            Whether you're commuting for business or leisure, we offer affordable fares, well-maintained vehicles, and punctual 
            departures to ensure a hassle-free journey.
          </p>

        </div>

        {/* Services */}
        <div>
          <h3 className="text-yellow-500 font-semibold">About Run Car</h3>
          <ul className="text-gray-400 mt-2 space-y-2">
            <li><a target="_blank" href="about">About Us</a></li>
            <li><a target="_blank" href="contact">Contact Us</a></li>
            <li><a href="offers">Offers</a></li>
            <li><a href="faqs">Faqs</a></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-yellow-500 font-semibold">Customer Support</h3>
          <p className="text-gray-400 mt-2">Need help? Contact us anytime!</p>
          <p className="mt-1">📞 <span className="text-yellow-500">+91 98765 43210</span></p>
          <p className="mt-1">📧 <span className="text-yellow-500">support@runcar.com</span></p>
          <button className="bg-yellow-500 text-black px-4 py-2 mt-2 rounded w-full">
            Need Help?
          </button>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-700 pt-4 text-center text-gray-400">
        © {new Date().getFullYear()} Run Car. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
