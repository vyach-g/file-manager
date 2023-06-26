import os from 'os';
import { Message } from './Message.js';
import { NavigationComponent } from './Navigation.js';
import { OsComponent } from './Os.js';
import { FileComponent } from './File.js';
import { HashComponent } from './Hash.js';
import { ZipComponent } from './Zip.js';

class FileManager {
  constructor() {
    this.username = process.argv?.[2]?.split('=')?.[1] || 'Anon';

    this.navComponent = new NavigationComponent(os.homedir());
    this.osComponent = new OsComponent();
    this.fileComponent = new FileComponent();
    this.hashComponent = new HashComponent();
    this.zipComponent = new ZipComponent();

    Message.welcome(this.username);
    Message.currentPath(this.navComponent.path);

    process.stdin.on('data', (data) => {
      const line = data.toString().trim().split(' ');
      this.execute(...line);
    });

    process.on('exit', () => {
      Message.exit(this.username);
    });

    process.on('SIGINT', () => {
      process.exit();
    });

    this.commands = {
      up: () => {
        this.navComponent.up();
      },
      cd: async (...args) => {
        const addPath = args[0];
        await this.navComponent.cd(addPath);
      },
      ls: async () => {
        await this.navComponent.ls();
      },
      cat: async (...args) => {
        const filePath = this.navComponent.resolvePath(args[0]);
        await this.fileComponent.cat(filePath);
      },
      add: async (...args) => {
        const filePath = this.navComponent.resolvePath(args[0]);
        await this.fileComponent.add(filePath);
      },
      rn: async (...args) => {
        const srcFilePath = this.navComponent.resolvePath(args[0]);
        const destFilePath = this.navComponent.replaceName(srcFilePath, args[1]);
        await this.fileComponent.rn(srcFilePath, destFilePath);
      },
      cp: async (...args) => {
        const srcFilePath = this.navComponent.resolvePath(args[0]);
        const destFilePath = this.navComponent.addFilename(srcFilePath, args[1]);
        await this.fileComponent.cp(srcFilePath, destFilePath);
      },
      mv: async (...args) => {
        const srcFilePath = this.navComponent.resolvePath(args[0]);
        const destFilePath = this.navComponent.addFilename(srcFilePath, args[1]);
        await this.fileComponent.mv(srcFilePath, destFilePath);
      },
      rm: async (...args) => {
        const filePath = this.navComponent.resolvePath(args[0]);
        await this.fileComponent.rm(filePath);
      },
      os: (...args) => {
        const arg = args[0];
        this.osComponent.os(arg);
      },
      hash: async (...args) => {
        const filePath = this.navComponent.resolvePath(args[0]);
        await this.hashComponent.hash(filePath);
      },
      compress: async (...args) => {
        const srcFilePath = this.navComponent.resolvePath(args[0]);
        const destFilePath = this.navComponent.addZipExt(srcFilePath, args[1]);
        await this.zipComponent.compress(srcFilePath, destFilePath);
      },
      decompress: async (...args) => {
        const srcFilePath = this.navComponent.resolvePath(args[0]);
        const destFilePath = this.navComponent.removeZipExt(srcFilePath, args[1]);
        await this.zipComponent.decompress(srcFilePath, destFilePath);
      },
      '.exit': () => this.exit(),
    };
  }

  async execute(command, ...args) {
    if (Object.keys(this.commands).includes(command)) {
      await this.commands[command](...args);
      Message.currentPath(this.navComponent.path);
    } else {
      Message.invalidInput();
    }
  }

  exit() {
    process.exit();
  }
}

export { FileManager };
