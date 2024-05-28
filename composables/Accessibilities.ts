import { USER_ADMINISTRATOR } from "@/stores/hrms/setup/users"
const { data: userData } = useAuth()
export enum AccessibilityTypes {
    hrms_announcement = "hrms:announcement",
    hrms_dashboard = "hrms:dashboard",
    hrms_attendance_failure_to_log = "hrms:attendance_failure to log",
    hrms_attendance_face_recognition = "hrms:attendance_face recognition",
    hrms_attendance_biomentrics = "hrms:attendance_biomentrics",
    hrms_attendance_attendance_login = "hrms:attendance_attendance login",
    hrms_attendance_qr_code = "hrms:attendance_qr",
    hrms_event_calendar = "hrms:eventcalendar",
    hrms_job_applicant = "hrms:employee_job applicant",
    hrms_employee_onboarding = "hrms:employee_onboarding",
    hrms_employee_manpower_request = "hrms:employee_manpower request",
    hrms_setup_user_account = "hrms:setup_user account",
    hrms_setup_department = "hrms:setup_department",
    hrms_setup_approvals = "hrms:setup_approvals",
    hrms_setup_hmo = "hrms:setup_hmo",
    hrms_setup_pag_ibig = "hrms:setup_pag-ibig",
    hrms_setup_phil_health = "hrms:setup_philhealth",
    hrms_setup_sss = "hrms:setup_sss",
    hrms_setup_with_holding_tax = "hrms:setup_withholding tax",
    hrms_setup_leaves = "hrms:setup_leaves",
    hrms_loans_and_advances_cash_advance = "hrms:loansandadvances_cash advance",
    hrms_loans_and_advances_loans = "hrms:loansandadvances_loans",
    hrms_loans_and_advances_other_deductions = "hrms:loans and advances_other deductions",
    hrms_payroll_generate_payroll = "hrms:payroll_generate_payroll",
    hrms_payroll_13th_month = "hrms:payroll_13th_month",
    hrms_payroll_allowance = "hrms:payroll_allowance",
    hrms_payroll_payroll_report = "hrms:payroll_payroll_report",
    hrms_reports = "hrms:reports",
    hrms_schedule_department_schedule = "hrms:schedule_department",
    hrms_schedule_employee_schedule = "hrms:schedule_employee",
    hrms_schedule_project_schedule = "hrms:schedule_project",
    hrms_project_members = "hrms:project_members",
    hrms_setup_division = "hrms:setup_division",
    hrms_setup_position = "hrms:setup_position",
    hrms_setup_allowance = "hrms:setup_allowance",
    hrms_setup_settings = "hrms:setup_settings",
    hrms_setup_salary_grade = "hrms:setup_salary_grade",
    // hrms-attendance-sub
    hrms_attendance_attendance_logs = "hrms:attendance_attendance logs",
    hrms_attendance_attendance_portal_form = "hrms:attendance_attendance portal_form",
    hrms_attendance_attendance_portal_list = "hrms:attendance_attendance portal_list",
    // hrms-announcement-sub
    hrms_attendance_daily_logs_record_form = "hrms:attendance_dtr_form",
    hrms_attendance_daily_logs_record_list = "hrms:attendance_dtr_list",
    hrms_attendance_daily_logs_record_approval = "hrms:attendance_dtr_approval",
    // hrms-event-calendar-sub
    hrms_employee_201_PIS = "hrms:201_pis",
    hrms_employee_201_staff_information_sheet = "hrms:201_staff information sheet",
    hrms_employee_201_documents_memos = "hrms:201_documents and memos",
    hrms_employee_201_id = "hrms:201_id",
    // hrms-employee_personnel_action_notice-sub
    hrms_employee_personnel_action_notice_form = "hrms:employee_pan_form",
    hrms_employee_personnel_action_notice_all_request = "hrms:employee_pan_all request",
    hrms_employee_personnel_action_notice_approval = "hrms:employee_pan_approval",
    hrms_employee_personnel_action_notice_my_request = "hrms:employee_pan_my request",
    // hrms-manpower-request-sub
    hrms_manpower_request_form = "hrms:manpower_request form",
    hrms_manpower_request_all_request = "hrms:manpower_request_all request",
    hrms_manpower_request_approval = "hrms:manpower_request_approval",
    hrms_manpower_request_my_request = "hrms:manpower_request_my request",
    // hrms-loans-and-advances-cash-advance-request-sub
    hrms_loans_and_advances_cash_advance_forms = "hrms:loans and advances_cash advance_forms",
    hrms_loans_and_advances_cash_advance_list = "hrms:loans and advances_cash advance_list",
    hrms_loans_and_advances_cash_advance_approvals = "hrms:loans and advances_cash advance_approvals",
    // hrms-loans-and-advances-loans-sub
    hrms_loans_and_advances_loans_forms = "hrms:loans anda dvances_loans_forms",
    hrms_loans_and_advances_loans_loans_list = "hrms:loans and advances_loans_list",
    hrms_loans_and_advances_loans_payment_list = "hrms:loans and advances_payment_list",
    // hrms-leave-sub
    hrms_leave_form = "hrms:leave_form",
    hrms_leave_list = "hrms:leave_list",
    hrms_leave_my_approvals = "hrms:leave_my approvals",
     // hrms-overtime-sub
    hrms_overtime_form = "hrms:overtime_form",
    hrms_overtime_list = "hrms:overtime_list",
    hrms_overtime_my_request = "hrms:overtime_my request",
    hrms_overtime_my_approvals = "hrms:overtime_my approvals",
    // hrms-travel_order-sub
    hrms_travel_order_form = "hrms:travel order_form",
    hrms_travel_order_list = "hrms:travel order_list",
    hrms_travel_order_my_request = "hrms:travel order_myrequest",
    hrms_travel_order_my_approvals = "hrms:travel order_myapprovals",
    // INVENTORY
    inventory_dashboard = "inventory:dashboard",
    // ACCOUNTING
    accounting_chart_of_accounts = "accounting:chart of accounts",
    accounting_books = "accounting:books",
    accounting_transaction_type = "accounting:transaction type",
    accounting_document_Series = "accounting:document Series",
    accounting_posting_period = "accounting:posting period",
    accounting_account_groups = "accounting:account groups",
    accounting_stake_holder = "accounting:stake holder",

    // PROJECT MONITORING
    project_monitoring_dashboard = "project_monitoring:dashboard",
    project_monitoring_projects = "project_monitoring:projects",

}
export function useCheckAccessibility (allowedAccessibilities: any) {
    const userAccessibilites = userData.value?.accessibility_names ?? []
    const intersectElements = (allowedAccess: any, userAccess: any) => {
        const res = []
        for (let i = 0; i < userAccess.length; i++) {
            if (allowedAccess.includes(userAccess[i])) {
                res.push(userAccess[i])
                allowedAccess.splice(allowedAccess.indexOf(userAccess[i]), 1, undefined)
            }
        };
        return res
    }
    const isAllowed = () => {
        allowedAccessibilities.forEach((element: string) => {
            userAccessibilites.forEach((useraccess: string) => {
                if (useraccess.startsWith(element)) {
                    return true
                }
            })
        })
        return false
    }
    if (userData.value?.type === USER_ADMINISTRATOR) {
        return true
    }

    const accessApprove = intersectElements(allowedAccessibilities, userAccessibilites)
    return (accessApprove.length > 0) || isAllowed()
}
