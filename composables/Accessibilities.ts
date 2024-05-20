const { data: userData } = useAuth()
export enum AccessibilityTypes {
    hrms_dashboard = "hrms:dashboard",
    hrms_announcement = "hrms:announcement",
    hrms_attendance_attendance_portal = "hrms:attendance_attendance_portal",
    hrms_attendance_dtr = "hrms:attendance_daily_logs_record",
    hrms_attendance_failure_to_log = "hrms:attendance_failure_to_log",
    hrms_attendance_face_recognition = "hrms:attendance_face_recognition",
    hrms_attendance_attendance_login = "hrms:attendance_attendance_login",
    hrms_attendance_qr_code = "hrms:attendance_qr_code",
    hrms_event_calendar = "hrms:event_calendar",
    hrms_employee_201 = "hrms:employee_201",
    hrms_employee_personnel_action_notice = "hrms:employee_personnel_action_notice",
    hrms_employee_onboarding = "hrms:employee_onboarding",
    hrms_employee_manpower_request = "hrms:employee_manpower_request",
    hrms_setup_user_account = "hrms:setup_user_account",
    hrms_setup_department = "hrms:setup_department",
    hrms_setup_approvals = "hrms:setup_approvals",
    hrms_setup_hmo = "hrms:setup_hmo",
    hrms_setup_pag_ibig = "hrms:setup_pag_ibig",
    hrms_setup_phil_health = "hrms:setup_phil_health",
    hrms_setup_sss = "hrms:setup_sss",
    hrms_setup_with_holding_tax = "hrms:setup_with_holding_tax",
    hrms_setup_leaves = "hrms:setup_leaves",
    hrms_leave = "hrms:leave",
    hrms_loans_and_advances_cash_advance = "hrms:loans_and_advances_cash_advance",
    hrms_loans_and_advances_loans = "hrms:loans_and_advances_loans",
    hrms_loans_and_advances_other_deductions = "hrms:loans_and_advances_other_deductions",
    hrms_overtime = "hrms:overtime",
    hrms_payroll_generate_payroll = "hrms:payroll_generate_payroll",
    hrms_payroll_13th_month = "hrms:payroll_13th_month",
    hrms_payroll_allowance = "hrms:payroll_allowance",
    hrms_payroll_payroll_report = "hrms:payroll_payroll_report",
    hrms_reports = "hrms:reports",
    hrms_schedule_department_schedule = "hrms:schedule_department_schedule",
    hrms_schedule_employee_schedule = "hrms:schedule_employee_schedule",
    hrms_schedule_project_schedule = "hrms:schedule_project_schedule",
    hrms_project_members = "hrms:project_members",
    hrms_travel_order = "hrms:travel_order",
    hrms_setup_division = "hrms:setup_division",
    hrms_setup_position = "hrms:setup_position",
    hrms_setup_allowance = "hrms:setup_allowance",
    hrms_setup_settings = "hrms:setup_settings",
    hrms_setup_salary_grade = "hrms:setup_salary_grade",
    inventory_dashboard = "inventory:dashboard",
    accounting_chart_of_accounts = "accounting:chart_of_accounts",
    accounting_books = "accounting:books",
    accounting_transaction_type = "accounting:transaction_type",
    accounting_document_Series = "accounting:document_Series",
    accounting_posting_period = "accounting:posting_period",
    accounting_account_groups = "accounting:account_groups",
    accounting_stake_holder = "accounting:stake_holder",
    project_monitoring_dashboard = "project_monitoring:dashboard",
    project_monitoring_projects = "project_monitoring:projects",

    // hrms-dashboard-sub
    hrms_dashboard_announcement = "hrms:dashboard_announcement",
    hrms_dashboard_birthday = "hrms:dashboard_birthday",
    hrms_dashboard_lates = "hrms:dashboard_lates",
    hrms_dashboard_absent = "hrms:dashboard_absent",
    hrms_dashboard_total_number = "hrms:dashboard_total_number",
}
export function useCheckAccessibility (allowedAccessibilities: any) {
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
    const userAccessibilites = userData.value.accessibility_names ?? []
    const accessApprove = intersectElements(allowedAccessibilities, userAccessibilites)
    return (accessApprove.length > 0)
}
