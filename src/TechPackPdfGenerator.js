import { jsPDF } from 'jspdf';

const TechPackPdfGenerator = () => {
    const generatePdf = () => {

        const pdf = new jsPDF();

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        // header section starts
        // Set font size and add bold text
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('BARISCEANO', 10, 8); // Align "BARISCEANO" to the left

        // Add normal text next to it
        pdf.setFont('helvetica', 'normal');
        pdf.text('Spec. sheet', 10, 14); // Position it a bit further down

        // Center the image horizontally
        const imgWidth = 16; // Set desired image width
        const imgHeight = 16; // Set desired image height
        const imgX = (pageWidth - imgWidth) / 2; // Center horizontally
        const imgY = 2; // Align vertically with the line
        pdf.addImage('/logo512.png', 'PNG', imgX, imgY, imgWidth, imgHeight);

        // Add "Pg.-01" to the right corner
        pdf.setFontSize(12);
        const pgX = pageWidth - 30; // Right alignment with padding
        const pgY = 8; // Align with the line
        pdf.text('Pg.- 01', pgX, pgY);

        // Add "BR-00-00" below "Pg.-01"
        pdf.text('BR-00-00', pgX, pgY + 5);

        // Add horizontal line
        const lineY = 19; // Position for the line below the text and image
        pdf.line(0, lineY, pageWidth, lineY); // Full-width horizontal line




        // Define dimensions for images
        const colorImgWidth = 40;
        const colorImgHeight = 50;

        const frontBackImgWidth = 60; // Width for front and back images
        const frontBackImgHeight = 110;

        // Positions
        const colorImgX = 10; // Color image on the far left
        const firstRowY = lineY + 10; // Row position for the first set of images

        const frontImgX = colorImgX + colorImgWidth + 10; // Next to color image
        const backImgX = frontImgX + frontBackImgWidth + 10; // Next to front image

        const secondColorImgY = firstRowY + colorImgHeight + 6; // Below the first color image

        // Add the first row of images
        pdf.addImage('/color.jpeg', 'JPEG', colorImgX, firstRowY, colorImgWidth, colorImgHeight); // Color image
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor('black')
        pdf.text('Fabric Iamge', 10, firstRowY + 55)
        pdf.addImage('/front.jpeg', 'JPEG', frontImgX, firstRowY, frontBackImgWidth, frontBackImgHeight); // Front image
        pdf.addImage('/back.jpeg', 'JPEG', backImgX, firstRowY, frontBackImgWidth, frontBackImgHeight); // Back image

        // Add the second color image below the first
        pdf.addImage('/color.jpeg', 'JPEG', colorImgX, secondColorImgY + 5, colorImgWidth, colorImgHeight);
        pdf.text('Thread Color', 10, firstRowY + 116)

        // Add a horizontal line below the second color image
        const bottomLineY = secondColorImgY + colorImgHeight + 16; // Position for the bottom horizontal line
        pdf.line(0, bottomLineY, pageWidth, bottomLineY); // Full-width horizontal line

        // Add "IMPORTANT NOTE" text
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        const leftMargin = 10; // Left margin
        const rightMargin = 10; // Right margin
        const noteWidth = pageWidth - leftMargin - rightMargin; // Calculate usable width

        const importantNote =
            'IMPORTANT NOTE: This tech pack is confidential and is the sole property of BARISCEANO, to be utilised only for the purpose for which it has been sent and intended only for the information of the individual/entity to whom it is addressed. All artwork appearing in this bundle are trademarks owned by BARISCEANO and cannot be used, distributed, or copied.';

        // Wrap the text within the margins
        pdf.text(importantNote, leftMargin, bottomLineY + 5, { maxWidth: noteWidth, align: 'justify' });

        // Save the PDF
        pdf.save('example.pdf');


        // Add a new page
        pdf.addPage();

        // Add text on the second page
        pdf.text('This is some text on page 2', 10, 20);

        // Add another image on the second page
        pdf.addImage(
            'https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png', // Replace with another image URL
            'PNG',
            10,
            30,
            100,
            100
        );

        // Save the PDF
        pdf.save('example.pdf');
    };

    return (
        <div>
            <button onClick={generatePdf}>Generate PDF</button>
        </div>
    );
}

export default TechPackPdfGenerator;
