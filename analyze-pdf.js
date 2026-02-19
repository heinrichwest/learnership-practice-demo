const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

(async () => {
    try {
        const filePath = path.join(process.cwd(), 'public/template.pdf');
        if (!fs.existsSync(filePath)) {
            console.error('File not found:', filePath);
            return;
        }
        const buffer = fs.readFileSync(filePath);
        const pdfDoc = await PDFDocument.load(buffer);
        const form = pdfDoc.getForm();
        const fields = form.getFields();

        console.log('--- Fields Start ---');
        fields.forEach(field => {
            const name = field.getName();
            const type = field.constructor.name; 
            console.log(`${name}: ${type}`);
        });
        console.log('--- Fields End ---');
    } catch (e) {
        console.error(e);
    }
})();
