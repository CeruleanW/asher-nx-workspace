// Using test() on a regex with the "global" flag will keep a state in Regex, which is not expected https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test#using_test_on_a_regex_with_the_global_flag
const MAC_ADDRESS_REGEX =
  /^[0-9a-f]{1,2}([\.:-])(?:[0-9a-f]{1,2}\1){4}[0-9a-f]{1,2}$/im;

  /**
 * return false if not a valid MAC address
 */
export function checkIsValidMACAddress(mac: string): boolean {
  if (!mac) {
    return false;
  }
  return MAC_ADDRESS_REGEX?.test(mac);
}
