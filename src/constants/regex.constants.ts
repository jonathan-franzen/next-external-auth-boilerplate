// Check if email
export const EMAIL_VALIDATION_REGEX = /^\S+@\S+\.\S+$/;

// Match accepted passwords as defined in backend validators.
export const PASSWORD_VALIDATION_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{8,}$/;
