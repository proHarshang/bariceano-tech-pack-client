import { jsPDF } from 'jspdf';
import { useState } from 'react';
import { AiOutlineLoading } from "react-icons/ai";

const TechPackPDFGenrate = (data) => {
    const [isDownloading, setIsDownloading] = useState(false);

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
        pdf.setTextColor(0, 0, 0);
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
        pdf.text(`Page - ${pageNumber} `, pgX, pgY);

        pdf.text(data.data.styleNo, pgX, pgY + 5);

        pdf.line(0, lineY, pageWidth, lineY);
    }

    const firstRowY = lineY + 10;
    secondColorImgY = firstRowY + colorImgHeight + 6; // Update secondColorImgY value

    function footerSection() {
        const bottomLineY = secondColorImgY + colorImgHeight + 64;
        pdf.line(0, bottomLineY, pageWidth, bottomLineY);
        pdf.setFontSize(8);
        pdf.setTextColor(0, 0, 0);
        pdf.setFont('helvetica', 'normal');
        const leftMargin = 10;
        const rightMargin = 10;
        const noteWidth = pageWidth - leftMargin - rightMargin;

        const importantNote =
            'IMPORTANT NOTE: This tech pack is confidential and is the sole property of BARISCEANO, to be utilised only for the purpose for which it has been sent and intended only for the information of the individual/entity to whom it is addressed. All artwork appearing in this bundle are trademarks owned by BARISCEANO and cannot be used, distributed, or copied.';

        pdf.text(importantNote, leftMargin, bottomLineY + 5, { maxWidth: noteWidth, align: 'justify' });
    }

    function generatePdf() {
        try {
            setIsDownloading(true)
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const slides = data.data.slides

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
                acc[type] = slides.filter(slide => slide.type === type);
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
            } = filteredSlides;


            const processedSlides = slides.map((slide, index) => {
                if (index > 0) {
                    pdf.addPage();
                }

                headerSection(slide.page, slide.name);
                if (slide.type === "Layout1") {

                    const colorImgWidth = 40;
                    const frontBackImgHeight = 110;
                    const colorImgX = 20;
                    const frontImgX = colorImgX + colorImgWidth - 25;

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
                        // Validate image dimensions
                        const imageWidth = image.width || 1; // Default to 1 if undefined
                        const imageHeight = image.height || 1; // Default to 1 if undefined

                        // Maintain aspect ratio
                        const aspectRatio = imageWidth / imageHeight;
                        const adjustedHeight = frontBackImgHeight; // Fixed height
                        const adjustedWidth = adjustedHeight * aspectRatio; // Adjusted width based on aspect ratio

                        // Validate calculated width
                        if (isNaN(adjustedWidth) || adjustedWidth <= 0) {
                            console.error('Invalid image dimensions or aspect ratio:', { imageWidth, imageHeight });
                            return;
                        }

                        const imageSpacing = 20; // Space between images
                        const yPosition = firstRowY + 10;

                        if (index === 0) {
                            pdf.addImage(
                                `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`,
                                'JPEG',
                                frontImgX + 44, // Adjusted X position for the first image
                                yPosition,
                                adjustedWidth,
                                adjustedHeight
                            );
                        } else if (index === 1) {
                            pdf.addImage(
                                `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`,
                                'JPEG',
                                frontImgX + 10 + adjustedWidth + imageSpacing, // X position for the second image
                                yPosition,
                                adjustedWidth,
                                adjustedHeight
                            );
                        }
                    });

                    pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout1[0].data.threadColorImages[0].src}`, 'JPEG', colorImgX, secondColorImgY + 20, colorImgWidth, colorImgHeight);
                    pdf.text('Thread Color', 20, firstRowY + 133);

                } else if (slide.type === "Layout2") {
                    // Sorting the images in different categories
                    Layout2[0].data.fabricColorImages.sort((a, b) => a.position = b.position);
                    Layout2[0].data.threadColorImages.sort((a, b) => a.position = b.position);
                    Layout2[0].data.images.sort((a, b) => parseInt(a.position) - parseInt(b.position));

                    // Adjusted height and positioning constants
                    const contentHeight = 160; // Adjusted height to accommodate three main images
                    const topMargin = (pageHeight - contentHeight) / 2;
                    const centerX = pageWidth / 2;
                    const spacing = 20;

                    // Adjust dynamic image dimensions
                    const largeImageWidth = 92;
                    const largeImageHeight = 92;

                    // Top three large rectangles centered with equal space using justify-between logic
                    const largeImageTop = topMargin + 10;
                    const largeImageLeftX = centerX - largeImageWidth - spacing - largeImageWidth / 2 + 20;
                    const largeImageCenterX = centerX - largeImageWidth / 2;
                    const largeImageRightX = centerX + largeImageWidth + spacing - largeImageWidth / 2 - 20;

                    // Adding the first three main images in sorted order
                    if (Layout2[0] && Layout2[0].data.images.length > 0 && Layout2[0].data.images[0].src) {
                        pdf.addImage(
                            `${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout2[0].data.images[0].src}`,
                            "png",
                            largeImageLeftX,
                            largeImageTop,
                            largeImageWidth,
                            largeImageHeight
                        );
                    }
                    if (Layout2[0] && Layout2[0].data.images.length > 1 && Layout2[0].data.images[1].src) {
                        pdf.addImage(
                            `${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout2[0].data.images[1].src}`,
                            "png",
                            largeImageCenterX,
                            largeImageTop,
                            largeImageWidth,
                            largeImageHeight
                        );
                    }
                    if (Layout2[0] && Layout2[0].data.images.length > 2 && Layout2[0].data.images[2].src) {
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
                        pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`, "JPEG", centerX - spacing - colorImageWidth - 55 + (index * (colorImageWidth + 5)), colorTopMargin, colorImageWidth, colorImageHeight);
                    });

                    // Fabric color section
                    pdf.text("Fabric colour", centerX + spacing + colorImageWidth - 35, colorTopMargin - 5);

                    // Adding fabric color images in sorted order
                    Layout2[0].data.fabricColorImages.forEach((image, index) => {
                        pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`, "JPEG", centerX + spacing + colorImageWidth - 35 + (index * (colorImageWidth + 5)), colorTopMargin, colorImageWidth, colorImageHeight);
                    });

                } else if (slide.type === "Layout3") {

                    const shirtImagePath1 = `${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout3[0].data.images[0].src}`;
                    const shirtImagePath2 = `${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout3[0].data.images[1].src}`;
                    const shirtWidth = 97;
                    const shirtHeight = 97;
                    const shirtY = (pageHeight - shirtHeight) / 3 - 17; // Center vertically
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
                    const colorYStart = shirtY + shirtHeight + colorMarginTop + 10; // Start below shirt images

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

                } else if (slide.type === "Layout0") {

                    pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout0[0].data.images[0].src}`, 'JPEG', 10, 25, 297 - 10, 167);
                } else if (slide.type === "Information") {

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
                } else if (slide.type === "ArtworkPlacementSheet") {
                    if (ArtworkPlacementSheet[0] && ArtworkPlacementSheet[0].data.artworkPlacementSheet?.length > 0) {

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

                        function breakTextIntoLines(text, maxLength) {
                            let lines = [];
                            while (text.length > maxLength) {
                                let line = text.substring(0, maxLength);
                                lines.push(line);
                                text = text.substring(maxLength);
                            }
                            lines.push(text);
                            return lines;
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
                        const startY = 27; // Start position for the table
                        const maxRowsPerPage = 3; // Adjusted to allow 3 rows per page

                        // Table headers
                        const drawHeaders = () => {
                            pdf.setFontSize(14);
                            pdf.setTextColor(255, 255, 255); // White text
                            let currentX = leftMargin;
                            const headers = ['#', 'Placement', 'Artwork', 'Technique', 'Colour', 'Placement'];
                            headers.forEach((header, i) => {
                                pdf.setFillColor(0, 0, 0); // Black background
                                pdf.rect(currentX, startY - 2, columnWidths[i], rowHeight / 2 - 12, 'F'); // Fill rectangle
                                pdf.text(
                                    header,
                                    currentX + columnWidths[i] / 2,
                                    startY + rowHeight / 4 - 7,
                                    { align: 'center' }
                                );
                                currentX += columnWidths[i];
                            });
                        };
                        drawHeaders();

                        // Draw table rows
                        let currentY = startY + rowHeight / 2 - 14; // Start below headers
                        rows.forEach((row, index) => {
                            // Add a new page and redraw headers if the current page is full
                            if (index % maxRowsPerPage === 0 && index !== 0) {
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
                            let placementLines = breakTextIntoLines(row.placement, 16);
                            let placementY = currentY + rowHeight / 2 - (placementLines.length - 1) * 5;
                            pdf.rect(currentX, currentY, columnWidths[1], rowHeight);
                            placementLines.forEach((line, index) => {
                                pdf.text(line, currentX + 5, placementY + index * 10, { baseline: 'middle' });
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
                            let techniqueLines = breakTextIntoLines(row.technique, 16);
                            let techniqueY = currentY + rowHeight / 2 - (techniqueLines.length - 1) * 5;
                            pdf.rect(currentX, currentY, columnWidths[3], rowHeight);
                            techniqueLines.forEach((line, index) => {
                                pdf.text(line, currentX + 5, techniqueY + index * 10, { baseline: 'middle' });
                            });
                            currentX += columnWidths[3];

                            // Colour
                            let colorLines = breakTextIntoLines(row.color, 16);
                            let colorY = currentY + rowHeight / 2 - (colorLines.length - 1) * 5;
                            pdf.rect(currentX, currentY, columnWidths[4], rowHeight);
                            colorLines.forEach((line, index) => {
                                pdf.text(line, currentX + 5, colorY + index * 10, { baseline: 'middle' });
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

                    } else {
                        console.warn("No artwork placement sheet data available. Skipping placement section.");
                    }

                }
                else if (slide.type === "ArtWork") {
                    if (ArtWork.length > 0 && ArtWork[0]?.data?.images?.length > 0) {

                        // Sort artwork images by position
                        ArtWork[0].data.images.sort((a, b) => parseInt(a.position) - parseInt(b.position));

                        ArtWork[0].data.images.forEach((image, index) => {
                            // Add a new page for each image

                            // Add the header section with the page number
                            headerSection(ArtWork[0].page, slide.name);

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
                }
                else if (slide.type === "Page") {
                    if (slide.type === "Page") {
                        // Check if slide.data exists and contains images
                        if (slide.data && Array.isArray(slide.data.images) && slide.data.images.length > 0) {
                            const maxWidth = 240;
                            const xPosition = (pageWidth - maxWidth) / 2; // Centering the image

                            // Loop through images within slide.data
                            slide.data.images.forEach((image) => {
                                const imagePath = `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`;
                                console.log("Adding image from:", imagePath);

                                // Add image to PDF with adjusted position and dimensions
                                pdf.addImage(imagePath, "JPEG", xPosition, 25, maxWidth, 167);
                            });
                        } else {
                            console.warn(`No images found for page ${slide.page}. Skipping image addition.`);
                        }
                    }

                }
                else if (slide.type === "SiliconLabel") {
                    if (SiliconLabel[0] && SiliconLabel[0].data.images && SiliconLabel[0].data.images.length > 0) {
                        SiliconLabel[0].data.images.sort((a, b) => parseInt(a.position) - parseInt(b.position));
                        const maxWidth = pdf.internal.pageSize.getWidth() - 50;
                        const xPosition = (pageWidth - maxWidth) / 2;
                        SiliconLabel[0].data.images.forEach((image, index) => {
                            if (index > 0) {
                                pdf.addPage();
                            }

                            if (index === 0) {
                                pdf.setFont('helvetica', 'bold');
                                pdf.setFontSize(10);
                                pdf.text('PLACEMENT', 20, 30);
                                pdf.setFont('helvetica', 'normal');
                                pdf.setFontSize(10);
                                pdf.text(SiliconLabel[0]?.data?.title.toUpperCase(), 20, 36);
                            }

                            const imagePath = `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`;
                            pdf.addImage(imagePath, "jpeg", xPosition, 45, maxWidth, pdf.internal.pageSize.getHeight() - 65);
                        });
                    } else {
                        console.log("No SiliconeLabel found")
                    }
                }
                else {// Check if slide.data exists and contains images
                    if (slide.data && Array.isArray(slide.data.images) && slide.data.images.length > 0) {
                        const maxWidth = 240;
                        const xPosition = (pageWidth - maxWidth) / 2; // Centering the image

                        // Loop through images within slide.data
                        slide.data.images.forEach((image) => {
                            const imagePath = `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`;
                            console.log("Adding image from:", imagePath);

                            // Add image to PDF with adjusted position and dimensions
                            pdf.addImage(imagePath, "JPEG", xPosition, 25, maxWidth, 167);
                        });
                    } else {
                        console.warn(`No images found for page ${slide.page}. Skipping image addition.`);
                    }
                }

                footerSection();
                return slide; // Modify as needed
            });
            pdf.save(`${data.data.styleNo}.pdf`);

        }
        catch (error) {
            alert("Something Went Wrong!")
            console.log(error)
        } finally {
            setIsDownloading(false)
        }

    }


    return (
        <button
            type='button'
            onClick={generatePdf}
            className={`text-center flex items-center justify-center mx-auto ${isDownloading ? 'animate-spin' : ''}`}
            disabled={isDownloading}
        >
            {isDownloading ? <AiOutlineLoading className='text-black font-bold' /> : 'Download'}
        </button>)
}

export default TechPackPDFGenrate