# (Re)Mission Possible
## Background
(Re)Mission Possible is an antibody-flinging, cancer butt-kicking game inspired by the neuroblastoma team and pediatric oncology patients at Memorial Sloan Kettering Cancer Center.

In this one-player game, the player controls a friendly mouse ninja named Yoko Hama with their mouse. Together, Yoko Hama and the player must complete 5 levels. In order to beat a level, the player must attach an antibody (hu3F8) to every cancer cell by picking up an antibody with their mouse and flinging it towards the cancer cell. Once this has been complete, immune system cells will come to wipe away the cancer cells and the player will advance to the next level.

As the levels progress, there will be more cancer cells to beat. Beginning at level 3, a helpful drug (GM-CSF) will appear randomly. The player may capture and store this drug. They may use it at any time to summon the immune system to aggressively clear cancer cells from the screen.

## Functionality and MVP
While playing (Re)Mission Possible, users will be able to:
- [ ] Control Yoko with their cursor
- [ ] Hold antibodies by clicking when Yoko comes in contact with antibody
- [ ] Fling antibodies at cancer cells by releasing the click
- [ ] Take damage when Yoko comes into contact with a cancer cell
- [ ] Restart the level if Yoko's health is depleted
- [ ] Store a helpful immune system boosting drug by clicking when Yoko comes into contact with the drug
- [ ] Release the drug from the store by hitting the space bar

In addition, this project will include:
- [ ] A series of introductory modals including the rules of the game. Users will have the option to skip the introduction.
- [ ] An 'About' modal including my contact information
- [ ] A production README

## Architecture & Technologies
- [ ] Vanilla Javascript for overall structure and game logic
- [ ] `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering
- [ ] HTML/CSS for modal content and styling
- [ ] Webpack

The following scripts will be involved in this project:
- `game_view.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM.
- `game.js`: this script will handle the game logic. It will also keep track of any available drug boost in a variable with a boolean value.
- `yoko.js`: this script will handle player movement logic. It will also keep track of any attachments (i.e. antibody).
- `antibody.js`: this script will handle antibody movement logic.
- `cancer_cell.js`: this script will handle cancer cell movement logic. It will also keep track of any attachments (i.e. antibody).
- `drug_boost.js`: this script will handle drug boost movement logic.


## Wireframes
This game view will consist of a single screen with two icons in the upper right hand side corner. One icon will open an 'About' modal with my contact information. The second icon will open a Help modal with game instructions.

**Splash Page**
![splash_page_img][splash_page]

**? Modal**
![instructions][instructions]

**Game View**
![game_view_img][game_view]


## Implementation Timeline
**Phase I**: Basic set up and skeleton
- [ ] Setup all necessary Node modules
- [ ] Setup `Easel.js`.
- [ ] Create `webpack.config.js` and `package.json` files.
- [ ] Write a basic entry file
- [ ] Create a skeleton for all 6 scripts mentioned in the Architecture & Technologies section.

**Phase II**: Learn and use the `Easel.js` API. Complete scripts.
- [ ] Build the following objects to connect to the `GameView` object
  - [ ] `Yoko`
  - [ ] `Antibody`
  - [ ] `CancerCell`
  - [ ] `DrugBoost`
- [ ] Render the objects listed above to the `Canvas` element
- [ ] Make each antibody and drug boost in the `GameView ` clickable
- [ ] Complete all 6 scripts mentioned in the Architecture & Technologies section.
- [ ] Ensure the `Canvas` successfully handles transitions from one level to the next.

**Phase III**: Style the frontend and modals.
- [ ] Style the `Canvas` with a nice looking title.
- [ ] Complete 'About' modal
- [ ] Complete 'Help' modal
- [ ] Complete 'Instructions' modals for each level.

## Bonus features
Future directions for the project include:
- [ ] Music and sound effects
- [ ] Addition of more levels
- [ ] Options for difficulty level


[game_view]: docs/wireframes/game_view.png
[instructions]: docs/wireframes/instructions.png
[splash_page]: docs/wireframes/splash_page.png
