function truncateText(value, maxLength) {
  const text = String(value || '').trim();
  return text.length > maxLength ? text.slice(0, maxLength).trim() : text;
}

function formatE164(rawNumber) {
  if (rawNumber === undefined || rawNumber === null) {
    return null;
  }

  let cleaned = String(rawNumber).trim();

  if (cleaned.startsWith('+')) {
    cleaned = cleaned.slice(1);
  }

  cleaned = cleaned.replace(/\D/g, '');

  if (cleaned.startsWith('0')) {
    cleaned = `27${cleaned.slice(1)}`;
  }

  if (cleaned.length < 10 || cleaned.length > 15) {
    return null;
  }

  return cleaned;
}

function buildWhatsappUrl(rawNumber, messageText) {
  const e164 = formatE164(rawNumber);

  if (!e164) {
    return null;
  }

  return `https://wa.me/${e164}?text=${encodeURIComponent(messageText || '')}`;
}

function buildContactMessage(mechanicName, clientName, serviceDescription) {
  const safeMechanicName = truncateText(mechanicName, 80) || 'there';
  const safeClientName = truncateText(clientName, 80) || 'A potential client';
  const safeDescription = truncateText(serviceDescription, 120) || 'general mechanical work';
  const message = `Hi ${safeMechanicName}, my name is ${safeClientName} and I found your profile on OneStopShop. I'm looking for help with: ${safeDescription}. Are you available to assist?`;

  return truncateText(message, 300);
}

function buildBookingNotificationMessage(bookingId, userName, description, preferredSchedule) {
  const safeUserName = truncateText(userName, 80) || 'a client';
  const safeDescription = truncateText(description, 160) || 'mechanical work';
  const schedule = new Date(preferredSchedule).toLocaleString('en-ZA', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return `Hi, you have a new booking request (#${bookingId}) on OneStopShop from ${safeUserName}. Service needed: ${safeDescription}. Preferred time: ${schedule}. Please log in to accept or decline.`;
}

module.exports = {
  formatE164,
  buildWhatsappUrl,
  buildContactMessage,
  buildBookingNotificationMessage,
};
