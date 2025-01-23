import { jsPDF } from 'jspdf';
import { useState } from 'react';
import { AiOutlineLoading } from "react-icons/ai";


const TechPackPdfGenerator = (data) => {
    const [isLoading, setIsLoading] = useState(false)

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
        const pgX = pageWidth - 35;
        const pgY = 8;
        pdf.text(`Page no - ${pageNumber}`, pgX, pgY);

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
        try {
            setIsLoading(true)

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const types = [
                "Layout1",
                "Layout2",
                "Layout3",
                "Layout0",
                "Information",
                "ArtworkPlacementSheet",
                "ArtWork",
                "SiliconLabel",
                "Page",
            ];

            const filteredSlides = types.reduce((acc, type) => {
                acc[type] = data.data.slides.filter(slide => slide.type === type);
                return acc;
            }, {});

            // Destructure filteredSlides into individual constants
            const {
                Layout1 = [],
                Layout2 = [],
                Layout3 = [],
                Layout0 = [],
                Information = [],
                ArtworkPlacementSheet = [],
                ArtWork = [],
                SiliconLabel = [],
                Page = [],
            } = filteredSlides;

            headerSection(1, "Spac Sheet");
            if (Layout1[0]?.type === "Layout1") {

                const colorImgWidth = 40;
                const frontBackImgWidth = 75;
                const frontBackImgHeight = 110;
                const colorImgX = 20;
                const frontImgX = colorImgX + colorImgWidth - 25;
                const backImgX = frontImgX + frontBackImgWidth + 15;

                pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout1[0].data.fabricColorImages[0].src}`, 'JPEG', colorImgX, firstRowY + 10, colorImgWidth, colorImgHeight);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor('black');
                pdf.text('Fabric Image', 20, firstRowY + 66);
                // Sort images based on their numeric position
                const sortedImages = Layout1[0].data.images.sort((a, b) => {
                    return parseInt(a.position, 10) - parseInt(b.position, 10);
                });

                // Add images to the PDF based on the sorted order
                sortedImages.forEach((image, index) => {
                    if (index === 0) {
                        pdf.addImage(
                            `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`,
                            'JPEG',
                            frontImgX + 44, // Adjusted X position for the first image
                            firstRowY + 10,
                            frontBackImgWidth + 10,
                            frontBackImgHeight - 10
                        );
                    } else if (index === 1) {
                        pdf.addImage(
                            `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`,
                            'JPEG',
                            backImgX + 64, // Adjusted X position for the second image
                            firstRowY + 10,
                            frontBackImgWidth + 10,
                            frontBackImgHeight - 10
                        );
                    }
                });

                pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout1[0].data.threadColorImages[0].src}`, 'JPEG', colorImgX, secondColorImgY + 20, colorImgWidth, colorImgHeight);
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
                const largeImageHeight = 92;

                // Top three large rectangles centered with equal space using justify-between logic
                const largeImageTop = topMargin + 10;
                const largeImageLeftX = centerX - largeImageWidth - spacing - largeImageWidth / 2;
                const largeImageCenterX = centerX - largeImageWidth / 2;
                const largeImageRightX = centerX + largeImageWidth + spacing - largeImageWidth / 2;

                // Adding the first three main images in sorted order
                if (Layout2[0].data.images.length > 0) {
                    pdf.addImage(
                        `${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout2[0].data.images[0].src}`,
                        "png",
                        largeImageLeftX,
                        largeImageTop,
                        largeImageWidth,
                        largeImageHeight
                    );
                }
                if (Layout2[0].data.images.length > 1) {
                    pdf.addImage(
                        `${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout2[0].data.images[1].src}`,
                        "png",
                        largeImageCenterX,
                        largeImageTop,
                        largeImageWidth,
                        largeImageHeight
                    );
                }
                if (Layout2[0].data.images.length > 2) {
                    pdf.addImage(
                        `${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout2[0].data.images[2].src}`,
                        "png",
                        largeImageRightX,
                        largeImageTop,
                        largeImageWidth,
                        largeImageHeight
                    );
                }
                // Thread color section
                const colorImageWidth = 30;
                const colorImageHeight = 37;
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
                const shirtImagePath1 = `${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout3[0].data.images[0].src}`;
                const shirtImagePath2 = `${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout3[0].data.images[1].src}`;
                const shirtWidth = 80;
                const shirtHeight = 90;
                const shirtY = (pageHeight - shirtHeight) / 3; // Center vertically
                const shirtX1 = 30; // Position for the first shirt image
                const shirtX2 = pageWidth - shirtWidth - 30; // Position for the second shirt image

                // Color swatch images
                const fabricColorImages = Layout3[0].data.fabricColorImages.map(
                    (image) => `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`
                );
                const threadColorImages = Layout3[0].data.threadColorImages.map(
                    (image) => `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`
                );

                const colorWidth = 25; // Decreased width
                const colorHeight = 33; // Increased height
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

                // Add color swatches under "Thread colour" (display based on number of images)
                threadColorImages.forEach((image, index) => {
                    if (threadColorImages.length > 0) {
                        const x = threadColorXStart + index * (colorWidth + colorSpacing);
                        pdf.addImage(image, "JPEG", x, colorYStart, colorWidth, colorHeight);
                    }
                });

                // Add color swatches under "Fabric colour" (display based on number of images)
                fabricColorImages.forEach((image, index) => {
                    if (fabricColorImages.length > 0) {
                        const x = fabricColorXStart + index * (colorWidth + colorSpacing);
                        pdf.addImage(image, "JPEG", x, colorYStart, colorWidth, colorHeight);
                    }
                });


            } else if (Layout0[0]?.type === "Layout0") {
                pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout0[0].data.images[0].src}`, 'JPEG', 10, 25, 297 - 10, 167);
            }
            else {
                console.log("No Layout")
            }

            footerSection();


            pdf.addPage();

            //   ---------  Spec. sheet start -------

            headerSection(Information[0].page, Information[0].name);
            // Define column positions and widths
            const colWidth = (pageWidth - 20) / 4; // Divide into four equal columns
            const col1X = 10; // First column start
            const col2X = col1X + colWidth; // Second column start
            const col3X = col2X + colWidth; // Third column start
            const col4X = col3X + colWidth; // Fourth column start

            // Row configurations
            let cellHeight = 12; // Default cell height
            let currentY = 28; // Initial Y position for rows

            // Helper function to draw cells
            const drawCell = (pdf, x, y, width, height, text, border = true, align = 'left', bold = false, uppercase = false) => {
                if (border) pdf.rect(x, y, width, height); // Draw cell border
                const formattedText = uppercase ? text.toUpperCase() : text;
                if (bold) pdf.setFont(undefined, 'bold');
                pdf.text(formattedText, x + 2, y + height / 2 + 3, { align }); // Align text
                if (bold) pdf.setFont(undefined, 'normal'); // Reset to normal font
            };

            // Source data
            const rowData = Information[0].data.info;

            // Separate rows: Last rows and others
            const nonLastRows = rowData.filter(row => row.position !== 'Last');
            const lastRows = rowData.filter(row => row.position === 'Last');

            // Ensure nonLastRows is even
            if (nonLastRows.length % 2 !== 0) {
                nonLastRows.push({ name: '', value: '', position: '' }); // Add an empty row
            }

            // Split nonLastRows into two halves
            const midIndex = Math.ceil(nonLastRows.length / 2);
            const firstHalf = nonLastRows.slice(0, midIndex);
            const secondHalf = nonLastRows.slice(midIndex);

            // Render firstHalf into columns 1 and 2
            firstHalf.forEach((row) => {
                const rowHeight = cellHeight; // Default row height
                drawCell(pdf, col1X, currentY, colWidth, rowHeight, row.name, true, 'left', true, true); // Name (bold, uppercase)
                drawCell(pdf, col2X, currentY, colWidth, rowHeight, row.value, true, 'left'); // Value
                currentY += rowHeight;

                // Page breaking logic
                if (currentY > pdf.internal.pageSize.height - 20) {
                    pdf.addPage();
                    currentY = 28; // Reset Y position for the new page
                }
            });

            // Render secondHalf into columns 3 and 4
            currentY = 28; // Reset Y for the next column group
            secondHalf.forEach((row) => {
                const rowHeight = cellHeight; // Default row height
                drawCell(pdf, col3X, currentY, colWidth, rowHeight, row.name, true, 'left', true, true); // Name (bold, uppercase)
                drawCell(pdf, col4X, currentY, colWidth, rowHeight, row.value, true, 'left'); // Value
                currentY += rowHeight;

                // Page breaking logic
                if (currentY > pdf.internal.pageSize.height - 20) {
                    pdf.addPage();
                    currentY = 28; // Reset Y position for the new page
                }
            });

            // Render lastRows spanning columns 2, 3, and 4
            lastRows.forEach((row) => {
                const contentWidth = colWidth * 3; // Span three columns
                const wrappedText = pdf.splitTextToSize(row.value, contentWidth - 5); // Wrap text
                const rowHeight = Math.max(cellHeight, wrappedText.length * pdf.getLineHeight()); // Calculate height
                drawCell(pdf, col1X, currentY, colWidth, rowHeight, row.name, true, 'left', true, true); // Name (bold, uppercase)
                drawCell(pdf, col2X, currentY, contentWidth, rowHeight, wrappedText.join('\n'), true, 'left'); // Merged value
                currentY += rowHeight;

                // Page breaking logic
                if (currentY > pdf.internal.pageSize.height - 20) {
                    pdf.addPage();
                    currentY = 28; // Reset Y position for the new page
                }
            });



            footerSection();

            if (ArtworkPlacementSheet[0].data.artworkPlacementSheet?.length > 0) {
                pdf.addPage();

                // Artwork placement sheet header
                headerSection(ArtworkPlacementSheet[0].page, ArtworkPlacementSheet[0].name);


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

                const rows = ArtworkPlacementSheet[0].data.artworkPlacementSheet.map((item) => ({
                    placement: item.placement,
                    technique: item.technique,
                    color: item.color,
                    artwork: item.artworkimage && item.artworkimage[0]?.src
                        ? `${process.env.REACT_APP_API_URL}/uploads/techpack/${item.artworkimage[0].src}`
                        : null, // Use null if no image is provided
                    placementImage: item.placementimage && item.placementimage[0]?.src
                        ? `${process.env.REACT_APP_API_URL}/uploads/techpack/${item.placementimage[0].src}`
                        : null, // Use null if no image is provided
                }));

                const rowHeight = 50; // Row height for readability
                const startY = 30; // Start position for the table
                const maxRowsPerPage = Math.floor((pageHeight - startY - 20) / rowHeight); // Calculate max rows per page

                // Table headers
                const drawHeaders = () => {
                    pdf.setFontSize(14);
                    pdf.setTextColor(255, 255, 255); // White text
                    let currentX = leftMargin;
                    const headers = ['#', 'Placement', 'Artwork', 'Technique', 'Colour', 'Placement'];
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
                };
                drawHeaders();
                // Draw table rows
                let currentY = startY + rowHeight / 2; // Start below headers
                rows.forEach((row, index) => {
                    // Add a new page and redraw headers if the current page is full
                    if (currentY + rowHeight > pageHeight - 20) {
                        pdf.addPage();
                        headerSection(ArtworkPlacementSheet[0].page + 1, ArtworkPlacementSheet[0].name);
                        drawHeaders(); // Redraw headers on the new page
                        currentY = startY + rowHeight / 2; // Reset to below headers
                    }

                    let currentX = leftMargin; // Reset to left margin for each row

                    // Row number
                    pdf.setFontSize(13);
                    pdf.setTextColor(0, 0, 0);
                    pdf.rect(currentX, currentY, columnWidths[0], rowHeight);
                    pdf.text((index + 1).toString(), currentX + columnWidths[0] / 2, currentY + rowHeight / 2, {
                        align: 'center',
                    });
                    currentX += columnWidths[0];

                    // Placement
                    pdf.rect(currentX, currentY, columnWidths[1], rowHeight);
                    pdf.text(row.placement, currentX + 5, currentY + rowHeight / 2, {
                        baseline: 'middle',
                    });
                    currentX += columnWidths[1];

                    // Artwork (image cell)
                    pdf.rect(currentX, currentY, columnWidths[2], rowHeight);
                    if (row.artwork) {
                        pdf.addImage(row.artwork, 'JPEG', currentX + 13, currentY + 5, columnWidths[2] - 25, rowHeight - 10);
                    } else {
                        pdf.setTextColor(150, 150, 150);
                        pdf.text('No Image', currentX + columnWidths[2] / 2, currentY + rowHeight / 2, { align: 'center' });
                    }
                    currentX += columnWidths[2];

                    // Technique
                    pdf.rect(currentX, currentY, columnWidths[3], rowHeight);
                    pdf.text(row.technique, currentX + 5, currentY + rowHeight / 2, { baseline: 'middle' });
                    currentX += columnWidths[3];

                    // Colour
                    pdf.rect(currentX, currentY, columnWidths[4], rowHeight);

                    // function for wrap text
                    const maxChars = 15; // Maximum number of characters allowed in the cell

                    function wrapText(text, maxChars) {
                        const words = text.split(" ");
                        let lines = [];
                        let currentLine = "";

                        words.forEach(word => {
                            if ((currentLine + word).length <= maxChars) {
                                currentLine += (currentLine ? " " : "") + word;
                            } else {
                                lines.push(currentLine);
                                currentLine = word;
                            }
                        });

                        if (currentLine) {
                            lines.push(currentLine);
                        }

                        return lines.join("\n");
                    }

                    const wrappedText = wrapText(row.color, maxChars);

                    pdf.text(wrappedText, currentX + 5, currentY - 4 + rowHeight / 2, {
                        baseline: 'middle',
                    });

                    currentX += columnWidths[4];

                    // Placement (image cell)
                    pdf.rect(currentX, currentY, columnWidths[5], rowHeight);
                    if (row.placementImage) {
                        pdf.addImage(row.placementImage, 'JPEG', currentX + 13, currentY + 5, columnWidths[5] - 25, rowHeight - 10);
                    } else {
                        pdf.setTextColor(150, 150, 150);
                        pdf.text('No Image', currentX + columnWidths[5] / 2, currentY + rowHeight / 2, { align: 'center' });
                    }

                    // Move to next row
                    currentY += rowHeight;
                });

                footerSection();
            } else {
                console.warn("No artwork placement sheet data available. Skipping placement section.");
            }

            //   ---------  Blank page -------

            if (ArtWork.length > 0 && ArtWork[0]?.data?.images?.length > 0) {
                // Sort artwork images by position
                ArtWork[0].data.images.sort((a, b) => parseInt(a.position) - parseInt(b.position));

                ArtWork[0].data.images.forEach((image, index) => {
                    // Add a new page for each image
                    pdf.addPage();

                    // Add the header section with the page number
                    headerSection(ArtWork[0].page, "Artwork Sheet");

                    // Add the artwork image
                    pdf.addImage(
                        `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`, // Image path
                        'PNG', // Image format
                        10, // X position
                        25, // Y position
                        287, // Width (A4 width minus 10px margin on both sides)
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

            const basePath = process.env.REACT_APP_API_URL;

            const siliconLabelSheet = SiliconLabel[0].data;

            // Check if siliconLabelSheet is valid
            if (siliconLabelSheet && siliconLabelSheet.images && siliconLabelSheet.images.length > 0) {
                // Sort images by position
                siliconLabelSheet.images.sort((a, b) => parseInt(a.position) - parseInt(b.position));

                siliconLabelSheet.images.forEach((image, index) => {
                    headerSection(SiliconLabel[0].page, SiliconLabel[0].name);

                    if (index > 0) {
                        pdf.addPage(); // Add a new page for additional images
                        // Add header for the page
                    }

                    if (index === 0) {
                        pdf.setFontSize(16);
                        pdf.text(siliconLabelSheet.title, 20, 30); // Title text with a margin of 20 from the left and 30 from the top
                    }

                    // Add the image
                    const imagePath = `${basePath}/uploads/techpack/${image.src}`;
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

            if (Array.isArray(Page) && Page.length > 0) {
                Page.sort((a, b) => parseInt(a.page) - parseInt(b.page));

                Page.forEach((page, index) => {
                    if (index > 0) {
                        pdf.addPage();
                    }

                    // Add header for the current page
                    headerSection(page.page, page.name);

                    if (Array.isArray(page.data.images) && page.data.images.length > 0) {
                        page.data.images.forEach((image) => {
                            const imagePath = `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`;
                            console.log("Adding image from:", imagePath); // Debug: Log image path

                            pdf.addImage(imagePath, "JPEG", 10, 25, 287, 167); // Adjusted dimensions for A4
                        });
                    } else {
                        console.warn(`No images found for page ${page.page}. Skipping image addition.`);
                    }

                    footerSection();
                });
            } else {
                console.error("Pages array is missing or empty.");
            }

            //   ---------  Blank page -------

            pdf.save(`${data.data.styleNo}.pdf`);

        } catch (error) {
            alert("Something Went Wrong!")
        } finally {
            setIsLoading(false)
        }

    };

    return (

        <button type='button' onClick={() => generatePdf()} className={`${isLoading ? 'animate-spin' : ''}`}>{isLoading ? <AiOutlineLoading /> : 'Download'}</button>

    );
};

export default TechPackPdfGenerator;
