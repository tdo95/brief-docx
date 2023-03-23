/**
 * Checks if a string is a valid HTTP URL
 * 
 * @param string
 * @see https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
 */
export function isValidHttpUrl(string) {
    let url 
    try {
        url = new URL(string)
    } catch (err) {
        return false
    }
    return url.protocol === 'http:' || url.protocol === 'https:'
}