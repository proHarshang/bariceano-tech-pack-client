import { jsPDF } from 'jspdf';

const TechPackPdfGenerator = (data) => {
    const pageWidth = 297;
    const pageHeight = 210;

    // Initialize jsPDF 
    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [pageWidth, pageHeight],
    });


    let lineY;
    let secondColorImgY;
    const colorImgHeight = 50;

    function headerSection(pageNumber) {
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('BARISCEANO', 10, 8);

        pdf.setFont('helvetica', 'normal');
        pdf.text('Spec. sheet', 10, 14);

        const imgWidth = 16;
        const imgHeight = 16;
        const imgX = (pageWidth - imgWidth) / 2;
        const imgY = 2;
        pdf.addImage('/logo512.png', 'PNG', imgX, imgY, imgWidth, imgHeight);

        pdf.setFontSize(12);
        const pgX = pageWidth - 30;
        const pgY = 8;
        pdf.text(`Pg.- ${pageNumber}`, pgX, pgY);

        pdf.text('BR-00-00', pgX, pgY + 5);

        lineY = 19; // Update lineY value
        pdf.line(0, lineY, pageWidth, lineY);
    }

    function footerSection() {
        const bottomLineY = secondColorImgY + colorImgHeight + 64;
        pdf.line(0, bottomLineY, pageWidth, bottomLineY);

        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        const leftMargin = 10;
        const rightMargin = 10;
        const noteWidth = pageWidth - leftMargin - rightMargin;

        const importantNote =
            'IMPORTANT NOTE: This tech pack is confidential and is the sole property of BARISCEANO, to be utilised only for the purpose for which it has been sent and intended only for the information of the individual/entity to whom it is addressed. All artwork appearing in this bundle are trademarks owned by BARISCEANO and cannot be used, distributed, or copied.';

        pdf.text(importantNote, leftMargin, bottomLineY + 5, { maxWidth: noteWidth, align: 'justify' });
    }
    function drawCell(pdf, x, y, width, height, text, isBold = false, align = 'left') {

        // Draw cell border
        pdf.rect(x, y, width, height);

        // Set font style
        pdf.setFont('helvetica', isBold ? 'bold' : 'normal');

        // Align text within the cell
        const textX = align === 'left' ? x + 2 : x + width - 2; // Adjust for padding
        const textY = y + height / 2 + 2.5; // Adjust vertical alignment
        pdf.text(text, textX, textY, { align });

    }
    function generatePdf() {
        headerSection(1);

        const colorImgWidth = 40;

        const frontBackImgWidth = 60;
        const frontBackImgHeight = 110;

        const colorImgX = 20;
        const firstRowY = lineY + 10;

        const frontImgX = colorImgX + colorImgWidth + 10;
        const backImgX = frontImgX + frontBackImgWidth + 10;

        secondColorImgY = firstRowY + colorImgHeight + 6; // Update secondColorImgY value

        pdf.addImage('/color.jpeg', 'JPEG', colorImgX, firstRowY + 10, colorImgWidth, colorImgHeight);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor('black');
        pdf.text('Fabric Image', 20, firstRowY + 66);
        pdf.addImage('/front.jpeg', 'JPEG', frontImgX + 44, firstRowY + 10, frontBackImgWidth + 20, frontBackImgHeight);
        pdf.addImage('/back.jpeg', 'JPEG', backImgX + 64, firstRowY + 10, frontBackImgWidth + 20, frontBackImgHeight);

        pdf.addImage('/color.jpeg', 'JPEG', colorImgX, secondColorImgY + 20, colorImgWidth, colorImgHeight);
        pdf.text('Thread Color', 20, firstRowY + 133);

        footerSection();

        pdf.addPage();
        headerSection(2);
        // Define column positions and widths
        const col1X = 10; // Start position for the first column
        const col1Width = 40; // First column width
        const col2X = col1X + col1Width; // Second column starts after the first
        const col2Width = 140; // Increased width for merged columns
        const col3X = col2X + col2Width; // Third column starts after the second
        const col3Width = 40; // Third column width
        const col4X = col3X + col3Width; // Fourth column starts after the third
        const col4Width = 70; // Fourth column width

        const cellHeight = 15; // Increased height for each cell
        let currentY = 28; // Start Y position for the first row

        const rowData = [
            ['STYLE No.', `${data.data.style_number}`, 'STYLE', `${data.data.style_Name}`],
            ['FABRIC COLOUR', 'Bright White', 'CATEGORY', `${data.data.category}`],
            ['GENDER', `${data.data.gender}`, 'SIZE', 'S , M ,L ,XL'],
            ['FIT', `${data.data.fit}`, 'RATIO', `${data.data.ratio}`],
            ['SEASON', `${data.data.season}`, 'DESIGNER', `${data.data.designerName}`],
            ['STATE', `${data.data.state}`, 'COLLECTION', `${data.data.collectionName}`],
            // Rows with only two columns (merge second and fourth columns)
            ['TRIM', `${data.data.trim[0] || 'N/A'}`, '', ''],
            ['FABRIC', `${data.data.fabric[0] || 'N/A'}`, '', ''],
            ['DESCRIPTION', `${data.data.description}`, '', ''],
            ['NOTE', `${data.data.note}`, '', ''],
        ];

        rowData.forEach((row, index) => {
            if (index < 6) {
                // Standard 4-column rows
                drawCell(pdf, col1X, currentY, col1Width, cellHeight, row[0], true, 'left');
                drawCell(pdf, col2X, currentY, col2Width, cellHeight, row[1], false, 'left');
                drawCell(pdf, col3X, currentY, col3Width, cellHeight, row[2], true, 'left');
                drawCell(pdf, col4X, currentY, col4Width, cellHeight, row[3], false, 'left');
            } else {
                // Two-column rows (merge columns 2 and 4)
                drawCell(pdf, col1X, currentY, col1Width, cellHeight, row[0], true, 'left');
                drawCell(pdf, col2X, currentY, col2Width + col4Width + col3Width, cellHeight, row[1], false, 'left');
            }

            // Move to the next row
            currentY += cellHeight;
        });
        footerSection();

        pdf.addPage();
        headerSection(3);
        pdf.addImage('/img.png','png',10 , 25 , pageWidth -10 , 167)
        footerSection();

        pdf.save('example.pdf');
    };

    return (
        <div>
            <button onClick={generatePdf}>Generate PDF</button>
        </div>
    );
};

export default TechPackPdfGenerator;
