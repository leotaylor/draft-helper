# Draft-Helper
## Every year as Fantasy Football season approaches, I find myself spending countless hours scouring player and team stats from around the web and compiling it all into an Excel spreadsheet. Sure, this is why I win year after year, but who has time for that? This web app uses stats from Fantasy Football Nerd API. It is then broken down by player position, overall ranking, and tier grouping. The user can keep track of which players are drafted in real time, while also noting which players belong to the user's team. The user can then save his team and name it in order to keep track of what round he/she landed a given player.

# Features
- A comprehensive list of all NFL players broken up by position and ranked by overall fantasy draft ranking and colored tier groups.
- Keep track of best available players
- Draft History lists what overall position a player was selected in a draft
- Keep track of what players were drafted to user's team.
- Undo any user errors
- User can save, delete, rename team.

# Visit this page:
[Draft-Helper](https://draft-helper.firebaseapp.com/)

# Technology Used
- React
- HTML (as JSX)
- SASS
- JavaScript
- Bootstrap
- Axios
- Firebase
- Fantasy Football Nerd API
- esLint
- Webpack

# Screenshots
![](https://raw.githubusercontent.com/leotaylor/draft-helper/master/snaps/loginscreen.png)

![](https://media.giphy.com/media/1jVKpue4clJh1Qutu1/giphy.gif)

![](https://media.giphy.com/media/w6nOLk30o6P8LnDbgz/giphy.gif)

# Future Features
- User can move players up and down in the overall rank
- Search Player by Name
- Player News
- Mock Draft

# How to Run
1. Clone this repo and cd into project.
1. Acquire Api Keys from Firebase and Fantasy Football Nerd.
1. Rename ```src/constants.js.example``` to ```src/constants.js```
1. Add api keys to ```src/constants.js```
1. Setup firebase db, JSON seed data exists in db folder.
1. In the root run ```npm install``` to install dependencies.
1. In root run ```npm start``` to start local host.
1. To deploy run ```npm run deploy```
