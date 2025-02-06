import { jsPDF } from 'jspdf';
import { useState } from 'react';
import { AiOutlineLoading } from "react-icons/ai";
import autoTable from 'jspdf-autotable'; // Import the autotable plugin
jsPDF.autoTable = autoTable;


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
    const colorHeight = 40;

    function headerSection(pageNumber, pageName) {
        pdf.setFontSize(12);
        pdf.setFont('helvetica');
        pdf.setTextColor(0, 0, 0);

        const modifiedAt = data.data.modifiedAt;
        const date = new Date(modifiedAt);
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

        // Left-aligned text
        pdf.text(formattedDate, 10, 8);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`${pageName}`, 10, 14); // Adjusted spacing to match right side

        // Center the Logo
        const imgWidth = 52;
        const imgHeight = 16;
        const imgX = (pageWidth - imgWidth) / 2;
        const imgY = 2;
        pdf.addImage('/logo2.png', 'PNG', imgX, imgY, imgWidth, imgHeight);

        // Right-aligned text with adjusted spacing
        const pgX = pageWidth - 45;
        const pgY = 8;
        pdf.text(`Page - ${pageNumber}`, pgX, pgY);
        pdf.text(data.data.styleNo, pgX, pgY + 6); // Adjusted to match left side spacing

        // Horizontal line
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
        const leftMargin = 13;
        const startNot = 43;
        const rightMargin = 10;
        const noteWidth = pageWidth - leftMargin - rightMargin - 35;

        const importantNote = "IMPORTANT NOTE : "
        pdf.text(importantNote, leftMargin, bottomLineY + 5, { align: 'justify' });
        const Note =
            'This tech pack is confidential and is the sole property of BARISCEANO, to be utilised only for the purpose for which it has been sent and intended only for the information of the individual/entity to whom it is addressed. All artwork appearing in this bundle are trademarks owned by BARISCEANO and cannot be used, distributed, or copied.';

        const lines = pdf.splitTextToSize(Note, noteWidth);
        pdf.text(lines, startNot, bottomLineY + 5, { align: '' });
    }

    // ...existing code...

    const generatePdf = async () => {
        setIsDownloading(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

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
                "Silicon Label",
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
            } = filteredSlides;


            slides.map((slide, index) => {
                if (index > 0) {
                    pdf.addPage();
                }

                headerSection(slide.page, slide.name);
                if (slide.type === "Layout1") {

                    const colorImgWidth = 40;
                    const frontBackImgHeight = 110;
                    const colorImgX = 20;
                    const frontImgX = colorImgX + colorImgWidth - 25;
                    pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout1[0].data.fabricColorImages[0].src}`, 'JPEG', colorImgX, firstRowY + 10, colorImgWidth, colorHeight);
                    pdf.setFont('helvetica', 'bold');
                    console.log("Layout1[0].data.fabricColorTitle", Layout1[0].data.fabricColorTitle)
                    if (Layout1[0].data.fabricColorTitle) {
                        pdf.text(Layout1[0].data.fabricColorTitle, 26, firstRowY + 56);
                    }
                    pdf.setTextColor('black');
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
                        // Adjust dynamic image dimensions

                        const largeImageWidth = 110;
                        const largeImageHeight = 110;

                        if (index === 0) {
                            pdf.addImage(
                                `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`,
                                'JPEG',
                                frontImgX + 44, // Adjusted X position for the first image
                                yPosition + 10,
                                largeImageWidth,
                                largeImageHeight,

                            );
                        } else if (index === 1) {
                            pdf.addImage(
                                `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`,
                                'JPEG',
                                frontImgX + 10 + adjustedWidth + imageSpacing, // X position for the second image
                                yPosition + 10,
                                largeImageWidth,
                                largeImageHeight,

                            );
                        }
                    });
                    pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout1[0].data.threadColorImages[0].src}`, 'JPEG', colorImgX, secondColorImgY + 25, colorImgWidth, colorHeight);
                    if (Layout1[0].data.threadColorTitle) {
                        pdf.text(Layout1[0].data.threadColorTitle, 26, firstRowY + 127);
                    }

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
                    const largeImageWidth = 85;
                    const largeImageHeight = 85;

                    // Top three large rectangles centered with equal space using justify-between logic
                    const largeImageTop = topMargin + 10;
                    const largeImageLeftX = centerX - largeImageWidth - spacing - largeImageWidth / 2 + 20;
                    const largeImageCenterX = centerX - largeImageWidth / 2;
                    const largeImageRightX = centerX + largeImageWidth + spacing - largeImageWidth / 2 - 20;

                    // Adding the first three main images in sorted order comment start
                    if (Layout2[0] && Layout2[0].data.images.length > 0 && Layout2[0].data.images[0].src) {

                        pdf.addImage(
                            `${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout2[0].data.images[0].src}`,
                            "png",
                            largeImageLeftX,
                            largeImageTop,
                            largeImageWidth,
                            largeImageHeight,

                        );
                    }
                    if (Layout2[0] && Layout2[0].data.images.length > 1 && Layout2[0].data.images[1].src) {

                        pdf.addImage(
                            `${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout2[0].data.images[1].src}`,
                            "png",
                            largeImageCenterX,
                            largeImageTop,
                            largeImageWidth,
                            largeImageHeight,

                        );
                    }
                    if (Layout2[0] && Layout2[0].data.images.length > 2 && Layout2[0].data.images[2].src) {
                        pdf.addImage(
                            `${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout2[0].data.images[2].src}`,
                            "png",
                            largeImageRightX,
                            largeImageTop,
                            largeImageWidth,
                            largeImageHeight,

                        );
                    }
                    // Thread color section
                    const colorImageWidth = 40;
                    const colorImageHeight = 40;
                    const colorTopMargin = largeImageTop + largeImageHeight + 20;

                    if (Layout2[0].data.threadColorTitle) {
                        pdf.text(Layout2[0].data.threadColorTitle, centerX - spacing - colorImageWidth - 55, colorTopMargin - 5);
                    }
                    // Adding thread color images in sorted order
                    Layout2[0].data.threadColorImages.forEach((image, index) => {
                        pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`, "JPEG", centerX - spacing - colorImageWidth - 55 + (index * (colorImageWidth + 5)), colorTopMargin, colorImageWidth, colorImageHeight);
                    });

                    if (Layout2[0].data.fabricColorTitle) {
                        pdf.text(Layout2[0].data.fabricColorTitle, centerX + spacing + colorImageWidth - 35, colorTopMargin - 5);
                    }

                    // Adding fabric color images in sorted order
                    Layout2[0].data.fabricColorImages.forEach((image, index) => {
                        pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`, "JPEG", centerX + spacing + colorImageWidth - 35 + (index * (colorImageWidth + 5)), colorTopMargin, colorImageWidth, colorImageHeight);
                    });

                } else if (slide.type === "Layout3") {

                    const shirtImagePath1 = `${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout3[0].data.images[0].src}`;
                    const shirtImagePath2 = `${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout3[0].data.images[1].src}`;
                    const shirtWidth = 85;
                    const shirtHeight = 85;
                    const shirtY = (pageHeight - shirtHeight) / 3 - 10; // Center vertically
                    const shirtX1 = 30; // Position for the first shirt image
                    const shirtX2 = pageWidth - shirtWidth - 30; // Position for the second shirt image

                    // Color swatch images
                    const fabricColorImages = Layout3[0].data.fabricColorImages.map(
                        (image) => `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`
                    );
                    const threadColorImages = Layout3[0].data.threadColorImages.map(
                        (image) => `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`
                    );

                    const colorWidth = 40; // Decreased width
                    const colorHeight = 40; // Increased height
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
                    pdf.addImage(shirtImagePath1, "PNG", shirtX1 + 20, shirtY, shirtWidth, shirtHeight);
                    pdf.addImage(shirtImagePath2, "PNG", shirtX2 - 20, shirtY, shirtWidth, shirtHeight);

                    // Add "Thread colour" and "Fabric colour" labels
                    pdf.setFontSize(12);
                    if (Layout3[0].data.threadColorTitle) {
                        pdf.text(Layout3[0].data.threadColorTitle, threadColorXStart - 5, threadColorLabelY);
                    }
                    if (Layout3[0].data.fabricColorTitle) {
                        pdf.text(Layout3[0].data.fabricColorTitle, fabricColorXStart - 15, fabricColorLabelY);
                    }

                    // Adjust color swatch positions (Reduce spacing by 60% instead of 40%)
                    threadColorImages.forEach((image, index) => {
                        if (threadColorImages.length > 0) {
                            const x = threadColorXStart + index * (colorWidth + colorSpacing * 0.2) - 10; // Reduce spacing even more
                            pdf.addImage(image, "JPEG", x, colorYStart, colorWidth, colorHeight);
                        }
                    });

                    fabricColorImages.forEach((image, index) => {
                        if (fabricColorImages.length > 0) {
                            const x = fabricColorXStart + index * (colorWidth + colorSpacing * 0.2) - 20; // Reduce spacing even more
                            pdf.addImage(image, "JPEG", x, colorYStart, colorWidth, colorHeight);
                        }
                    });


                } else if (slide.type === "Layout0") {
                    const maxWidth = pdf.internal.pageSize.getWidth()
                    const imageWidth = 213;
                    const xPosition = (maxWidth - imageWidth) / 2;

                    pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout0[0].data.images[0].src}`, 'JPEG', xPosition, 25, imageWidth, 160);
                } else if (slide.type === "Information") {

                    const rowData = Information[0].data.info;

                    // Separate 'Last' rows and other rows
                    const nonLastRows = rowData.filter(row => row.position !== 'Last');
                    const lastRows = rowData.filter(row => row.position === 'Last');

                    // Ensure even number of rows in nonLastRows for alignment
                    if (nonLastRows.length % 2 !== 0) {
                        nonLastRows.push({ name: '', value: '', position: '' }); // Add an empty row for spacing
                    }

                    // Split nonLastRows into two columns
                    const midIndex = Math.ceil(nonLastRows.length / 2);
                    const firstHalf = nonLastRows.slice(0, midIndex);
                    const secondHalf = nonLastRows.slice(midIndex);

                    // Format nonLastRows for autoTable
                    const formattedData = firstHalf.map((row, index) => [
                        { content: row.name.toUpperCase(), styles: { fontStyle: 'bold', halign: 'left' } },
                        row.value.toUpperCase(),
                        secondHalf[index] ? { content: secondHalf[index].name.toUpperCase(), styles: { fontStyle: 'bold', halign: 'left' } } : '',
                        secondHalf[index] ? secondHalf[index].value.toUpperCase() : ''
                    ]);

                    // Append 'Last' rows to the same table
                    lastRows.forEach(row => {
                        let formattedValue = row.value.toUpperCase();

                        // Wrap text only if it's longer than 70 characters
                        if (formattedValue.length > 70) {
                            formattedValue = pdf.splitTextToSize(formattedValue, 220);
                        }

                        formattedData.push([
                            { content: row.name.toUpperCase(), styles: { fontStyle: 'bold', halign: 'left' } },
                            { content: formattedValue, colSpan: 3, styles: { halign: 'left' } }
                        ]);
                    });

                    const pageWidth = pdf.internal.pageSize.width;
                    const tableWidth = 280; // Adjust based on your column widths
                    const startX = (pageWidth - tableWidth) / 2; // Center table
                    // Generate the table
                    pdf.autoTable({
                        startY: 28,
                        margin: { left: startX }, // Center the table horizontally
                        body: formattedData,
                        theme: 'grid',
                        styles: { fontSize: 11, cellPadding: 3, textColor: [0, 0, 0] },
                        headStyles: { fillColor: [0, 0, 0], textColor: 255, fontSize: 13, fontStyle: 'bold' },
                        columnStyles: {
                            0: { cellWidth: 60 },
                            1: { cellWidth: 80 },
                            2: { cellWidth: 60 },
                            3: { cellWidth: 80 }
                        }
                    });

                } else if (slide.type === "ArtworkPlacementSheet") {
                    if (ArtworkPlacementSheet[0] && ArtworkPlacementSheet[0].data.artworkPlacementSheet?.length > 0) {
                        // Adjust margins and table settings
                        console.log("ArtworkPlacementSheet", ArtworkPlacementSheet[0])
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
                                    header.toUpperCase(),
                                    currentX + columnWidths[i] / 2,
                                    startY + rowHeight / 4 - 7 + 1,
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

                                // Adjust currentY to reduce the row margin on new pages
                                currentY = startY + rowHeight / 2 - 15; // Reduced by 20
                            }

                            let currentX = leftMargin; // Reset to left margin for each row

                            // Row number
                            pdf.setFontSize(13);
                            pdf.setTextColor(0, 0, 0);
                            pdf.rect(currentX, currentY, columnWidths[0], rowHeight);
                            pdf.text((index + 1).toString(), currentX + columnWidths[0] / 2, currentY + rowHeight / 2, {
                                align: 'center',
                                baseline: 'middle',
                            });
                            currentX += columnWidths[0];

                            // Placement (Centered Text)
                            pdf.setFontSize(10);
                            let placementLines = pdf.splitTextToSize(row.placement.toUpperCase(), columnWidths[1] - 10);
                            let totalPlacementHeight = placementLines.length * 10;
                            let placementY = currentY + (rowHeight - totalPlacementHeight) / 2 + 5; // Adjusted for centering
                            pdf.rect(currentX, currentY, columnWidths[1], rowHeight);
                            placementLines.forEach((line, idx) => {
                                pdf.text(line, currentX + columnWidths[1] / 2, placementY + idx * 10, {
                                    align: 'center',
                                });
                            });
                            currentX += columnWidths[1];

                            // Artwork (Larger Image)
                            pdf.rect(currentX, currentY, 50, 50);
                            if (row.artwork) {
                                pdf.addImage(row.artwork, 'JPEG', currentX, currentY, 50, 50);
                            } else {
                                pdf.setTextColor(150, 150, 150);
                                pdf.text('No Image', currentX + columnWidths[2] / 2, currentY + rowHeight / 2, {
                                    align: 'center',
                                });
                            }
                            currentX += columnWidths[2];

                            // Technique
                            let techniqueLines = breakTextIntoLines(row.technique, 16);
                            let techniqueY = currentY + rowHeight / 2 - (techniqueLines.length - 1) * 5;
                            pdf.rect(currentX, currentY, columnWidths[3], rowHeight);
                            techniqueLines.forEach((line, index) => {
                                pdf.text(line.toUpperCase(), currentX + 5, techniqueY + index * 10, { baseline: 'middle' });
                            });
                            currentX += columnWidths[3];

                            // Colour
                            let colorLines = breakTextIntoLines(row.color, 16);
                            let colorY = currentY + rowHeight / 2 - (colorLines.length - 1) * 5;
                            pdf.rect(currentX, currentY, columnWidths[4], rowHeight);
                            colorLines.forEach((line, index) => {
                                pdf.text(line.toUpperCase(), currentX + 5, colorY + index * 10, { baseline: 'middle' });
                            });
                            currentX += columnWidths[4];

                            // Placement Image (Larger Image)
                            pdf.rect(currentX, currentY, 50, 50);
                            if (row.placementImage) {
                                pdf.addImage(row.placementImage, 'JPEG', currentX, currentY + 3, 50, 50);
                            } else {
                                pdf.setTextColor(150, 150, 150);
                                pdf.text('No Image', currentX + columnWidths[5] / 2, currentY + rowHeight / 2, {
                                    align: 'center',
                                });
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
                            const maxWidth = pdf.internal.pageSize.getWidth()
                            const imageWidth = 233;
                            const xPosition = (maxWidth - imageWidth) / 2;

                            // Add the artwork image
                            pdf.addImage(
                                `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`, // Image path
                                'PNG', // Image format
                                xPosition, // X position
                                21.5, // Y position
                                imageWidth, // Width (A4 width minus 10px margin on both sides)
                                175 // Height
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
                            const maxWidth = pdf.internal.pageSize.getWidth()
                            const imageWidth = 233;
                            const xPosition = (maxWidth - imageWidth) / 2;

                            // Loop through images within slide.data
                            slide.data.images.forEach((image) => {
                                const imagePath = `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`;

                                // Add image to PDF with adjusted position and dimensions
                                pdf.addImage(imagePath, "JPEG", xPosition, 21.5, imageWidth, 175);
                            });
                        } else {
                            console.warn(`No images found for page ${slide.page}. Skipping image addition.`);
                        }
                    }

                }
                else if (slide.type === "Silicon Label") {
                    if (slide && slide.data.images && slide.data.images.length > 0) {
                        slide.data.images.sort((a, b) => parseInt(a.position) - parseInt(b.position));
                        const maxWidth = pdf.internal.pageSize.getWidth();
                        const imageWidth = 213;
                        const xPosition = (maxWidth - imageWidth) / 2;

                        slide.data.images.forEach((image, index) => {
                            if (index > 0) {
                                pdf.addPage();
                            }
                            const imagePath = `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`;
                            pdf.addImage(imagePath, "jpeg", xPosition, 23, imageWidth, 160);

                            if (index === 0) {
                                pdf.setFont('helvetica', 'bold');
                                pdf.setFontSize(12); // Increase font size
                                console.log("slide?", slide)
                                console.log("slide?.data", slide?.data)
                                console.log("slide?.data?.title", slide?.data?.title)
                                const placementText = 'PLACEMENT : ' + slide?.data?.title.toUpperCase();

                                // Calculate the width of both texts combined
                                const totalTextWidth = pdf.getStringUnitWidth(placementText) * pdf.getFontSize() / pdf.internal.scaleFactor;

                                // Calculate x position to center the whole line
                                const combinedTextX = (maxWidth - totalTextWidth) / 2;

                                // Draw the combined text centered
                                pdf.text(placementText, combinedTextX, 30);
                            }

                        });
                    }
                    else {
                        console.log("No SiliconeLabel found")
                    }
                }
                else {
                    // Check if slide.data exists and contains images
                    if (slide.data && Array.isArray(slide.data.images) && slide.data.images.length > 0) {
                        const maxWidth = pdf.internal.pageSize.getWidth()
                        const imageWidth = 213;
                        const xPosition = (maxWidth - imageWidth) / 2;

                        // Loop through images within slide.data
                        slide.data.images.forEach((image) => {
                            const imagePath = `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`;
                            // Add image to PDF with adjusted position and dimensions
                            pdf.addImage(imagePath, "JPEG", xPosition, 25, imageWidth, 160);
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
            className={`text-center flex items-center justify-center mx-auto ${isDownloading ? 'animate-spin cursor-not-allowed' : ''}`}
            disabled={isDownloading}
        >
            {isDownloading ? <AiOutlineLoading className='text-black font-bold h-5' /> : 'Download'}
        </button>)
}

export default TechPackPDFGenrate