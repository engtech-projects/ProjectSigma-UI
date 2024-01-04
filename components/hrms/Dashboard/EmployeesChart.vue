<template>
  <LayoutBoards title="Employees Chart">
    <LayoutChartDoughnut 
        :labels="[
          'Accounting',
          'Finance',
          'HR',
          'Legal',
          'Engineer',
          'Estimator',
          'Equipment Operator',
          'Marketing',
          'Sales',
          'IT',
          'Field Staff',
          'Operations',
        ]"
        :datas="[
          '40',
          '20',
          '12',
          '14',
          '56',
          '45',
          '88',
          '65',
          '56',
          '49',
          '71',
          '92',
        ]"
        
    />
  </LayoutBoards>
  </template>