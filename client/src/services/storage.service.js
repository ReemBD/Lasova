export const storageService = {
  setItem,
  getItem,
  removeItem,
};

const LASOVA_STORAGE_PREFIX = `LASOVA`;

function setItem(key, value, isSession = false) {
  const storage = isSession ? sessionStorage : localStorage;
  key = `${LASOVA_STORAGE_PREFIX}_${key}`;
  const stringified = JSON.stringify(value);
  return storage.setItem(key, stringified);
}

function getItem(key, isSession = false) {
  const storage = isSession ? sessionStorage : localStorage;
  key = `${LASOVA_STORAGE_PREFIX}_${key}`;
  const raw = storage.getItem(key);
  return JSON.parse(raw);
}

function removeItem(key) {
  key = `${LASOVA_STORAGE_PREFIX}_${key}`;
  localStorage.removeItem(key);
}
