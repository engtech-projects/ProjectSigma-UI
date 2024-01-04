<template>
  <ul class="space-y-2">
    <!-- HRMS -->
    <LayoutNavModuleGroup title="hrms">
      <LayoutNav
        linkarea="/hrms"
        icon="material-symbols:alarm"
        single-nav-title="HRMS Dashboard"
      />
      <LayoutNav
        linkarea="/hrms/announcement"
        icon="ic:baseline-announcement"
        single-nav-title="Announcement"
      />
      <LayoutNavGroup icon="material-symbols:alarm" title="Attendance">
        <LayoutNav
          linkarea="/hrms/attendance/portal"
          icon="mdi:face-recognition"
          single-nav-title="Attendance Portal"
        />
        <LayoutNav
          linkarea="/hrms/attendance/timeinout"
          icon="material-symbols:alarm-on-outline-rounded"
          single-nav-title="Daily Logs Record"
        />
        <LayoutNav
          linkarea="/hrms/attendance/failtolog"
          icon="ic:baseline-flag-circle"
          single-nav-title="Failure To Log"
        />
        <!-- <LayoutNavGroup  icon="ic:outline-more-time" title="Daily Time Record">
                </LayoutNavGroup> -->
        <LayoutNav
          linkarea="/hrms/attendance/facerecognition"
          icon="mdi:face-recognition"
          single-nav-title="Face Recognition"
        />
        <LayoutNav
          linkarea="/hrms/attendance/attendancelogin"
          icon="material-symbols:person-add-outline-rounded"
          single-nav-title="Attendance Login"
        />
        <LayoutNav
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
      <LayoutNav
        linkarea="/hrms/calendar"
        icon="ic:round-calendar-month"
        single-nav-title="Event Calendar"
      />
      <LayoutNavGroup icon="ic:baseline-people-outline" title="Employee">
        <!-- hide true-->
        <LayoutNav
          class="hidden"
          linkarea="/hrms/employee/application"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="Application"
        />
        <LayoutNav
          linkarea="/hrms/employee/201"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="201"
        />
        <LayoutNav
          linkarea="/hrms/employee/paf"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="Personnel Action Notice"
        />
        <LayoutNav
          linkarea="/hrms/employee/onboarding"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="Onboarding"
        />
        <LayoutNav
          linkarea="/hrms/employee/manpower"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="Manpower Request"
        />
      </LayoutNavGroup>
      <!-- hide true-->

      <LayoutNav
        class="hidden"
        linkarea="/project"
        icon="material-symbols:construction"
        single-nav-title="Project"
      />
      <LayoutNavGroup icon="ion:ios-people" title="Setup">
        <LayoutNav
          linkarea="/hrms/setup/useraccounts"
          icon="material-symbols:person-add-outline-rounded"
          single-nav-title="User Accounts"
        />
        <LayoutNav
          linkarea="/hrms/setup/department"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="Department"
        />
        <LayoutNav
          linkarea="/hrms/setup/approvals"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="Approvals"
        />
        <LayoutNav
          class="hidden"
          linkarea="/hrms/setup/division"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="Division"
        />
        <LayoutNav
          linkarea="/hrms/setup/hmo"
          icon="ic:baseline-health-and-safety"
          single-nav-title="HMO"
        />
        <LayoutNav
          linkarea="/hrms/setup/philhealth"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="Philhealth"
        />
        <LayoutNav
          linkarea="/hrms/setup/pag-ibig"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="Pag-Ibig"
        />
        <LayoutNav
          linkarea="/hrms/setup/sss"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="SSS"
        />
        <LayoutNav
          linkarea="/hrms/setup/wtax"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="Withholding Tax"
        />
        <LayoutNav
          linkarea="/hrms/setup/leaves"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="Leaves"
        />
      </LayoutNavGroup>
      <LayoutNav
        linkarea="/hrms/leave"
        icon="fluent-mdl2:leave-user"
        single-nav-title="Leave"
      />
      <LayoutNavGroup icon="mdi:cash" title="Loans and Advances">
        <LayoutNav
          linkarea="/hrms/loans/cashadvance"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="Cash Advances"
        />
        <LayoutNav
          linkarea="/hrms/loans"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="Loans"
        />
        <LayoutNav
          linkarea="/hrms/loans/otherdeductions"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="Other Deductions"
        />
      </LayoutNavGroup>
      <LayoutNav
        linkarea="/hrms/overtime"
        icon="mingcute:time-line"
        single-nav-title="Overtime"
      />
      <LayoutNavGroup icon="ion:ios-people" title="Payroll">
        <LayoutNav
          linkarea="/hrms/payroll/generatepayroll"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="Generate Payroll"
        />
        <LayoutNav
          linkarea="/hrms/payroll/13thmonthpay"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="13th Month Pay"
        />
        <LayoutNav
          linkarea="/hrms/payroll/allowance"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="Allowance"
        />
        <LayoutNav
          linkarea="/hrms/payroll/payrollrecord"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="Payroll Record"
        />
      </LayoutNavGroup>
      <LayoutNav
        linkarea="/hrms/reports"
        icon="mdi:cash"
        single-nav-title="Reports"
      />
      <LayoutNavGroup icon="uim:schedule" title="Schedule">
        <LayoutNav
          linkarea="/hrms/schedule/department"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="Department Schedule"
        />
        <LayoutNav
          linkarea="/hrms/schedule/employee"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="Employee Schedule"
        />
        <LayoutNav
          linkarea="/hrms/schedule/project"
          icon="material-symbols:dynamic-form-outline-rounded"
          single-nav-title="Project Schedule"
        />
      </LayoutNavGroup>
    </LayoutNavModuleGroup>

    <!-- Inventory / Warehouse -->
    <LayoutNavModuleGroup
      title="Inventory / Warehouse"
      id="dropdown-inventorywarehouse-main"
    >
    </LayoutNavModuleGroup>

    <!-- Accounting -->
    <LayoutNavModuleGroup title="Accounting" id="dropdown-accounting-main">
    </LayoutNavModuleGroup>

    <!-- Project Monitoring -->
    <LayoutNavModuleGroup
      title="Project Monitoring"
      id="dropdown-projectmonitoring-main"
    >
    </LayoutNavModuleGroup>
  </ul>
</template>

<!-- <LayoutNav hide="hidden" linkarea="/hrms/employee/application" icon="material-symbols:dynamic-form-outline-rounded" single-nav-title="Application"/> -->
<!-- <LayoutNavGroup id="dropdown-employees" icon="ic:baseline-people-outline" title="Employee"></LayoutNavGroup> -->
