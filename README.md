# Prisoner's Dilemma Simulation

Prisoner's Dilemma is a standard example of a game analyzed in game theory that shows why two completely rational individuals might not cooperate, even if it appears that it is in their best interest to do so. This application simulates the Prisoner's Dilemma, allowing users to select various strategies, run multiple games, and observe the outcomes in terms of points scored according to chosen strategies.

View Online @ https://jerrolkrause.github.io/prisoners-dilemma/

## Features

### Strategies

Users can select from a variety of strategies for the simulation:

- **Tit For Tat**: Begins by cooperating and then replicates the opponent's previous action.
- **Tit For Tat Forgiving**: Similar to Tit For Tat, this strategy cooperates initially and then usually copies the opponent's last move but occasionally forgives defection and cooperates instead.
- **Always Defects**: Defects in every round, regardless of the opponent's action.
- **Always Cooperates**: Cooperates in every round, regardless of the opponent's action.
- **Unforgiving**: Cooperates until the opponent defects; after that, it always defects.
- **Sneaky**: Similar to Tit For Tat but will randomly defect 10% of the time.
- **Random**: Randomly defects or cooperates 50% of the time.

Each strategy can be enabled or disabled and assigned a specific count to indicate how many players will use that strategy during the simulation.

### Game Settings

Configure the simulation with the following game settings:

- **Number of Games**: The total number of games to be played in the simulation.
- **Rounds Per Game**: The number of rounds to be played in each game.
- **Random Rounds**: Add up to this many random rounds.
- **Noise**: The percentage chance of a strategy's action being flipped randomly. This introduces uncertainty into the simulation to simulate imperfect decision-making.

Additionally, there is an option to have each strategy play against itself as well as against other strategies.

### Scoring

The scoring section allows users to define how points are distributed in the game:

- **Score for Mutual Cooperation**: Points awarded when both players cooperate.
- **Score for Mutual Defection**: Points awarded when both players defect.
- **Scores for Single Defection**: Points awarded to the defector and the cooperator when one defects and the other cooperates.

### Simulation Results

The simulation results are displayed below the settings, where each strategy's performance is listed along with the points scored in the format:

- **Strategy Name**: The number of points scored by cooperating and defecting.

## Running the Simulation

To initiate the simulation, simply configure your strategies and game settings, and click the "Run Game" button. The results will be displayed, allowing for analysis and comparison of different strategies.

---

## Installation

To run this application:

1. Clone the repository to your local machine.
2. Ensure you have [Node.js](https://nodejs.org/) installed.
3. Navigate to the project directory and run `npm install` to install dependencies.
4. Start the application by running `npm start`.

## Contributing

Contributions to this project are welcome. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature.
3. Commit your changes with clear and concise commit messages.
4. Push your changes to the branch.
5. Create a pull request explaining your changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

For any questions or suggestions regarding the application, please open an issue in the GitHub repository.

Enjoy simulating the Prisoner's Dilemma and may the best strategy win!
