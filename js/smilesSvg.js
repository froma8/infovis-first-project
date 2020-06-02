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

    const draw = (ds) => {
      const smiles = svg.selectAll('.smile').data(ds, (d) => d.id)

      smiles.exit().remove()

      const smile = smiles.enter()
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr('class', 'smile')
        .attr('id', d => d.id)
        .on('mousedown', onMouseDown)

      smile
        .append('circle')
        .attr('id', 'body')
        .attr('fill', '#EDC951')
        .attr('stroke', '#000000')
        .attr('stroke-width', 2)
        .attr('r', 25)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)

      smile
        .append('circle')
        .attr('id', 'left-eye')
        .attr('r', 3)
        .attr('cx', d => d.x - 8)
        .attr('cy', d => d.y - 5)

      smile
        .append('circle')
        .attr('id', 'right-eye')
        .attr('r', 3)
        .attr('cx', d => d.x + 8)
        .attr('cy', d => d.y - 5)

      smile
        .append('path')
        .attr('id', 'mouth')
        .attr('d', d => `M${d.x - 10},${d.y + 5} C ${d.x - 6} ${d.y + 15}, ${d.x + 6} ${d.y + 15}, ${d.x + 10} ${d.y + 5}`)
        .attr('x', d => d.x + 8)
        .attr('y', d => d.y - 5)
        .attr('fill', 'none')
        .attr('stroke-width', 2)
        .attr('stroke', '#000000')

      smiles.select('#body')
        .transition().duration(1000)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)

      smiles.select('#left-eye')
        .transition().duration(1000)
        .attr('cx', d => d.x - 8)
        .attr('cy', d => d.y - 5)

      smiles.select('#right-eye')
        .transition().duration(1000)
        .attr('cx', d => d.x + 8)
        .attr('cy', d => d.y - 5)

      smiles.select('#mouth')
        .transition().duration(1000)
        .attr('d', d => d.isSad
          ? `M${d.x - 10},${d.y + 10} C ${d.x - 6} ${d.y + 5}, ${d.x + 6} ${d.y + 5}, ${d.x + 10} ${d.y + 10}`
          : `M${d.x - 10},${d.y + 5} C ${d.x - 6} ${d.y + 15}, ${d.x + 6} ${d.y + 15}, ${d.x + 10} ${d.y + 5}`)
    }

    draw(dataset[0])
  })
  .catch(e => console.error(e))