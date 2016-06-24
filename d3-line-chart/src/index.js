// import * as chart from './chart';
import d3 from 'd3';

const margin = {top: 30, right: 20, bottom: 30, left: 50};
const width = 600 - margin.left - margin.right;
const height = 270 - margin.top - margin.bottom;

const iso = d3.time.format.utc('%Y-%m-%dT%H:%M:%S+00:00');
const parseDate = iso.parse;
const formatTime = d3.time.format('%e %B');
const sortByDateAscending = (a, b) => a.startTime - b.startTime;

const x = d3.time.scale().range([0, width]);
const y = d3.scale.linear().range([height, 0]);

const xAxis = d3.svg.axis().scale(x)
  .orient('bottom')
  .ticks(5);

const yAxis = d3.svg.axis().scale(y)
  .orient('left').ticks(5);

const valueline = d3.svg.line()
  .x(d => x(d.startTime))
  .y(d => y(d.duration));

const div = d3.select('body').append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);

const svg = d3.select('body')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform',' translate(' + margin.left + ',' + margin.top + ')');

// let labels = [];
d3.json('data.json', (error, dataSets) => {
  const data = dataSets[0].data.map(d =>
    ({
      startTime: parseDate(d.startTime),
      duration: +d.duration
    })
  ).sort(sortByDateAscending);

  x.domain(d3.extent(data, d => d.startTime));
  y.domain([0, d3.max(data, d => d.duration)]);

  svg.append('path')
    .attr('class', 'line')
    .attr('d', valueline(data));

  svg.selectAll('dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', 5)
    .attr('cx', d => x(d.startTime))
    .attr('cy', d => y(d.duration))
    .on('mouseover', d => {
      div.transition()
            .duration(200)
            .style('opacity', .9);
      div	.html(formatTime(d.startTime) + '<br/>'  + d.duration)
            .style('left', (d3.event.pageX) + 'px')
            .style('top', (d3.event.pageY - 28) + 'px');
    })
    .on('mouseout', d => {
      div.transition()
            .duration(500)
            .style('opacity', 0);
    })
    .on('click', d => console.log(d));

  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

  svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);
  // console.log(d3.extent(data, d => d.startTime));
});

// d3.json('data.json', (error, dataSets) => {
//   const labels = dataSets.map(x => x.label);
//   const data = dataSets.map(x => x.data)[0];
//   console.log(labels);
//   console.log(data);
//   const x = d => d.duration;
//   const y = d => parseDate(d.startTime);
//   console.log(data.map(d => y(d)));
//   console.log(data.map(d => x(d)));
//
//   // const date = data[0][0].startTime;
//   // console.log(date);
//   // // console.log(date.substring(0, 10));
//   // console.log(date);
//   // const parsedDate = parseDate(date);
// });
// console.log(parseDate);
// console.log(formatTime);
