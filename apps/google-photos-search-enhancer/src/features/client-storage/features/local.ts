const UPDATE_TIME_KEY = 'updateTime';

if (!getTimeStamp()) {
  setTimeStamp();
}


export function checkNotFirstVisit() {
  if (!localStorage.noFirstVisit) {
    console.log('first time');
    localStorage.noFirstVisit = '1';
    return false;
  }
  return localStorage.noFirstVisit;
}

export function setTimeStamp(isUpdated = true) {
  if (isUpdated) {
    localStorage.setItem(UPDATE_TIME_KEY, String(new Date()));
  } else {
    localStorage.setItem(UPDATE_TIME_KEY, '');
  }
}


/**
 *
 * @returns a date object or a empty string
 */
export function getTimeStamp() {
  return localStorage.getItem(UPDATE_TIME_KEY);
}

/**
 * set the latest update time
 * @returns
 */
export function setUpdateTime() {
  setTimeStamp();
  return getTimeStamp();
}
