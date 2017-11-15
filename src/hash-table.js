/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const { LimitedArray, getIndexBelowMax } = require('./hash-table-helpers');

// LimitedArray, and getIndexBelowMax are two tools provided for you in the helper file.
// There are other methods on the LimitedArray class in the './hash-table-helpers' file that you can use for your implementation.

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }
  // Adds the given key, value pair to the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // If no bucket has been created for that index, instantiate a new bucket and add the key, value pair to that new bucket
  // If the key already exists in the bucket, the newer value should overwrite the older value associated with that key
  resize() {
    this.limit *= 2;
    const oldStorage = this.storage;
    this.storage = new LimitedArray(this.limit);
    oldStorage.each((bucket) => {
      if (!bucket) return; // exits the callback function, not the loop. continues to iterate through each item
      bucket.forEach((pair) => {
        this.insert(pair[0], pair[1]);
      });
    });
  }
  capacityIsFull() {
    let fullCells = 0;
    this.storage.each((bucket) => {
      if (bucket !== undefined) fullCells++;
    });
    return fullCells / this.limit >= 0.75;
  }

  insert(key, value) {
    if (this.capacityIsFull()) this.resize();
    const index = getIndexBelowMax(key.toString(), this.limit);
    let bucket = this.storage.get(index) || [];
    // filter bucket to remove any value === key
    bucket = bucket.filter(pair => pair[0] !== key);
    // add key value pair into the bucket
    bucket.push([key, value]);
    // sets value of bucket to the index provided in the hash table
    this.storage.set(index, bucket);
    /* my code from my attempts with my partner:
    if (this.capacityIsFull()) this.resize();
    const index = getIndexBelowMax(key.toString(), this.limit);
    if (this.storage[index] === undefined) {
      this.storage[index] = [key, value];
    } else {
      this.storage[index][1] = value;
    }
    */
    /* teacher code from review
    const index = getIndexBelowMax(key.toString(), this.limit);
    let bucket = this.storage.get(index) \\ [];
    bucket = bucket.filter(pair => pair[0] !== key); //bucket is an array, filter is a method on Array(higher order function) callback will return T(will place current item into a new array) or F(will not send to new array), returns new array
    bucket.push([key, value]);
    this.storage.set(index, bucket);
    OR
    let foundPair = false;
    for (let i = 0; i <bucket.length; i++) {
      if (bucket[i][0] === key) {
      bucket[i][1] = value;
      foundPair = true;
      }
    }
    if (!foundPair) bucket.push([key, value]);
    this.storage.set(index, bucket);
    */
  }
  // Removes the key, value pair from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Remove the key, value pair from the bucket
  remove(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    let bucket = this.storage.get(index);
    if (bucket) {
      bucket = bucket.filter(pair => pair[0] !== key);
      this.storage.set(index, bucket);
    }
    /* my code from my attempts with my partner
    const index = getIndexBelowMax(key.toString(), this.limit);
    if (this.storage[index] === undefined) return undefined;
    if (this.storage[index][0] === key) delete this.storage[index];
    */
    /* teacher code
    const index = getIndexBelowMax(key.toString(), this.limit);
    let bucket = this.storage.get(index);
    if (bucket) {
      bucket = bucket.filter(pair => return pair[0] !== key;);
      this.storage.set(index, bucket);
    }
    */
  }
  // Fetches the value associated with the given key from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Find the key, value pair inside the bucket and return the value
  retrieve(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
    let retrieved;
    if (bucket) {
      retrieved = bucket.filter(pair => pair[0] === key)[0];
    }
    return retrieved !== undefined ? retrieved[1] : undefined;
    /* my code from my attempts with my partner
    const index = getIndexBelowMax(key.toString(), this.limit);
    if (this.storage[index] === undefined) return undefined;
    return this.storage[index][1];
    */
  }
  /* teacher code
  const index = getIndexBelowMax(key.toString(), this.limit);
  const bucket = this.storage.get(index);
  let retrieved;
  if (bucket) {
    retrieved = bucket.filter(pair => pair[0] === key)[0];
    return retrieved ? retrieved[1] : undefined;
  }
  */
}

module.exports = HashTable;
