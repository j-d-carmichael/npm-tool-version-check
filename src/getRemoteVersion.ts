import { IncomingMessage } from 'http';
import https from 'https';
import isHttpsUrl from '@/isHttpsUrl';
import { exec } from 'child_process';

/**
 * @param jsonUrlOrNPMPackageName - eg: 'https://raw.githubusercontent.com/johndcarmichael/npm-tool-version-check/master/package.json'
 */
export default (jsonUrlOrNPMPackageName: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!isHttpsUrl(jsonUrlOrNPMPackageName)) {
      console.log('Checking version from npm api');
      exec('npm show ' + jsonUrlOrNPMPackageName + ' time --json', function (err, out) {
        try {
          return resolve(
            Object.keys(
              JSON.parse(out)
            ).pop()
          );
        } catch (e) {
          console.error(e);
          reject(e);
        }
      });
    } else {
      const url = jsonUrlOrNPMPackageName + '?' + new Date().getTime();
      console.log('Checking version with npm-tool-version-check from URL: ' + url);
      https.get(url, (res: IncomingMessage) => {
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
    }
  });
};
