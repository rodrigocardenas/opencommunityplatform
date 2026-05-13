export class SyncService {
    private static STORAGE_KEY = 'ocp_offline_reports';

    static saveReport(report: any) {
        const reports = this.getReports();
        reports.push({
            ...report,
            id: Date.now(),
            synced: false,
            created_at: new Date().toISOString()
        });
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reports));
    }

    static getReports() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    static removeReport(id: number) {
        const reports = this.getReports().filter((r: any) => r.id !== id);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reports));
    }

    static hasPendingReports() {
        return this.getReports().length > 0;
    }
}
