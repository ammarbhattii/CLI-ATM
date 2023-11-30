#!/usr/bin/env node
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import inquirer from 'inquirer';
import userValidation from './helper.js';
let availableBalance = Math.round(Math.random() * 10000);
let userObj = { userId: '', userPin: 0, availableBalance };
const wait = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};
async function welcome() {
    const gameTitle = chalkAnimation.karaoke('Welcome To MY ATM');
    await wait();
    gameTitle.stop();
    console.log(`
    ${chalk.magentaBright(` HOW TO USE" `)}
      ${chalk.yellowBright(`
      ${chalk.bgRgb(5, 2, 6)('1)')} INPUT YOUR USER ID AND PIN
      ${chalk.bgRgb(5, 2, 6)('2)')} SELECT FROM GIVEN OPTIONS`)} 
      ${chalk.magentaBright('DONE!')}`);
}
function balanceInquiry() {
    console.log(` 
    Account Details:`);
    console.log(`${chalk.magentaBright(`
        User Id :           ${userObj.userId}
        Available Balance : ${userObj.availableBalance}
    `)}`);
}
async function withdrawlAmount() {
    const ask = await inquirer.prompt({
        name: 'ask',
        type: 'number',
        message: 'Specify Amount in multiple of 5 : ',
        default() {
            return this.name;
        }
    });
    const amount = ask.ask;
    try {
        userValidation.userAmountValidation(amount, userObj.availableBalance);
        userObj.availableBalance = userObj.availableBalance - amount;
        balanceInquiry();
        await atm();
    }
    catch (error) {
        console.log(error);
        await withdrawlAmount();
    }
}
async function depositAmount() {
    const ask = await inquirer.prompt({
        name: 'ask',
        type: 'number',
        message: 'Specify Amount in multiple of 5 : ',
        default() {
            return this.name;
        }
    });
    const amount = ask.ask;
    try {
        userValidation.userAmountValidation(amount);
        userObj.availableBalance = userObj.availableBalance + amount;
        balanceInquiry();
        await atm();
    }
    catch (error) {
        console.log(error);
        await depositAmount();
    }
}
async function ask() {
    const ask = await inquirer.prompt({
        name: 'ask',
        type: 'input',
        message: 'Do you want to perform another Transaction? "Y" for yes "N" for No',
        default() {
            return 'Y';
        }
    });
    const asked = ask.ask;
    if (asked === 'y' || asked === 'Y')
        await atm();
    else {
        console.log(`${chalk.yellowBright(`Good Bye ${userObj.userId} :) !`)}`);
        process.exit(0);
    }
}
async function main() {
    const getUserId = await inquirer.prompt({
        name: 'userId',
        type: 'input',
        message: 'Enter user Id: ',
        default() {
            return 'Id';
        }
    });
    const getUserPin = await inquirer.prompt({
        name: 'userPin',
        type: 'input',
        message: 'Enter user Pin: ',
        default() {
            return 'Pin';
        }
    });
    userObj.userId = getUserId.userId;
    userObj.userPin = +getUserPin.userPin;
    try {
        userValidation.userValidation(userObj.userId, userObj.userPin);
    }
    catch (error) {
        console.log(error);
        await main();
    }
    await atm();
}
async function atm() {
    const atmOptions = await inquirer.prompt({
        name: 'atmOption',
        type: 'list',
        message: 'Choose from the Given Options: ',
        choices: ['Withdrawl', 'Balance_Enquiry', 'Deposit', 'exit']
    });
    console.log(atmOptions.atmOption);
    switch (atmOptions.atmOption) {
        case 'Balance_Enquiry':
            balanceInquiry();
            await ask();
            break;
        case 'Withdrawl':
            await withdrawlAmount();
            break;
        case 'Deposit':
            await depositAmount();
            break;
        default:
            console.log('Good Bye Thank you for using ATM');
            process.exit(0);
    }
}
await welcome();
await main();
