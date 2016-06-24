[
  {
    label: 'Master',
    data:
    [
      {
        'repeat(10)': {
          id: '{{index()}}',
          startTime: '{{moment(this.date(new Date(2016, 0, 1), new Date()))}}',
          duration: '{{integer(50, 100)}}'
        }
      }
    ]
  }, {
    label: 'Alpha',
    data:
    [
      {
        'repeat(10)': {
          id: '{{index()}}',
          startTime: '{{moment(this.date(new Date(2016, 0, 1), new Date()))}}',
          duration: '{{integer(50, 100)}}'
        }
      }
    ]
  }, {
    label: 'Beta',
    data:
    [
      {
        'repeat(10)': {
          id: '{{index()}}',
          startTime: '{{moment(this.date(new Date(2016, 0, 1), new Date()))}}',
          duration: '{{integer(50, 100)}}'
        }
      }
    ]
  }
]w;
