import { randomUUID } from 'crypto';

const store = {
  reports: [],
  alerts: []
};

export function create(collection, data) {
  const item = { id: randomUUID(), createdAt: new Date().toISOString(), ...data };
  store[collection].push(item);
  return item;
}

export function list(collection) {
  return [...store[collection]].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function countRecentReports(hours = 6) {
  const limit = Date.now() - hours * 60 * 60 * 1000;
  return store.reports.filter((report) => new Date(report.createdAt).getTime() >= limit).length;
}
