 // import * as chart from './chart';
import d3 from 'd3';

const margin = {top: 30, right: 20, bottom: 70, left: 50};
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

const div = d3.select('body').append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);

const svg = d3.select('body')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform',' translate(' + margin.left + ',' + margin.top + ')');

const durationLine = d3.svg.line()
  .x(d => x(d.startTime))
  .y(d => y(d.duration));

d3.json('data.json', (error, dataSets) => {
  const color = d3.scale.category10();
  const dataSetsParsed = dataSets.map((ds, i) =>
      ({
        id: i,
        color: color(i),
        label: ds.label,
        data: ds.data.map(d =>
          ({
            startTime: parseDate(d.startTime),
            duration: +d.duration,
            id: d.id
          })).sort(sortByDateAscending)
      })
  );

  const dataArray = dataSetsParsed
    .map(d => d.data)
    .reduce((a, b) => a.concat(b));

  x.domain(d3.extent(dataArray, d => d.startTime));
  y.domain([0, d3.max(dataArray, d => d.duration)]);

  const legendSpace = width / dataSetsParsed.length;

  dataSetsParsed.forEach((ds, i) => {
    const data = ds.data;
    // console.log(ds);
    svg.append('path')
      .attr('class', 'line')
      .style('stroke', ds.color)
      .attr('d', durationLine(data));

    svg.append('text')
      .attr('x', (legendSpace / 2) + i * legendSpace)
      .attr('y', height + (margin.bottom / 2) + 5)
      .attr('class', 'legend')
      .style('fill', ds.color)
      .text(ds.label);

    svg.selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('fill', ds.color)
      .attr('r', 4)
      .attr('cx', d => x(d.startTime))
      .attr('cy', d => y(d.duration))
      .on('mouseover', d => {
        div.transition()
          .duration(200)
          .style('opacity', .9);
        div.html(formatTime(d.startTime) + '<br/>'  + d.duration)
          .style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px')
          .style('background-color', ds.color)
          .style('color', 'white');
      })
      .on('mouseout', () => {
        div.transition()
        .duration(500)
        .style('opacity', 0);
      })
      .on('click', d => console.log(d));
  });

  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

  svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);
});
