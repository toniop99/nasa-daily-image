import { reactive } from 'vue'
import { getDailyImage } from '../services/nasaAPI'

export function useNasa () {
  const requestState = reactive({
    loading: false,
    error: '',
    data: {}
  })

  getNasaImage()
  async function getNasaImage () {
    try {
      requestState.loading = true
      requestState.error = ''
      requestState.data = {}

      const response = await getDailyImage()
      requestState.data = response
    } catch (error) {
      requestState.error = error.message || 'There was an error getting the image'
    } finally {
      requestState.loading = false
    }
  }

  return requestState
}
