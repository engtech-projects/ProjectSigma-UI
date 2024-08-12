import { USER_ADMINISTRATOR } from "@/stores/hrms/setup/users"
const { data: userData } = useAuth()
export enum AccessibilityTypes {
    hrms_group = "hrms:",
    // STANDALONES
    hrms_dashboard = "hrms:dashboard",
    hrms_announcement = "hrms:announcement",
    hrms_event_calendar = "hrms:event calendar",
    hrms_project_members = "hrms:project members",
    hrms_reports = "hrms:reports",
    hrms_hmo = "hrms:hmo",
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
    hrms_payroll_generate_payroll = "hrms:payroll_generate payroll",
    hrms_payroll_13th_month = "hrms:payroll_13th month",
    hrms_payroll_allowance = "hrms:payroll_allowance",
    hrms_payroll_payroll_record = "hrms:payroll_payroll record",
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
    inventory_item_profile_group = "inventory:item profile",
    inventory_new_item_profile = "inventory:new_item profile",

    // ACCOUNTING
    accounting_group = "accounting:",
    accounting_dashboard = "accounting:dashboard",
    accounting_chart_of_accounts = "accounting:chart of accounts",
    accounting_books = "accounting:books",
    accounting_transaction_type = "accounting:transaction type",
    accounting_document_Series = "accounting:document Series",
    accounting_posting_period = "accounting:posting period",
    accounting_account_groups = "accounting:account groups",
    accounting_stake_holder = "accounting:stake holder",

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
