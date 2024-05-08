import {getAllUsers} from 'api/users';

export const getDateString = (date: Date) =>
  date.toLocaleDateString('wo').split('-').join(' - ');

export const getAge = (birthDate: Date) => {
  const today = new Date();
  var years = today.getFullYear() - birthDate.getFullYear();
  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
  ) {
    years--;
  }
  return years;
};

export const isUsernameValid = (username: string) => {
  const regex = /^[a-zA-Z1-9.\-_]+$/g;
  const isValid = regex.test(username);

  if (!isValid) {
    return false;
  }

  return true;
};

export const isUsernameTaken = async (username: string) => {
  const fetchedUsers = await getAllUsers();

  const isNameTaken = fetchedUsers.some(user => user.username === username);

  if (isNameTaken) {
    return true;
  }

  return false;
};

export const isBirthDateValid = (date: Date) => {
  const dateAtMidnight = new Date(date);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  dateAtMidnight.setHours(0, 0, 0, 0);

  return dateAtMidnight < today;
};
