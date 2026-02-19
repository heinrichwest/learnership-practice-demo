const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

(async () => {
    try {
        const filePath = path.join(process.cwd(), 'public/template.pdf');
        if (!fs.existsSync(filePath)) {
            console.error('File not found:', filePath);
            return;
        }
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);

        console.log('--- Text Content Start ---');
        console.log(data.text);
        console.log('--- Text Content End ---');
    } catch (e) {
        console.error(e);
    }
})();
