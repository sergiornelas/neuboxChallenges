"use strict";
/*
El código compila satisfactoriamente con estos compiladores en línea:
https://repl.it/languages/nodejs
https://www.katacoda.com/courses/nodejs/playground
*/

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Entrada de los números de carácteres que delimitan las instrucciones y el mensaje
const numbersTerminalInput = () => {
  return new Promise((resolve, reject) => {
    rl.question("", (numberInputs) => {
      resolve(evaluateNumbersInputs(numberInputs));
      reject(new Error("fail"));
    });
  });
};

//Entrada de instrucciones y mensaje
const stringTerminalInput = (stringLimitLength, isMessage) => {
  return new Promise((resolve, reject) => {
    rl.question("", (stringTerminalInput) => {
      resolve(
        evaluateStringInput(
          stringTerminalInput.trim(),
          stringLimitLength,
          isMessage
        )
      );
      reject(new Error("fail"));
    });
  });
};

//------------------------------------------------------------------------
const main = async () => {
  //Número de carácteres de instrucciones y mensaje
  const lengthInputs = await numbersTerminalInput();
  const [
    lengthInstructionOne,
    lengthInstructionTwo,
    lengthMessage,
  ] = lengthInputs;

  const isMessage = true; //Evalúa [a-zA-Z0-9] y limpia el mensaje

  //Primera Instrucción
  const firstInstruction = await stringTerminalInput(
    lengthInstructionOne,
    !isMessage
  );
  //Segunda Instrucción
  const secondInstruction = await stringTerminalInput(
    lengthInstructionTwo,
    !isMessage
  );
  //Mensaje
  const message = await stringTerminalInput(lengthMessage, isMessage);

  //Buscar instrucción oculta
  findHiddenMessage(firstInstruction, message);
  findHiddenMessage(secondInstruction, message);

  rl.close();
};

//RUN
main();

//------------------------------------------------------------------------
//Evalua que todos los números de entrada esten en el formato correcto
const evaluateNumbersInputs = (numberInputs) => {
  numberInputs = numberInputs.trim().split(" ");
  verifyNumbers(numberInputs);
  verifyInstructionRange(numberInputs[0]);
  verifyInstructionRange(numberInputs[1]);
  verifyMessageRange(numberInputs[2]);
  return numberInputs;
};

// Verifica que solo sean 3 numeros enteros de entrada
const verifyNumbers = (numberInputs) => {
  if (numberInputs.length !== 3) {
    console.log("Input three positive integers");
    process.exit();
  }
  for (const elem of numberInputs) {
    if (!/^[0-9]+$/.test(elem)) {
      console.log("Input three positive integers");
      process.exit();
    }
  }
};

//Establece el rango para las instrucciones (2 a 50)
const verifyInstructionRange = (instr) => {
  if (instr < 2 || instr > 50) {
    console.log("Incorrect instructions length (2-50)");
    process.exit();
  }
};

//Establece el rango para el mensaje (3 a 5000)
const verifyMessageRange = (msg) => {
  if (msg < 3 || msg > 5000) {
    console.log("Incorrect message length (3-5000)");
    process.exit();
  }
};

//------------------------------------------------------------------------
//Evalua que las instrucciones y el mensaje respeten los parámetros establecidos
const evaluateStringInput = (
  stringTerminalInput,
  stringLimitLength,
  isMessage
) => {
  verifyStringLength(stringTerminalInput, stringLimitLength);
  //Si el string de entrada es el mensaje y no las instrucciones (tiene validaciones extra)
  if (isMessage) {
    verifyMessageCharacters(stringTerminalInput);
    stringTerminalInput = transmitterDuplicateBug(stringTerminalInput);
  }

  return stringTerminalInput;
};

//Verifica que se respete el número de carácteres establecidos con los números anteriores
const verifyStringLength = (stringTerminalInput, stringLimitLength) => {
  if (stringTerminalInput.length !== parseInt(stringLimitLength)) {
    console.log(`Instruction/Message not corresponding length: ${stringLimitLength}`);
    process.exit();
  }
};

//Verifica que el mensaje solo tenga ciertos carácteres: [a-zA-Z0-9]
const verifyMessageCharacters = (stringTerminalInput) => {
  if (!/^[0-9a-zA-Z]+$/.test(stringTerminalInput)) {
    console.log("Message contains irregular characters");
    process.exit();
  }
};

//"Ninguna instrucción en el libro de instrucciones contiene dos letras iguales seguidas"
const transmitterDuplicateBug = (stringTerminalInput) => {
  let cleanMessage = stringTerminalInput[0];
  let p = 1;

  // XXcaaamakkCCessseAAllFueeegooDLLKmmNNN -> XcamakCeseAlFuegoDLKmN
  for (let q = 0; q < stringTerminalInput.length - 1; q++) {
    if (stringTerminalInput[q] !== stringTerminalInput[p])
      cleanMessage += stringTerminalInput[p];
    p++;
  }

  return cleanMessage;
};

//-------------------------------------------------------------------------
//Verifica si existe una instrucción oculta en el mensaje
const findHiddenMessage = (instruction, message) => {
  if (message.indexOf(instruction) >= 0) {
    onlyOneHiddenInstruction();
  } else {
    console.log("NO");
    return;
  }
};

let firstInstructionFound = false;

//Máximo existe una instrucción escondida por mensaje
const onlyOneHiddenInstruction = () => {
  if (!firstInstructionFound) {
    firstInstructionFound = true;
    console.log("SI");
    return;
  }
  else if (firstInstructionFound) {
    console.log(
      "The message has TWO hidden instructions...\nSomeone tries to hack the system: WARNING!"
    );
    return;
  }
};
