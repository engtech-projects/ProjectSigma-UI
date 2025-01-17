import { USER_ADMINISTRATOR } from "@/stores/hrms/setup/users"
const { data: userData } = useAuth()
export enum AccessibilityTypes {
    ADMIN_ONLY = "Admin Only Access",
    admin = "AdminOnly",
    hrms_group = "hrms:",
    // STANDALONES
    hrms_dashboard = "hrms:dashboard",
    hrms_announcement = "hrms:announcement",
    hrms_event_calendar = "hrms:event calendar",
    HRMS_LOCATION_EMPLOYEES = "hrms:location employees",
    hrms_hmo = "hrms:hmo",
    hrms_reports_group = "hrms:reports_",
    hrms_reports_sssemployeeremittance = "hrms:reports_sss employee remittance",
    hrms_reports_pagibigemployeeremittance = "hrms:reports_pagibig employee remittance",
    hrms_reports_philhealthemployeeremittance = "hrms:reports_philhealth employee remittance",
    hrms_reports_sssgroupremittance = "hrms:reports_sss group remittance",
    hrms_reports_pagibiggroupremittance = "hrms:reports_pagibig group remittance",
    hrms_reports_philhealthgroupremittance = "hrms:reports_philhealth group remittance",
    hrms_reports_sssremittancesummary = "hrms:reports_sss remittance summary",
    hrms_reports_pagibigremittancesummary = "hrms:reports_pagibig remittance summary",
    hrms_reports_philhealthremittancesummary = "hrms:reports_philhealth remittance summary",
    hrms_reports_loanreports = "hrms:reports_loan reports",
    hrms_reports_administrativereports = "hrms:reports_administrative reports",
    // ATTENDANCE
    hrms_attendance_group = "hrms:attendance_",
    hrms_attendance_attendance_portal = "hrms:attendance_attendance portal",
    hrms_attendance_failure_to_log = "hrms:attendance_failure to log",
    hrms_attendance_face_recognition = "hrms:attendance_face recognition",
    hrms_attendance_biomentrics = "hrms:attendance_biomentrics",
    hrms_attendance_attendance_login = "hrms:attendance_attendance login",
    hrms_attendance_qr_generator = "hrms:attendance_generate QR",
    hrms_attendance_qr_login = "hrms:attendance_attendance QR",
    hrms_attendance_attendance_logs = "hrms:attendance_attendance logs",
    hrms_attendance_dtr = "hrms:attendance_dtr",
    // EMPLOYEE
    hrms_employee_group = "hrms:employee_",
    hrms_employee_job_applicant = "hrms:employee_job applicant",
    hrms_employee_onboarding = "hrms:employee_onboarding",
    hrms_employee_manpowerrequest_group = "hrms:employee_manpower request_",
    hrms_employee_manpowerrequest_form = "hrms:employee_manpower request_form",
    hrms_employee_manpowerrequest_all_request = "hrms:employee_manpower request_all request",
    hrms_employee_manpowerrequest_approval = "hrms:employee_manpower request_approval",
    hrms_employee_manpowerrequest_my_request = "hrms:employee_manpower request_my request",
    hrms_employee_201_group = "hrms:employee_201_",
    hrms_employee_201_edit = "hrms:employee_201_edit",
    hrms_employee_201_PIS = "hrms:employee_201_pis",
    hrms_employee_201_staff_information_sheet = "hrms:employee_201_staff information sheet",
    hrms_employee_201_documents_memos = "hrms:employee_201_documents and memos",
    hrms_employee_201_id = "hrms:employee_201_id",
    hrms_employee_pan_group = "hrms:employee_pan_",
    hrms_employee_pan_form = "hrms:employee_pan_form",
    hrms_employee_pan_all_request = "hrms:employee_pan_all request",
    hrms_employee_pan_approval = "hrms:employee_pan_approval",
    hrms_employee_pan_my_request = "hrms:employee_pan_my request",
    // LOANS AND ADVANCES
    hrms_loans_and_advances_group = "hrms:loans and advances_",
    hrms_loans_and_advances_cash_advance_group = "hrms:loans and advances_cash advance",
    hrms_loans_and_advances_cash_advance_formsmyrequest = "hrms:loans and advances_cash advance_forms and my requests",
    hrms_loans_and_advances_cash_advance_allrequests = "hrms:loans and advances_cash advance_all requests",
    hrms_loans_and_advances_cash_advance_myapprovals = "hrms:loans and advances_cash advance_my approvals",
    hrms_loans_and_advances_loans = "hrms:loans and advances_loans",
    // hrms_loans_and_advances_loans_forms = "hrms:loans and advances_loans_forms",
    // hrms_loans_and_advances_loans_loans_list = "hrms:loans and advances_loans_list",
    // hrms_loans_and_advances_loans_payment_list = "hrms:loans and advances_payment_list",
    hrms_loans_and_advances_other_deductions = "hrms:loans and advances_other deductions",
    // hrms_loans_and_advances_other_deductions_forms = "hrms:loans and advances_other deductions_forms",
    // hrms_loans_and_advances_other_deductions_list = "hrms:loans and advances_other deductions_list",
    // hrms_loans_and_advances_other_deductions_payments = "hrms:loans and advances_other deductions_payments",
    // LEAVES AND OVERTIME
    hrms_lnotnto_group = "hrms:leaves and overtime_",
    hrms_lnotnto_leave_group = "hrms:leaves and overtime_leave_",
    hrms_lnotnto_leave_form = "hrms:leaves and overtime_leave_form",
    hrms_lnotnto_leave_list = "hrms:leaves and overtime_leave_list",
    hrms_lnotnto_leave_my_approvals = "hrms:leaves and overtime_leave_my approvals",
    hrms_lnotnto_overtime_group = "hrms:leaves and overtime_overtime_",
    hrms_lnotnto_overtime_form = "hrms:leaves and overtime_overtime_form",
    hrms_lnotnto_overtime_list = "hrms:leaves and overtime_overtime_list",
    hrms_lnotnto_overtime_my_request = "hrms:leaves and overtime_overtime_my request",
    hrms_lnotnto_overtime_my_approvals = "hrms:leaves and overtime_overtime_my approvals",
    hrms_lnotnto_travel_order_group = "hrms:leaves and overtime_travel order_",
    hrms_lnotnto_travel_order_form = "hrms:leaves and overtime_travel order_form",
    hrms_lnotnto_travel_order_list = "hrms:leaves and overtime_travel order_list",
    hrms_lnotnto_travel_order_my_request = "hrms:leaves and overtime_travel order_myrequest",
    hrms_lnotnto_travel_order_my_approvals = "hrms:leaves and overtime_travel order_myapprovals",
    // PAYROLL
    hrms_payroll_group = "hrms:payroll_",
    hrms_payroll_salary_group = "hrms:payroll_salary_",
    hrms_payroll_salary_generatepayroll_group = "hrms:payroll_salary_generate payroll_",
    hrms_payroll_salary_generatepayroll_form = "hrms:payroll_salary_generate payroll_form and my requests",
    hrms_payroll_salary_generatepayroll_allrequests = "hrms:payroll_salary_generate payroll_all request",
    hrms_payroll_salary_generatepayroll_myapprovals = "hrms:payroll_salary_generate payroll_my approvals",
    hrms_payroll_salary_payrollrecord = "hrms:payroll_salary_payroll records",
    hrms_payroll_salarydisbursement_group = "hrms:payroll_salary disbursement_",
    hrms_payroll_salarydisbursement_form = "hrms:payroll_salary disbursement_form and my requests",
    hrms_payroll_salarydisbursement_allrequests = "hrms:payroll_salary disbursement_all requests",
    hrms_payroll_salarydisbursement_myapprovals = "hrms:payroll_salary disbursement_my approvals",
    hrms_payroll_salarydisbursement_viewpayslips = "hrms:payroll_salary disbursement_view payslips",
    hrms_payroll_13thmonth = "hrms:payroll_13th month",
    hrms_payroll_allowance = "hrms:payroll_allowance",
    // SCHEDULE
    hrms_schedule_group = "hrms:schedule_",
    hrms_schedule_department = "hrms:schedule_department",
    hrms_schedule_employee = "hrms:schedule_employee",
    hrms_schedule_project = "hrms:schedule_project",
    // SETUP
    hrms_setup_group = "hrms:setup",
    hrms_setup_user_account = "hrms:setup_user account",
    hrms_setup_approvals = "hrms:setup_approvals",
    hrms_setup_department = "hrms:setup_department",
    hrms_setup_position = "hrms:setup_position",
    hrms_setup_allowance = "hrms:setup_allowance",
    hrms_setup_leaves = "hrms:setup_leaves",
    hrms_setup_pag_ibig = "hrms:setup_pag-ibig",
    hrms_setup_phil_health = "hrms:setup_philhealth",
    hrms_setup_sss = "hrms:setup_sss",
    hrms_setup_with_holding_tax = "hrms:setup_withholding tax",
    hrms_setup_settings = "hrms:setup_settings",
    hrms_setup_salary_grade = "hrms:setup_salary grade",
    hrms_setup_division = "hrms:setup_division",

    // INVENTORY
    inventory_group = "inventory:",
    inventory_dashboard = "inventory:dashboard",
    inventory_setup_group = "inventory:setup",
    inventory_setup_approvals = "inventory:setup_approvals",
    inventory_setup_item_group = "inventory:setup_item group",
    inventory_setup_unit_of_measurements = "inventory:setup_unit of measurements",
    inventory_item_profile_group = "inventory:item profile_",
    inventory_itemprofile_bulkupload = "inventory:item profile_bulk upload",
    inventory_item_profile = "inventory:item profile_item list",
    inventory_new_item_profile = "inventory:item profile_new profile",
    inventory_new_item_profile_all_request = "inventory:item profile_new profile all request",
    inventory_new_item_profile_my_approvals = "inventory:item profile_new profile my approvals",
    inventory_new_item_profile_forms_and_my_requests = "inventory:item profile_new profile forms and my requests",
    inventory_warehouse_group = "inventory:warehouse_overview_",
    inventory_warehouse_viewonly = "inventory:warehouse_overview_view only",
    inventory_warehouse_pssmanager = "inventory:warehouse_oveview_pss manager",
    inventory_bom_group = "inventory:bom_",
    inventory_bom_forms_and_my_requests = "inventory:bom_form and my requests",
    inventory_bom_all_request = "inventory:bom_all requests",
    inventory_bom_my_approvals = "inventory:bom_my approvals",
    inventory_bom_current_bom = "inventory:bom_current bom",
    inventory_procurement_group = "inventory:procurement_",
    inventory_procurement_suppliers_group = "inventory:procurement_suppliers_",
    inventory_procurement_all_request = "inventory:procurement_suppliers_all requests",
    inventory_procurement_forms_and_my_requests = "inventory:procurement_suppliers_form and my requests",
    inventory_procurement_my_approvals = "inventory:procurement_suppliers_my approvals",
    inventory_procurement_edit = "inventory:procurement_suppliers_edit",

    ACCOUNTING_GROUP = "accounting:",
    // Accounting Setup
    ACCOUNTING_SETUP_GROUP = "accounting:setup_",
    ACCOUNTING_SETUP_APPROVALS = "accounting:setup_approvals",
    ACCOUNTING_SETUP_ACCOUNTS = "accounting:setup_accounts",
    ACCOUNTING_SETUP_BOOK_OF_ACCOUNTS = "accounting:setup_book of accounts",
    ACCOUNTING_SETUP_ACCOUNT_GROUPS = "accounting:setup_account groups",
    ACCOUNTING_SETUP_ACCOUNT_TYPES = "accounting:setup_account types",
    ACCOUNTING_SETUP_POSTING_PERIODS = "accounting:setup_posting periods",
    ACCOUNTING_SETUP_CHART_OF_ACCOUNTS = "accounting:setup_chart of accounts",
    ACCOUNTING_SETUP_STAKEHOLDERS = "accounting:setup_stakeholders",
    ACCOUNTING_SETUP_SYNCHRONIZATION = "accounting:setup_synchronization",
    ACCOUNTING_SETUP_PARTICULAR_GROUP = "accounting:setup_particular group",
    ACCOUNTING_SETUP_TERMS = "accounting:setup_terms",

    // Accounting Request
    ACCOUNTING_REQUEST_GROUP = "accounting:request_",
    ACCOUNTING_REQUEST_PURCHASE_ORDER = "accounting:request_purchase order",
    ACCOUNTING_REQUEST_NON_PURCHASE_ORDER = "accounting:request_non purchase order",
    ACCOUNTING_REQUEST_PRE_PAYROLL_AUDIT = "accounting:request_pre payroll audit",

    // Accounting Voucher
    ACCOUNTING_VOUCHER_GROUP = "accounting:voucher_",
    ACCOUNTING_VOUCHER_DISBURSEMENT = "accounting:voucher_disbursement",
    ACCOUNTING_VOUCHER_CASH = "accounting:voucher_cash",

    // Accounting Journal
    ACCOUNTING_JOURNAL_ENTRY = "accounting:journal_journal entry",

    // PROJECT MONITORING
    project_monitoring_group = "project_monitoring:",
    project_monitoring_dashboard = "project_monitoring:dashboard",
    project_monitoring_projects = "project_monitoring:projects",

}
export function useCheckAccessibility (allowedAccessibilities: any) {
    const userAccessibilites = userData.value?.accessibility_names ?? []
    let userAllowed = false
    allowedAccessibilities.forEach((element: string) => {
        userAccessibilites.forEach((useraccess: string) => {
            if (useraccess.startsWith(element)) {
                userAllowed = true
            }
        })
    })
    if (userData.value?.type === USER_ADMINISTRATOR) {
        return true
    }
    return userAllowed
}
