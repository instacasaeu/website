import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY);

interface QuoteRequestData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  homeSize?: string;
  details?: string;
}

export async function sendQuoteRequestEmail(data: QuoteRequestData): Promise<boolean> {
  try {
    const emailContent = `
New Quote Request from InstaCasa Website

Customer Information:
• Name: ${data.firstName} ${data.lastName}
• Email: ${data.email}
• Phone: ${data.phone || 'Not provided'}
• Project Location: ${data.location || 'Not provided'}
• Home Size: ${data.homeSize ? data.homeSize + ' m²' : 'Not provided'}

Project Details:
${data.details || 'No additional details provided'}

---
This request was submitted through the InstaCasa website.
Please respond to the customer within 24 hours.
    `.trim();

    const customerEmailContent = `
Thank you for your interest in InstaCasa prefabricated homes!

We have received your quote request with the following details:
• Name: ${data.firstName} ${data.lastName}
• Project Location: ${data.location || 'Not provided'}
• Home Size: ${data.homeSize ? data.homeSize + ' m²' : 'Not provided'}

Our team will review your requirements and respond within 24 hours with a personalized quote.

Best regards,
The InstaCasa Team

---
InstaCasa - Premium Prefabricated Homes
Email: instacasaeu@gmail.com
Office: Berlin, Germany
    `.trim();

    // Send email to InstaCasa
    await mailService.send({
      to: 'instacasaeu@gmail.com',
      from: 'instacasaeu@gmail.com', // Must be verified in SendGrid
      subject: `New Quote Request - ${data.firstName} ${data.lastName}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>'),
    });

    // Send confirmation email to customer
    await mailService.send({
      to: data.email,
      from: 'instacasaeu@gmail.com',
      subject: 'Quote Request Received - InstaCasa',
      text: customerEmailContent,
      html: customerEmailContent.replace(/\n/g, '<br>'),
    });

    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}