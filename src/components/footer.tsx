const Footer = () => {
  return (
    <footer className="bg-[var(--bee-black)] bee-white py-2">
      <div className="flex flex-col gap-4 md:flex-row justify-between items-center container">
        <div>
          Made with <span className="bee-blue">❤</span> from Germany.
        </div>

        <a
          target="_blank"
          rel="nofollow noopener"
          href="https://github.com/manuelsanchezweb/bee-icons"
          title="BeeIcons on GitHub"
        >
          BeeIcons 2023 © All rights reserved.
        </a>
      </div>
    </footer>
  );
};

export default Footer;
