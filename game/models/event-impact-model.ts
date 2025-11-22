
// every value which is not supposted to be impacted by the event should be set null
// number values: give the change relative to the old value
// string values: give the new value with which the existing one is overwritten

export interface EventImpactModel {
    newOccupationTitle: string  | null;
    newOccupationDescription: string | null;
    changeInYearlySalaryInEuro: number | null;
    changeInStressLevelFrom0To100: number | null;

    changeInCashInEuro: number | null;
    changeInCryptoInEuro: number | null;
    changeInEtfInEuro: number | null;

    changeInYearlyRentInEuro: number | null;
    newZip: string | null;
    changeInSizeInSquareMeter: number | null;

    changeInSavingsRateInPercent: number | null;
    changeInAmountOfChildren: number | null;
    newEducationLevel: string | null;
    changeInLifeSatisfactionFrom1To100: number | null;
    newMarried: boolean | null;
}