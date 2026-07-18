

const WA_REVERSED_DIGITS = [
  
  '2','4','3','0','1','1','0','9','3','3','2','9'
];

const WA_DEFAULT_MESSAGE =
  "Hello Vizdom Ceramics, I'd like to ask about your products.";


const CONTACT_EMAIL = 'vizdomceramics@gmail.com';


function getWhatsAppNumber() {
  return WA_REVERSED_DIGITS.slice().reverse().join('');
}


function buildWhatsAppLink(customMessage) {
  const number = getWhatsAppNumber();
  const text = encodeURIComponent(customMessage || WA_DEFAULT_MESSAGE);
  return `https://wa.me/${number}?text=${text}`;
}


function getDisplayPhoneNumber() {
  const n = getWhatsAppNumber(); // e.g. 923001234567
  return `+${n.slice(0, 2)} ${n.slice(2, 5)} ${n.slice(5)}`;
}
