
import { jsPDF } from 'jspdf';
import { Order, OrderItem } from '@/services/DataService';

export const generateOrderPdf = (order: Order): Blob => {
  const doc = new jsPDF();
  
  // Add logo (placeholder)
  doc.setFontSize(22);
  doc.setTextColor(27, 57, 47); // ATJ dark green
  doc.text("ALLTHINGSJESS", 105, 20, { align: "center" });
  
  // Add Order Receipt title
  doc.setFontSize(18);
  doc.text("ORDER RECEIPT", 105, 30, { align: "center" });
  
  // Add watermark - fixing rotation issue
  doc.setFontSize(30);
  doc.setTextColor(220, 220, 220);
  // Using the correct jsPDF methods for rotation
  const angle = 45;
  const watermarkX = 105;
  const watermarkY = 160;
  
  // Save the current state
  const state = doc.saveGraphicsState();
  
  // Apply transformations
  doc.setTextColor(220, 220, 220);
  doc.text("Original - ALLTHINGSJESS", watermarkX, watermarkY, { 
    align: "center",
    angle: angle,
    renderingMode: "fillThenStroke"
  });
  
  // Restore the state
  doc.restoreGraphicsState();
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Order details
  doc.setFontSize(12);
  doc.text(`Order #: ${order.id}`, 15, 45);
  doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 15, 52);
  doc.text(`Status: ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`, 15, 59);
  
  if (order.trackingId) {
    doc.text(`Tracking ID: ${order.trackingId}`, 15, 66);
  }
  
  // Customer details
  doc.setFontSize(14);
  doc.text("Customer Information", 15, 80);
  
  doc.setFontSize(12);
  doc.text(`Name: ${order.customer.name}`, 15, 88);
  doc.text(`Email: ${order.customer.email}`, 15, 95);
  doc.text(`Address: ${order.customer.address}`, 15, 102);
  doc.text(`Country: ${order.customer.country}`, 15, 109);
  
  // Order items
  doc.setFontSize(14);
  doc.text("Order Items", 15, 125);
  
  // Table header
  doc.setFontSize(10);
  doc.text("Product", 15, 133);
  doc.text("Quantity", 120, 133);
  doc.text("Price", 145, 133);
  doc.text("Total", 170, 133);
  
  // Draw line
  doc.line(15, 135, 195, 135);
  
  // Items
  let yPosition = 142; // Renamed 'y' to 'yPosition' to avoid conflict with the watermark variable
  order.items.forEach((item) => {
    // If y position is too low, add a new page
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
      
      // Add header to new page
      doc.setFontSize(10);
      doc.text("Product", 15, yPosition);
      doc.text("Quantity", 120, yPosition);
      doc.text("Price", 145, yPosition);
      doc.text("Total", 170, yPosition);
      
      // Draw line
      yPosition += 2;
      doc.line(15, yPosition, 195, yPosition);
      yPosition += 7;
    }
    
    doc.setFontSize(10);
    
    // Product name (with wrapping if necessary)
    const splitTitle = doc.splitTextToSize(item.productName, 100);
    doc.text(splitTitle, 15, yPosition);
    
    // Quantity, price and total
    doc.text(item.quantity.toString(), 120, yPosition);
    doc.text(`$${item.price.toFixed(2)}`, 145, yPosition);
    doc.text(`$${(item.quantity * item.price).toFixed(2)}`, 170, yPosition);
    
    // Adjust y position based on how many lines the title took
    yPosition += Math.max(splitTitle.length * 5, 7);
  });
  
  // Draw line
  doc.line(15, yPosition, 195, yPosition);
  yPosition += 10;
  
  // Total
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text(`Total Amount: $${order.totalAmount.toFixed(2)}`, 140, yPosition);
  doc.setFont(undefined, 'normal');
  
  // Footer
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("Thank you for shopping with ALLTHINGSJESS!", 105, 285, { align: "center" });
  doc.text("For customer support, please contact support@allthingsjess.com", 105, 290, { align: "center" });
  
  return doc.output('blob');
};

export const downloadOrderPdf = (order: Order) => {
  const blob = generateOrderPdf(order);
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `ATJ_Order_${order.id}.pdf`;
  link.click();
};
