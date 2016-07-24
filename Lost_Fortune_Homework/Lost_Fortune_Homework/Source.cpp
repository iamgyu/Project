#include <iostream>
#include <string>

using namespace std;

int main()
{
	int QuestPlayer, DiePlayer;
	string LastName;

	int GoldPiece = 900;

	cout << "Welcome to Lost Fortune" << endl;
	cout << endl;

	cout << "Please enter the following for your personalized adventure" << endl;

	cout << "Enter a number: ";
	cin >> QuestPlayer;

	cout << "Enter a number, smaller than the first: ";
	cin >> DiePlayer;

	cout << "Enter your last name: ";
	cin >> LastName;
	cout << endl;

	cout << "A brave group of " << QuestPlayer << " set out on a quest -- in search of the lost treasure of the Ancient	Dwarves. The group was led by that legendary rogue, ";
	cout << LastName << "." << endl;
	cout << endl;
	
	cout << "Along the way, a band of marauding ogres ambushed the party. All fought bravely under the command of ";
	cout << LastName << ", and the ogres where defeated, but at a cost. ";
	cout << "Of the adventurers, " << DiePlayer << " were vanquished, leaving just " << QuestPlayer - DiePlayer << " in the group." << endl;
	cout << endl;

	cout << "The party was about to give up all hope. But while laying the decreased to rest,they stumbled upon the buried fortune. ";
	cout << "So the adventurers split " << GoldPiece << " gold pieces" << LastName << " held on to the extra " << GoldPiece % (QuestPlayer-DiePlayer) << " pieces to keep things fair of course." << endl;

} 