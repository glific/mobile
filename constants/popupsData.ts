export const getPopupData = (task: string) => {
  switch (task) {
    case 'terminate':
      return {
        title: 'Terminate Flows!',
        description:
          'All active flows for the contact will be stopped. They can initiate a flow via keyword or you will need to do it manually.',
        cancelText: 'CANCEL',
        successToast: 'Flow terminated successfully!',
        errorToast: 'Error terminating flow!',
      };
    case 'clear':
      return {
        title: 'Are you sure you want to clear all conversation for this contact?',
        description:
          'All the conversation data for this contact will be deleted permanently from Glific. This action cannot be undone. However, you should be able to access it in reports if you have backup configuration enabled.',
        cancelText: 'CANCEL',
        successToast: 'Conversation cleared successfully!',
        errorToast: 'Error clearing conversation!',
      };
    case 'block':
      return {
        title: 'Do you want to block this contact?',
        description: 'You will not be able to view their chats and interact with them again.',
        cancelText: 'CANCEL',
        successToast: 'Contact blocked successfully!',
        errorToast: 'Error blocking contact!',
      };
    default:
      return {
        title: 'Alert',
        description: '',
        cancelText: 'CANCEL',
        successToast: '',
        errorToast: '',
      };
  }
};
