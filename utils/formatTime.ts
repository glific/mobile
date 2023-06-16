function formatTime(dateObj: Date): string {
  const currentTime: Date = new Date();
  const timeDifference: number = currentTime - dateObj;

  // Less than 30 minutes
  if (timeDifference < 30 * 60 * 1000) {
    const minutes: number = Math.floor(timeDifference / (60 * 1000));
    return `${minutes} mins`;
  }

  // More than 30 minutes from current
  if (timeDifference > 30 * 60 * 1000 && timeDifference < 24 * 60 * 60 * 1000) {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    return dateObj.toLocaleString('en-US', options);
  }

  // Yesterday
  const yesterday: Date = new Date(currentTime);
  yesterday.setDate(currentTime.getDate() - 1);
  if (
    dateObj.getDate() === yesterday.getDate() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getFullYear() === yesterday.getFullYear()
  ) {
    return 'Yesterday';
  }

  // Date format (6 Jun)
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
  const formattedDate: string = dateObj.toLocaleString('en-US', options);
  return formattedDate;
}

export default formatTime;
