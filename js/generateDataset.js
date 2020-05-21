// Script utilizzato inizialmente per creare il dataset in modo casuale, con:
// const margin = { top: 20, right: 20, bottom: 30, left: 40 }
// const width = 800 - margin.left - margin.right
// const height = 800 - margin.top - margin.bottom
// const smileSize = 50
// const minX = 0
// const maxX = width - smileSize
// const minY = 0
// const maxY = height - smileSize

const generateDs = (minX, maxX, minY, maxY) => {
  const ds = []
  for (let i = 0; i < 5; i++) {
    const curr = []
    for (let j = 0; j < 10; j++) {
      const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX
      const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY
      curr.push({ id: `${j}`, x, y })
    }
    ds.push(curr)
  }
  return ds
}
