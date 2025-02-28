import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; // Import the autotable plugin
import { toast } from "react-hot-toast";
jsPDF.autoTable = autoTable;


// ...existing code...

export default async function generatePdf(data, setIsDownloading) {
    setIsDownloading(true)

    const pageWidth = 297;
    const pageHeight = 210;


    let lineY = 19;
    let secondColorImgY;
    const colorImgHeight = 50;
    const colorHeight = 40;

    // Initialize jsPDF 
    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [pageWidth, pageHeight],
    });

    function headerSection(pageNumber, pageName, data) {
        pdf.setFontSize(12);
        pdf.setFont('helvetica');
        pdf.setTextColor(0, 0, 0);
        const modifiedAt = (data.modifiedAt === undefined || data.modifiedAt === null || isNaN(new Date(data.modifiedAt).getTime())) ? data.createdAt : data.modifiedAt;
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
        pdf.text(data.styleNo, pgX, pgY + 6); // Adjusted to match left side spacing

        // Horizontal line
        pdf.line(0, lineY, pageWidth, lineY);
    }

    const firstRowY = lineY + 10;
    secondColorImgY = firstRowY + colorImgHeight + 6; // Update secondColorImgY value

    function footerSection(data) {
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


    try {

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const slides = data.slides

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
            headerSection(slide.page, slide.name, data);
            if (slide.type === "Layout1") {

                const colorImgWidth = 40;
                const frontBackImgHeight = 110;
                const colorImgX = 20;
                const frontImgX = colorImgX + colorImgWidth - 25;
                pdf.addImage(`${process.env.REACT_APP_API_URL}/uploads/techpack/${Layout1[0].data.fabricColorImages[0].src}`, 'JPEG', colorImgX, firstRowY + 10, colorImgWidth, colorHeight);
                pdf.setFont('helvetica', 'bold');

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
                const nonLastRows = rowData.filter(row => row.position !== 'Last' && row.position !== "LINK");
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

                    const leftMargin = 10;
                    const rightMargin = 10;
                    const pageWidth = pdf.internal.pageSize.width;
                    const availableWidth = pageWidth - leftMargin - rightMargin;

                    const columnWidths = [10, 45, 54, 53, 53, 54];
                    const totalWidth = columnWidths.reduce((a, b) => a + b, 0);
                    const scaleFactor = availableWidth / totalWidth;

                    // Adjust column widths to fit within the available space
                    for (let i = 0; i < columnWidths.length; i++) {
                        columnWidths[i] *= scaleFactor;
                    }

                    const rows = ArtworkPlacementSheet[0].data.artworkPlacementSheet.map((item, index) => [
                        index + 1,
                        item.placement.toUpperCase(),
                        item.artworkimage && item.artworkimage[0]?.src
                            ? `${process.env.REACT_APP_API_URL}/uploads/techpack/${item.artworkimage[0].src}`
                            : null,  // Use null instead of an empty string
                        item.technique.toUpperCase(),
                        item.color.toUpperCase(),
                        item.placementimage && item.placementimage[0]?.src
                            ? `${process.env.REACT_APP_API_URL}/uploads/techpack/${item.placementimage[0].src}`
                            : null  // Use null instead of an empty string
                    ]);

                    const rowLimitPerPage = 3;
                    const startYOffset = 30;
                    const tableWidth = columnWidths.reduce((sum, width) => sum + width, 0);
                    const tableXOffset = (pageWidth - tableWidth) / 2;

                    let startY = startYOffset;

                    for (let i = 0; i < rows.length; i += rowLimitPerPage) {
                        let tableRows = rows.slice(i, i + rowLimitPerPage);

                        pdf.autoTable({
                            theme: 'grid',
                            head: [['#', 'PLACEMENT', 'ARTWORK', 'TECHNIQUE', 'COLOUR', 'PLACEMENT']],
                            body: tableRows.map(row => [
                                row[0], // #
                                row[1], // PLACEMENT
                                row[2] ? ' ' : '', // ARTWORK (Prevent text from showing)
                                row[3], // TECHNIQUE
                                row[4], // COLOUR
                                row[5] ? ' ' : '' // PLACEMENT (Prevent text from showing)
                            ]),
                            startY: startY - 5,
                            margin: { left: tableXOffset },
                            styles: {
                                fontSize: 11,
                                cellPadding: 2,
                                valign: 'middle',
                                minCellHeight: 50,
                                textColor: [0, 0, 0],
                                fillColor: false,
                                lineWidth: 0.2,
                                lineColor: [0, 0, 0],
                                overflow: 'linebreak'
                            },
                            headStyles: {
                                fontSize: 11,
                                fillColor: [0, 0, 0],
                                textColor: [255, 255, 255],
                                minCellHeight: 10,
                                lineWidth: 0.2,
                                lineColor: [0, 0, 0],
                                halign: 'center',
                                align: 'center'
                            },
                            columnStyles: {
                                0: { cellWidth: columnWidths[0], halign: 'center' },
                                1: { cellWidth: columnWidths[1], halign: 'center' },
                                2: { cellWidth: columnWidths[2], halign: 'center', overflow: 'hidden' }, // ARTWORK
                                3: { cellWidth: columnWidths[3], halign: 'center' },
                                4: { cellWidth: columnWidths[4], halign: 'center' },
                                5: { cellWidth: columnWidths[5], halign: 'center', overflow: 'hidden' } // PLACEMENT
                            },
                            didDrawCell: function (data) {
                                if (data.row.index !== undefined) {
                                    let rowData = tableRows[data.row.index];

                                    // Store the image positions, but don't add them yet
                                    if (data.column.index === 2 && rowData[2]) {
                                        rowData.imageArtworkPosition = { x: data.cell.x + 5, y: data.cell.y + 3 };
                                    }
                                    if (data.column.index === 5 && rowData[5]) {
                                        rowData.imagePlacementPosition = { x: data.cell.x + 5, y: data.cell.y + 3 };
                                    }
                                }
                            }

                        });
                        tableRows.forEach(rowData => {
                            if (rowData.imageArtworkPosition && rowData[2]) {
                                pdf.addImage(rowData[2], 'JPEG', rowData.imageArtworkPosition.x, rowData.imageArtworkPosition.y, 46, 45);
                            }
                            if (rowData.imagePlacementPosition && rowData[5]) {
                                pdf.addImage(rowData[5], 'JPEG', rowData.imagePlacementPosition.x, rowData.imagePlacementPosition.y, 46, 45);
                            }
                        });


                        if (i + rowLimitPerPage < rows.length) {
                            pdf.addPage();
                            startY = startYOffset;
                        }
                    }

                } else {
                    console.warn("No artwork placement sheet data available. Skipping placement section.");
                }



            }
            else if (slide.type === "ArtWork") {
                if (slide?.data?.images?.length > 0) {
                    // Sort artwork images by position
                    slide.data.images.sort((a, b) => parseInt(a.position) - parseInt(b.position));

                    slide.data.images.forEach((image, index) => {
                        try {
                            // Add a new page for each image
                            if (index > 0) {
                                pdf.addPage();
                            }
                            // Add the header section with the page number
                            headerSection(slide.page, slide.name, data);
                            const maxWidth = pdf.internal.pageSize.getWidth();
                            const imageWidth = 233;
                            const xPosition = (maxWidth - imageWidth) / 2;

                            // Add the artwork image
                            const imagePath = `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`;
                            pdf.addImage(
                                imagePath, // Image path
                                'PNG', // Image format
                                xPosition, // X position
                                21.5, // Y position
                                imageWidth, // Width (A4 width minus 10px margin on both sides)
                                175 // Height
                            );

                            // Add the footer section
                            footerSection(data);
                        } catch (error) {
                            console.error(`Failed to add image ${image.src} to PDF:`, error);
                            pdf.text(`Failed to load image: ${image.src}`, 10, 30);
                        }
                    });
                } else {
                    console.warn("No artwork images available. Skipping artwork section.");
                    pdf.text("No artwork images available.", 10, 30);
                }
            }
            else if (slide.data.formate === "single") {
                const maxWidth = pdf.internal.pageSize.getWidth();
                const sectionWidth = maxWidth / 2; // Divide into two equal sections
                const yPosition = 10;

                // Adding static text above the table
                pdf.setFont("helvetica");
                pdf.setFontSize(12);
                pdf.text("Measurements in CM", 10, yPosition + 19); // Positioning text above table
                pdf.text(data.gender + "-" + data.category, 110, yPosition + 19); // Positioning text above table

                // Extract dynamic headers
                let allColumns = new Set();
                slide.data.table.forEach(row => {
                    Object.keys(row).forEach(key => {
                        if (key !== "position" && key !== "name" && key !== "_id") {
                            allColumns.add(key.toUpperCase());
                        }
                    });
                });

                // Ensure "SNo" and "Size" are always present
                let dynamicHeaders = ["SNo", "Size", ...Array.from(allColumns)];

                const tableRows = [];

                // Preparing table rows
                slide.data.table.forEach((row) => {
                    if (row.name === "Shoulder Drop") {
                        const rowData = [row.position, row.name, { content: row.S, colSpan: dynamicHeaders.length - 2, styles: { halign: "center" } }];
                        tableRows.push(rowData);
                    } else {
                        const rowData = [row.position, row.name];
                        dynamicHeaders.slice(2).forEach(header => {
                            rowData.push(row[header] || ""); // Fill missing data with empty string
                        });
                        tableRows.push(rowData);
                    }
                });

                // Define Y position for table
                const tableStartY = yPosition + 23;

                // Determine row height dynamically
                const totalRows = tableRows.length;
                const pageHeight = pdf.internal.pageSize.getHeight();
                const availableHeight = pageHeight - tableStartY - 20; // Space available after table start
                const rowHeight = totalRows > 0 ? availableHeight / totalRows - 1.4 : 10; // Adjust based on rows

                pdf.autoTable({
                    head: [dynamicHeaders],
                    body: tableRows,
                    theme: "grid",
                    startY: yPosition + 22,
                    margin: { left: 10 },
                    tableWidth: sectionWidth - 20,
                    styles: {
                        halign: "left",
                        valign: "middle",
                        cellPadding: 2, // Slightly increase padding for better spacing
                        minCellHeight: rowHeight, // Slightly increase row height (2-3mm more)
                    },
                    headStyles: {
                        fillColor: [0, 0, 0],
                        textColor: [255, 255, 255],
                        fontSize: 11, // Slightly increase font size
                        cellPadding: 2, // Increase header padding slightly
                        halign: "center",
                        overflow: "hidden", // Prevent text from wrapping
                        whiteSpace: "nowrap" // Ensure text remains in a single line
                    },
                    columnStyles: {
                        0: { fillColor: [0, 0, 0], textColor: [255, 255, 255], halign: "center" }
                    }
                });

                // Render image in the right half
                if (slide.data.images.length > 0) {
                    const imageXPosition = sectionWidth + 20; // Start from the right half
                    // const imageWidth = sectionWidth - 20; // Fit into half width
                    pdf.addImage(
                        `${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.images[0].src}`,
                        "PNG",
                        imageXPosition,
                        yPosition + 20, // Same Y position as the table
                        115,
                        175
                    );
                }
            }
            else if (slide.data.formate === "double") {
                const maxWidth = pdf.internal.pageSize.getWidth();
                const sectionWidth = maxWidth / 2;
                const yPosition = 10;

                let tableData = [...slide.data.table];
                const totalRows = tableData.length;
                const firstHalfSize = Math.ceil(totalRows * 0.51); // Ensures 51% goes to the first half
                const leftTable = tableData.slice(0, firstHalfSize);
                const rightTable = tableData.slice(firstHalfSize);

                // Extract dynamic headers
                let allColumns = new Set();
                tableData.forEach(row => {
                    Object.keys(row).forEach(key => {
                        if (key !== "position" && key !== "name" && key !== "_id") {
                            allColumns.add(key.toUpperCase());
                        }
                    });
                });

                // Ensure "SNo" and "Name" are always present, preserving the original format
                let dynamicHeaders = ["SNo", "Name", ...Array.from(allColumns)];

                // Adding static text above the table
                pdf.setFont("helvetica");
                pdf.setFontSize(12);
                pdf.text("Measurements in CM".toUpperCase(), 10, yPosition + 19);
                pdf.text((data.gender + "-" + data.category).toUpperCase(), 90, yPosition + 19);

                // Function to generate table data dynamically
                const formatTableData = (table) => {
                    return table.map((row) => {
                        const rowData = [row.position, row.name.toUpperCase()]; // Keeping original structure
                        let shouldMerge = false;
                        let mergeContent = "";
                
                        dynamicHeaders.slice(2).forEach(header => {
                            if (row[header] && row[header].length > 4) {
                                shouldMerge = true;
                                mergeContent = row[header].toUpperCase();
                            }
                            rowData.push(row[header] ? row[header].toUpperCase() : ""); // Fill missing data with empty string
                        });
                
                        // **Only increase width if merging**
                        if (shouldMerge) {
                            rowData.splice(2, rowData.length - 2, { 
                                content: mergeContent, 
                                colSpan: dynamicHeaders.length - 2, 
                                styles: { 
                                    halign: "center", 
                                    cellWidth: 50,  // Give extra width only to merged cells
                                    minCellHeight: 10 // Optional: Adjust height for better spacing
                                }  
                            });
                        }
                
                        return rowData;
                    });
                };
                                
                

                // Define Y position for table
                const tableStartY = yPosition + 23;

                // Determine row height dynamically
                const pageHeight = pdf.internal.pageSize.getHeight();
                const availableHeight = pageHeight - tableStartY - 20; // Space available after table start
                const rowHeight = totalRows > 0 ? availableHeight / totalRows + (totalRows < 23 ? 4 : 0) : 7; // Adjust based on rows

                // Add left table
                pdf.autoTable({
                    startY: yPosition + 22,
                    head: [dynamicHeaders],
                    body: formatTableData(leftTable),
                    theme: 'grid',
                    margin: { left: 10 },
                    tableWidth: sectionWidth - 20,
                    styles: {
                        halign: "left",
                        valign: "middle",
                        cellPadding: 2,
                        minCellHeight: rowHeight
                    },
                    headStyles: {
                        fillColor: [0, 0, 0],
                        textColor: [255, 255, 255],
                        fontSize: 11,
                        cellPadding: 2,
                        halign: "center",
                        overflow: "hidden",
                        whiteSpace: "nowrap"
                    },
                    columnStyles: {
                        0: { fillColor: [0, 0, 0], textColor: [255, 255, 255], halign: "center" },
                        ...Array.from(allColumns).reduce((acc, col, index) => {
                            acc[index + 2] = { cellWidth: 15, halign: "center" }; // Increase width by 10mm
                            return acc;
                        }, {})
                    }
                });

                // Add right table
                pdf.autoTable({
                    startY: yPosition + 22,
                    head: [dynamicHeaders],
                    body: formatTableData(rightTable),
                    theme: 'grid',
                    margin: { left: sectionWidth + 10 },
                    tableWidth: sectionWidth - 20,
                    styles: {
                        halign: "left",
                        valign: "middle",
                        cellPadding: 2,
                        minCellHeight: rowHeight
                    },
                    headStyles: {
                        fillColor: [0, 0, 0],
                        textColor: [255, 255, 255],
                        fontSize: 11,
                        cellPadding: 2,
                        halign: "center",
                        overflow: "hidden",
                        whiteSpace: "nowrap"
                    },
                    columnStyles: {
                        0: { fillColor: [0, 0, 0], textColor: [255, 255, 255], halign: "center" },
                        ...Array.from(allColumns).reduce((acc, col, index) => {
                            acc[index + 2] = { cellWidth: 15, halign: "center" }; // Increase width by 10mm
                            return acc;
                        }, {})                    }
                });

                // Add footer to the page with the table
                footerSection(data);

                const imageWidth = 233;
                const xPosition = (maxWidth - imageWidth) / 2;

                // Add a new page for each image
                slide.data.images.forEach((image, index) => {
                    pdf.addPage();
                    // Add the header section with the page number
                    headerSection(slide.page, slide.name, data);
                    pdf.addImage(
                        `${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`,
                        "PNG",
                        xPosition, 21.5, imageWidth, 175
                    );
                });
            }
            else if (
                slide.data.formate === "blank"
            ) {
                // Render image in the right half
                if (slide.data.images.length > 0) {
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

            footerSection(data);
            return slide; // Modify as needed
        });
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;

        pdf.save(`${data.styleNo}_${formattedDate}.pdf`);

        toast.success(`${data.styleNo} Downloaded`, {
            position: "top-center",
            style: {
                background: "#333",
                color: "#fff",
            },
        });
    }
    catch (error) {
        console.log(error)
        alert(`Could not download - ${data.styleNo} due to ${error}`)
    } finally {
        setIsDownloading(false)

    }

}