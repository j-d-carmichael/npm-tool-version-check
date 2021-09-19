import getRemoteVersion from '@/getRemoteVersion';
import semver from 'semver';

it('should return a semver for a url', async () => {
  const out = await getRemoteVersion('https://raw.githubusercontent.com/johndcarmichael/npm-tool-version-check/master/package.json');
  expect(typeof out).toBe('string');
  expect(semver.valid(out)).not.toBe(null);
});

it('should return a semver for an npm package name', async () => {
  const out = await getRemoteVersion('npm-tool-version-check');
  expect(typeof out).toBe('string');
  expect(semver.valid(out)).not.toBe(null);
});