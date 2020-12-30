type RawImageData = {
  url: string
  width: number
  height: number
}
interface ImageData extends RawImageData {
  uid: string
}
type Arrangement = Array<Arrangement | ImageData>
type Rasterized = {
  ratio: number
  images: Array<{
    url: string
    // percentages
    height: number
    width: number
  }>
  // Maybe an option to do some devicePixelRatio magic
  // minWidth/maxWidth: number;
}

type Direction = 'column' | 'row'

const sqrt2 = Math.sqrt(2)
const halfsqrt2 = Math.sqrt(2) / 2

const addUIDs = (images: RawImageData[]): ImageData[] => {
  const newImages = []
  for (let i = 0; i < images.length; i++) {
    newImages.push({
      ...images[i],
      uid: `${images[i].url}.${Date.now()}${Math.random()}`
    })
  }
  return newImages
}

const sortFunction = (a: ImageData, b: ImageData) =>
  a.width / a.height - b.width / b.height

export default class Gallerium {
  direction: Direction
  width: number
  images: ImageData[]

  constructor(
    direction: 'column' | 'row',
    width: number,
    images: RawImageData[]
  ) {
    this.direction = direction
    this.width = width
    this.images = addUIDs(images).sort(sortFunction)
  }

  // TODO: validation for args

  setWidth(width: number): void {
    this.width = width
  }

  toHTML(): string {
    const rasterized = this.rasterized
    return `<!doctype html><html><body style="padding:40px"><div style="width:${
      this.width
    }px"><div style="position:relative;padding:0 0 ${
      100 / rasterized.ratio
    }%;outline:2px solid blue"><div style="position:absolute;top:0;left:0;width:100%;height:100%;display:flex;flex-wrap:wrap">${rasterized.images
      .map(
        (image) =>
          `<div style="width:${100 * image.width}%;height:${
            100 * image.height
          }%;outline:1px solid blue;position:relative"><div style="font-size:12px;font-family:monospace;position:absolute;z-index:2;top:50%;left:50%;padding:4px;background:#fff;transform:translate(-50%,-50%) rotate(-60deg)">${
            image.url
          }</div></div>`
      )
      .join('')}</div></div></div></body></html>`
  }

  get arrangement(): Arrangement {
    // some algorithm here
    // min w 100
    // max w+h 400

    const portrait = []
    const square = []
    const landscape = []

    for (const image of this.images) {
      const ratio = image.width / image.height
      if (ratio < halfsqrt2) {
        portrait.push([ratio, image])
      } else if (ratio > sqrt2) {
        landscape.push([ratio, image])
      } else {
        square.push([ratio, image])
      }
    }

    return this.images
  }

  get rasterized(): Rasterized {
    return rasterize(this.arrangement, this.width, 0)
  }

  get cost(): number {
    const rasterized = this.rasterized.images
    return rasterized.reduce((c, x) => {
      const area = x.width * x.height
      const perimeter = x.width + x.height + x.width + x.height
      return c + perimeter / area
    }, 0)
  }
}

function rasterize(
  arrangement: Arrangement,
  width: number,
  depth: number
): Rasterized {
  const parts: Rasterized[] = []
  for (const item of arrangement) {
    if (Array.isArray(item)) {
      parts.push(rasterize(item, width, depth + 1))
    } else {
      parts.push({
        ratio: item.width / item.height,
        images: [
          {
            url: item.url,
            height: 1,
            width: 1
          }
        ]
      })
    }
  }

  // Merge row/column
  if (depth % 2 === 0) {
    const ratio = parts.reduce((a, b) => a + b.ratio, 0)
    const images: Rasterized['images'] = []
    for (const part of parts) {
      for (const image of part.images) {
        const scale = part.ratio / ratio
        images.push({
          url: image.url,
          width: image.width * scale,
          height: image.height
        })
      }
    }
    return { ratio, images }
  } else {
    // same calculation but invert every ratio
    const ratio = parts.reduce((a, b) => a + 1 / b.ratio, 0)
    const images: Rasterized['images'] = []
    for (const part of parts) {
      const partRatio = 1 / part.ratio
      for (const image of part.images) {
        const scale = partRatio / ratio
        images.push({
          url: image.url,
          width: image.width,
          height: image.height * scale
        })
      }
    }
    return { ratio: 1 / ratio, images }
  }
}
