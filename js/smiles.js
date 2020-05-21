const margin = { top: 20, right: 20, bottom: 30, left: 40 }
const width = 800 - margin.left - margin.right
const height = 800 - margin.top - margin.bottom
const smileSize = 50
let currIndex = 0
let sadFace = null

d3.json('data/dataset.json')
  .then((dataset) => {
    const updateIndex = () => {
      if (currIndex === dataset.length - 1)
        currIndex = 0
      else
        currIndex += 1
    }

    const onMouseDown = value => {
      updateIndex()
      sadFace = value
      const newDs = dataset[currIndex].map(d => {
        if (d.id === value.id) {
          const newValue = Object.assign({}, value)
          newValue.isSad = true
          newValue.x = value.x
          newValue.y = value.y
          return newValue
        }
        return d
      })
      draw(newDs)
    }

    const onMouseUp = () => {
      const newDs = dataset[currIndex].map(d => {
        if (d.id === sadFace.id) {
          const newValue = Object.assign({}, sadFace)
          newValue.isSad = false
          return newValue
        }
        return d
      })
      draw(newDs)
    }

    d3.select("body").on('mouseup', onMouseUp)

    const svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


    const draw = (ds) => {
      const smiles = svg.selectAll('.smile').data(ds)

      smiles.exit().remove()

      smiles.enter()
        .append('image')
        .attr('class', 'smile')
        .attr('xlink:href', (d) => d.isSad ? 'assets/sad.png' : 'assets/happy.png')
        .attr('id', d => d.id)
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .on('mousedown', onMouseDown)

      smiles
        .transition().duration(1000)
        .attr('xlink:href', (d) => d.isSad ? 'assets/sad.png' : 'assets/happy.png')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
    }

    draw(dataset[0])
  })
  .catch(e => console.error(e))