import fs from 'fs';
import crypto from 'crypto';
import { Message } from './Message.js';

class HashComponent {
  async hash(path) {
    try {
      const content = await fs.promises.readFile(path);
      const string = content.toString();
      const hash = crypto.createHash('sha256').update(string).digest('hex');
      Message.write('File: ' + path + '\nHash: ' + hash);
    } catch (err) {
      Message.operationFailed();
    }
  }
}

export { HashComponent };
