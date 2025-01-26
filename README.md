# Uncommon Firebase Firestore Transaction Bug

This repository demonstrates a subtle bug related to asynchronous operations within Firebase Firestore transactions. The error arises from incorrectly managing the promise returned by `get()` within the transaction's callback. This leads to unexpected behavior or failures.

## Bug Description
The primary issue lies in not properly handling the asynchronous nature of `get()`. If the transaction callback attempts to use the result of `get()` synchronously, the transaction will fail.  The provided code highlights the correct approach, which involves returning a Promise from the transaction callback and using `.then()` to handle the result.

## Solution
The solution involves correctly chaining Promises and returning the relevant result. Ensuring the `transaction` function returns a Promise guarantees proper transaction completion and error handling.