import { checkIsValidMACAddress } from './checker';

describe('checkIsValidMACAddress should return if input is a valid MAC address', () => {
  const validZeros = '00:00:00:00:00:00';
  const invalidZeros = '00:00:00:00:00:00:00';
  const validLower = '00:00:5e:00:53:af';
  const validUpper = '01:00:5E:00:00:00';
  const short = '01:00:5E:7F:FF';
  const long = '01:00:5E:7F:FF:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF';
  const invalidChars = '00:00:5e:00:53:GG';

  const valid_mac_01 = '78:21:84:75:E0:32'

  it('Valid MAC address should return true', () => {
    expect(checkIsValidMACAddress(validZeros)).toBeTruthy();
    expect(checkIsValidMACAddress(validLower)).toBeTruthy();
    expect(checkIsValidMACAddress(validUpper)).toBeTruthy();
    expect(checkIsValidMACAddress(valid_mac_01)).toBeTruthy();
  });

  it('Invalid MAC address should return false', () => {
    expect(checkIsValidMACAddress(invalidZeros)).toBeFalsy();
    expect(checkIsValidMACAddress(short)).toBeFalsy();
    expect(checkIsValidMACAddress(long)).toBeFalsy();
    expect(checkIsValidMACAddress(invalidChars)).toBeFalsy();
  });
});
