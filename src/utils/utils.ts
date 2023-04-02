import { Icon } from "@/types/types";

export const downloadSVG = (icon: Icon, size: "lg") => {
  const svgContent = icon.icon[size];
  const blob = new Blob([svgContent], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${icon.name}.svg`;
  link.click();

  URL.revokeObjectURL(url);
};
