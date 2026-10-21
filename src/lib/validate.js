const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (name.length < 2) {
    errors.name = "Enter your name (at least 2 characters).";
  } else if (name.length > 80) {
    errors.name = "Use a name under 80 characters.";
  }

  if (!EMAIL.test(email)) {
    errors.email = "Enter a valid email address.";
  } else if (email.length > 120) {
    errors.email = "Use an email under 120 characters.";
  }

  if (message.length < 10) {
    errors.message = "Enter a message of at least 10 characters.";
  } else if (message.length > 2000) {
    errors.message = "Keep the message under 2,000 characters.";
  }

  return errors;
}
