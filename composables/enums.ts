export const useAccountingDocCodeEnums = {
    prf: "FM-ACS-001-1",
    payroll_liquidation: "FM-TRS-001-1",
    cash_return_slip: "FM-TRS-002-3",
    provisional_receipt: "FM-TRS-002-2",
    memorandum_of_deposit: "FM-TRS-002-1",
    cash_advance_summary: "FM-TRS-001-3",
    replenishment_summary: "FM-TRS-001-2",
    liquidation_form: "FM-TRS-001-1",
    cv: "FM-ACS-001-1",
    dv: "FM-ACS-001-1",
}
export const useProjectMarketingStatusEnums = {
    stages: ["draft", "proposal", "bidding", "awarded", "generate_to_tss"]
}
export const useInventoryDocCode = {
    requisition_slip: "FM-IMS-001-1",
    daily_inventory_report: "FM-IMS-002-7",
    monthly_inventory_evaluation_report: "FM-IMS-002-6",
    mrr: "FM-IMS-002-1",
    turnover_slip: "FM-IMS-002-5",
}
export const DetailedEstimatesType = {
    material: "materials",
    labor: "labor_expense",
    equipment: "equipment_rental",
}
export const DetailedEstimatesUnitIndex = {
    material: 1,
    labor: 2,
    equipment: 3,
}
export const AccountingRequestStatus = {
    draft: "Draft",
    pending: "Pending",
    approved: "Approved",
    denied: "Denied",
}
export const AccountingProgressIndicatorTypeStatus = {
    PENDING: "pending",
    IN_PROGRESS: "in_progress",
    DONE: "done",
}
