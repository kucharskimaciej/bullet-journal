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


export function weekday(date: Date, opts: IDateFilterOptions = weekdayFilterOptions): string {
        return opts.values[date.getDay()] || opts.defaultValue;
}
export function dayInMonth(date: Date): number {
        return date.getDate();
}
export function month(date: Date, opts: IDateFilterOptions = monthFilterOptions): string {
        return opts.values[date.getMonth()] || opts.defaultValue;
}
export function year(date: Date): number {
        return date.getFullYear();
}
