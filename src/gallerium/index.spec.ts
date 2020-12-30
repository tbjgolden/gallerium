import Gallerium from '.'
import fs from 'fs'
import path from 'path'
import os from 'os'

describe('Gallerium', () => {
  it('generates a layout that makes sense', async () => {
    const gallerium = new Gallerium('column', 400, [
      {
        url: '/100x300',
        width: 100,
        height: 300
      },
      {
        url: '/300x100',
        width: 300,
        height: 100
      },
      {
        url: '/200x200',
        width: 200,
        height: 200
      }
    ])

    expect(gallerium.rasterized.ratio).toBe(4.333333333333333)

    const html = gallerium.toHTML()
    const filePath = path.join(os.homedir(), 'Downloads', 'gallerium.html')
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    fs.writeFileSync(filePath, html)

    expect(1).toBe(1)
  })

  it('generates a cost that makes sense', async () => {
    const galleriumA = new Gallerium('column', 400, [
      {
        url: '/100x300',
        width: 100,
        height: 300
      },
      {
        url: '/300x100',
        width: 300,
        height: 100
      },
      {
        url: '/200x200',
        width: 200,
        height: 200
      }
    ])
    const galleriumB = new Gallerium('column', 400, [
      {
        url: '/200x200',
        width: 200,
        height: 200
      },
      {
        url: '/200x200',
        width: 200,
        height: 200
      },
      {
        url: '/200x200',
        width: 200,
        height: 200
      }
    ])

    console.log(galleriumA.cost, galleriumB.cost)
    expect(galleriumA.cost).toBeGreaterThan(galleriumB.cost)
  })
})
