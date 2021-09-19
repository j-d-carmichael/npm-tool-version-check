import 'colors';
import inquirer from 'inquirer';
import wait from '@/wait';
import localVersionIsOk from '@/localVersionIsOk';
import getRemoteVersion from '@/getRemoteVersion';

export default (thisVersion: string, jsonUrlOrNPMPackageName: string, packageDisplayName: string): Promise<void> => {
  return new Promise<void>(async (resolve, reject) => {
    let remoteVersion;
    try {
      remoteVersion = await getRemoteVersion(jsonUrlOrNPMPackageName);
    } catch (e) {
      console.log('Could not check the remote version: ' + e.message);
      console.log(' ');
      return resolve();
    }
    if (localVersionIsOk(thisVersion, remoteVersion)) {
      const smiley = '    (ꙨပꙨ)   '.green.bold;
      console.log(smiley + 'This local version looks fresh and shiny, nice!'.green);
      return resolve();
    }

    const error = `WARNING: The version of ${packageDisplayName} you are running, ` + thisVersion.bold + ', is' + ' OUTDATED!'.bold;
    console.log(error.red);
    console.log('THERE IS A BETTER VERSION: '.red + remoteVersion.green.bold);

    if (process.env.npm_tool_version_check__quiet) {
      console.log('npm_tool_version_check__quiet is set: bypassing user interaction'.red.bold);
      return resolve();
    }

    const questions = [{
      type: 'confirm',
      name: 'installConfirm',
      message: 'Are you sure you want to continue with an outdated package? This will result in some serious technical dept in the future and prevent security updates arriving...'.red,
      default: false,
    }];
    const answers: any = await inquirer.prompt(questions);
    if (answers.installConfirm) {
      const smiley = '   :-| 😬😬   '.red.bold;
      console.log(smiley + 'Ok.. Continuing with the outdated version...'.red);
      await wait(1000);
      console.log(smiley + 'Best of luck...'.red);
      await wait(1000);
      resolve();
    } else {
      const smiley = '    (^‿^)    '.green.bold;
      console.log(smiley + 'Great choice! Update the package and be happy.'.green);
      reject();
    }
  });
};
