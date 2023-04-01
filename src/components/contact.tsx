import IconBeeColor from "@/assets/icons/icon-bee-color";

const Contact = () => {
  return (
    <div className="flex flex-col items-center text-center lg:text-left lg:flex-row md:justify-between gap-6 mb-16">
      <div className="flex flex-col items-center lg:items-start">
        <h2 className="font-bold text-4xl max-w-[475px]">
          Have a question or just want to buzz{" "}
          <span className="bee-blue font-black">about icons? </span>
        </h2>
        <IconBeeColor />
      </div>
      <div className="flex flex-col gap-6 mx-auto items-center text-center lg:text-left lg:items-start">
        <p className="font-medium text-xl lg:max-w-[450px]">
          Drop us a message and we'll get back to you as sweet as honey!
        </p>
        <a
          className="btn"
          title="Contact us"
          target="_blank"
          rel="nofollow noopener"
          href="https://github.com/manuelsanchezweb/bee-icons/issues/new"
        >
          Let's Bee in Touch!
        </a>
      </div>
    </div>
  );
};

export default Contact;
