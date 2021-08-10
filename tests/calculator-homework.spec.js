const { test, expect } = require('@playwright/test');
const {calcStartPage} = require('../pages/calcStartPage');

test.describe('Calculator test suite', () => {
  let page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
      startPage = new calcStartPage(page);
      
  });
  test.beforeEach(async () => {
    await startPage.goto();
  });

const buildOptions = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    buildOptions.forEach(buildOption => {
    test(`Check if Build Option ${buildOption} has a Second Number field`, async () => {
        await page.selectOption('select[name="selectBuild"]', (buildOption));
        const isFieldVisible = await page.isVisible('#number2Field');
        expect(isFieldVisible).toBe(true)
    });
  }); 


  buildOptions.forEach(buildOption => {
    test(`Check if Add function provides the correct answers with Build Option ${buildOption}`, async () => {
        await page.selectOption('select[name="selectBuild"]', (buildOption));
        await page.click('input[name="number1"]');
        await page.fill('input[name="number1"]', '1');
        await page.click('input[name="number2"]');
        await page.fill('input[name="number2"]', '1');
        await page.click('input:has-text("Calculate")');
        const value = await page.$eval('#numberAnswerField', (el) => el.value);
        console.log(value);
        expect(value).toEqual('2')
    });
  }); 


  buildOptions.forEach(buildOption => {
    test(`Check that Build Option ${buildOption} returns correct error when dividing by 0`, async () => {
        await page.selectOption('select[name="selectBuild"]', (buildOption));
        await page.click('input[name="number1"]');
        await page.fill('input[name="number1"]', '1');
        await page.click('input[name="number2"]');
        await page.fill('input[name="number2"]', '0');
        await page.selectOption('select[name="selectOperation"]', '3');
        await page.click('input:has-text("Calculate")');
        const isErrorVisible = await page.isVisible('#errorMsgField');
        expect(isErrorVisible).toBe(true);
        const errorTextContent = await page.textContent('#errorMsgField');
        expect(errorTextContent).toContain('Divide by zero error!'); 
    });
  }); 


  buildOptions.forEach(buildOption => {
    test(`Checks that Build Option ${buildOption} shows the correct error for non-numerical values`, async () => {
        await page.selectOption('select[name="selectBuild"]', (buildOption));
        await page.click('input[name="number1"]');
        await page.fill('input[name="number1"]', 'a');
        await page.click('input[name="number2"]');
        await page.fill('input[name="number2"]', '3');
        await page.click('input:has-text("Calculate")');
        const isErrorMsgVisible = await page.isVisible('#errorMsgField');
        expect(isErrorMsgVisible).toBe(true);
        const errorMsgTextContent = await page.textContent('#errorMsgField');
        expect(errorMsgTextContent).toContain('Number 1 is not a number'); 
    });
  }); 

  /*buildOptions.forEach(buildOption => {
    test(`Check that Build Option ${buildOption} multiplies correctly`, async () => {
        await page.selectOption('select[name="selectBuild"]', (buildOption));
        await page.selectOption('select[name="selectOperation"]', '2');
        await page.click('input[name="number1"]');
        const oneValue = Math.floor(Math.random() * 5);
        const valueOne = await page.fill('input[name="number1"]', oneValue.toString());
        let valueOne = await page.fill('input[name="number1"]', `${Math.floor(Math.random() * 5)}`);
        console.log(valueOne);
        await page.click('input[name="number2"]');
        const valueTwo =await page.fill('input[name="number2"]', oneValue.toString());
        valueTwo = await page.fill('input[name="number2"]', `${Math.floor(Math.random() * 5)}`);
        console.log(valueTwo);
        await page.click('input:has-text("Calculate")');
        const randomValue = await page.$eval('#numberAnswerField', (el) => el.value);
        console.log(randomValue);
        expect(randomValue).toEqual(valueOne * valueTwo);
    });
  });*/


  buildOptions.forEach(buildOption => {
    test(`Check that Build Option ${buildOption} multiplies correctly 2 times in a row`, async () => {
        await page.selectOption('select[name="selectBuild"]', (buildOption));
        await page.selectOption('select[name="selectOperation"]', '2');
        await page.click('input[name="number1"]');
        let valueOne = await page.fill('input[name="number1"]', `1`);
        await page.click('input[name="number2"]');
        let valueTwo = await page.fill('input[name="number2"]', `3`);
        await page.click('input:has-text("Calculate")');
        const randomValueOne = await page.$eval('#numberAnswerField', (el) => el.value);
        console.log(randomValueOne);
        let valueThree = await page.fill('input[name="number1"]', `2`);
        await page.click('input[name="number2"]');
        let valueFour = await page.fill('input[name="number2"]', `4`);
        await page.click('input:has-text("Calculate")');
        const randomValueTwo = await page.$eval('#numberAnswerField', (el) => el.value);
        console.log(randomValueTwo);      
        expect(randomValueOne).toEqual('3');
        expect(randomValueTwo).toEqual('8');
    });
  }); 
});

