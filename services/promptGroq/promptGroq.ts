import Groq from "groq-sdk"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const promptGroq = async (movieName: string, taggedGenres: string, maxRetries = 3, delay = 1000) => {
  for (let attempts = 0; attempts < maxRetries; attempts++) {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `What is the one genre of the movie "${movieName}"?
          The possible options are Action (28), Adventure (12), Animation (16), Comedy (35), Crime (80), 
          Documentary (99), Drama (18), Family (10751), Fantasy (14), History (36), Horror (27), 
          Music (10402), Mystery (9648), Romance (10749), Science Fiction (878), TV Movie (10770), 
          Thriller (53), War (10752), Western (37).
          Please select one from the following: ${taggedGenres}.
          Please reply with JUST the respective number.`
        }
      ],
      model: "llama3-8b-8192"
    })

    // Extract the genre ID from the response
    const genreContent = response?.choices?.[0]?.message?.content

    if (genreContent) {
      const derivedGenreId = genreContent.match(/\d+/)
      return derivedGenreId ? derivedGenreId[0] : null // Return null if no match found
    }

    // Log the attempt if the response is empty or invalid
    console.warn(`Received an empty or invalid response for movie "${movieName}". Attempt ${attempts + 1}/${maxRetries}`)

    // Wait for the specified delay before retrying
    await new Promise(resolve => setTimeout(resolve, delay))
  }

  console.error(`Failed to retrieve genre for movie "${movieName}" after ${maxRetries} attempts.`)
  return null // or return a default value if preferred
}

export default promptGroq
