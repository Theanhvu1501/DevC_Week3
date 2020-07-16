
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const CHOICES = [
    {
      name: 'rock',
      uri: 'http://pngimg.com/uploads/stone/stone_PNG13622.png'
    },
    {
      name: 'paper',
      uri: 'https://www.stickpng.com/assets/images/5887c26cbc2fc2ef3a186046.png'
    },
    {
      name: 'scissors',
      uri:
        'http://pluspng.com/img-png/png-hairdressing-scissors-beauty-salon-scissors-clipart-4704.png'
    }
  ];

const randomComputerChoice = () =>
  CHOICES[Math.floor(Math.random() * CHOICES.length)];


export default function App() {
  const [GamePrompt,setGamePrompt] = useState('');
  const [userChoice, setUserChoice] = useState({});
  const [computerChoice, setComputerChoice] = useState({});


  const getRoundOutcome = userChoice => {
    const computerChoice = randomComputerChoice().name;

    let result;
  
    if (userChoice === 'rock') {
      result = computerChoice === 'scissors' ? 'Victory!' : 'Defeat!';
    }
    if (userChoice === 'paper') {
      result = computerChoice === 'rock' ? 'Victory!' : 'Defeat!';
    }
    if (userChoice === 'scissors') {
      result = computerChoice === 'paper' ? 'Victory!' : 'Defeat!';
    }
  
    if (userChoice === computerChoice) result = 'Tie game!';
    return [result, computerChoice];
  };

 
  const onPress = playerChoice => {
    const [result, compChoice] = getRoundOutcome(playerChoice);
  
    const newUserChoice = CHOICES.find(choice => choice.name === playerChoice);
    const newComputerChoice = CHOICES.find(choice => choice.name === compChoice);
  
    setGamePrompt(result);
    setUserChoice(newUserChoice);
    setComputerChoice(newComputerChoice);
  };

  const ChoiceCard = ({ player, choice: { uri, name } }) => {
    const title = name && name.charAt(0).toUpperCase() + name.slice(1);

    return (
      <View style={styles.choiceContainer}>
        <Text style={styles.choiceDescription}>{player}</Text>
        <Image source={{ uri }} resizeMode="contain" style={styles.choiceImage} />
        <Text style={styles.choiceCardTitle}>{title}</Text>
      </View>
    );
  };
  const getResultColor = () => {
    if (GamePrompt === 'Victory!') return 'green';
    if (GamePrompt === 'Defeat!') return 'red';
    return null;
  };
 
  return (
   
    <View style={styles.container}>
       <Text style={{ fontSize: 35, color: getResultColor() }}>{GamePrompt}</Text>
      <View style={{ flexDirection: 'row', marginBottom: 60 }}>
        <View style={styles.choicesContainer}>
          <ChoiceCard player="Player" choice={userChoice} />
          <Text style={{ color: '#250902' }}>vs</Text>
          <ChoiceCard player="Computer" choice={computerChoice} />
        </View>
      </View>
      {
        CHOICES.map(choice => {
          return (
            <TouchableOpacity key={choice.name} style={styles.buttonStyle} onPress={() => {onPress(choice.name)}}>
              <Text style={styles.buttonText}>
                {choice.name}
              </Text>
            </TouchableOpacity>)
        })
      }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ebee'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 200,
    margin: 10,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#640D14',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  choicesContainer: {
    flex: 1,
    margin: 10,
    borderWidth: 2,
    paddingTop: 100,
    shadowRadius: 5,
    paddingBottom: 100,
    borderColor: 'grey',
    shadowOpacity: 0.90,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { height: 5, width: 5 },
  },
  choiceContainer: {
    flex: 1,
    alignItems: 'center',
  },
  choiceDescription: {
    fontSize: 25,
    color: '#250902',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  choiceCardTitle: {
    fontSize: 30,
    color: '#250902'
  },
  choiceImage: {
    width: 150,
    height: 150,
    padding: 10,
  }
});
