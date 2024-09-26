import Groq from "groq-sdk"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const promptGroq = async (movieName: string) => {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `What is the one genre of the movie ${movieName}?
        The possible options are Action (28), Adventure (12), Animation (16), Comedy (35), Crime (80), 
        Documentary (99), Drama (18), Family (10751), Fantasy (14), History (36), Horror (27), Music (10402), 
        Mystery (9648), Romance (10749), Science Fiction (878), TV Movie (10770), Thriller (53), War (10752), Western (37).
        If the movie is a TV Movie - please let that take precedence over its genre. 
        Please reply with JUST the respective number.`
      }
    ],
    model: "llama3-8b-8192"
  })

  // NOTE: to derive a number from an erroneous GROQ output (eg. "Science Fiction (878)")
  const derivedGenreId = response?.choices[0]?.message?.content?.match(/\d+/)
  return derivedGenreId?.[0]
}

export default promptGroq
