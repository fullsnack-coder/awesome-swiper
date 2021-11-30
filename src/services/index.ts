export type Image = {
  id: string
  url: string
  title: string
  albumId: string
  thumbnailUrl: string
}

export const getImages = async (): Promise<Image[]> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_limit=100`
  )
  const data = await response.json()

  return data
}
