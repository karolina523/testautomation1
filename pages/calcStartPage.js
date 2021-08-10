exports.calcStartPage = class calcStartPage {
    constructor(page) {
        this.page = page;}

        async goto() {
            await this.page.goto('https://testsheepnz.github.io/BasicCalculator');
            };
    }; 