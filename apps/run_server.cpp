#include<iostream>
#include<fstream>
#include<windows.h>
using namespace std;

int main()
{
    string local_port = "3000";
    string content = "[InternetShortcut]\nURL=http://localhost:";
    content += local_port;

    string file = "temp-link.url";
    ofstream temp;
    temp.open(file.c_str(), ios::out);
    temp << content;

    if(!temp)
    {
        cout << "Can't create link file.";
        system("pause");
        return 1;
    }
    else {
        temp.close();
        string del_file = "del /f " + file;

        system("nodemon app");
        system(file.c_str());
        system(del_file.c_str());
    }
    return 0;
}