#include "Source.h"
#include <cstdlib>
#include <time.h>

int main()
{
	vector<char> board;		// vector배열
	char zero = '0';			
	for(int i =0 ; i < 9; i++)
		board.push_back(zero++);		// 0 ~ 8 대입

	instructions();					// 설명

	displayBoard(board);			// 보드 보여주기

	cout << "Prepare yourself, human. The battle is about to begin." << endl;
	char answer = askYesNo("Do you require the first move? (y/n): ");		// *여기 수정 필요* (원래는 첫번째로 할건지 나중에 할건지 선택 하는 것) / 나는  그냥 게임을 시작
																						// 할지 말지를 결정 

	if(answer == 'y')
	{
		cout << "Let's play game!" << endl;
			char humans = humanPiece();					// 사람의 말을 결정
			char computers = opponent(humans);			// 사람의 말과 반대의 말 

		while(1)
		{
			int humanPut = humanMove(board, humans);		// 사람이 어디에 두는지 나타냄
			cout << "You put on " << humanPut << endl;

			displayBoard(board);									// 바뀐 보드를 보여줌 

			char whoseWin = winner(board);					 
			cout << whoseWin << endl;

			if(whoseWin == 'O')									// 사람이 놨을 때 상황이 어떻게 됬는지 판단
			{
				announceWinner('O', computers, humans);
				break;
			}
			else if(whoseWin == 'X')
			{
				announceWinner('X', computers, humans);
				break;
			}
			else if(whoseWin == 'T')
			{
				announceWinner('T', computers, humans);
				break;
			}
			else
			{}

			int computerPut = computerMove(board, computers);				// 컴퓨터가 어느 위치에 두는지 결정(일단 랜덤)

			cout << "Computer put on " << computerPut << endl;

			displayBoard(board);														// 현재 상황 보드로 나타냄

			whoseWin = winner(board);												
			cout << whoseWin << endl;

			if(whoseWin == 'O')														// 컴퓨터가 두고 난 후 어떠한 상황인지 확인
			{
				announceWinner('O', computers, humans);
				break;
			}
			else if(whoseWin == 'X')
			{
				announceWinner('X', computers, humans);
				break;
			}
			else if(whoseWin == 'T')
			{
				announceWinner('T', computers, humans);
				break;
			}
			else
			{}
		}
	}
	else
	{
		cout << "Well... I'm waiting you" << endl;
	}

}

void instructions()							// story?
{
	cout << "Welcome to the ultimate man-machine showdown: Tic-Tac-Toe." << endl;
	cout << "--where human begin is pit against silicon processor" << endl;
	cout << endl;
	cout << "Make your move known by entering a number, 0 - 8." << endl;
	cout << "The number corresponds to the desired board position, as illustrated:" << endl;
}

char askYesNo(string question)			// yes or no checking
{
	char yesOrNo;

	cout << question;

	while(1)
	{
		cin >> yesOrNo;
		if(yesOrNo == 'Y' || yesOrNo == 'y')
			return 'y';
		else if(yesOrNo == 'N' || yesOrNo == 'n')
			return 'n';
		else
			cout << "Plz press Y or N" << endl;
	}
}

int askNumber(string question, int high, int low)			// ask number
{
	int whatNumber;
	
	cout << question;
	
	while(1)
	{
		cin >> whatNumber;
	
		if(whatNumber > high || whatNumber < low)
			cout << "Plz enter the number again" << endl;
		else
			return whatNumber;
	}
}

char humanPiece()									// 사람의 말을 결정
{
	char whatDoYouWant;

	cout << "What Piece do you want, 'O' or 'X'? " << endl;
	
	while(1)
	{
		cin >> whatDoYouWant;
		if(whatDoYouWant == 'O' || whatDoYouWant == 'o')
		{
			cout << "Your piece is O!" << endl;
			return 'O';
		}
		else if(whatDoYouWant == 'X' || whatDoYouWant == 'x')
		{
			cout << "Your piece is X!" << endl;
			return 'X';
		}
		else
			cout << "Plz press O or X" << endl;
	}

}

char opponent(char piece)			// 사람의 말에 따라 컴퓨터의 말을 결정
{
	if(piece == 'O' || piece == 'o')
	{  
		cout << "Computer is X!" << endl;
		return 'X';
	}
	if(piece == 'X' || piece == 'x')
	{
		cout << "Computer is O!" << endl;
		return 'O';
	}
}

void displayBoard(const vector<char>& board)			// board를 출력
{
	cout << board[0] << " | " << board[1] << " | " << board[2] << endl;
	cout << "---------" << endl;
	cout << board[3] << " | " << board[4] << " | " << board[5] << endl;
	cout << "---------" << endl;
	cout << board[6] << " | " << board[7] << " | " << board[8] << endl;

}

char winner(vector<char>& board)
{
	bool checking = false;

		if(board[0] != '0' && board[1]  != '1' && board[2] != '2' && board[3] != '3' && board[4] != '4' && board[5] != '5' && board[6] != '6'  && board[7] != '7' && board[8] != '8') //전체다 꽉 차있는 경우 체크
			checking = true;
	
	if((board[0] == 'X' && board[1] == 'X' && board[2] == 'X') ||
	  (board[3] == 'X' && board[4] == 'X' && board[5] == 'X') || 
	  (board[6] == 'X' && board[7] == 'X' && board[8] == 'X') || 
	  (board[0] == 'X' && board[3] == 'X' && board[6] == 'X') ||
	  (board[1] == 'X' && board[4] == 'X' && board[7] == 'X') || 
	  (board[2] == 'X' && board[5] == 'X' && board[8] == 'X') ||
	  (board[0] == 'X' && board[4] == 'X' && board[8] == 'X') || 
	  (board[2] == 'X' && board[4] == 'X' && board[6] == 'X'))		// 'X'말이 이길경우
	  return 'X';

	else if((board[0] == 'O' && board[1] == 'O' && board[2] == 'O') ||
	  (board[3] == 'O' && board[4] == 'O' && board[5] == 'O') || 
	  (board[6] == 'O' && board[7] == 'O' && board[8] == 'O') || 
	  (board[0] == 'O' && board[3] == 'O' && board[6] == 'O') ||
	  (board[1] == 'O' && board[4] == 'O' && board[7] == 'O') || 
	  (board[2] == 'O' && board[5] == 'O' && board[8] == 'O') ||
	  (board[0] == 'O' && board[4] == 'O' && board[8] == 'O') || 
	  (board[2] == 'O' && board[4] == 'O' && board[6] == 'O'))		// ''O'말이 이길경우
	  return 'O';

	else if(checking == true)	// 보드의 모든 말이 다 찼을경우 
		return 'T';

	else							// 계속 진행
		return 'N';
}

bool isLegal(const vector<char>& board, int move)			// 말을 둘 수 있는 곳인지 아닌지 판단
{
	if(board[move] == 'O' || board[move] == 'X')
		return false;
	else
		return true;
}

int humanMove(vector<char>& board, char human)			// 사람의 말 이동
{
	while(1)
	{
		int putNum = askNumber("Where do you want to put! : ", 8);
		
		bool canPut = isLegal(board, putNum);

		if(canPut == false)
			cout << "Plz put another place" << endl;
		else
		{
			board[putNum] = human;
			return putNum;
		}
	}	
}

int computerMove(vector<char>& board, char computer)			// 컴퓨터의 말 이동
{
	srand((unsigned int)time(NULL));
	int randomNum = rand() % 9;

	while(1)
	{
		bool canPut = isLegal(board, randomNum);

		if(canPut == false)
			randomNum = rand() % 9;
		else
		{
			board[randomNum] = computer;
			return randomNum;
		}
	}
}

void announceWinner(char winner, char computer, char human)			// 누가 이겼는지 알려줌
{
	if(winner == computer)
		cout << "Computer is WINNER....." << endl;
	else if(winner == human)
		cout << "Human is WINNER!!!!!!!" << endl;
	else
	{
		cout << "Draw..." << endl;
	}
}