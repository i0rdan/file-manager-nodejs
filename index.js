import { argv, stdin, stdout } from 'process';

const exitCommand = '.exit';
const userName = argv.slice(2)[0].slice(2);
const welcome = `Welcome to the File Manager, ${userName}! \n`;

stdout.write(welcome);

stdin
  .on('data', (data) => {
      const command = data.toString();
      
      if (command.startsWith(exitCommand)) {
        process.exit(0);
      }

      const [commandType] = command.split(' ');

      switch (commandType) {
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
