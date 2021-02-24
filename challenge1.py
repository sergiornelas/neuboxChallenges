import re

def main():
  #Números de carácteres que delimitan las instrucciones y el mensaje
  lengthInstructionOne, lengthInstructionTwo, lengthMessage = inputNumbers()

  #Entrada de instrucciones y mensaje
  instruction1=inputString(lengthInstructionOne)
  instruction2=inputString(lengthInstructionTwo)
  message=inputMessage(lengthMessage)

  #Limpiar mensaje
  cleanMessage=transmitterDuplicateBug(message)

  #Buscar instrucciones ocultas dentro del mensaje
  findHiddenMessage(instruction1, cleanMessage)
  findHiddenMessage(instruction2, cleanMessage)

#-----------------------------------------------------------------
def inputNumbers():
  while True:
    try:
      #Entrada
      lengthInstrOne, lengthInstrTwo, lengthMessage = [int(x) for x in input().split()]
      #Rango de carácteres de instrucciones (2 a 50), y mensaje (3 a 5000)
      assert 2 <= lengthInstrOne <= 50 and 2 <= lengthInstrTwo <= 50 and 3 <= lengthMessage <= 5000
    except ValueError:
      print("Input three integers")
    except AssertionError:
      print("Instructions length (2-50), message length (3-5000)")
    else:
      return (lengthInstrOne, lengthInstrTwo, lengthMessage)

#-----------------------------------------------------------------
def inputString(lengthString):
  while True:
    try:
      string = input()
      #Si la cantidad de carácteres coincide con las establecidas en los números
      assert len(string) + (lengthString*-1) == 0   #!= doesn't work
    except AssertionError:
      print("String length not corresponding:("+str(lengthString)+")")
    else:
      return (string)

def inputMessage(lengthMessage):
  while True:
    try:
      message=inputString(lengthMessage)
      #Verifica que el mensaje solo tenga ciertos carácteres: [a-zA-Z0-9]
      assert re.match("^[a-zA-Z0-9]*$", message)
    except AssertionError:
      print("Message contains irregular characters")
    else:
      return (message)

# Ninguna instrucción en el libro de instrucciones contiene dos letras iguales seguidas
def transmitterDuplicateBug(buggedMessage):
  cleanMessage = buggedMessage[0]
  p = 1
  # XXcaaamakkCCessseAAllFueeegooDLLKmmNNN -> XcamakCeseAlFuegoDLKmN
  for i in range(len(buggedMessage)-1):
    if buggedMessage[i] != buggedMessage[p]:
      cleanMessage += buggedMessage[p]
    p += 1
  return cleanMessage

#-----------------------------------------------------------------
#Verifica si existe una instrucción oculta en el mensaje
def findHiddenMessage(instruction, message):
  if instruction in message:
    onlyOneHiddenInstruction()
  else:
    print("NO")
    return

firstInstructionFound = False

# Máximo existe una instrucción escondida por mensaje
def onlyOneHiddenInstruction():
  global firstInstructionFound
  if not firstInstructionFound:
    print("SI")
    firstInstructionFound = True
    return
  if firstInstructionFound:
    print("The message has TWO hidden instructions...\nSomeone tries to hack the system: WARNING!")
    return

# RUN
main()
