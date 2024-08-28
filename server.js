const express = require('express');
const fs = require('fs');
const si = require('systeminformation')
const path = require('path');
const version = '0.1';

const { exec } = require('child_process');
const os = require('os');
const process = require('process');

// 使用 dynamic import 導入 ES 模塊
let stripAnsi;

(async () => {
  // 動態導入 strip-ansi 模塊
  stripAnsi = (await import('strip-ansi')).default;

  const app = express();
  const port = 3000;

  // 设置 EJS 作为视图引擎
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/', (req, res) => {
    try {
      res.render('page', {
        title: 'NodInfo',
        content: 'Welcome to our Node.js information page! Here you can find system information, run Neofetch, and more.',
        version: version
      });
    } catch (error) {
      console.error('Rendering error:', error);
      res.status(500).send('Error rendering page');
    }
  });

  // 使用 EJS 渲染 /info 页面
  app.get('/info', async (req, res) => {
      try {
          const systemInfo = await si.getStaticData();
          const cpuInfo = await si.cpu();
          const memInfo = await si.mem();
          const netInfo = await si.networkInterfaces();

          // 读取 package.json 文件以获取当前使用的 npm 套件信息
          const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
          const dependencies = packageJson.dependencies;
          const devDependencies = packageJson.devDependencies;

          res.render('page', {
              title: 'System Information',
              version: version,
              nodeVersion: process.version,
              platform: process.platform,
              arch: process.arch,
              cpuInfo: cpuInfo,
              freeMemory: memInfo.free,
              totalMemory: memInfo.total,
              homeDir: os.homedir(),
              uptime: os.uptime(),
              networkInterfaces: netInfo,
              envVars: process.env,
              dependencies: dependencies,
              devDependencies: devDependencies,
              content: null // 对于 /info 页面，可以设置 content 为 null 或者不设置
          });
      } catch (error) {
          res.status(500).send('Error retrieving system information');
      }
  });

  app.get('/neofetch', (req, res) => {
    exec('neofetch', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        res.status(500).send('Error executing neofetch');
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      const cleanedOutput = stripAnsi(stdout);
      res.render('page', {
          title: 'Neofetch Output',
          version: version,
          content: cleanedOutput
      });
    });
  });
  app.get('*', (req, res) => {
    res.type('text/plain').send('404 Error');
  });

  app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
  });
})();