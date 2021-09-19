import { IncomingMessage } from 'http';
import https from 'https';

/**
 * @param thisVersion - SEMVER to check against
 * @param jsonUrl - eg: 'https://raw.githubusercontent.com/johndcarmichael/npm-tool-version-check/master/package.json'
 */
export default (thisVersion: string, jsonUrl: string): Promise<string> => {
  console.log('Checking version with npm-tool-version-check from: ' + jsonUrl);
  return new Promise((resolve, reject) => {
    https.get(jsonUrl + '?' + new Date().getTime(), (res: IncomingMessage) => {
      let a = '';
      res.on('data', (d) => {
        a += d.toString();
      });
      res.on('close', () => {
        resolve((JSON.parse(a)).version);
      });
    }).on('error', (e: Error) => {
      return reject(e);
    });
  });
};
