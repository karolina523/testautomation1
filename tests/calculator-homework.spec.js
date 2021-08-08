const { test, expect } = require('@playwright/test');

const buildOptions = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    buildOptions.forEach(buildOption => {
    test(`Check if Build Option ${buildOption} has Second Number field`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('select[name="selectBuild"]', (buildOption));
        const isFieldVisible = await page.isVisible('#number2Field');
        expect(isFieldVisible).toBe(true)
    });
  }); 

  buildOptions.forEach(buildOption => {
    test(`Check if Add function provides the right answers with Build Option ${buildOption}`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
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
    test(`Check that Build Option ${buildOption} returns correct error when dividing by 0`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
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
    test(`Checks that Build Option ${buildOption} shows the correct error for non-numerical values`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
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

  buildOptions.forEach(buildOption => {
    test(`Check that Build Option ${buildOption} multiplies correctly`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('select[name="selectBuild"]', (buildOption));
        await page.selectOption('select[name="selectOperation"]', '2');
        await page.click('input[name="number1"]');
        await page.fill('input[name="number1"]', parseInt('Math.random() * 5'));
        await page.click('input[name="number2"]');
        await page.fill('input[name="number1"]', parseInt('Math.random() * 5'));
        await page.click('input:has-text("Calculate")');
        const valueOne = await page.getElementById(('input[name="number1"]').value = Math.random()*5);
        const valueTwo = await page.getElementById(('input[name="number2"]').value = Math.random()*5);
        const value = await page.$eval('#numberAnswerField', (el) => el.value);
        console.log(value);
        expect(value).toEqual(valueOne * valueTwo);
    });
  }); 
