import * as fs from 'fs';

export function printMsg(message) {
  const msgID = `Received message ${message.id}:`;
  const msgData = `\tData: ${message.data}`;
  const msgAttributes = `\tAttributes: ${JSON.stringify(message.attributes)}`;
  const lineText = msgID + msgData + msgAttributes + '\n';
  console.log(msgID);
  console.log(msgData);
  console.log(`\tAttributes: ${message.attributes}`);
  return lineText;
}

const filePath = 'src/local-log/log.txt';

export function prepareAppendToFile() {
  fs.readFileSync('src/local-log/log.txt', 'utf8');
} 

export function apppendToFile(msg) {
  fs.readFileSync(filePath, 'utf8');

  fs.appendFile(filePath, printMsg(msg), function (err) {
    if (err) return console.log(err);
  });
}