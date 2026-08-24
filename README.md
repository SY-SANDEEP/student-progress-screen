# Student Progress Screen
I used a summary-first layout so Priya can understand mastery, activity, and priorities within a few seconds.
Started topics use compact cards with status labels; not-started topics use a separate learning state instead of a misleading 0% score.
The recommendation prioritises lower mastery while giving additional weight to topics that have not been studied recently.
I used Claude as an implementation assistant; one thing I checked rather than trusting blindly was the recommendation logic so it would select Respiration from the supplied data.
Run with `npm install` then `npm run dev`.
