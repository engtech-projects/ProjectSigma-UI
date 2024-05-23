<script setup>
const config = useRuntimeConfig()
</script>

<template>
    <ul class="space-y-2">
        <LayoutNavSingle
            class="px-5"
            linkarea="/dashboard"
            icon="ic:baseline-space-dashboard"
            single-nav-title="Dashboard"
        />
        <!-- HRMS -->
        <LayoutNavModuleGroup
            v-if="useCheckAccessibility([
                AccessibilityTypes.hrms_dashboard,
                AccessibilityTypes.hrms_announcement,
            ])"
            title="hrms"
        >
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_dashboard,
                ])"
                linkarea="/hrms"
                icon="ic:round-dashboard"
                single-nav-title="HRMS Dashboard"
            />
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_announcement,
                ])"
                linkarea="/hrms/announcement"
                icon="ic:outline-announcement"
                single-nav-title="Announcement"
            />
            <LayoutNavGroup
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_attendance_attendance_portal,
                    AccessibilityTypes.hrms_attendance_dtr,
                    AccessibilityTypes.hrms_attendance_failure_to_log,
                    AccessibilityTypes.hrms_attendance_attendance_login,
                    AccessibilityTypes.hrms_attendance_qr_code,
                ])"
                icon="ic:outline-punch-clock"
                title="Attendance"
            >
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_attendance_attendance_portal,
                    ])"
                    linkarea="/hrms/attendance/portal"
                    icon="ic:baseline-web"
                    single-nav-title="Attendance Portal"
                />
                <LayoutNavSingle
                    linkarea="/hrms/attendance/logs"
                    icon="ic:baseline-book"
                    single-nav-title="Attendance Logs"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_attendance_dtr,
                    ])"
                    linkarea="/hrms/attendance/dtr"
                    icon="material-symbols:alarm-on-outline-rounded"
                    single-nav-title="Daily Time Record"
                />
                <LayoutNavSingle
                    v-show="config.public.APP_ENV == 'local'"
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_attendance_failure_to_log,
                    ])"
                    linkarea="/hrms/attendance/failtolog"
                    icon="ic:baseline-flag-circle"
                    single-nav-title="Failure To Log"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_attendance_face_recognition,
                    ])"
                    linkarea="/hrms/attendance/facerecognition"
                    icon="mdi:face-recognition"
                    single-nav-title="Face Recognition"
                />
                <LayoutNavSingle
                    v-show="config.public.APP_ENV == 'local'"
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_attendance_attendance_login,
                    ])"
                    linkarea="/hrms/attendance/attendancelogin"
                    icon="material-symbols:person-add-outline-rounded"
                    single-nav-title="Attendance Login"
                />
                <LayoutNavSingle
                    v-show="config.public.APP_ENV == 'local'"
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_attendance_qr_code,
                    ])"
                    linkarea="/hrms/attendance/qrcode"
                    icon="material-symbols:qr-code-scanner-rounded"
                    single-nav-title="QR Code"
                />
            </LayoutNavGroup>
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_event_calendar,
                ])"
                linkarea="/hrms/calendar"
                icon="ic:round-calendar-month"
                single-nav-title="Event Calendar"
            />
            <LayoutNavGroup
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_employee_201,
                    AccessibilityTypes.hrms_employee_personnel_action_notice,
                    AccessibilityTypes.hrms_employee_onboarding,
                    AccessibilityTypes.hrms_job_applicant,
                    AccessibilityTypes.hrms_employee_manpower_request,
                ])"
                icon="ic:baseline-people-outline"
                title="Employee"
            >
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_employee_201,
                    ])"
                    linkarea="/hrms/employee/201"
                    icon="ic:round-folder-shared"
                    single-nav-title="201"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_employee_personnel_action_notice,
                    ])"
                    linkarea="/hrms/employee/paf"
                    icon="ic:round-add-card"
                    single-nav-title="Personnel Action Notice"
                />
                <LayoutNavSingle
                    v-show="config.public.APP_ENV == 'local'"
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_employee_onboarding,
                    ])"
                    linkarea="/hrms/employee/onboarding"
                    icon="ic:round-assignment-ind"
                    single-nav-title="Onboarding"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_job_applicant,
                    ])"
                    linkarea="/hrms/employee/applicant"
                    icon="ic:baseline-diversity-3"
                    single-nav-title="Job Applicants"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_employee_manpower_request,
                    ])"
                    linkarea="/hrms/employee/manpower"
                    icon="ic:round-people-alt"
                    single-nav-title="Manpower Request"
                />
            </LayoutNavGroup>
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_project_members,
                ])"
                linkarea="/hrms/project"
                icon="material-symbols:construction"
                single-nav-title="Project"
            />
            <LayoutNavGroup
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_loans_and_advances_cash_advance,
                    AccessibilityTypes.hrms_loans_and_advances_loans,
                    AccessibilityTypes.hrms_loans_and_advances_other_deductions,
                ])"
                icon="mdi:cash"
                title="Loans and Advances"
            >
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_loans_and_advances_cash_advance,
                    ])"
                    linkarea="/hrms/loans/cashadvance"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Cash Advances"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_loans_and_advances_loans,
                    ])"
                    linkarea="/hrms/loans"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Loans"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_loans_and_advances_other_deductions,
                    ])"
                    linkarea="/hrms/loans/otherdeductions"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Other Deductions"
                />
            </LayoutNavGroup>
            <LayoutNavGroup
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_leave,
                    AccessibilityTypes.hrms_overtime,
                    AccessibilityTypes.hrms_travel_order,
                ])"
                icon="mdi:account-clock"
                title="Leaves and Overtime"
            >
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_leave,
                    ])"
                    linkarea="/hrms/leave"
                    icon="fluent-mdl2:leave-user"
                    single-nav-title="Leave"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_overtime,
                    ])"
                    linkarea="/hrms/overtime"
                    icon="mingcute:time-line"
                    single-nav-title="Overtime"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_travel_order,
                    ])"
                    linkarea="/hrms/travelorder"
                    icon="material-symbols:googler-travel"
                    single-nav-title="Travel Order"
                />
            </LayoutNavGroup>
            <LayoutNavGroup
                v-show="config.public.APP_ENV == 'local'"
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_payroll_generate_payroll,
                    AccessibilityTypes.hrms_payroll_13th_month,
                    AccessibilityTypes.hrms_payroll_allowance,
                    AccessibilityTypes.hrms_payroll_payroll_report,
                ])"
                icon="ion:ios-people"
                title="Payroll"
            >
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_payroll_generate_payroll,
                    ])"
                    linkarea="/hrms/payroll/generatepayroll"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Generate Payroll"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_payroll_13th_month,
                    ])"
                    linkarea="/hrms/payroll/13thmonthpay"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="13th Month Pay"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_payroll_allowance,
                    ])"
                    linkarea="/hrms/payroll/allowance"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Allowance"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_payroll_payroll_report,
                    ])"
                    linkarea="/hrms/payroll/payrollrecord"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Payroll Record"
                />
            </LayoutNavGroup>
            <LayoutNavSingle
                v-show="config.public.APP_ENV == 'local'"
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_reports,
                ])"
                linkarea="/hrms/reports"
                icon="ic:sharp-add-chart"
                single-nav-title="Reports"
            />
            <LayoutNavGroup
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_schedule_department_schedule,
                    AccessibilityTypes.hrms_schedule_employee_schedule,
                    AccessibilityTypes.hrms_schedule_project_schedule,
                ])"
                icon="uim:schedule"
                title="Schedule"
            >
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_schedule_department_schedule,
                    ])"
                    linkarea="/hrms/schedule/department"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Department Schedule"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_schedule_employee_schedule,
                    ])"
                    linkarea="/hrms/schedule/employee"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Employee Schedule"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_schedule_project_schedule,
                    ])"
                    linkarea="/hrms/schedule/project"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Project Schedule"
                />
            </LayoutNavGroup>
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_setup_hmo,
                ])"
                linkarea="/hrms/setup/hmo"
                icon="ic:baseline-health-and-safety"
                single-nav-title="HMO"
            />
            <LayoutNavGroup
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_setup_user_account,
                    AccessibilityTypes.hrms_setup_approvals,
                    AccessibilityTypes.hrms_setup_division,
                    AccessibilityTypes.hrms_setup_department,
                    AccessibilityTypes.hrms_setup_position,
                    AccessibilityTypes.hrms_setup_allowance,
                    AccessibilityTypes.hrms_setup_leaves,
                    AccessibilityTypes.hrms_setup_pag_ibig,
                    AccessibilityTypes.hrms_setup_phil_health,
                    AccessibilityTypes.hrms_setup_sss,
                    AccessibilityTypes.hrms_setup_with_holding_tax,
                    AccessibilityTypes.hrms_setup_settings,
                    AccessibilityTypes.hrms_setup_salary_grade,
                ])"
                icon="ion:ios-people"
                title="Setup"
            >
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_setup_user_account,
                    ])"
                    linkarea="/hrms/setup/useraccounts"
                    icon="ic:round-manage-accounts"
                    single-nav-title="User Accounts"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_setup_approvals,
                    ])"
                    linkarea="/hrms/setup/approvals"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Approvals"
                />
                <LayoutNavSingle
                    v-show="config.public.APP_ENV == 'local' && false"
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_setup_division,
                    ])"
                    linkarea="/hrms/setup/division"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Division"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_setup_department,
                    ])"
                    linkarea="/hrms/setup/department"
                    icon="ic:round-meeting-room"
                    single-nav-title="Department"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_setup_position,
                    ])"
                    linkarea="/hrms/setup/position"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Position"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_setup_allowance,
                    ])"
                    linkarea="/hrms/setup/allowance"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Allowance"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_setup_leaves,
                    ])"
                    linkarea="/hrms/setup/leaves"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Leaves"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_setup_pag_ibig,
                    ])"
                    linkarea="/hrms/setup/pag-ibig"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Pag-Ibig"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_setup_phil_health,
                    ])"
                    linkarea="/hrms/setup/philhealth"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Philhealth"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_setup_sss,
                    ])"
                    linkarea="/hrms/setup/sss"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="SSS"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_setup_with_holding_tax,
                    ])"
                    linkarea="/hrms/setup/wtax"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Withholding Tax"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_setup_settings,
                    ])"
                    linkarea="/hrms/setup/settings"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Settings"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_setup_salary_grade,
                    ])"
                    linkarea="/hrms/setup/salary-grade"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Salary Grade"
                />
                <LayoutNavSingle
                    v-show="config.public.BULK_UPLOAD_ENABLED === 'true'"
                    linkarea="/hrms/setup/bulk-upload-employee"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Bulk Upload Employee"
                />
            </LayoutNavGroup>
        </LayoutNavModuleGroup>

        <!-- Inventory / Warehouse -->
        <LayoutNavModuleGroup
            v-show="config.public.APP_ENV == 'local'"
            v-if="useCheckAccessibility([
                AccessibilityTypes.inventory_dashboard,
            ])"
            title="Inventory / Warehouse"
        >
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.inventory_dashboard,
                ])"
                linkarea="/inventory"
                icon="ic:baseline-space-dashboard"
                single-nav-title="Inventory Dashboard"
            />
        </LayoutNavModuleGroup>

        <!-- Accounting -->
        <LayoutNavModuleGroup
            v-if="useCheckAccessibility([
                AccessibilityTypes.accounting_chart_of_accounts,
                AccessibilityTypes.accounting_books,
                AccessibilityTypes.accounting_transaction_type,
                AccessibilityTypes.accounting_document_Series,
                AccessibilityTypes.accounting_posting_period,
                AccessibilityTypes.accounting_account_groups,
                AccessibilityTypes.accounting_stake_holder,
            ])"
            title="Accounting"
        >
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.accounting_chart_of_accounts,
                ])"
                linkarea="/accounting/chart-of-accounts"
                icon="ci:table"
                single-nav-title="Chart of Accounts"
            />
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.accounting_books,
                ])"
                linkarea="/accounting/books"
                icon="iconoir:book"
                single-nav-title="Books"
            />
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.accounting_transaction_type,
                ])"
                linkarea="/accounting/transaction-type"
                icon="iconoir:x"
                single-nav-title="Transaction Type"
            />
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.accounting_document_Series,
                ])"
                linkarea="/accounting/document-series"
                icon="iconoir:archive"
                single-nav-title="Document Series"
            />
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.accounting_posting_period,
                ])"
                linkarea="/accounting/posting-period"
                icon="iconoir:notes"
                single-nav-title="Posting Period"
            />
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.accounting_account_groups,
                ])"
                linkarea="/accounting/account-groups"
                icon="iconoir:commodity"
                single-nav-title="Account Groups"
            />
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.accounting_stake_holder,
                ])"
                linkarea="/accounting/stakeholder"
                icon="iconoir:user-square"
                single-nav-title="Stakeholder"
            />
        </LayoutNavModuleGroup>

        <!-- Project Monitoring -->
        <LayoutNavModuleGroup
            v-if="useCheckAccessibility([
                AccessibilityTypes.accounting_stake_holder,
            ])"
            title="Project Monitoring"
        >
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.project_monitoring_dashboard,
                ])"
                linkarea="/project-monitoring"
                icon="ic:baseline-space-dashboard"
                single-nav-title="Projects Dashboard"
            />
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.project_monitoring_projects,
                ])"
                linkarea="/project-monitoring/projects"
                icon="material-symbols:business-center"
                single-nav-title="Projects"
            />
        </LayoutNavModuleGroup>
    </ul>
</template>

<!-- <LayoutNav hide="hidden" linkarea="/hrms/employee/application" icon="material-symbols:dynamic-form-outline-rounded" single-nav-title="Application"/> -->
<!-- <LayoutNavGroup id="dropdown-employees" icon="ic:baseline-people-outline" title="Employee"></LayoutNavGroup> -->
