import React, { useState, useEffect } from 'react';

const InvoiceGenerator = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');

  useEffect(() => {
    // Fetch the last invoice number from localStorage
    const lastInvoiceNumber = localStorage.getItem('lastInvoiceNumber');
    // If there is no invoice number, set it to a default value (e.g., 1000)
    if (lastInvoiceNumber) {
      setInvoiceNumber(generateNewInvoiceNumber(lastInvoiceNumber));
    } else {
      setInvoiceNumber('INV-1000'); // Default starting invoice number
    }
  }, []);

  const generateNewInvoiceNumber = (lastInvoiceNumber) => {
    // Extract the numeric part of the invoice number
    const invoiceNumber = parseInt(lastInvoiceNumber.replace('INV-', ''), 10);
    // Increment the numeric part by 1
    const newInvoiceNumber = invoiceNumber + 1;
    // Return the new invoice number in the desired format
    return `INV-${newInvoiceNumber}`;
  };

  const saveInvoiceNumber = () => {
    // Save the current invoice number to localStorage
    localStorage.setItem('lastInvoiceNumber', invoiceNumber);
  };

  return (
    <div>
      <h1>Invoice Generator</h1>
      <p>Invoice Number: {invoiceNumber}</p>
      <button onClick={saveInvoiceNumber}>Save Invoice</button>
    </div>
  );
};

export default InvoiceGenerator;
