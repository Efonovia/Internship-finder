export function shortenText(len, text) {
    return text.length <= len ? text : text.slice(0, len-3)+"..."  
}