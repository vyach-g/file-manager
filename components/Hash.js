import fs from 'fs';
import crypto from 'crypto';
import { Message } from '../Message.js';

class HashComponent {
  hash(path) {
    console.log(path);
    try {
      fs.readFile(path, (err, data) => {
        if (err) {
          Message.operationFailed();
          return;
        }
        const string = data.toString();
        const hash = crypto.createHash('sha256').update(string).digest('hex');
        console.log(hash);
      });
    } catch (err) {
      Message.operationFailed();
    }
  }
}

export { HashComponent };
