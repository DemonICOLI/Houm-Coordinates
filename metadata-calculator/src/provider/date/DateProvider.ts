export interface DateProvider {
	hoursBetweenTwoDates(date1: string, date2: string): number;
	areDatesSameDay(date1: string, date2: string): boolean;
}
