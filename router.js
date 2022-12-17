import { homedir } from 'os';

import { writeCurrDirInfoMessage } from './src/utils/writeCurrDirInfoMessage.js';
import { moveUp } from './src/modules/navigation/move-up.js';
import { changeDir } from './src/modules/navigation/change-dir.js';
import { showDirContent } from './src/modules/navigation/show-dir-content.js';
import { handleOsRequest } from './src/modules/os/os-router.js';
import { calculateHash } from './src/modules/hash/calculateHash.js';
import { readFileContent } from './src/modules/file-operations/read-file-content.js';
import { createFile } from './src/modules/file-operations/create-file.js';
import { renameFile } from './src/modules/file-operations/rename-file.js';
import { copyFile } from './src/modules/file-operations/copy-file.js';
import { removeFile } from './src/modules/file-operations/remove-file.js';
import { moveFile } from './src/modules/file-operations/move-file.js';

let currDir = homedir();
const routes = {
  goUpper: 'up',
  exit: '.exit',
  changeDir: 'cd',
  showDirContent: 'ls',
  showOsInfo: 'os',
  calculateHash: 'hash',
  readFile: 'cat',
  createFile: 'add',
  renameFile: 'rn',
  copyFile: 'cp',
  removeFile: 'rm',
  moveFile: 'mv',
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
    case routes.showOsInfo:
      handleOsRequest(commandArgs[1]);
      break;
    case routes.calculateHash:
      await calculateHash(currDir, commandArgs[1]);
      break;
    case routes.readFile:
      await readFileContent(currDir, commandArgs[1]);
      break;
    case routes.createFile:
      await createFile(currDir, commandArgs[1]);
      break;
    case routes.renameFile:
      await renameFile(currDir, commandArgs[1], commandArgs[2]);
      break;
    case routes.copyFile:
      await copyFile(currDir, commandArgs[1], commandArgs[2]);
      break;
    case routes.removeFile:
      await removeFile(currDir, commandArgs[1]);
      break;
    case routes.moveFile:
      await moveFile(currDir, commandArgs[1], commandArgs[2]);
      break;
    default:
      writeCurrDirInfoMessage(currDir);
      throw new Error('Invalid input');
  }
  writeCurrDirInfoMessage(currDir);
}
