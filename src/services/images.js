import axios from 'axios'

export async function imageToDataURL (url) {
  return new Promise((resolve, reject) => {
    axios.get(url)

      .then(response => response.data.blob())
      .then(blob => {
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
          resolve(reader.result)
        }
      })
  })
}
