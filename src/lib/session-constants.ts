// Kept separate from lib/auth.ts because that file uses Node's "crypto"
// module, which is not available in the Edge runtime that middleware.ts
// runs on. Anything imported by middleware.ts must avoid that import.
export const SESSION_COOKIE_NAME = "kyronex_admin_session";