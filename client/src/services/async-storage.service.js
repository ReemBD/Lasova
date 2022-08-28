// A temporary file to mimic remote server CRUDL requests via localStorage

import { makeId } from './util.service';

export const storageService = {
  post, // Create (add 1 new item)
  postMany, // add array of new items
  get, // Read (get one by id)
  query, // List (get many)
  put, // Update
  remove, // Delete (one by id)
};

function query(dbName) {
  // mimic loading time
  setTimeout(() => {}, 500);
  const entities = JSON.parse(localStorage.getItem(dbName)) || [];
  return Promise.resolve(entities);
}

async function get(dbName, entityId) {
  const entities = await query(dbName);
  return entities.find((entity) => entity._id === entityId);
}

// create
async function post(dbName, newEntity) {
  newEntity._id = makeId();
  const entities = await query(dbName);
  entities.push(newEntity);
  _save(dbName, entities);
  return newEntity;
}

// update
async function put(dbName, updatedEntity) {
  const entities = await query(dbName);
  const idx = entities.findIndex((entity) => entity._id === updatedEntity._id);
  entities.splice(idx, 1, updatedEntity);
  _save(dbName, entities);
}

async function remove(dbName, entityId) {
  const entities = await query(dbName);
  const idx = entities.findIndex((entity) => entity._id === entityId);
  entities.splice(idx, 1);
  _save(dbName, entities);
}

async function postMany(dbName, newEntities) {
  const entities = await query(dbName);
  newEntities.forEach((entity) => {
    entity._id = makeId();
  });
  entities.push(...newEntities);
  _save(dbName, entities);
}

function _save(dbName, entities) {
  localStorage.setItem(dbName, JSON.stringify(entities));
}
