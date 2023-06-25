import os from 'os';
import { Message } from '../Message.js';

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
    console.log(os.EOL);
  }

  cpus() {
    const cpuInfo = os.cpus();
    console.log('CPUs total count: ' + cpuInfo.length);
    cpuInfo.forEach((cpu) => {
      console.log('Model: ' + cpu.model + ' | ' + 'Speed: ' + cpu.speed / 1000 + 'GHz');
    });
  }

  homedir() {
    console.log(os.homedir());
  }

  username() {
    console.log(os.userInfo().username);
  }

  architecture() {
    console.log(process.arch);
  }
}

export { OsComponent };
