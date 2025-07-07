const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center p-4 mt-auto">
      <div className="container mx-auto">
        <p className="text-lg">
          <a href="/tailor" className="hover:underline text-purple-400">
            Register As A Tailor
          </a>{" "}
          {/* | Contact Us */}
        </p>
        <p className="text-sm mt-2">SlayTech helps you slay in your own style</p>
      </div>
    </footer>
  );
};

export default Footer;
