export default class SvgDOM {

  static crossSvg() {
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute("width", 17)
    svgElement.setAttribute("height", 17);
    svgElement.setAttribute("viewBox", "0 0 17 17");
    svgElement.classList.add("d-block");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M15 15L8.5 8.5M8.5 8.5L2 2M8.5 8.5L15 2M8.5 8.5L2 15");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "2.16667");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");

    svgElement.appendChild(path);
    return svgElement;
  }

}