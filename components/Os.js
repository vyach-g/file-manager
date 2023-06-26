import os from 'os';
import { Message } from './Message.js';

const OS_ARGS = {
  '--EOL': 'eol',
  '--cpus': 'cpus',
  '--homedir': 'homedir',
  '--username': 'username',
  '--architecture': 'architecture',
};

class OsComponent {
  os(arg) {
    try {
      this[OS_ARGS[arg]]();
    } catch {
      Message.invalidInput();
    }
  }

  eol() {
    Message.write(os.EOL);
  }

  cpus() {
    const cpuInfo = os.cpus();
    Message.write('CPUs total count: ' + cpuInfo.length);
    cpuInfo.forEach((cpu) => {
      Message.write('Model: ' + cpu.model + ' | ' + 'Speed: ' + cpu.speed / 1000 + 'GHz');
    });
  }

  homedir() {
    Message.write(os.homedir());
  }

  username() {
    Message.write(os.userInfo().username);
  }

  architecture() {
    Message.write(process.arch);
  }
}

export { OsComponent };
