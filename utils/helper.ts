import moment from 'moment';

// validate url
export const validateUrl = (value: string) => {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
};

// return session time left in hours
export const getSessionTimeLeft = (time: string) => {
  const currentTime = moment();
  const lastMessageTime = moment(time);
  const timeDifference = lastMessageTime.add(1, 'day').diff(currentTime);
  const hours = Math.max(Math.ceil(moment.duration(timeDifference).asHours()), 0);
  return Math.min(hours, 24);
};

export const numberToAbbreviation = (numberString: string) => {
  const number = parseInt(numberString, 10);
  let abbreviation = '';
  if (number < 1000) {
    abbreviation = number.toString();
  } else if (number >= 1000 && number < 1000000) {
    abbreviation = `${(number / 1000).toFixed(0)}k`;
  } else if (number >= 1000000 && number < 1000000000) {
    abbreviation = `${(number / 1000000).toFixed(0)}m`;
  }
  return abbreviation;
};
