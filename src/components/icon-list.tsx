import { useTheme } from "@/context/ThemeContext";
import { iconsData } from "@/data/icons";
import { Icon } from "@/types/types";
import {
  downloadSVG,
  filterIconsByCategory,
  filterIconsBySearchTerm,
  getUniqueCategories,
} from "@/utils/utils";
import { animate, stagger } from "motion";
import { useEffect, useState } from "react";

const IconList = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [icons, setIcons] = useState<Icon[]>(iconsData);
  const [selectedTerm, setSelectedTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const allCategories = getUniqueCategories(iconsData);

  useEffect(() => {
    let filteredIcons = iconsData;

    if (selectedCategory !== "") {
      filteredIcons = filterIconsByCategory(filteredIcons, selectedCategory);
    }

    if (selectedTerm !== "") {
      filteredIcons = filterIconsBySearchTerm(filteredIcons, selectedTerm);
    }

    setIcons(filteredIcons);

    const li = document.querySelectorAll("li");
    if (!li[0]) return;

    animate(
      li,
      { opacity: [0, 1], scale: [0, 1] },
      { delay: stagger(0.1), easing: "ease-in-out" }
    );
  }, [selectedTerm, selectedCategory]);

  const searchTerm = (event: any) => {
    setSelectedTerm(event.target.value);
  };

  return (
    <div className="list-shadow px-8 pt-12 pb-24 rounded-[40px] mb-24">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-16 ">
        <input
          className="ml-2 pl-2 h-[42px] rounded-md bee-blue-border md:w-[460px]"
          type="text"
          name="search"
          defaultValue={selectedTerm}
          onKeyUp={searchTerm}
          placeholder="Search Icon Here"
        />
        <div className="flex items-center">
          <label htmlFor="category-select">Category:</label>
          <select
            className="ml-2 h-[42px] appearance-none outline-none bg-transparent"
            name="category"
            id="category-select"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="all">all</option>
            {allCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ul className="flex flex-wrap items-start gap-8 md:gap-x-24 md:min-h-[220px]">
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
              className={`{${isDark} ? "bee-blue : "text-white"} text-xs cursor-pointer font-medium`}
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
