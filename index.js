import { argv, stdin, stdout } from 'process';
import { homedir } from 'os';

import { writeCurrDirInfoMessage } from './src/utils/writeCurrDirInfoMessage.js';
import { moveUp } from './src/modules/navigation/move-up.js';
import { changeDir } from './src/modules/navigation/change-dir.js';

const homeDir = homedir();
const userName = argv.slice(2)[0].slice(2);
const welcome = `Welcome to the File Manager, ${userName}! \n`;
const commands = {
  goUpper: 'up',
  exit: '.exit',
  changeDir: 'cd',
};

let currDir = homeDir;

stdout.write(welcome);
writeCurrDirInfoMessage(currDir);

stdin
  .on('data', async (data) => {
      const command = data.toString().slice(0, -2);
      
      if (command === commands.exit) {
        process.exit(0);
      }
      if (command === commands.goUpper) {
        currDir = await moveUp(currDir);
        writeCurrDirInfoMessage(currDir);
        return;
      }

      const commandArgs = command.split(' ');
      const [commandType] = commandArgs;

      switch (commandType) {
        case commands.changeDir:
          currDir = await changeDir(currDir, commandArgs[1]);
          writeCurrDirInfoMessage(currDir);
          break;
        default: 
          console.log('RandomCommand');
      }
  });

process
  .on('exit', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  })
  .on('uncaughtException', (err) => {
    console.error(err.message)
  })
  .on('SIGINT', () => {
    process.exit(0);
  });
