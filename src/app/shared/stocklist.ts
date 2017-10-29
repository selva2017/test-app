export interface StockList {
//    Order from Service
    amount: number;
    bfAct: number;
    bfTgt: number;
    billedQty: string;
    gsmAct: number;
    gsmTgt: number;
    joints: number;
    length1: number;
    moist: number;
    rate: string;
    realDia: number;
    reelLen: number;
    sizeAct: number;
    sizeAct1: number;
    sizeTgt1: number;
    stockItemDetailsId: number;
    stockItemName: string;
    temp: number;
    units: string;
    voucherEffectiveDate: string;
    voucherKey: string;
    voucherNumber: string;

    // Order from Postman
// voucherNumber: string;
// voucherEffectiveDate: string;
// stockItemName: string;
// rate: string;
// amount: number;
// billedQty: string;
// gsmTgt: number;
// gsmAct: number;
// bfTgt: number;
// bfAct: number;
// sizeAct: number;
// reelLen: number;
// joints: number;
// realDia: number;
// moist: number;
// sizeTgt1: number;
// sizeAct1: number;
// length1: number;
// temp: number;
// units: string;
// stockItemDetailsId: number;
// voucherKey: string;
}
// export interface StockList {
//     action: string;
//     alterdon: string;
//     voucherType: string;
//     voucherNumber: string;
//     voucherTypeName: string;
//     voucherKey: string;
//     voucherEffectiveDate: string;
//     persistedView: string;
//     alterId: string;
//     masterId: string;
//     dateAlt: string;
//     dateEnt: string;
//     oprDate: string;
//     realWeight: string;
//     startTime: string;
//     rewindStart: string;
//     rewindEnd: string;
//     operatedBy: string;
//     foreman1: string;
//     stockDetails: [
//         {
//             stockDetailsId: string;
//             stockItemName: string;
//             rate: string;
//             amount: string;
//             billedQty: string;
//             actualQty: string;
//             status: string;
//             voucherKey: string;
//         }];
//     stockItemDetails: [
//         {
//             gsmTgt: string;
//             gsmAct: string;
//             bfTgt: string;
//             bfAct: string;
//             sizeAct: string;
//             reelLen: string;
//             joints: string;
//             realDia: string;
//             moist: string;
//             sizeTgt1: string;
//             sizeAct1: string;
//             length1: string;
//             temp: string;
//             units: string;
//             stockItemDetailsId: string;
//             stockDetailsId: string;
//             voucherKey: string;
//         }];
// }