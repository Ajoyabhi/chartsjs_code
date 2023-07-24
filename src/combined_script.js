document.addEventListener('DOMContentLoaded', function () {
  const pieCtx = document.getElementById('piechart').getContext('2d')
  const lineCtx = document.getElementById('myChart').getContext('2d')
  const scatter_ctx = document.getElementById('scatter').getContext('2d')
  const progess_ctx = document.getElementById('progessLine').getContext('2d')


  const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [20, 10, 30, 25, 15], // Sample data for the pie chart
        backgroundColor: [
          '#FF6384',
          '#FFA500',
          '#FFCE56',
          '#007500',
          '#86C7F3',
        ],
      },
    ],
  }

  const DATA_COUNT = 7
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 }

  const data1 = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'voilet', 'magenta'],
    datasets: [
      {
        label: 'Dataset 1',
        data: getRandomData(NUMBER_CFG),
        borderColor: 'grey',
        backgroundColor: [
          '#FF6384',
          '#FFA500',
          '#FFCE56',
          '#007500',
          '#86C7F3',
          '#461959',
          'FF90BB',
        ],
      },
    ],
  }

  function getRandomData(config) {
    const data = []
    for (let i = 0; i < config.count; i++) {
      data.push(Math.random() * (config.max - config.min) + config.min)
    }
    return data
  }

  const scatterConfig = {
    type: 'line',
    data: data1,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Sactter',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  }

  

  const pieConfig = {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Pie Chart',
        },
      },
    },
  }

  const lineConfig = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Line Chart',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  }

  const pieChart = new Chart(pieCtx, pieConfig)
  const lineChart = new Chart(lineCtx, lineConfig)
  const Scatterchart = new Chart(scatter_ctx, scatterConfig)
  const progessLine = new Chart(progess_ctx, progressConfig)
})
