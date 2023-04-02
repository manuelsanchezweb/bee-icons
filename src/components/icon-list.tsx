import { iconsData } from "@/data/icons";
import { Icon } from "@/types/types";
import { downloadSVG } from "@/utils/utils";
import { animate, stagger } from "motion";
import { useEffect, useState } from "react";

const IconList = () => {
  const [icons, setIcons] = useState<Icon[]>(iconsData);
  const [selectedTerm, setSelectedTerm] = useState<string>("");

  function filterIconsBySearchTerm(icons: Icon[], term: string) {
    const isInCategory = (icon: Icon) =>
      icon.category?.toLowerCase().includes(term.toLowerCase().trim());
    const isInTags = (icon: Icon) =>
      icon.tags?.some((tag) => tag.toLowerCase().includes(selectedTerm));

    return icons.filter((icon) => isInCategory(icon) || isInTags(icon));
  }

  useEffect(() => {
    let filteredIcons =
      selectedTerm === ""
        ? iconsData
        : filterIconsBySearchTerm(icons, selectedTerm);
    setIcons(filteredIcons);

    const li = document.querySelectorAll("li");
    if (!li[0]) return;

    animate(
      li,
      { opacity: [0, 1], scale: [0, 1] },
      { delay: stagger(0.1), easing: "ease-in-out" }
    );
  }, [selectedTerm]);

  const searchTerm = (event: any) => {
    setSelectedTerm(event.target.value);
  };

  return (
    <div className="list-shadow px-8 pt-12 pb-24 rounded-[40px] mb-24">
      <input
        className="ml-2 pl-2 h-[42px] rounded-md mb-16 bee-blue-border md:w-[460px]"
        type="text"
        name="search"
        defaultValue={selectedTerm}
        onKeyUp={searchTerm}
        placeholder="Search Icon Here"
      />

      <ul className="flex flex-wrap justify-center sm:justify-start items-start gap-8 md:gap-x-24 md:min-h-[220px]">
        {icons.map((icon, index) => (
          <li
            key={index}
            className="flex flex-col items-center justify-center text-center gap-2"
          >
            <button
              onClick={() => downloadSVG(icon, "lg")}
              className="hexa-shape hexa-shadow bg-gray-100 flex flex-col items-center justify-center min-w-[72px] w-[72px] min-h-[64px] transition-all hover:scale-110 focus:scale-110 focus:outline-none hover:bg-[var(--bee-blue)]"
            >
              <div dangerouslySetInnerHTML={{ __html: icon.icon.lg }} />
            </button>
            <span
              onClick={() => downloadSVG(icon, "lg")}
              className="bee-blue text-xs cursor-pointer font-medium"
            >
              {icon.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IconList;
