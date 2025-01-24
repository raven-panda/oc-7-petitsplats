export default class StringUtils {
  
  /**
   * Replace all special characters with html entities
   * @param {string} str String to process
   * @returns The string with special chars converted to html entities 
   */
  static escapeHtml(str) {
    if (!str)
      return null;
    
    const entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '`': '&#96;',
        '/': '&#x2F;'
    };

    return str.replace(/[&<>"'`/]/g, char => entities[char]);
  }

}