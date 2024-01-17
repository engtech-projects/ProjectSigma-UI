<template>
    <ul class="space-y-2">
        <!-- <NuxtLink to="/welcome" class="flex justify-center border border-slate-200 rounded p-2">
      Dashboard
    </NuxtLink> -->
        <LayoutNavSingle
            linkarea="/welcome"
            icon="ic:baseline-space-dashboard"
            single-nav-title="Dashboard"
        />
        <!-- HRMS -->
        <LayoutNavModuleGroup title="hrms">
            <LayoutNavSingle
                linkarea="/hrms"
                icon="ic:round-dashboard"
                single-nav-title="HRMS Dashboard"
            />
            <LayoutNavSingle
                linkarea="/hrms/announcement"
                icon="ic:outline-announcement"
                single-nav-title="Announcement"
            />
            <LayoutNavGroup icon="ic:outline-punch-clock" title="Attendance">
                <LayoutNavSingle
                    linkarea="/hrms/attendance/portal"
                    icon="ic:baseline-web"
                    single-nav-title="Attendance Portal"
                />
                <LayoutNavSingle
                    linkarea="/hrms/attendance/timeinout"
                    icon="material-symbols:alarm-on-outline-rounded"
                    single-nav-title="Daily Logs Record"
                />
                <LayoutNavSingle
                    linkarea="/hrms/attendance/failtolog"
                    icon="ic:baseline-flag-circle"
                    single-nav-title="Failure To Log"
                />
                <!-- <LayoutNavGroup  icon="ic:outline-more-time" title="Daily Time Record">
                </LayoutNavGroup> -->
                <LayoutNavSingle
                    linkarea="/hrms/attendance/facerecognition"
                    icon="mdi:face-recognition"
                    single-nav-title="Face Recognition"
                />
                <LayoutNavSingle
                    linkarea="/hrms/attendance/attendancelogin"
                    icon="material-symbols:person-add-outline-rounded"
                    single-nav-title="Attendance Login"
                />
                <LayoutNavSingle
                    linkarea="/hrms/attendance/qrcode"
                    icon="material-symbols:qr-code-scanner-rounded"
                    single-nav-title="QR Code"
                />
                <!-- hide true-->
                <!-- <LayoutNavGroup class="hidden" icon="ic:baseline-people-outline" title="Biometrics">
                    <LayoutNav linkarea="/hrms/attendance/rejecteddata" icon="ic:baseline-flag-circle" single-nav-title="Biometric Rejected Data"/>
                    <LayoutNav linkarea="/hrms/attendance/biometrics" icon="ic:outline-account-circle" single-nav-title="Biometrics Account"/>
                </LayoutNavGroup> -->
            </LayoutNavGroup>
            <LayoutNavSingle
                linkarea="/hrms/calendar"
                icon="ic:round-calendar-month"
                single-nav-title="Event Calendar"
            />
            <LayoutNavGroup icon="ic:baseline-people-outline" title="Employee">
                <!-- hide true-->
                <LayoutNavSingle
                    class="hidden"
                    linkarea="/hrms/employee/application"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Application"
                />
                <LayoutNavSingle
                    linkarea="/hrms/employee/201"
                    icon="ic:round-folder-shared"
                    single-nav-title="201"
                />
                <LayoutNavSingle
                    linkarea="/hrms/employee/paf"
                    icon="ic:round-add-card"
                    single-nav-title="Personnel Action Notice"
                />
                <LayoutNavSingle
                    linkarea="/hrms/employee/onboarding"
                    icon="ic:round-assignment-ind"
                    single-nav-title="Onboarding"
                />
                <LayoutNavSingle
                    linkarea="/hrms/employee/manpower"
                    icon="ic:round-people-alt"
                    single-nav-title="Manpower Request"
                />
            </LayoutNavGroup>
            <!-- hide true-->

            <LayoutNavSingle
                class="hidden"
                linkarea="/hrms/project"
                icon="material-symbols:construction"
                single-nav-title="Project"
            />
            <LayoutNavSingle
                linkarea="/hrms/leave"
                icon="fluent-mdl2:leave-user"
                single-nav-title="Leave"
            />
            <LayoutNavGroup icon="mdi:cash" title="Loans and Advances">
                <LayoutNavSingle
                    linkarea="/hrms/loans/cashadvance"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Cash Advances"
                />
                <LayoutNavSingle
                    linkarea="/hrms/loans"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Loans"
                />
                <LayoutNavSingle
                    linkarea="/hrms/loans/otherdeductions"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Other Deductions"
                />
            </LayoutNavGroup>
            <LayoutNavSingle
                linkarea="/hrms/overtime"
                icon="mingcute:time-line"
                single-nav-title="Overtime"
            />
            <LayoutNavGroup icon="ion:ios-people" title="Payroll">
                <LayoutNavSingle
                    linkarea="/hrms/payroll/generatepayroll"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Generate Payroll"
                />
                <LayoutNavSingle
                    linkarea="/hrms/payroll/13thmonthpay"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="13th Month Pay"
                />
                <LayoutNavSingle
                    linkarea="/hrms/payroll/allowance"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Allowance"
                />
                <LayoutNavSingle
                    linkarea="/hrms/payroll/payrollrecord"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Payroll Record"
                />
            </LayoutNavGroup>
            <LayoutNavSingle
                linkarea="/hrms/reports"
                icon="ic:sharp-add-chart"
                single-nav-title="Reports"
            />
            <LayoutNavGroup icon="uim:schedule" title="Schedule">
                <LayoutNavSingle
                    linkarea="/hrms/schedule/department"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Department Schedule"
                />
                <LayoutNavSingle
                    linkarea="/hrms/schedule/employee"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Employee Schedule"
                />
                <LayoutNavSingle
                    linkarea="/hrms/schedule/project"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Project Schedule"
                />
            </LayoutNavGroup>
            <LayoutNavGroup icon="ion:ios-people" title="Setup">
                <LayoutNavSingle
                    linkarea="/hrms/setup/useraccounts"
                    icon="ic:round-manage-accounts"
                    single-nav-title="User Accounts"
                />
                <LayoutNavSingle
                    linkarea="/hrms/setup/department"
                    icon="ic:round-meeting-room"
                    single-nav-title="Department"
                />
                <LayoutNavSingle
                    linkarea="/hrms/setup/approvals"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Approvals"
                />
                <LayoutNavSingle
                    class="hidden"
                    linkarea="/hrms/setup/division"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Division"
                />
                <LayoutNavSingle
                    linkarea="/hrms/setup/hmo"
                    icon="ic:baseline-health-and-safety"
                    single-nav-title="HMO"
                />
                <LayoutNavSingle
                    linkarea="/hrms/setup/philhealth"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Philhealth"
                />
                <LayoutNavSingle
                    linkarea="/hrms/setup/pag-ibig"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Pag-Ibig"
                />
                <LayoutNavSingle
                    linkarea="/hrms/setup/sss"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="SSS"
                />
                <LayoutNavSingle
                    linkarea="/hrms/setup/wtax"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Withholding Tax"
                />
                <LayoutNavSingle
                    linkarea="/hrms/setup/leaves"
                    icon="material-symbols:dynamic-form-outline-rounded"
                    single-nav-title="Leaves"
                />
            </LayoutNavGroup>
        </LayoutNavModuleGroup>

        <!-- Inventory / Warehouse -->
        <LayoutNavModuleGroup
            id="dropdown-inventorywarehouse-main"
            title="Inventory / Warehouse"
        />

        <!-- Accounting -->
        <LayoutNavModuleGroup id="dropdown-accounting-main" title="Accounting" />

        <!-- Project Monitoring -->
        <LayoutNavModuleGroup
            id="dropdown-projectmonitoring-main"
            title="Project Monitoring"
        />
    </ul>
</template>

<!-- <LayoutNav hide="hidden" linkarea="/hrms/employee/application" icon="material-symbols:dynamic-form-outline-rounded" single-nav-title="Application"/> -->
<!-- <LayoutNavGroup id="dropdown-employees" icon="ic:baseline-people-outline" title="Employee"></LayoutNavGroup> -->
