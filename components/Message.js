class Message {
  welcome(username) {
    console.log(`Welcome to the File Manager, ${username}!`);
  }

  exit(username) {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  }

  currentPath(path) {
    console.log(`You are currently in: ${path}`);
    process.stdout.write(path + '> ');
  }

  invalidInput() {
    console.log(`Invalid input`);
  }

  operationFailed() {
    console.log(`Operation failed`);
  }

  write(string) {
    console.log(string);
  }

  drawItemList(folders, files) {
    console.log('\n');
    this.drawItem('index', 'name', 'type');

    for (let i = 0; i < folders.length; i++) {
      this.drawItem(String(i), folders[i], 'directory');
    }

    for (let i = 0; i < files.length; i++) {
      this.drawItem(String(folders.length + i), files[i], 'file');
    }

    console.log('\n');
  }

  drawItem(index, name, type) {
    const maxIndexLength = 5;
    const maxNameLength = 30;
    const maxTypeLength = 10;

    const indexFormatted = index.padEnd(maxIndexLength);
    const nameFormatted = name.slice(0, maxNameLength).padEnd(maxNameLength);
    const typeFormatted = type.padEnd(maxTypeLength);

    console.log(indexFormatted, '|', nameFormatted, '|', typeFormatted);
  }
}

const MessageInstance = new Message();

export { MessageInstance as Message };
