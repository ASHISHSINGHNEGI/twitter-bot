export class Logger {
    private static getTime(): string {
        return new Date().toISOString();
    }

    static info(message: string, ...optionalParams: any[]): void {
        console.info(`[INFO] [${Logger.getTime()}]: ${message}`, ...optionalParams);
    }

    static warn(message: string, ...optionalParams: any[]): void {
        console.warn(`[WARN] [${Logger.getTime()}]: ${message}`, ...optionalParams);
    }

    static error(message: string, ...optionalParams: any[]): void {
        console.error(`[ERROR] [${Logger.getTime()}]: ${message}`, ...optionalParams);
    }

    static debug(message: string, ...optionalParams: any[]): void {
        if (process.env.NODE_ENV === 'development') {
            console.debug(`[DEBUG] [${Logger.getTime()}]: ${message}`, ...optionalParams);
        }
    }
}