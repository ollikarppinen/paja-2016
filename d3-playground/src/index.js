import d3 from 'd3'

const margin = { top: 20, right: 30, bottom: 30, left: 40 }

const width = 960 - margin.left - margin.right
const height = 500 - margin.top - margin.bottom

const x = d3.scale.ordinal()
  .rangeRoundBands([0, width], 0.1)

const y = d3.scale.linear()
  .range([height, 0])

const chart = d3.select('.chart')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const type = d => {
  d.value = +d.value
  return d
}

const xAxis = d3.svg.axis()
  .scale(x)
  .orient('bottom')

const yAxis = d3.svg.axis()
  .scale(y)
  .orient('left')
  .ticks(10, '%')

d3.tsv('data.tsv', type, (e, data) => {
  x.domain(data.map(d => d.name))
  y.domain([0, d3.max(data, d => d.value)])

  chart.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

  chart.append('g')
    .attr('class', 'y axis')
    .call(yAxis)

  chart.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.name))
    .attr('y', d => y(d.value))
    .attr('height', d => height - y(d.value))
    .attr('width', x.rangeBand())

  chart.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('Frequency')
})
