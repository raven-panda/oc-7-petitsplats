export default class StringUtils {
  
  /**
   * Replace all special characters with html entities
   * @param {string} str String to process
   * @returns {string} The string with special chars converted to html entities 
   */
  static escapeHtml(str) {
    if (!str)
      return null;
    
    const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "`": "&#96;",
        "/": "&#x2F;"
    };

    return str.replace(/[&<>"`/]/g, char => entities[char]);
  }

  /**
   * Replace all special characters with html entities from array of strings
   * @param {string[]} arr Array of strings to process
   * @returns {string[]} Array of strings with special chars converted to html entities 
   */
  static escapeHtmlArray(arr) {
    return arr.map(str => this.escapeHtml(str));
  }

}