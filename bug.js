The following code snippet demonstrates an uncommon Firebase error related to handling asynchronous operations within a transaction.  The issue stems from incorrectly managing the promise returned by `get()` within the transaction's callback.  The `get()` method is asynchronous, and if the transaction callback expects a synchronous result, it may lead to unexpected behavior or failures.

```javascript
firebase.firestore().runTransaction(transaction => {
  return transaction.get(someDocRef).then(doc => {
    if (!doc.exists) {
      throw new Error('Document does not exist!');
    }
    const newCount = doc.data().count + 1;
    transaction.update(someDocRef, { count: newCount });
    return newCount; // Returning a value here is crucial for the transaction
  });
}).then(result => {
  console.log('Transaction successful:', result); // Correctly handles the returned value
}).catch(error => {
  console.error('Transaction failed:', error);
});
```