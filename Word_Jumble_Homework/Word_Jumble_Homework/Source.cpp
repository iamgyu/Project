#include <iostream>
#include <string>
#include <cstdlib>
#include <ctime>

using namespace std;

int main()
{
	string arr[5][2] = { {"Apple", "Red"}, {"Sky", "Blue"}, {"Banana", "Yellow"}, {"Sun", "Bright"}, {"Money", "Coin"} };
	string guess;

	srand(time(NULL));
	
	int	RandomNum = rand() % 5;
	string word = arr[RandomNum][0];
	int length = word.size();
	
	cout << "Welcome to Word Jumble!" << endl;
	cout << endl;

	cout << "Unscramble the letters to make a word." << endl;
	cout << "Enter 'hint' for a hint" << endl;
	cout << "Enter 'quit' to quit the game" << endl;

	cout << "The jumble is : ";
	
	for (int i = 0; i < length; i++)
	{
		int n1 = rand() % length;
		int n2 = rand() % length;
		char temp = word[n1];
		word[n1] = word[n2];
		word[n2] = temp;
	}

	cout << word << endl;

	word = arr[RandomNum][0];

	while (1)
	{	
		cout << "Your guess : ";
		cin >> guess;

		if (guess == word)
		{
			cout << "That's it! You guessed it!" << endl;
			break;
		}
		else if (guess == "hint")
		{
			cout << arr[RandomNum][1] << endl;
		}
		else if (guess == "quit")
		{
			break;
		}
		else
		{
			cout << "Sorry, that's not it" << endl;
		}
	}

	cout << "Thanks for playing." << endl;
}