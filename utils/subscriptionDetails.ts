export const getSubscriptionDetails = (action: string, subscriptionData: any) => {
  let newMessage: any;
  let contactId = 0;
  let collectionId = 0;
  let messageStatusData: any;
  let contact: any;

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
