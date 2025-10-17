// Local sync utilities for transactions (public copy)
// This file is placed in public/assets so it can be imported by browser modules.
const LS_KEY = 'local_transactions_v1';

function readLocalTransactions() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading local transactions', e);
    return [];
  }
}

function writeLocalTransactions(arr) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(arr));
  } catch (e) {
    console.error('Error writing local transactions', e);
  }
}

export function saveLocalTransaction(tx) {
  const arr = readLocalTransactions();
  arr.push(tx);
  writeLocalTransactions(arr);
}

export function removeLocalTransactionById(id) {
  const arr = readLocalTransactions().filter((t) => t._localId !== id);
  writeLocalTransactions(arr);
}

export async function sendTransactionToServer(formData) {
  try {
    const resp = await fetch('/api/transactions', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    if (!resp.ok) {
      throw new Error(`Server responded ${resp.status}`);
    }
    return { ok: true };
  } catch (err) {
    console.error('Failed to send transaction to server', err);
    return { ok: false, error: err };
  }
}

export function getLocalTransactionsForRange(startISO, endISO) {
  const arr = readLocalTransactions();
  return arr.filter((t) => {
    if (!t.created_at) return false;
    const d = new Date(t.created_at);
    const s = new Date(startISO);
    const e = new Date(endISO);
    return d >= s && d <= e;
  });
}

export default {
  saveLocalTransaction,
  removeLocalTransactionById,
  sendTransactionToServer,
  getLocalTransactionsForRange,
};