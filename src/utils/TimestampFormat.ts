import { isSameWeek, isSameYear } from 'date-fns';
import TimeAgo from 'javascript-time-ago'
import dateFormat from "dateformat";

import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

const timeAgo = new TimeAgo('en-US')

class TimestampFormat {

    static shortest = (timestamp: number) => {
        const now = Date.now();
        const date = new Date(timestamp); // Convert to milliseconds

        if (isSameWeek(now, date)) {
            return timeAgo.format(timestamp);
        } else if (isSameYear(now, date)) {
            return dateFormat(timestamp, 'mmm d');
        } else {
            return dateFormat(timestamp, 'mmm d, yyyy');
        }
    }

}

export default TimestampFormat
