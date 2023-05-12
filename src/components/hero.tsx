import IconsHero from '@/assets/icons/icons-hero'

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:justify-between items-center text-center lg:text-left my-16">
      <div className="flex flex-col gap-6 max-w-[700px]">
        <h1 className="font-black text-3xl md:text-5xl lg:text-7xl md:!leading-tight">
          <span className="bee-blue">Buzzworthy </span> Designs for the Digital
          Hive.
        </h1>
        <p className="font-medium text-xl lg:max-w-[550px]">
          Infuse your web and app projects with our vibrant, open source SVG{' '}
          <a
            target="_blank"
            rel="nofollow noopener"
            className="bee-blue"
            href="https://github.com/manuelsanchezweb/bee-icons"
          >
            icon library
          </a>
          , inspired by nature's hardest workers, and sweeten your digital
          creations.
        </p>
      </div>
      <IconsHero classIcon="min-w-[250px] w-[250px] md:w-auto" />
    </div>
  )
}

export default Hero
