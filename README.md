# Only Connect Player
###  Vue.js app I created to play homemade Only Connect quizes in a moderately faithful way to the original

## Creating a quiz
At some point in the future there may be a quiz editor within the web app, but for now you need to write the files manually.
### The structure of the quiz
Quizes have a title and some number of rounds, each of which is either a Connections round, a Sequence round, a Wall round, or a Vowel round. 
#### Rounds
Each of these rounds has a name, a type, and some number of questions, which is limited to six for all rounds except the Vowel round. Connections, Sequence.
#### Groups
Connection, Sequence, and Wall questions are all based off groups. Each group has a name, which should be descriptive of what links the elements of the group and will be displayed as the answer to the question, and four cards.
#### Cards
There are two types of card currently supported: text cards and image cards. These can be mixed within questions.
### The .ocq file format
.ocq is a simple archive format created to bundle all the files needed by an Only Connect quiz. You can create a .ocq file in the Create tab of the website using any files you need, but note:

 - .ocq files do not support folders, all the files must be in the same directory with no nested directories
 - althout a .ocq file can be created from any files, in order to be played it _must_ contain a file named "quiz.json"

### quiz.json
The "quiz.json" file contains all the information needed to play your quiz. You can see an example quiz.json file [here](quiz.json).
The root object of "quiz.json" should have a "name" field that will be displayed at the start and end of the quiz. And a "rounds" field that will hold an array of rounds.

Each round is an object with a "name" field that is displayed at the start of the round, a "type" field which tells the player how to play the round, and an array of "questions". The type field only has certain options:

 - "connection" or 0
 - "sequence" or 1
 - "wall" or 2
 - "vowel" or 3

What should be in the array of questions depends on the round type.
#### For Connections and Sequence rounds
Each questions is an object with a "name" which should describe what connects the items, and an array of "cards". For text cards the card can just be a simple string, but for image cards the card is specified as:
```
{
    "type": "img",
    "data": "<name of the image file to display>"
}
```
and the image used must be bundled with the quiz.json file when creating the .ocq file. Note that "data" is not a path to the image but the name of the file, as such it should not start "./" or anthing like that.
#### For Wall rounds
In the wall round each question is an array of four groups, each of which have the same format as a Connection/Sequence question.
#### For Vowel Rounds
In the vowel rounds each question is another object with a "name", which is displayed as what links the things in the vowel questions. The individual items are in an array called "phrases" and are each strings. These are capitalised, de-voweled, and de-spaced automatically.
## Playing your quiz
Once you have created you .ocq file you can open it in Only Connect Player, it is highly likely that you will have made a mistake somewhere in quiz.json which will cause the quiz to not play properly, if this is the case there should be an error printed in the console which will tell you the type of error and where in quiz.json it was so that you can fix you quiz.json file.