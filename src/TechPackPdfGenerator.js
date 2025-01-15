import { jsPDF } from 'jspdf';

const TechPackPdfGenerator = (data) => {
    const pageWidth = 297;
    const pageHeight = 210;

    console.log("data", data.data.specSheet.fabricColorImages[0].src)
    // Initialize jsPDF 
    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [pageWidth, pageHeight],
    });


    let lineY = 19;
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

        pdf.line(0, lineY, pageWidth, lineY);
    }

    const firstRowY = lineY + 10;
    secondColorImgY = firstRowY + colorImgHeight + 6; // Update secondColorImgY value

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
        const pageHeight = pdf.internal.pageSize.getHeight();


        const specSheet = data.data.specSheet;
        headerSection(1);

        if (specSheet.layout === "layout1") {
            const colorImgWidth = 40;
            const frontBackImgWidth = 75;
            const frontBackImgHeight = 110;
            const colorImgX = 20;
            const frontImgX = colorImgX + colorImgWidth - 25;
            const backImgX = frontImgX + frontBackImgWidth + 15;

            pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${data.data.specSheet.fabricColorImages[0].src}`, 'JPEG', colorImgX, firstRowY + 10, colorImgWidth, colorImgHeight);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor('black');
            pdf.text('Fabric Image', 20, firstRowY + 66);
            pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${data.data.specSheet.images[0].src}`, 'JPEG', frontImgX + 44, firstRowY + 10, frontBackImgWidth + 20, frontBackImgHeight);
            pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${data.data.specSheet.images[0].src}`, 'JPEG', backImgX + 64, firstRowY + 10, frontBackImgWidth + 20, frontBackImgHeight);
            pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${data.data.specSheet.fabricColorImages[0].src}`, 'JPEG', colorImgX, secondColorImgY + 20, colorImgWidth, colorImgHeight);
            pdf.text('Thread Color', 20, firstRowY + 133);

            // Add your layout 1 code here
        } else if (specSheet.layout === "layout2") {
            const contentHeight = 160; // Adjusted height to accommodate three main images
            const topMargin = (pageHeight - contentHeight) / 2;
            const centerX = pageWidth / 2;
            const spacing = 20;

            // Adjust dynamic image dimensions
            const largeImageWidth = 80;
            const largeImageHeight = 95;

            // Top three large rectangles centered with equal space using justify-between logic
            const largeImageTop = topMargin + 10;
            const largeImageLeftX = centerX - largeImageWidth - spacing - largeImageWidth / 2;
            const largeImageCenterX = centerX - largeImageWidth / 2;
            const largeImageRightX = centerX + largeImageWidth + spacing - largeImageWidth / 2;

            pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${data.data.specSheet.images[0].src}`, "png", largeImageLeftX, largeImageTop, largeImageWidth, largeImageHeight);
            pdf.addImage("/Back1.png", "png", largeImageCenterX, largeImageTop, largeImageWidth, largeImageHeight);
            pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${data.data.specSheet.images[0].src}`, "png", largeImageRightX, largeImageTop, largeImageWidth, largeImageHeight);

            // Thread color section
            const colorImageWidth = 30;
            const colorImageHeight = 32;
            const colorTopMargin = largeImageTop + largeImageHeight + 20;

            pdf.text("Thread colour", centerX - spacing - colorImageWidth - 55, colorTopMargin - 5);
            pdf.addImage("/color.jpg", "jpg", centerX - spacing - colorImageWidth - 55, colorTopMargin, colorImageWidth, colorImageHeight);
            pdf.addImage("/color.jpeg", "JPEG", centerX - colorImageWidth - 25, colorTopMargin, colorImageWidth, colorImageHeight);

            // Fabric color section
            pdf.text("Fabric colour", centerX + spacing + colorImageWidth - 35, colorTopMargin - 5);
            pdf.addImage("/color.jpg", "jpg", centerX + spacing + colorImageWidth - 35, colorTopMargin, colorImageWidth, colorImageHeight);
            pdf.addImage("/color.jpeg", "JPEG", centerX + colorImageWidth + 35, colorTopMargin, colorImageWidth, colorImageHeight);

        } else if (specSheet.layout === "layout3") {
            const shirtImagePath1 = `${process.env.REACT_APP_API_URL}/uploads/techpack/${data.data.specSheet.images[0].src}`;
            const shirtImagePath2 = "/Back1.png";
            const shirtWidth = 80;
            const shirtHeight = 90;
            const shirtY = (pageHeight - shirtHeight) / 3; // Center vertically
            const shirtX1 = 30; // Position for the first shirt image
            const shirtX2 = pageWidth - shirtWidth - 30; // Position for the second shirt image

            // Color swatch images
            const colorImagePath = `${process.env.REACT_APP_API_URL}/uploads/techpack/${data.data.specSheet.fabricColorImages[0].src}`;
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

        } else if (specSheet.layout === "blank") {
            pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${data.data.artwork.artworkImages[0].src}`, 'JPEG', 10, 25, 297 - 10, 167);
        }
        else {
            console.log("No Layout")
        }

        footerSection();


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
            ['STYLE No.', `${data.data.specSheetTable.info.styleNo}`, 'STYLE', `${data.data.specSheetTable.info.style}`],
            ['FABRIC COLOUR', 'Bright White', 'CATEGORY', `${data.data.specSheetTable.info.category}`],
            ['GENDER', `${data.data.specSheetTable.info.gender}`, 'SIZE', 'S , M ,L ,XL'],
            ['FIT', `${data.data.specSheetTable.info.fit}`, 'RATIO', `${data.data.specSheetTable.info.ratio}`],
            ['SEASON', `${data.data.specSheetTable.info.season}`, 'DESIGNER', `${data.data.specSheetTable.info.designer}`],
            ['STATE', `${data.data.specSheetTable.info.state}`, 'COLLECTION', `${data.data.specSheetTable.info.collection}`],
            // Rows with only two columns (merge second and fourth columns)
            ['TRIM', `${data.data.specSheetTable.info.trim || 'N/A'}`, '', ''],
            ['FABRIC', `${data.data.specSheetTable.info.fabric || 'N/A'}`, '', ''],
            ['DESCRIPTION', `${data.data.specSheetTable.info.description}`, '', ''],
            ['NOTE', `${data.data.specSheetTable.info.note}`, '', ''],
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
        pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${data.data.artwork.artworkImages[0].src}`, 'png', 10, 25, 297 - 10, 167)
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

        const rows = data.data.artwork.artworkPlacementSheet.map((item) => ({
            placement: item.placement,
            technique: item.technique,
            color: item.color,
            artwork: `${process.env.REACT_APP_API_URL}/uploads/techpack/${item.artworkimage}`, // Add a leading slash for path formatting
            placementImage: `${process.env.REACT_APP_API_URL}/uploads/techpack/${item.placementimage}`, // Add a leading slash for path formatting
        }));


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



        pdf.addPage();

        // Base Path
        const basePath = process.env.REACT_APP_API_URL;

        // Extract siliconLabelSheet data
        const siliconLabelSheet = data.data.siliconLabelSheet;

        // Check if siliconLabelSheet is valid
        if (siliconLabelSheet && siliconLabelSheet.images && siliconLabelSheet.images.length > 0) {
            siliconLabelSheet.images.forEach((image, index) => {
                if (index > 0) {
                    pdf.addPage(); // Add a new page for additional images
                }

                // Add header for the page
                headerSection(siliconLabelSheet.page);

                // Add the title only on the first page
                if (index === 0) {
                    pdf.setFontSize(16);
                    pdf.text(siliconLabelSheet.title, 20, 30); // Title text with a margin of 20 from the left and 30 from the top
                }

                // Add the image
                const imagePath = `${basePath}/uploads/techpack/${image.src}`;
                console.log("Adding image:", imagePath); // Debug: Log image path

                const xOffset = 10; // Left margin of 10
                const yOffset = 45; // Top margin of 10
                const pageWidth = pdf.internal.pageSize.getWidth(); // Full page width
                const pageHeight = pdf.internal.pageSize.getHeight(); // Full page height
                const imageWidth = pageWidth - 20; // Full width minus 10 units margin on each side
                const imageHeight = pageHeight - 65; // Full height minus 10 units margin on top and bottom

                try {
                    // Use "jpeg" instead of "jpg" for JPG images
                    pdf.addImage(imagePath, "jpeg", xOffset, yOffset, imageWidth, imageHeight); // Fill full width and height
                } catch (error) {
                    console.error(`Failed to add image: ${imagePath}`, error);
                }

                // Add footer for the page
                footerSection();
            });
        } else {
            console.log("No valid siliconLabelSheet data found. Skipping page creation.");
        }




        // Ensure `Pages` exists and is an array
        if (Array.isArray(data.data.Pages) && data.data.Pages.length > 0) {
            data.data.Pages.forEach((page, index) => {
                if (index > 0) {
                    pdf.addPage(); // Add a new page for each additional page
                }

                // Add header
                headerSection(page.page);

                // Add image for the current page
                const imagePath = `${basePath}/uploads/techpack/${page.src}`;
                console.log("Adding image from:", imagePath); // Debug: Log image path
                pdf.addImage(imagePath, "jpeg", 10, 25, 297 - 10, 167);

                // Add footer
                footerSection();
            });
        } else {
            console.error("Pages array is missing or empty.");
        }


        //   ---------  Blank page -------


        pdf.save('example.pdf');
    };

    return (
        <div>
            <button onClick={generatePdf}>Download</button>
        </div>
    );
};

export default TechPackPdfGenerator;
