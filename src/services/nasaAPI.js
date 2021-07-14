export async function getDailyImage () {
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.VUE_APP_NASA_API_KEY}`
  )

  if (response.ok) {
    return await response.json()
  }

  throw new Error('Failed to fetch to API')
}
