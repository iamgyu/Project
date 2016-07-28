#include <iostream>
#include <string>

using namespace std;

string askText(string what);
int askNumber(string what);
void tellStory(string name, string noun, int number, string part, string verb);

int main()
{
	cout << "Welcome to Mad lib" << endl;
	cout << endl;
	cout << "Answer the following questions to help create a new story" << endl;
	string name = askText("Please enter a name: ");
	string noun = askText("Please enter a plural noun: ");
	int num = askNumber("Please enter a number: ");
	string part = askText("Please enter a body part: ");
	string verb = askText("Please enter a verb: ");

	cout << endl;

	tellStory(name, noun, num, part, verb);
	
}

string askText(string what)
{
	string answer;

	cout << what;

	cin >> answer;

	return answer;
}
int askNumber(string what)
{
	int answer;

	cout << what;

	cin >> answer;

	return answer;
}

void tellStory(string name, string noun, int number, string part, string verb)
{
	cout << "The famous explorer " << name << " had nearly given up a life-long quest to find" << endl;
	cout << "The Lost City of " << noun << " when one day, the " << noun << " found the explorer." << endl;
	cout << "Surrounded by " << number << " " << noun << ",  a tear came to " << name << "'s " << part << "." << endl;
	cout << "After all this time, the quest was finally over. And then, the " << noun << endl;
	cout << "promptly devoured " << name << ". The moral of the story? Be careful what you " << verb << " for." << endl;
}