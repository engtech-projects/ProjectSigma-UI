<script setup>
const config = useRuntimeConfig()
</script>
<template>
    <div class="space-y-2">
        <LayoutNavSingle
            class="px-5"
            linkarea="/dashboard"
            icon="ic:baseline-space-dashboard"
            single-nav-title="Dashboard"
        />
        <!-- HRMS -->
        <LayoutNavModuleGroup
            v-if="useCheckAccessibility([
                AccessibilityTypes.hrms_group
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
                    AccessibilityTypes.hrms_attendance_group,
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
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_attendance_attendance_logs,
                    ])"
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
                        AccessibilityTypes.hrms_attendance_qr_generator,
                    ])"
                    linkarea="/hrms/attendance/qr-generate"
                    icon="material-symbols:qr-code-scanner-rounded"
                    single-nav-title="Generate QR Code"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_attendance_qr_login,
                    ])"
                    linkarea="/hrms/attendance/qr-login"
                    icon="material-symbols:qr-code-scanner-rounded"
                    single-nav-title="Attendance QR"
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
                    AccessibilityTypes.hrms_employee_group,
                ])"
                icon="ic:baseline-people-outline"
                title="Employee"
            >
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_employee_201_group
                    ])"
                    linkarea="/hrms/employee/201"
                    icon="ic:round-folder-shared"
                    single-nav-title="201"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_employee_pan_group,
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
                        AccessibilityTypes.hrms_employee_job_applicant,
                    ])"
                    linkarea="/hrms/employee/applicant"
                    icon="ic:baseline-diversity-3"
                    single-nav-title="Job Applicants"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_employee_manpowerrequest_group,
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
                single-nav-title="Project Members"
            />
            <LayoutNavGroup
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_loans_and_advances_group,
                ])"
                icon="mdi:cash"
                title="Loans and Advances"
            >
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_loans_and_advances_cash_advance_group,
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
                    AccessibilityTypes.hrms_lnotnto_group,
                ])"
                icon="mdi:account-clock"
                title="Leaves and Overtime"
            >
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_lnotnto_leave_group,
                    ])"
                    linkarea="/hrms/leave"
                    icon="fluent-mdl2:leave-user"
                    single-nav-title="Leave"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_lnotnto_overtime_group,
                    ])"
                    linkarea="/hrms/overtime"
                    icon="mingcute:time-line"
                    single-nav-title="Overtime"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_lnotnto_travel_order_group,
                    ])"
                    linkarea="/hrms/travelorder"
                    icon="material-symbols:googler-travel"
                    single-nav-title="Travel Order"
                />
            </LayoutNavGroup>
            <LayoutNavGroup
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_payroll_group,
                ])"
                icon="ion:ios-people"
                title="Payroll"
            >
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_payroll_salary_group,
                    ])"
                    linkarea="/hrms/payroll/salary"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Salary"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_payroll_13thmonth,
                    ])"
                    v-show="config.public.APP_ENV == 'local'"
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
                <!-- <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_payroll_payroll_record,
                    ])"
                    v-show="config.public.APP_ENV == 'local'"
                    linkarea="/hrms/payroll/payrollrecord"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Payroll Record"
                /> -->
            </LayoutNavGroup>
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_reports_group,
                ])"
                linkarea="/hrms/reports"
                icon="ic:sharp-add-chart"
                single-nav-title="Reports"
            />
            <LayoutNavGroup
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_schedule_group,
                ])"
                icon="uim:schedule"
                title="Schedule"
            >
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_schedule_department,
                    ])"
                    linkarea="/hrms/schedule/department"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Department Schedule"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_schedule_employee,
                    ])"
                    linkarea="/hrms/schedule/employee"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Employee Schedule"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_schedule_project,
                    ])"
                    linkarea="/hrms/schedule/project"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Project Schedule"
                />
            </LayoutNavGroup>
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_hmo,
                ])"
                linkarea="/hrms/hmo"
                icon="ic:baseline-health-and-safety"
                single-nav-title="HMO"
            />
            <LayoutNavGroup
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_setup_group
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
                    v-if="useCheckAccessibility([
                        'AdminOnly',
                    ])"
                    v-show="config.public.BULK_UPLOAD_ENABLED === 'true'"
                    linkarea="/hrms/setup/bulk-upload-employee"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Bulk Upload Employee"
                />
            </LayoutNavGroup>
        </LayoutNavModuleGroup>

        <!-- Inventory / Warehouse -->
        <LayoutNavModuleGroup
            v-if="useCheckAccessibility([
                AccessibilityTypes.inventory_group,
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
            <LayoutNavGroup
                v-if="useCheckAccessibility([
                    AccessibilityTypes.inventory_item_profile_group
                ])"
                icon="ion:ios-people"
                title="Item Profile"
            >
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.inventory_new_item_profile,
                    ])"
                    linkarea="/inventory/item-profile/new-profile"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="New Item Profile"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.inventory_item_profile,
                    ])"
                    linkarea="/inventory/item-profile/list-profile"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Item Profile List"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.admin,
                    ])"
                    linkarea="/inventory/item-profile/bulk-upload"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Item Profile Bulk Upload"
                />
            </LayoutNavGroup>
            <LayoutNavGroup
                v-if="useCheckAccessibility([
                    AccessibilityTypes.inventory_setup_group
                ])"
                icon="ion:ios-people"
                title="Setup"
            >
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.inventory_setup_approvals,
                    ])"
                    linkarea="/inventory/setup/approvals"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Approvals"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.inventory_setup_item_group,
                    ])"
                    linkarea="/inventory/setup/item-group"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Item Group"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.inventory_setup_unit_of_measurements,
                    ])"
                    linkarea="/inventory/setup/unit-of-measurement"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Unit Of Measurement"
                />
            </LayoutNavGroup>
        </LayoutNavModuleGroup>

        <!-- Accounting -->
        <LayoutNavModuleGroup
            v-if="useCheckAccessibility([
                AccessibilityTypes.accounting_group,
            ])"
            title="Accounting"
        >
            <LayoutNavSingle
                v-show="config.public.APP_ENV == 'local'"
                v-if="useCheckAccessibility([
                    AccessibilityTypes.accounting_journal_group,
                ])"
                linkarea="/accounting/journal-entry"
                icon="iconoir:plug-type-l"
                single-nav-title="Journal Entry"
            />
            <LayoutNavSingle
                v-show="config.public.APP_ENV == 'local'"
                v-if="useCheckAccessibility([
                    AccessibilityTypes.accounting_chart_of_accounts,
                ])"
                linkarea="/accounting/chart-of-accounts"
                icon="ci:table"
                single-nav-title="Chart of Accounts"
            />
            <LayoutNavSingle
                v-show="config.public.APP_ENV == 'local'"
                v-if="useCheckAccessibility([
                    AccessibilityTypes.accounting_books,
                ])"
                linkarea="/accounting/books"
                icon="iconoir:book"
                single-nav-title="Books"
            />
            <LayoutNavSingle
                v-show="config.public.APP_ENV == 'local'"
                v-if="useCheckAccessibility([
                    AccessibilityTypes.accounting_chart_of_accounts,
                ])"
                linkarea="/accounting/requests"
                icon="iconoir:bell-notification"
                single-nav-title="Requests"
            />
            <LayoutNavSingle
                v-show="config.public.APP_ENV == 'local'"
                v-if="useCheckAccessibility([
                    AccessibilityTypes.accounting_transaction_type,
                ])"
                linkarea="/accounting/transaction-type"
                icon="iconoir:x"
                single-nav-title="Transaction Type"
            />
            <LayoutNavSingle
                v-show="config.public.APP_ENV == 'local'"
                v-if="useCheckAccessibility([
                    AccessibilityTypes.accounting_document_Series,
                ])"
                linkarea="/accounting/document-series"
                icon="iconoir:archive"
                single-nav-title="Document Series"
            />
            <LayoutNavSingle
                v-show="config.public.APP_ENV == 'local'"
                v-if="useCheckAccessibility([
                    AccessibilityTypes.accounting_posting_period,
                ])"
                linkarea="/accounting/posting-period"
                icon="iconoir:notes"
                single-nav-title="Posting Period"
            />
            <LayoutNavGroup
                v-if="useCheckAccessibility([
                    'Admin only'
                ])"
                icon="ion:logo-apple-ar"
                title="Groups"
            >
                <LayoutNavSingle
                    v-show="config.public.APP_ENV == 'local'"
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.accounting_account_groups,
                    ])"
                    linkarea="/accounting/account-groups"
                    icon="iconoir:commodity"
                    single-nav-title="Account"
                />
                <LayoutNavSingle
                    v-show="config.public.APP_ENV == 'local'"
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.accounting_account_groups,
                    ])"
                    linkarea="/accounting/stakeholder-group"
                    icon="iconoir:profile-circle"
                    single-nav-title="Stakeholder"
                />
            </LayoutNavGroup>
            <LayoutNavSingle
                v-show="config.public.APP_ENV == 'local'"
                v-if="useCheckAccessibility([
                    AccessibilityTypes.accounting_account_groups,
                ])"
                linkarea="/accounting/subsidiary"
                icon="iconoir:commodity"
                single-nav-title="Subsidiary Account"
            />
            <LayoutNavSingle
                v-show="config.public.APP_ENV == 'local'"
                v-if="useCheckAccessibility([
                    AccessibilityTypes.accounting_stake_holder,
                ])"
                linkarea="/accounting/stakeholder"
                icon="iconoir:user-square"
                single-nav-title="Stakeholder"
            />
            <LayoutNavSingle
                v-show="config.public.APP_ENV == 'local'"
                v-if="useCheckAccessibility([
                    AccessibilityTypes.accounting_stake_holder,
                ])"
                linkarea="/accounting/transaction"
                icon="mdi:cash"
                single-nav-title="Transaction"
            />
        </LayoutNavModuleGroup>

        <!-- Project Monitoring -->
        <LayoutNavModuleGroup
            v-if="useCheckAccessibility([
                AccessibilityTypes.project_monitoring_group,
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
    </div>
</template>
