export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s])[\S]{8,64}$/;
export const PASSWORD_MESSAGE = 'Password must contain uppercase, lowercase, number and special character';

export const USERNAME_REGEX = /^(?=[a-z0-9._]{3,20}$)(?!.*[._]{2})[a-z0-9][a-z0-9._]*[a-z0-9_]$/;
export const USERNAME_MESSAGE = 'Username must be 3-20 characters: lowercase letters, numbers, dots, underscores. No consecutive dots/underscores';
