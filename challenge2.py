def main():
  numberRounds = inputRoundsQuantity()
  startGame(numberRounds)

def inputRoundsQuantity():
  while True:
    try:
      #Número de rondas
      number = int(input())
      assert 0 < number < 10001
    except ValueError:
      print("Enter an integer")
    except AssertionError:
      print("Enter an integer between 1 and 10000")
    else:
      return number

def startGame(numberRounds):
  maximumDifference = -1
  winner = 0

  for round in range(numberRounds):
    #Puntajes de entrada
    scorePlayer1, scorePlayer2 = inputScores()

    #Diferencia actual del puntaje
    currentDifference = abs(scorePlayer1-scorePlayer2)
    
    #Almacenar el puntaje más alto
    if(currentDifference > maximumDifference):
      maximumDifference = currentDifference
    
      #Identificar quién se lleva la victoria
      if(scorePlayer1 > scorePlayer2):
        winner = 1
      else:
        winner = 2
  print(winner, maximumDifference)

def inputScores():
  while True:
    try:
      #Entrada de los puntajes
      scorePlayer1, scorePlayer2 = [int(x) for x in input().split()]
      assert 0 < scorePlayer1 and 0 < scorePlayer2
    except ValueError:
      print("Enter two integers")
    except AssertionError:
      print("Enter two integers greater than 0")
    else:
      return (scorePlayer1, scorePlayer2)
    #No hay empates, se puede asumir siempre existe un ganador único

#RUN
main()
