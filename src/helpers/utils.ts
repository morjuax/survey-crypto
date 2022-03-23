import moment from 'moment';

export function getTimestampNowUtc(): number {
  return moment().utc().unix();
}

