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


    let lineY = 19;
    let secondColorImgY;
    const colorImgHeight = 50;

    function headerSection(pageNumber, pageName) {
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('BARISCEANO', 10, 8);

        pdf.setFont('helvetica', 'normal');
        pdf.text(`${pageName}`, 10, 14);

        const imgWidth = 16;
        const imgHeight = 16;
        const imgX = (pageWidth - imgWidth) / 2;
        const imgY = 2;
        pdf.addImage('/logo512.png', 'PNG', imgX, imgY, imgWidth, imgHeight);

        pdf.setFontSize(12);
        const pgX = pageWidth - 30;
        const pgY = 8;
        pdf.text(`Pg.- ${pageNumber}`, pgX, pgY);

        pdf.text(data.data.styleNo, pgX, pgY + 5);

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

        const types = [
            "Layout1",
            "Layout2",
            "Layout3",
            "Information",
            "ArtworkPlacementSheet",
            "SiliconLabel",
            "Page",
        ];

        console.log("data", data)
        const filteredSlides = types.reduce((acc, type) => {
            acc[type] = data.data.slides.filter(slide => slide.type === type);
            return acc;
        }, {});

        // Destructure filteredSlides into individual constants
        const {
            Layout1 = [],
            Layout2 = [],
            Layout3 = [],
            Information = [],
            ArtworkPlacementSheet = [],
            SiliconLabel = [],
            Page = [],
        } = filteredSlides;

        console.log("Layout1", Layout1)
        console.log("Layout2", Layout2)
        console.log("Layout3", Layout3)
        console.log("Information", Information)
        console.log("ArtworkPlacementSheet", ArtworkPlacementSheet)
        console.log("SiliconLabel", SiliconLabel)
        console.log("Page", Page)
        console.log("Layout2[0]?.type", Layout2[0]?.type)
        headerSection(1, "Spac Sheet");
        console.log("first", Layout2[0].page === 1 ? "DEVAM" : Layout2)
        if (Layout1[0]?.type === "Layout2") {
            const colorImgWidth = 40;
            const frontBackImgWidth = 75;
            const frontBackImgHeight = 110;
            const colorImgX = 20;
            const frontImgX = colorImgX + colorImgWidth - 25;
            const backImgX = frontImgX + frontBackImgWidth + 15;

            pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout1.data.fabricColorImages[0].src}`, 'JPEG', colorImgX, firstRowY + 10, colorImgWidth, colorImgHeight);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor('black');
            pdf.text('Fabric Image', 20, firstRowY + 66);
            // Sort images based on their numeric position
            const sortedImages = data.data.specSheet.images.sort((a, b) => {
                return parseInt(a.position, 10) - parseInt(b.position, 10);
            });

            // Add images to the PDF based on the sorted order
            sortedImages.forEach((image, index) => {
                if (index === 0) {
                    pdf.addImage(
                        `${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout1.data.image.src}`,
                        'JPEG',
                        frontImgX + 44, // Adjusted X position for the first image
                        firstRowY + 10,
                        frontBackImgWidth + 20,
                        frontBackImgHeight
                    );
                } else if (index === 1) {
                    pdf.addImage(
                        `${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout1.data.image.src}`,
                        'JPEG',
                        backImgX + 64, // Adjusted X position for the second image
                        firstRowY + 10,
                        frontBackImgWidth + 20,
                        frontBackImgHeight
                    );
                }
            });

            pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout1.data.threadColorImages[0].src}`, 'JPEG', colorImgX, secondColorImgY + 20, colorImgWidth, colorImgHeight);
            pdf.text('Thread Color', 20, firstRowY + 133);

            // Add your layout 1 code here
        } else if (Layout2[0]?.type === "Layout2") {
            // Sorting the images in different categories
            console.log(Layout2[0].data.fabricColorImages)
            Layout2[0].data.fabricColorImages.sort((a, b) => a.position = b.position);
            Layout2[0].data.threadColorImages.sort((a, b) => a.position = b.position);
            Layout2[0].data.images.sort((a, b) => parseInt(a.position) - parseInt(b.position));

            // Adjusted height and positioning constants
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

            // Adding the first three main images in sorted order
            pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout2[0].data.images[0].src}`, "png", largeImageLeftX, largeImageTop, largeImageWidth, largeImageHeight);
            pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout2[0].data.images[1].src}`, "png", largeImageCenterX, largeImageTop, largeImageWidth, largeImageHeight);
            pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout2[0].data.images[2].src}`, "png", largeImageRightX, largeImageTop, largeImageWidth, largeImageHeight);

            // Thread color section
            const colorImageWidth = 30;
            const colorImageHeight = 32;
            const colorTopMargin = largeImageTop + largeImageHeight + 20;

            pdf.text("Thread colour", centerX - spacing - colorImageWidth - 55, colorTopMargin - 5);

            // Adding thread color images in sorted order
            Layout2[0].data.fabricColorImages.forEach((image, index) => {
                pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`, "JPG", centerX - spacing - colorImageWidth - 55 + (index * (colorImageWidth + 5)), colorTopMargin, colorImageWidth, colorImageHeight);
            });

            // Fabric color section
            pdf.text("Fabric colour", centerX + spacing + colorImageWidth - 35, colorTopMargin - 5);

            // Adding fabric color images in sorted order
            Layout2[0].data.fabricColorImages.forEach((image, index) => {
                pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`, "JPG", centerX + spacing + colorImageWidth - 35 + (index * (colorImageWidth + 5)), colorTopMargin, colorImageWidth, colorImageHeight);
            });

        } else if (Layout3[0]?.type === "Layout3") {
            const shirtImagePath1 = `${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout3.data.images[0].src}`;
            const shirtImagePath2 = `${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout3.data.images[1].src}`;
            const shirtWidth = 80;
            const shirtHeight = 90;
            const shirtY = (pageHeight - shirtHeight) / 3; // Center vertically
            const shirtX1 = 30; // Position for the first shirt image
            const shirtX2 = pageWidth - shirtWidth - 30; // Position for the second shirt image

            // Color swatch images
            const fabricColorImages = Layout3.data.fabricColorImages.map(
                (image) => `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`
            );
            const threadColorImages = Layout3.data.threadColorImages.map(
                (image) => `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`
            );

            const colorWidth = 25; // Decreased width
            const colorHeight = 30; // Increased height
            const colorSpacing = 10;
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
            threadColorImages.forEach((image, index) => {
                const x = threadColorXStart + index * (colorWidth + colorSpacing);
                pdf.addImage(image, "JPEG", x, colorYStart, colorWidth, colorHeight);
            });

            // Add color swatches under "Fabric colour"
            fabricColorImages.forEach((image, index) => {
                const x = fabricColorXStart + index * (colorWidth + colorSpacing);
                pdf.addImage(image, "JPEG", x, colorYStart, colorWidth, colorHeight);
            });


        } else if (Layout1[0]?.type === "blank") {
            pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${data.data.artwork.artworkImages[0].src}`, 'JPEG', 10, 25, 297 - 10, 167);
        }
        else {
            console.log("No Layout")
        }

        footerSection();


        pdf.addPage();

        //   ---------  Spec. sheet start -------

        headerSection(Information.page, Information.name);
        // Define column positions and widths
        const col1X = 10; // Start position for the first column
        const col1Width = 40; // First column width
        const col2X = col1X + col1Width; // Second column starts after the first
        const col2Width = 120; // Increased width for merged columns
        const col3X = col2X + col2Width; // Third column starts after the second
        const col3Width = 40; // Third column width
        const col4X = col3X + col3Width; // Fourth column starts after the third
        const col4Width = 70; // Fourth column width

        let cellHeight = 15; // Increased height for each cell
        let currentY = 28; // Start Y position for the first row

        // Source data
        const rowData = Information[0].data.info;
        console.log("rowData", rowData)
        // Helper function to calculate word count
        // Helper function to calculate word count
        const getWordCount = (text) => text.split(/\s+/).length;

        // Iterate through the data dynamically
        rowData.forEach((row) => {
            let rowHeight = cellHeight; // Default row height
            let isMerged = getWordCount(row.value) > 66; // Check if value exceeds 66 words

            // Populate empty opposite cells
            const oppositeCellValue = row.oppositeValue || "N/A"; // Add meaningful data or placeholder

            // Handle merging logic for big lines
            if (isMerged) {
                const wrappedText = pdf.splitTextToSize(row.value, col2Width + col3Width + col4Width - 5); // Wrap text
                const wrappedHeight = wrappedText.length * pdf.getLineHeight(); // Calculate height

                rowHeight = Math.max(cellHeight, wrappedHeight);

                // Merge and draw cells
                drawCell(pdf, col1X, currentY, col1Width, rowHeight, row.name, true, 'left'); // Key cell
                drawCell(pdf, col2X, currentY, col2Width + col3Width + col4Width, rowHeight, wrappedText, false, 'left'); // Merged cell
            } else {
                // Standard 4-column rows
                drawCell(pdf, col1X, currentY, col1Width, rowHeight, row.name, true, 'left'); // Key cell
                drawCell(pdf, col2X, currentY, col2Width, rowHeight, row.value, false, 'left'); // Value cell
                drawCell(pdf, col3X, currentY, col3Width, rowHeight, oppositeCellValue, true, 'left'); // Opposite cell
                drawCell(pdf, col4X, currentY, col4Width, rowHeight, '', false, 'left'); // Empty
            }

            // Move to the next row
            currentY += rowHeight;
        });

        // Place "Last" positioned rows at the bottom
        const lastRows = rowData.filter((row) => row.position === "Last");
        lastRows.forEach((row) => {
            let rowHeight = cellHeight;
            const wrappedText = pdf.splitTextToSize(row.value, col2Width + col3Width + col4Width - 5); // Wrap text
            const wrappedHeight = wrappedText.length * pdf.getLineHeight(); // Calculate height

            rowHeight = Math.max(cellHeight, wrappedHeight);

            // Merge and draw "Last" rows
            drawCell(pdf, col1X, currentY, col1Width, rowHeight, row.name, true, 'left');
            drawCell(pdf, col2X, currentY, col2Width + col3Width + col4Width, rowHeight, wrappedText, false, 'left');

            // Move to the next row
            currentY += rowHeight;
        });


        footerSection();

        //   ---------  Spec. sheet start -------

        // Check if artworkPlacementSheet exists and has data
        if (data?.data?.artwork?.artworkPlacementSheet?.length > 0) {
            pdf.addPage();

            // Artwork placement sheet header
            headerSection(data.data.artwork.page, data.data.artwork.name);

            // Adjust margins and table settings
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
                artwork: item.artworkimage
                    ? `${process.env.REACT_APP_API_URL}/uploads/techpack/${item.artworkimage}`
                    : null, // Use null if no image provided
                placementImage: item.placementimage
                    ? `${process.env.REACT_APP_API_URL}/uploads/techpack/${item.placementimage}`
                    : null, // Use null if no image provided
            }));

            const rowHeight = 50; // Increased height for better readability
            const startY = 30; // Start position for the table

            // Table headers
            const headers = ['#', 'Placement', 'Artwork', 'Technique', 'Colour', 'Placement'];

            // Header styling
            pdf.setFontSize(14);
            pdf.setTextColor(255, 255, 255); // White text
            let currentX = leftMargin;
            headers.forEach((header, i) => {
                pdf.setFillColor(0, 0, 0); // Black background
                pdf.rect(currentX, startY, columnWidths[i], rowHeight / 2, 'F'); // Fill rectangle
                pdf.text(
                    header,
                    currentX + columnWidths[i] / 2,
                    startY + rowHeight / 4 + 2,
                    { align: 'center' }
                );
                currentX += columnWidths[i];
            });

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
                pdf.rect(currentX, ccurrentY, columnWidths[2], rowHeight);
                if (row.artwork) {
                    pdf.addImage(row.artwork, 'JPEG', currentX + 13, ccurrentY + 5, columnWidths[2] - 25, rowHeight - 10);
                } else {
                    pdf.setTextColor(150, 150, 150);
                    pdf.text('No Image', currentX + columnWidths[2] / 2, ccurrentY + rowHeight / 2, { align: 'center' });
                }
                currentX += columnWidths[2];

                // Technique
                pdf.rect(currentX, ccurrentY, columnWidths[3], rowHeight);
                pdf.text(row.technique, currentX + 5, ccurrentY + rowHeight / 2, { baseline: 'middle' });
                currentX += columnWidths[3];

                // Colour
                pdf.rect(currentX, ccurrentY, columnWidths[4], rowHeight);
                pdf.text(row.color, currentX + 5, row.color.length > 49 ? ccurrentY - 7 : ccurrentY - 4 + rowHeight / 2, {
                    baseline: 'middle',
                });
                currentX += columnWidths[4];

                // Placement (image cell)
                pdf.rect(currentX, ccurrentY, columnWidths[5], rowHeight);
                if (row.placementImage) {
                    pdf.addImage(row.placementImage, 'JPEG', currentX + 13, ccurrentY + 5, columnWidths[5] - 25, rowHeight - 10);
                } else {
                    pdf.setTextColor(150, 150, 150);
                    pdf.text('No Image', currentX + columnWidths[5] / 2, ccurrentY + rowHeight / 2, { align: 'center' });
                }

                // Move to next row
                ccurrentY += rowHeight;
            });

            footerSection();
        } else {
            console.warn("No artwork placement sheet data available. Skipping placement section.");
        }

        //   ---------  Blank page -------

        // todo make loop here Devam



        // Check if artwork images exist and are valid
        if (data?.data?.artwork?.artworkImages?.length > 0) {
            // Sort artwork images by position
            data.data.artwork.artworkImages.sort((a, b) => parseInt(a.position) - parseInt(b.position));

            data.data.artwork.artworkImages.forEach((image, index) => {
                // Add a new page for each image
                pdf.addPage();

                // Add the header section with the page number
                headerSection(index + 1, "Artwork Sheet");

                // Add the artwork image
                pdf.addImage(
                    `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`,
                    'PNG',
                    10, // X position
                    25, // Y position
                    297 - 10, // Width (A4 width minus margin)
                    167 // Height
                );

                // Add the footer section
                footerSection();
            });
        } else {
            console.warn("No artwork images available. Skipping artwork section.");
        }

        //   ---------  Blank page -------

        pdf.addPage();

        // Base Path
        const basePath = process.env.REACT_APP_API_URL;

        // Extract siliconLabelSheet data
        const siliconLabelSheet = data.data.siliconLabelSheet;

        // Check if siliconLabelSheet is valid
        if (siliconLabelSheet && siliconLabelSheet.images && siliconLabelSheet.images.length > 0) {
            // Sort images by position
            siliconLabelSheet.images.sort((a, b) => parseInt(a.position) - parseInt(b.position));

            siliconLabelSheet.images.forEach((image, index) => {
                headerSection(siliconLabelSheet.page, siliconLabelSheet.name);

                if (index > 0) {
                    pdf.addPage(); // Add a new page for additional images
                    // Add header for the page
                }

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


        pdf.addPage();
        // Ensure Pages exists and is an array
        if (Array.isArray(data.data.Pages) && data.data.Pages.length > 0) {
            // Sort the pages array based on the 'page' value
            data.data.Pages.sort((a, b) => parseInt(a.page) - parseInt(b.page));

            // Iterate over the sorted pages
            data.data.Pages.forEach((page, index) => {
                if (index > 0) {
                    pdf.addPage(); // Add a new page for each additional page
                }
                console.log("page.name", page.name);
                console.log("page", page);

                // Add header
                headerSection(page.page, page.name);

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
