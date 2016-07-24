#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

int main()
{
	srand(time(NULL));

	int RandomNum = rand()%100 + 1;
	int input;
	int count = 0;

	cout << "Welcome to Guess My Number" << endl;
	cout << endl;

	while (1)
	{
		cout << "Enter the guess: ";
		cin >> input;

		if (RandomNum > input)
			cout << "Too low!" << endl;

		else if (RandomNum < input)
			cout << "Too high!" << endl;

		else if (RandomNum == input)
		{
			cout << "That's it! You got it in " << count << " guesses!" << endl;
			break;
		}

		count++;
	}
}