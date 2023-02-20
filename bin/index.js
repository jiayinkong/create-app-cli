#!/usr/bin/env node
import figlet from 'figlet';
import clear from 'clear';
import chalkAnimation from 'chalk-animation';
import chalk from 'chalk';
import inquirer from 'inquirer';

const log = (content) => console.log(chalk.green(content));

// 打印欢迎画面
clear();
const logo = figlet.textSync('Create App', {
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
});

const rainbow = chalkAnimation.rainbow(logo);
setTimeout(() => {
    rainbow.stop();
    query();
}, 800);

const OPT = {
    vueWebpackTemplate: 'vue-webpack-template',
    vueViteTemplate: 'vue-vite-template',
    quit: 'quit'
};

const question = [
    {
        type: 'rawlist', // 选择框
        message: '请选择项目模板',
        name: 'operation',
        choices: Object.keys(OPT)
    }
];

async function query() {
    const answer = await inquirer.prompt(question);
    if(answer.operation === 'quit') {
        return;
    }
    const { default: op } = await import(`../lib/operations/${OPT[answer.operation]}.js`);
    await op();
}