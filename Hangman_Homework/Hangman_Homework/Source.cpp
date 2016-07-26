#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <ctime>
#include <cctype>
#include <cstdlib>

using namespace std;

int main()
{
	string WordList[10] = { "apple", "banana", "cat", "door", "elephant", "figure", "gram", "high", "igloo", "jacket" };

	srand(time(NULL));
	int RandomNum = rand() % 10;

	string SecretWord = WordList[RandomNum];

	int WordLength = SecretWord.size();
	int count = 8;
	char GuessLetters;
	
	auto first = SecretWord.begin();

	string GuessWord;

	GuessWord.append(WordLength, '-');

	cout << "Welcome to Hangman. Good luck!" << endl;
	cout << endl;
	cout << "You have 8 incorrect guesses left." << endl;
	cout << endl;
	
	while(1)
	{
		cout << "You've used the following letters: " << endl;
		cout << endl;
		cout << endl;
		cout << "so far, the word is:" << endl;
		for (int i = 0; i < WordLength; i++)
		{
			cout << GuessWord[i];
		}

		cout << endl;
		
		cout << "Enter your guess: ";
		cin >> GuessLetters;
		tolower(GuessLetters);

		for (int i = 0; i < WordLength; i++)
		{
			if (GuessLetters == SecretWord[i])
			{	
				SecretWord.insert(first + i, GuessLetters, GuessLetters);
				SecretWord.erase(first + i + 1);
			}
			else
			{
				cout << "Sorry, " << GuessLetters << " isn't in the word." << endl;
				count--;
				break;
			}
		}

		for (int i = 0; i < WordLength; i++)
		{
			if (GuessWord[i] != '-')
			{
				cout << "You guessed it!" << endl;
				cout << "The word was hangmans" << endl;
				break;
			}
		}

		cout << "You have " << count << " incorrect guesses left." << endl;

		if (count == 0)
		{
			cout << endl;
			cout << "You've been hanged!" << endl;
			cout << "The word was " << SecretWord << endl;
			break;
		}
	}
}