// Function to read CSV file and process data
function processData(csvData) {
  const parsedData = Papa.parse(csvData, { header: true, skipEmptyLines: true })
  const df = parsedData.data

  // Group the DataFrame by 'Merchant' and calculate the total withdrawal for each merchant
  const withdrawalByMerchant = df.reduce((acc, row) => {
    const merchant = row['Merchant'] || row['Platform'] // Use 'Merchant' if available, otherwise use 'Platform'
    const withdrawalAmt = parseFloat(row['WITHDRAWAL AMT'])
    acc[merchant] = (acc[merchant] || 0) + withdrawalAmt
    return acc
  }, {})

  // Sort the result in descending order of the total withdrawal
  const sortedWithdrawalByMerchant = Object.entries(withdrawalByMerchant).sort(
    (a, b) => b[1] - a[1]
  )

  // Separate merchants and total withdrawal amounts
  const filteredMerchant = sortedWithdrawalByMerchant.map((item) => item[0])
  const totalWithdrawalAmounts = sortedWithdrawalByMerchant.map(
    (item) => item[1]
  )

  // Create the first chart using Chart.js
  const ctx = document.getElementById('merchantChart').getContext('2d')
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: filteredMerchant,
      datasets: [
        {
          label: 'merchant spend',
          data: totalWithdrawalAmounts,
          backgroundColor: [
            '#C51605',
            '#FD8D14',
            '#FFE17B',
            '#CECE5A',
            '#FBA1B7',
            '#E8FFCE',
            '#7C73C0',
            '#461959',
            '#CD6688',
            // Add more colors if needed
          ],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true, // Set responsive to true
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })

  // Group the DataFrame by 'Another Column' and calculate the total withdrawal for each group
  const withdrawalByAnotherColumn = df.reduce((acc, row) => {
    const group = row['Platform']
    const withdrawalAmt = parseFloat(row['WITHDRAWAL AMT'])
    acc[group] = (acc[group] || 0) + withdrawalAmt
    return acc
  }, {})

  // Sort the result in descending order of the total withdrawal
  const sortedWithdrawalByAnotherColumn = Object.entries(
    withdrawalByAnotherColumn
  ).sort((a, b) => b[1] - a[1])

  // Separate groups and total withdrawal amounts
  const filteredGroup = sortedWithdrawalByAnotherColumn.map((item) => item[0])
  const totalWithdrawalAmounts2 = sortedWithdrawalByAnotherColumn.map(
    (item) => item[1]
  )

  // Create the second chart using Chart.js
  const ctx2 = document.getElementById('merchantChart2').getContext('2d')
  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: filteredGroup,
      datasets: [
        {
          label: 'Platform',
          data: totalWithdrawalAmounts2,
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',

            // Add more colors if needed
          ],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true, // Set responsive to true
      maintainAspectRatio: false,
      scales: {
        x: {
          position: 'bottom', // Place X-axis labels at the bottom
        },
        y: {
          beginAtZero: true,
        },
      
      },
    },
  })

  // Group the DataFrame by 'Category' and calculate the total withdrawal for each category
  const withdrawalByCategory = df.reduce((acc, row) => {
    const category = row['Category']
    const withdrawalAmt = parseFloat(row['WITHDRAWAL AMT'])
    acc[category] = (acc[category] || 0) + withdrawalAmt
    return acc
  }, {})

  // Sort the result in descending order of the total withdrawal
  const sortedWithdrawalByCategory = Object.entries(withdrawalByCategory).sort(
    (a, b) => b[1] - a[1]
  )

  // Separate categories and total withdrawal amounts
  const categories = sortedWithdrawalByCategory.map((item) => item[0])
  const totalWithdrawalAmountsPie = sortedWithdrawalByCategory.map(
    (item) => item[1]
  )

  // Create the pie chart using Chart.js
  const ctxPie = document.getElementById('categoryPieChart').getContext('2d')
  new Chart(ctxPie, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [
        {
          label: 'Total Withdrawal',
          data: totalWithdrawalAmounts,
          backgroundColor: [
            '#C51605',
            '#FD8D14',
            '#FFE17B',
            '#CECE5A',
            '#FBA1B7',
            '#E8FFCE',
            '#7C73C0',
            '#461959',
            '#CD6688',
            // Add more colors if needed
          ],
          borderColor: [
            '#C51605',
            '#FD8D14',
            '#FFE17B',
            '#CECE5A',
            '#FBA1B7',
            '#E8FFCE',
            '#7C73C0',
            '#461959',
            '#CD6688',
            // Add more colors if needed
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true, // Set responsive to true
      maintainAspectRatio: false,
      legend: {
        position: 'right', // Place the legend on the right side
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: 8, // Set the font size for labels
            },
          },
        },
      },
    },
  })
}

// Fetch the CSV data from the file and call processData
// fetch('newcsvfile.csv')
//     .then((response) => response.text())
//     .then(processData)

function fetchData() {
  return fetch('newcsvfile.csv').then((response) => response.text())
}

// const loadingDiv = document.getElementById('loading');
//     loadingDiv.style.display = 'block';

fetchData()
  .then((csvData) => {
    // Hide the loading indicator when data is fetched

    processData(csvData)
  })
  .catch((error) => {
    console.error('Error fetching or processing data:', error)
    // Handle the error and show an error message on the frontend
    loadingDiv.textContent = 'Error loading data'
  })

function processData1(csv1Data) {
  const parsedData = Papa.parse(csv1Data, {
    header: true,
    skipEmptyLines: true,
  })
  const df = parsedData.data

  // Function to parse the date strings into JavaScript Date objects
  function parseDate(dateString) {
    const [day, monthStr, yearStr] = dateString.split('-')
    const year = parseInt(yearStr, 10) + 2000 // Convert 19 to 2019
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    const month = monthNames.indexOf(monthStr) + 1
    return new Date(year, month - 1, day)
  }

  // Group the DataFrame by 'VALUE DATE' and calculate the total deposit and withdrawal for each month
  const transactionsByMonth = df.reduce((acc, row) => {
    const date = parseDate(row['VALUE DATE'])
    const depositAmt = parseFloat(row['DEPOSIT AMT']) || 0
    const withdrawalAmt = parseFloat(row['WITHDRAWAL AMT']) || 0
    const monthYear = `${date.toLocaleString('default', {
      month: 'short',
    })}-${date.getFullYear().toString().substr(-2)}` // Format: Aug-19

    if (!acc[monthYear]) {
      acc[monthYear] = { deposit: 0, withdrawal: 0 }
    }

    acc[monthYear]['deposit'] += depositAmt
    acc[monthYear]['withdrawal'] += withdrawalAmt
    return acc
  }, {})

  // Separate months and their total deposit and withdrawal amounts
  const months = Object.keys(transactionsByMonth)
  const totalDepositAmounts = months.map(
    (month) => transactionsByMonth[month]['deposit']
  )
  const totalWithdrawalAmounts = months.map(
    (month) => transactionsByMonth[month]['withdrawal']
  )

  // Create the chart using Chart.js
  const ctx = document
    .getElementById('monthlyTransactionsChart')
    .getContext('2d')

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Total Deposit',
          data: totalDepositAmounts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Total Withdrawal',
          data: totalWithdrawalAmounts,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true, // Set responsive to true
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
}

// Fetch the CSV data from the file and call processData
// fetch('newcsvfile.csv')
//   .then((response) => response.text())
//   .then(processData1)

function fetchData() {
  return fetch('newcsvfile.csv').then((response) => response.text())
}

fetchData()
  .then((csv1Data) => {
    // Hide the loading indicator when data is fetched
    
    processData1(csv1Data)
  })
  .catch((error) => {
    console.error('Error fetching or processing data:', error)
    // Handle the error and show an error message on the frontend
    
})

function processData2(csvData) {
  const parsedData = Papa.parse(csvData, { header: true, skipEmptyLines: true })
  const df = parsedData.data

  // Group the DataFrame by month and calculate the total withdrawal, deposit, and balance for each month
  const groupedData = df.reduce((acc, row) => {
    const date = new Date(row['VALUE DATE'])
    const month = date.toLocaleString('default', { month: 'short' }) // Get the month abbreviation
    const withdrawalAmt = parseFloat(row['WITHDRAWAL AMT']) || 0
    const depositAmt = parseFloat(row['DEPOSIT AMT']) || 0
    const balanceAmt = parseFloat(row['BALANCE AMT']) || 0

    if (!acc[month]) {
      acc[month] = { withdrawal: 0, deposit: 0, balance: 0 }
    }

    acc[month]['withdrawal'] += withdrawalAmt
    acc[month]['deposit'] += depositAmt
    acc[month]['balance'] = balanceAmt // Assuming balance is the final balance for each month

    return acc
  }, {})

  // Separate months and corresponding values for each group
  const months = Object.keys(groupedData)
  const withdrawalAmounts = months.map(
    (month) => groupedData[month]['withdrawal']
  )
  const depositAmounts = months.map((month) => groupedData[month]['deposit'])
  const balanceAmounts = months.map((month) => groupedData[month]['balance'])

  // Create the stacked bar chart using Chart.js
  const ctx = document.getElementById('stackedBarChart').getContext('2d')
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Withdrawal Amount',
          data: withdrawalAmounts,
          backgroundColor: 'rgba(75, 192, 192, 0.8)',
        },
        {
          label: 'Deposit Amount',
          data: depositAmounts,
          backgroundColor: 'rgba(255, 99, 132, 0.8)',
        },
        {
          label: 'Balance Amount',
          data: balanceAmounts,
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
          beginAtZero: true,
        },
        
      },
    },
  })
}

// Fetch the CSV data from the file and call processData



function fetchData2() {
    return fetch('newcsvfile.csv').then((response) => response.text())
}
  
fetchData2()
    .then((csvData) => {
      // Hide the loading indicator when data is fetched
      
      processData2(csvData)
    })
    .catch((error) => {
      console.error('Error fetching or processing data:', error)
      // Handle the error and show an error message on the frontend
      
})