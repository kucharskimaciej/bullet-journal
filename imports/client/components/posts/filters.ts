enum weekdays {
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
}
enum months {
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
}

interface IEnum {
    [id: number]: string;
}

interface IDateFilterOptions {
    values?: IEnum;
    defaultValue?: string;
}

const weekdayFilterOptions: IDateFilterOptions = {
    values: weekdays,
    defaultValue: ""
};

const monthFilterOptions:IDateFilterOptions = {
    values: months,
    defaultValue: ""
};

export function time(date: Date): string {
    const hours = date.getHours() < 10 ?  `0${date.getHours()}` : String(date.getHours());
    const minutes = date.getMinutes() < 10 ?  `0${date.getMinutes()}` : String(date.getMinutes());

    return `${hours}:${minutes}`;
}

export function weekday(date: Date, opts: IDateFilterOptions = weekdayFilterOptions): string {
        return opts.values[date.getDay()] || opts.defaultValue;
}
export function dayInMonth(date: Date): string {
        return date.getDate() < 10 ? `0${date.getDate()}` : String(date.getDate());
}
export function month(date: Date, opts: IDateFilterOptions = monthFilterOptions): number {
        return date.getMonth() + 1;
}
export function year(date: Date): number {
        return date.getFullYear() - 2000;
}
