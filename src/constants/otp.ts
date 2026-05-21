export const OTP_CONTEXTS = {
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot_password',
  CHANGE_EMAIL: 'change_email',
  CHANGE_USERNAME: 'change_username',
  DELETE_ACCOUNT: 'delete_account',
  RECOVERY_EMAIL: 'recovery_email',
  LOGIN_FALLBACK: 'login_fallback',
} as const;

export type OtpContext = (typeof OTP_CONTEXTS)[keyof typeof OTP_CONTEXTS];

export const OTP_TTL_MINUTES = 5;
export const RESET_TOKEN_TTL_MINUTES = 30;
export const MAX_OTP_ATTEMPTS = 5;
export const OTP_BASE_COOLDOWN_SECONDS = 60;
export const OTP_MAX_COOLDOWN_SECONDS = 86400; // 24 hours

export const CHANGE_COOLDOWN_DAYS = 15;

export const OTP_DAILY_LIMITS: Record<string, number> = {
  register: 5,
  forgot_password: 5,
  change_email: 3,
  change_username: 3,
  delete_account: 3,
  recovery_email: 3,
  login_fallback: 5,
};
