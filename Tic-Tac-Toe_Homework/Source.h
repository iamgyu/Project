#include <iostream>
#include <string>
#include <vector>

using namespace std;

void instructions();  // 게임 방법을 출력하는 함수

char askYesNo(string question); // 예 or 아니요를 묻는 함수, question으로 질문을 받음, y or n 반환

int askNumber(string question, int high, int low = 0); // 범위 내의 숫자를 묻는 함수, question으로 질문을 받음
																	 // low ~ high 범위에 있는 숫자를 반환

char humanPiece(); // 플레이어의 말을 정하는 함수, o or x 반환

char opponent(char piece); // 주어진 말에 대해 반대쪽 말을 정하는 함수, piece로 o or x 받음, o or x 반환

void displayBoard(const vector<char>& board);
//화면에 보드판을 표시하는 함수, board로 보드판 배열을 받음

char winner(vector<char>&board);
// 게임의 승리자를 정하는 함수, X O T N 중 하나를 반환
// X : X의 말을 가진 사람이 승리했을 경우
// O : O의 말을 가진 사람이 승리했을 경우
// T : 무승부일 경우
// N : 아직 승리자가 정해지지 않은 경우

bool isLegal(const vector<char>& board, int move);
//말을 놓을 수 있는 위치인지 확인하는 함수
//board로 보드판 배열을 받음
//move로 말을 놓을 위치를 반환
//true나 false 반환

int humanMove(vector<char>&board, char human);
// 플레이어가 말을 놓을 위치를 가져오는 함수
// board로 보드판 배열을 받음
// human으로 플레이어의 말 종류를 받음
// 플레이어가 말을 놓을 위치를 반환

int computerMove(vector<char>& board, char computer);
// 컴퓨터가 말을 놓을 위치를 가져오는 함수
// board로 보판 배열을 받음
// computer으로 컴퓨터의 말 종류를 받음
// 컴퓨터가 말을 놓을 위치를 반환

void announceWinner(char winner, char computer, char human);
//승리자를 축하하거나 무승부를 선언하는 함수
//winner로 승리자의 말을 받음
//computer로 컴퓨터의 말을 받음
//human으로 플레이어의 말을 받음
