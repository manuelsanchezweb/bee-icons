const Footer = () => {
  return (
    <footer className="bg-[var(--bee-black)] bee-white py-2">
      <div className="flex flex-col items-center md:items-end gap-4 container">
        <div className="flex flex-col gap-4 md:flex-row w-full justify-between items-center ">
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

        <a
          className="flex sm:hover:scale-105 sm:focus:scale-105 transition-all"
          target="_blank"
          rel="noopener noreferrer"
          title="Check conditions of use"
          href="https://github.com/manuelsanchezweb/bee-icons/blob/main/LICENSE"
        >
          MIT License
        </a>
      </div>
    </footer>
  )
}

export default Footer
