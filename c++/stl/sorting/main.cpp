#include <iostream>     // std::cout
#include <algorithm>    // std::sort
#include <vector>       // std::vector

using namespace std;

class myclass {
    public:
        myclass(int x) : value(x) {}
        int value;

    public:
        bool operator<(const myclass &rhs) const {
            return (value < rhs.value);
        }
};

int main()
{
    int myints[] = {32,71,12,45,26,80,53,33};
    std::vector<myclass> myvector;

    for (int i = 0; i < 8; ++i)
    {
        myvector.push_back(*(new myclass(myints[i])));
    }

    std::sort (myvector.begin(), myvector.end());

    for (std::vector<myclass>::iterator it=myvector.begin(); it!=myvector.end(); ++it)
    {
        std::cout << it->value << std::endl;
    }
}
