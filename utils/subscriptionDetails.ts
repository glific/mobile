let subscriptionRequests: any = [];

// function to determine if we should continue to use subscription or use refetch
export const switchSubscriptionToRefetch = () => {
  let useRefetch = false;

  const now = Date.now();
  const allowedDuration = now - 1000 * 5;
  let requestCount = 0;

  // as recent requests are at the end of the array, search the array
  // from back to front
  for (let i = subscriptionRequests.length - 1; i >= 0; i -= 1) {
    if (subscriptionRequests[i] >= allowedDuration) {
      requestCount += 1;
    } else {
      break;
    }
  }

  if (requestCount >= 15) {
    useRefetch = true;
  }

  return useRefetch;
};

// function to record the number of subscription calls
export const recordRequests = () => {
  const requestTrimThreshold = 5000;
  const requestTrimSize = 4000;

  subscriptionRequests.push(Date.now());

  // now keep requests array from growing forever
  if (subscriptionRequests.length > requestTrimThreshold) {
    subscriptionRequests = subscriptionRequests.slice(
      0,
      subscriptionRequests.length - requestTrimSize
    );
  }
};

export const getSubscriptionDetails = (action: string, subscriptionData: object) => {
  let newMessage;
  let contactId = 0;
  let collectionId = 0;
  let messageStatusData;
  let contact;

  switch (action) {
    case 'SENT':
      // set the receiver contact id
      newMessage = subscriptionData.data.sentMessage;
      contactId = subscriptionData.data.sentMessage.receiver.id;
      contact = subscriptionData.data.sentMessage.contact;
      break;
    case 'RECEIVED':
      // set the sender contact id
      newMessage = subscriptionData.data.receivedMessage;
      contactId = subscriptionData.data.receivedMessage.sender.id;
      contact = subscriptionData.data.receivedMessage.contact;
      break;
    case 'COLLECTION':
      newMessage = subscriptionData.data.sentGroupMessage;
      collectionId = subscriptionData.data.sentGroupMessage.groupId.toString();
      break;
    case 'STATUS':
      // set the receiver contact id
      messageStatusData = subscriptionData.data.updateMessageStatus;
      contactId = subscriptionData.data.updateMessageStatus.receiver.id;
      break;
    default:
      break;
  }

  return {
    newMessage,
    contactId,
    collectionId,
    messageStatusData,
    contact,
  };
};
