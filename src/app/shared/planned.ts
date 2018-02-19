export interface Planned {
    plannedDate: string;
    batchNumber: string;
    items: [
        {
            salesOrderPlannedId: string;
            id: string;
            orderNumber: string;
            voucherKey: string;
            orderDate: string;
            company: string;
            bf: string;
            gsm: string;
            size: string;
            weight: string;
            newWeight: string;
            reel: string;
            orderStatus: string;
            altered: string;
        }];
}