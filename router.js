import { homedir } from 'os';

import { writeCurrDirInfoMessage } from './src/utils/writeCurrDirInfoMessage.js';
import { moveUp } from './src/modules/navigation/move-up.js';
import { changeDir } from './src/modules/navigation/change-dir.js';
import { showDirContent } from './src/modules/navigation/show-dir-content.js';

let currDir = homedir();
const routes = {
  goUpper: 'up',
  exit: '.exit',
  changeDir: 'cd',
  showDirContent: 'ls',
};

export async function routerController(data) {
  const command = data.toString().slice(0, -2);
  const commandArgs = command.split(' ');
  const [commandType] = commandArgs;

  switch (commandType) {
    case routes.exit:
      process.exit(0);
    case routes.goUpper:
      currDir = await moveUp(currDir);
      break;
    case routes.changeDir:
      currDir = await changeDir(currDir, commandArgs[1]);
      break;
    case routes.showDirContent:
      await showDirContent(currDir);
      break;
    default:
      writeCurrDirInfoMessage(currDir);
      throw new Error('Invalid input');
  }
  writeCurrDirInfoMessage(currDir);
}
