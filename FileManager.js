import os from 'os';
import { Message } from './Message.js';
import { NavigationComponent } from './components/Navigation.js';
import { OsComponent } from './components/Os.js';
import { FileComponent } from './components/File.js';
import { HashComponent } from './components/Hash.js';
import { ZipComponent } from './components/Zip.js';

class FileManager {
  constructor() {
    this.username = process.argv[2].split('=')[1];

    this.navigationComponent = new NavigationComponent(os.homedir());
    this.osComponent = new OsComponent();
    this.fileComponent = new FileComponent();
    this.hashComponent = new HashComponent();
    this.zipComponent = new ZipComponent();

    Message.welcome(this.username);
    Message.currentPath(this.navigationComponent.path);

    process.stdin.on('data', (data) => {
      const string = data.toString().trim();
      this.execute(string);
    });

    process.on('exit', () => {
      Message.exit(this.username);
    });

    process.on('SIGINT', () => {
      process.exit();
    });

    this.commands = {
      up: (...args) => this.navigationComponent.up(),
      cd: (...args) => this.navigationComponent.cd(args[0]),
      ls: (...args) => this.navigationComponent.ls(),

      cat: (...args) => this.fileComponent.cat(this.navigationComponent.resolvePath(args[0])),
      add: (...args) => this.fileComponent.add(this.navigationComponent.resolvePath(args[0])),
      rn: (...args) =>
        this.fileComponent.rn(
          this.navigationComponent.resolvePath(args[0]),
          this.navigationComponent.resolvePath(args[1]),
        ),
      cp: (...args) =>
        this.fileComponent.cp(
          this.navigationComponent.resolvePath(args[0]),
          this.navigationComponent.resolvePath(args[1]),
        ),
      mv: (...args) =>
        this.fileComponent.mv(
          this.navigationComponent.resolvePath(args[0]),
          this.navigationComponent.resolvePath(args[1]),
        ),
      rm: (...args) => this.fileComponent.rm(this.navigationComponent.resolvePath(args[0])),

      os: (...args) => this.osComponent.os(args[0]),
      hash: (...args) => this.hashComponent.hash(this.navigationComponent.resolvePath(args[0])),

      compress: (...args) =>
        this.zipComponent.compress(
          this.navigationComponent.resolvePath(args[0]),
          this.navigationComponent.resolvePath(args[1]),
        ),
      decompress: (...args) =>
        this.zipComponent.decompress(
          this.navigationComponent.resolvePath(args[0]),
          this.navigationComponent.resolvePath(args[1]),
        ),
      '.exit': () => this.exit(),
    };
  }

  execute(line) {
    const command = line.split(' ')[0];
    const args = line.split(' ').slice(1);

    if (Object.keys(this.commands).includes(command)) {
      this.commands[command](...args);
    } else {
      Message.invalidInput();
    }
  }

  exit() {
    process.exit();
  }
}

export { FileManager };
