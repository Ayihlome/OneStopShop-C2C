const https = require('https');
const config = require('../config');
const logger = require('../utils/logger');

const WHATSAPP_API = 'https://graph.facebook.com/v18.0';
const PHONE_NUMBER_ID = config.whatsapp?.phoneNumberId;
const TOKEN = config.whatsapp?.token;

/**
 * Low-level HTTPS POST to WhatsApp Cloud API.
 */
function postToWhatsApp(path, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(WHATSAPP_API + path);
    const data = JSON.stringify(body);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
      timeout: 10000,
    };

    const req = https.request(options, (res) => {
      let chunks = '';
      res.on('data', (chunk) => (chunks += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(chunks) });
        } catch {
          resolve({ status: res.statusCode, raw: chunks });
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('WhatsApp API timeout')); });
    req.write(data);
    req.end();
  });
}

/**
 * Send a text message via WhatsApp Cloud API.
 * @param {string} to - Recipient phone number (E.164 format, e.g. +27631234567)
 * @param {string} body - Message text
 */
async function sendMessage(to, body) {
  if (!TOKEN || !PHONE_NUMBER_ID) {
    logger.warn('WhatsApp not configured — skipping message', { to });
    return { skipped: true, reason: 'whatsapp_not_configured' };
  }

  try {
    const result = await postToWhatsApp(`/${PHONE_NUMBER_ID}/messages`, {
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body },
    });

    logger.info('WhatsApp message sent', {
      to,
      status: result.status,
      messageId: result.data?.messages?.[0]?.id,
    });
    return result.data;
  } catch (error) {
    logger.error('WhatsApp API error', {
      to,
      message: error.message,
    });
    // Don't throw — WhatsApp failures shouldn't break the booking flow
    return { error: true, message: error.message };
  }
}

/**
 * Send booking confirmation to the customer.
 */
async function sendBookingConfirmation(customerPhone, bookingData) {
  const date = bookingData.preferred_schedule
    ? new Date(bookingData.preferred_schedule).toLocaleDateString('en-ZA', {
        day: 'numeric', month: 'short', year: 'numeric',
      })
    : 'TBC';

  const message =
    `🔧 *Booking Confirmed!*\n\n` +
    `Booking #${bookingData.id}\n` +
    `Provider: ${bookingData.business_name || 'Your service provider'}\n` +
    `Date: ${date}\n` +
    `Description: ${bookingData.description || 'N/A'}\n\n` +
    `Thank you for choosing OneStopShop!`;

  return sendMessage(customerPhone, message);
}

/**
 * Send notification to the provider when a new booking comes in.
 */
async function sendNewBookingNotification(providerPhone, bookingData) {
  const date = bookingData.preferred_schedule
    ? new Date(bookingData.preferred_schedule).toLocaleDateString('en-ZA', {
        day: 'numeric', month: 'short', year: 'numeric',
      })
    : 'TBC';

  const message =
    `🔔 *New Booking Request!*\n\n` +
    `Booking #${bookingData.id}\n` +
    `Customer: ${bookingData.customer_name || 'A customer'}\n` +
    `Date: ${date}\n` +
    `Description: ${bookingData.description || 'N/A'}\n\n` +
    `Check your dashboard to accept or reschedule.`;

  return sendMessage(providerPhone, message);
}

/**
 * Send status update notification to the customer.
 */
async function sendStatusUpdate(customerPhone, bookingId, status) {
  const statusLabels = {
    in_progress: '🔧 Your booking is now *in progress*. The provider is working on it.',
    completed: '✅ *Booking completed!* Please leave a review for the provider.',
    cancelled: '❌ Your booking has been *cancelled*.',
    rejected: '❌ Your booking request was *rejected* by the provider.',
  };

  const body = statusLabels[status];
  if (!body) return;

  const message = `Booking #${bookingId}\n\n${body}\n\nThank you for using OneStopShop!`;
  return sendMessage(customerPhone, message);
}

module.exports = {
  sendMessage,
  sendBookingConfirmation,
  sendNewBookingNotification,
  sendStatusUpdate,
};
