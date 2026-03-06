// ─────────────────────────────────────────────────────────────────────────────
//  userDB.js  —  CropWise User Database (localStorage-backed)
//  Folder: src/userDB.js  (same folder as App.jsx)
//
//  HOW IT WORKS:
//  • All registered users are stored in localStorage under the key "cw_users"
//  • Each user entry: { name, phone, password }
//  • Login can match by PHONE  or  by NAME  (used as "username" on login page)
// ─────────────────────────────────────────────────────────────────────────────

const DB_KEY = "cw_users";

/** Load all users from storage. Returns array of user objects. */
function _loadUsers() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Save the full users array back to storage. */
function _saveUsers(users) {
  localStorage.setItem(DB_KEY, JSON.stringify(users));
}

// ─────────────────────────────────────────────────────────────────────────────
//  PUBLIC API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Register a new user.
 * @param {{ name: string, phone: string, password: string }} userData
 * @returns {{ success: boolean, error?: string }}
 */
export function registerUser({ name, phone, password }) {
  const users = _loadUsers();

  // Check for duplicate phone
  if (users.find(u => u.phone === phone)) {
    return { success: false, error: "This phone number is already registered." };
  }

  // Check for duplicate name (used as username)
  if (users.find(u => u.name.toLowerCase() === name.toLowerCase())) {
    return { success: false, error: "This name is already taken. Choose another." };
  }

  users.push({ name, phone, password });
  _saveUsers(users);
  return { success: true };
}

/**
 * Login with phone + OTP flow — just checks if phone exists.
 * @param {string} phone
 * @returns {{ success: boolean, user?: object, error?: string }}
 */
export function getUserByPhone(phone) {
  const users = _loadUsers();
  const user = users.find(u => u.phone === phone);
  if (!user) return { success: false, error: "Phone number not registered. Please sign up first." };
  return { success: true, user };
}

/**
 * Login with username (name) + password.
 * @param {string} username   — the Full Name used during registration
 * @param {string} password
 * @returns {{ success: boolean, user?: object, error?: string }}
 */
export function loginWithPassword(username, password) {
  const users = _loadUsers();
  const user = users.find(u => u.name.toLowerCase() === username.toLowerCase());
  if (!user) return { success: false, error: "Username not found. Please check or register." };
  if (user.password !== password) return { success: false, error: "Incorrect password." };
  return { success: true, user };
}

/**
 * Returns all stored users (for debugging only — remove in production).
 * @returns {object[]}
 */
export function getAllUsers() {
  return _loadUsers();
}