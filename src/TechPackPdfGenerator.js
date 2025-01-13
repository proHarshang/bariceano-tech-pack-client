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

        const pageWidth = pdf.internal.pageSize.getWidth();

        //    -------------  Layout  1  start ------------
        headerSection(1);

        const colorImgWidth = 40;

        const frontBackImgWidth = 75;
        const frontBackImgHeight = 110;

        const colorImgX = 20;
        const firstRowY = lineY + 10;

        const frontImgX = colorImgX + colorImgWidth - 25;
        const backImgX = frontImgX + frontBackImgWidth + 15;

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


        //   ---------  Layout 1  overr  -------

        pdf.addPage();

        //   ---------  Layout 2  overr  -------

        headerSection(2);
        const contentHeight = 160; // Adjusted height to accommodate three main images
        const topMargin = (pageHeight - contentHeight) / 2;
        const centerX = pageWidth / 2;
        const spacing = 20;

        // Adjust dynamic image dimensions
        const largeImageWidth = 70;
        const largeImageHeight = 80;

        // Top three large rectangles centered with equal space using justify-between logic
        const largeImageTop = topMargin + 10;
        const largeImageLeftX = centerX - largeImageWidth - spacing - largeImageWidth / 2;
        const largeImageCenterX = centerX - largeImageWidth / 2;
        const largeImageRightX = centerX + largeImageWidth + spacing - largeImageWidth / 2;

        pdf.addImage("/Front1.png", "png", largeImageLeftX, largeImageTop, largeImageWidth, largeImageHeight);
        pdf.addImage("/Back1.png", "png", largeImageCenterX, largeImageTop, largeImageWidth, largeImageHeight);
        pdf.addImage("/Front1.png", "png", largeImageRightX, largeImageTop, largeImageWidth, largeImageHeight);

        // Thread color section
        const colorImageWidth = 40;
        const colorImageHeight = 50;
        const colorTopMargin = largeImageTop + largeImageHeight + 20;

        pdf.text("Thread colour", centerX - spacing - colorImageWidth - 55, colorTopMargin - 5);
        pdf.addImage("/color.jpg", "jpg", centerX - spacing - colorImageWidth - 55, colorTopMargin, colorImageWidth, colorImageHeight);
        pdf.addImage("/color.jpeg", "JPEG", centerX - colorImageWidth - 25, colorTopMargin, colorImageWidth, colorImageHeight);

        // Fabric color section
        // const fabricTopMargin = colorTopMargin + colorImageHeight + 10;

        pdf.text("Fabric colour", centerX + spacing + colorImageWidth - 35, colorTopMargin - 5);
        pdf.addImage("/color.jpg", "jpg", centerX + spacing + colorImageWidth - 35, colorTopMargin, colorImageWidth, colorImageHeight);

        pdf.addImage("/color.jpeg", "JPEG", centerX + colorImageWidth + 35, colorTopMargin, colorImageWidth, colorImageHeight);
        footerSection();

        //   ---------  Layout 2  overr  -------


        pdf.addPage();

        //   ---------  Layout 3  overr  -------

        headerSection(2);
        const shirtImagePath1 = "/Front1.png";
        const shirtImagePath2 = "/Back1.png";
        const shirtWidth = 80;
        const shirtHeight = 90;
        const shirtY = (pageHeight - shirtHeight) / 3; // Center vertically
        const shirtX1 = 30; // Position for the first shirt image
        const shirtX2 = pageWidth - shirtWidth - 30; // Position for the second shirt image

        // Color swatch images
        const colorImagePath = "/color.jpg";
        const colorWidth = 25; // Decreased width
        const colorHeight = 30; // Increased height
        const colorSpacing = 10;
        const colorsPerRow = 3;
        const colorMarginTop = 20; // Add margin between shirt and color swatches
        const colorYStart = shirtY + shirtHeight + colorMarginTop; // Start below shirt images

        // Thread color positions
        const threadColorXStart = shirtX1;
        const threadColorLabelY = colorYStart - 5;

        // Fabric color positions
        const fabricColorXStart = shirtX2;
        const fabricColorLabelY = colorYStart - 5;

        // Add shirt images
        pdf.addImage(shirtImagePath1, "PNG", shirtX1, shirtY, shirtWidth, shirtHeight);
        pdf.addImage(shirtImagePath2, "PNG", shirtX2, shirtY, shirtWidth, shirtHeight);

        // Add "Thread colour" and "Fabric colour" labels
        pdf.setFontSize(12);
        pdf.text("Thread colour", threadColorXStart, threadColorLabelY);
        pdf.text("Fabric colour", fabricColorXStart, fabricColorLabelY);

        // Add color swatches under "Thread colour"
        for (let i = 0; i < colorsPerRow; i++) {
            const x = threadColorXStart + i * (colorWidth + colorSpacing);
            pdf.addImage(colorImagePath, "JPEG", x, colorYStart, colorWidth, colorHeight);
        }

        // Add color swatches under "Fabric colour"
        for (let i = 0; i < colorsPerRow; i++) {
            const x = fabricColorXStart + i * (colorWidth + colorSpacing);
            pdf.addImage(colorImagePath, "JPEG", x, colorYStart, colorWidth, colorHeight);
        }
        footerSection();

        //   ---------  Layout 3  overr  -------


        pdf.addPage();

        //   ---------  Spec. sheet start -------

        headerSection(2);
        // Define column positions and widths
        const col1X = 10; // Start position for the first column
        const col1Width = 40; // First column width
        const col2X = col1X + col1Width; // Second column starts after the first
        const col2Width = 120; // Increased width for merged columns
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
            ['TRIM', `${data.data.trim[1] || 'N/A'}`, '', ''],
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

        //   ---------  Spec. sheet start -------

        pdf.addPage();


        //   ---------  Blank page -------

        headerSection(3);
        pdf.addImage('/img.png', 'png', 10, 25, 297 - 10, 167)
        footerSection();

        //   ---------  Blank page -------

        pdf.addPage();

        //   ---------  Artwork placement sheet -------

        headerSection(4);
        // Adjusted margins and table settings
        const leftMargin = 10; // Left margin
        const rightMargin = 10; // Right margin
        const availableWidth = pageWidth - leftMargin - rightMargin;

        // Adjust column widths to fit within available width
        const columnWidths = [10, 50, 80, 60, 60, 80];
        const totalWidth = columnWidths.reduce((a, b) => a + b, 0);

        // Scale column widths to fit available space
        const scaleFactor = availableWidth / totalWidth;
        for (let i = 0; i < columnWidths.length; i++) {
            columnWidths[i] *= scaleFactor;
        }

        const rows = [
            {
                placement: 'Front',
                technique: 'Rubber Print',
                color: 'Bright White',
                artwork: '/Front1.png',
                placementImage: '/color.jpeg',
            },
            {
                placement: 'Back',
                technique: 'Rubber Print',
                color: 'Bright White',
                artwork: '/Back1.png',
                placementImage: '/color.jpg',
            },
        ];

        // Increased row height
        const rowHeight = 50; // Increased height for better readability
        const startY = 30; // Start position for the table

        // Table headers
        const headers = ['#', 'Placement', 'Artwork', 'Technique', 'Colour', 'Placement'];

        // Header styling
        pdf.setFontSize(14);

        // Set the text color (White)
        pdf.setTextColor(255, 255, 255); // RGB for white

        // Draw headers
        let currentX = leftMargin;
        headers.forEach((header, i) => {
            // Draw the background rectangle for each header cell (Black background)
            pdf.setFillColor(0, 0, 0); // Black color for background
            pdf.rect(currentX, startY, columnWidths[i], rowHeight / 2, 'F'); // 'F' fills the rectangle

            // Set text color for the text (White text on the black background)
            pdf.setTextColor(255, 255, 255); // White text color

            // Add the header text (centered horizontally and vertically)
            pdf.text(
                header,
                currentX + columnWidths[i] / 2, // Center the text horizontally
                startY + rowHeight / 4 + 2, // Adjust vertical alignment slightly to fit within the cell
                { align: 'center' } // Center align the text
            );

            // Move to the next column position
            currentX += columnWidths[i];
        });


        // Table content

        // Table content

        // Draw table rows
        let ccurrentY = startY + rowHeight / 2; // Start below headers
        rows.forEach((row, index) => {
            currentX = leftMargin; // Reset to left margin for each row

            // Row number
            pdf.setFontSize(13);
            pdf.setTextColor(0, 0, 0);
            pdf.rect(currentX, ccurrentY, columnWidths[0], rowHeight);
            pdf.text((index + 1).toString(), currentX + columnWidths[0] / 2, ccurrentY + rowHeight / 2, {
                align: 'center',
            });
            currentX += columnWidths[0];

            // Placement
            pdf.rect(currentX, ccurrentY, columnWidths[1], rowHeight);
            pdf.text(row.placement, currentX + 5, ccurrentY + rowHeight / 2, {
                baseline: 'middle',
            });
            currentX += columnWidths[1];

            // Artwork (image cell)
            pdf.rect(currentX, ccurrentY, columnWidths[2], rowHeight); // Draw cell border
            pdf.setFontSize(13);

            if (row.artwork) {
                // Add image if provided
                pdf.addImage(row.artwork, 'JPEG', currentX + 13, ccurrentY + 5, columnWidths[2] - 25, rowHeight - 10);
            } else {
                // Placeholder text if no image
                pdf.setTextColor(150, 150, 150);
                pdf.text('Drop an Image here', currentX + columnWidths[2] / 2, ccurrentY + rowHeight / 2, {
                    align: 'center',
                });
            }
            currentX += columnWidths[2];

            // Technique
            pdf.rect(currentX, ccurrentY, columnWidths[3], rowHeight);
            pdf.text(row.technique, currentX + 5, ccurrentY + rowHeight / 2, {
                baseline: 'middle',
            });
            currentX += columnWidths[3];

            // Colour
            pdf.rect(currentX, ccurrentY, columnWidths[4], rowHeight);
            pdf.text(row.color, currentX + 5, ccurrentY + rowHeight / 2, {
                baseline: 'middle',
            });
            currentX += columnWidths[4];

            // Placement (image cell)
            pdf.rect(currentX, ccurrentY, columnWidths[5], rowHeight); // Draw cell border

            if (row.placementImage) {
                // Add image if provided
                pdf.addImage(row.placementImage, 'JPEG', currentX + 13, ccurrentY + 5, columnWidths[5] - 25, rowHeight - 10);
            } else {
                // Placeholder text if no image
                pdf.setTextColor(150, 150, 150);
                pdf.text('Drop an Image here', currentX + columnWidths[5] / 2, ccurrentY + rowHeight / 2, {
                    align: 'center',
                });
            }

            // Move to next row
            ccurrentY += rowHeight;
        });

        footerSection();

        //   ---------  Artwork placement sheet Over -------

        pdf.save('example.pdf');
    };

    return (
        <div>
            <button onClick={generatePdf}>Download</button>
        </div>
    );
};

export default TechPackPdfGenerator;
