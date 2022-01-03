# Calculator
### **Live at:** https://velthas.github.io/calculator

As you may have discerned from the unimaginative name already, this project's objective was recreating a basic calculator with a graphical interface for users to interact with. 

It served as a more challenging project to test the knowledge of Javascript I have been acquiring over the last few weeks, focusing once again on DOM manipulation and Event Listeners. 

### Functionality

As of the time of writing this file, the user can perform all operations by clicking on the relevant buttons, both on phone and on computer. Keyboard key presses are not supported yet, but might be at a later date.

The calculator only evaluates two numbers at a time. The two operands and the operator will be displayed on the upper part of the display, while the result will appear right below it. 

Here are the current features available to users:
+ **Basic operations**: as any calculator worthy of its name, my implementation allows the user to perform all four basic operations, that is multiplication, division, subtraction and addition.

+ **Invert number**: by clicking on the '*+/-*' button it is possible to turn a number from positive to negative or viceversa.
 
+ **Modulo**: I decided to also slot in the '*%*' operator, which returns the remainder of a division between two operands. 

+ **Decimal**: user is allowed to add one decimal point only to any number. If an attempt is made to insert one when nothing is on the display, the code will slot in a 0 right before the decimal point.

+ **Consecutive operations**: After performing a calculation, multiple clicks on the equals button will cause the operations to be performed again using the answer as the first operand. Ex: 2 + 2 = 4 (button press) 4 + 2 = 6 (button press) 6 + 2 = 8;

+ **Editing ans**: After getting a result to an operation, user is free to manipulate it before performing the next operation on it.

### Design Structure

This calculator is a frontend project made using HTML, CSS and Javascript. Here follows a breakdown of the content of the files: 
+ **index.html**: contains the HTML code for the page. This time I opted not to have a footer and decided to place the 'shell' of the calculator right at the center of the page. Buttons were not ordered using containers for each row but instead by using CSS rules. 

+ **style.css**: contains all the CSS rules for the page. I made heavy use of flexbox to store containers exactly in the position I wanted. The buttons were ordered using the flex-wrap property, providing just enough gap and padding for everything to slide into place. I experimented once again with box-shadow to create some extra style effects as seen on the top of the display and the bottom of the calculator's shell.

+ **script.js**: contains all the script for the page. I initially had created function for each operation, but I quickly replaced that by slotting everything inside the operate function using a switch statement. I also made use of the ternary operator on at least two occasions and introduced an object to store calculations (although not strictly necessary, but good for practice).

### Limitations

Even though all of the requirements for the project were met, limitations were encountered when dealing with certain features:
+ **Floating point imprecision**: this is a problem common to many programming languages, resulting in somewhat standard operations having some peculiar outcomes due to the nature of how floating values are stored. An example of this can be seen when summing 0,4 to 0,2.

+ **User input**: As an arbitrary limitation I have made it so the user cannot type more than fifteen characters for a value. Initially, this was to prevent the number from overflowing from the display. The problem was later fixed, but in spite of this, I decided to keep the 15 character rule in place. My reasoning being that this is a basic calculator, and if you really needed to do such complex math you'd be better off using a scientific calculator anyway. This being said, results can indeed be massive numbers and will be automatically converted to scientific e notation if they pass a certain treshold.
