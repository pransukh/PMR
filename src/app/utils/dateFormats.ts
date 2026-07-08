import { MONTH_3_CHAR_NAME, MONTH_FULL_NAME } from '../constants/Months'

export const formatDate = (inputDate: Date | string , toFormat: string): string => {
    const date = new Date(inputDate);
    if (isNaN(date.getTime())) {
        return '';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return getFormattedDate(day,month,year, toFormat);
};


function getFormattedDate(
    day: string,
    month: string,
    year: number,
    toFormat: string
) {
    switch (toFormat) {
        case 'DD-MM-YYYY':
            return `${day}-${month}-${year}`;
        
        case 'DD-MMMM-YYYY':
            const monthIndex = parseInt(month, 10) - 1;
            return `${day} ${MONTH_FULL_NAME[monthIndex]} ${year}`;

        case 'MM-DD-YYYY':
            return `${month}-${day}-${year}`;

        case 'YYYY-MM-DD':
            return `${year}-${month}-${day}`;

        case 'DD/MM/YYYY':
            return `${day}/${month}/${year}`;

        case 'MM/DD/YYYY':
            return `${month}/${day}/${year}`;

        case 'YYYY/MM/DD':
            return `${year}/${month}/${day}`;

        case 'DD MMM YYYY': {
            const monthIndex = parseInt(month, 10) - 1;
            return `${day} ${MONTH_3_CHAR_NAME[monthIndex]} ${year}`;
        }

        case 'MMM DD, YYYY': {
            const monthIndex = parseInt(month, 10) - 1;
            return `${MONTH_3_CHAR_NAME[monthIndex]} ${day}, ${year}`;
        }

        default:
            return `${day}-${month}-${year}`;
    }
}
