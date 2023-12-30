// Event listener for messages from the main thread
onmessage = function (e) {
  console.log('Worker: Message received from main script', e);
  const result = 'Worker says: ' + e.data;

  // Do some work like calculations or processing

  // Send data back to the main thread
  postMessage(result);
};
