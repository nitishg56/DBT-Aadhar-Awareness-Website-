import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// 1. For Student Downloads (Simple Text)
export const generateGuidePDF = (title: string, content: string) => {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(22);
  doc.setTextColor(0, 33, 71);
  doc.text(title, 14, 20);
  
  // Line
  doc.setLineWidth(0.5);
  doc.line(14, 25, 196, 25);
  
  // Content
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  const splitText = doc.splitTextToSize(content, 180);
  doc.text(splitText, 14, 35);
  
  // Save
  doc.save(`${title}.pdf`);
};

// 2. For Admin Reports (Tables)
export const generateReportPDF = (title: string, dataObj: any) => {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.setTextColor(0, 33, 71);
  doc.text(title, 14, 22);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);

  // Table Data
  const tableData = Object.entries(dataObj).map(([key, value]) => [
    key.replace(/([A-Z])/g, ' $1').trim().toUpperCase(), 
    String(value)
  ]);

  // Create Table
  autoTable(doc, {
    startY: 35,
    head: [['Metric', 'Value']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [0, 33, 71] },
  });

  doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
};