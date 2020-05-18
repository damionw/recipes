#include <iostream>     // std::cout
#include <algorithm>    // std::sort
#include <vector>       // std::vector

using namespace std;

typedef std::vector< int > myseries;

template< typename I, typename F >
F& myforeach(I start, I finish, F functor) {
    for (; start != finish; ++start) {
        functor(*start);
    }

    return functor;
}

struct myfunctor {
    myfunctor() {
        std::cerr << "Starting" << std::endl;
    }

    myfunctor(const myfunctor& copyfrom) {
        std::cerr << "Copying" << std::endl;
    }

    void operator()(int& value) {
        std::cerr << "HERE " << value << std::endl;
    }
};

int main()
{
    int myints[] = {32,71,12,45,26,80,53,33};

    myseries series;

    for (int i = 0; i < 8; ++i)
    {
        series.push_back(myints[i]);
    }

//    std::for_each(series.begin(), series.end(), myfunctor());
    // myfunctor functor;
    //myforeach(series.begin(), series.end(), functor);

    myfunctor& functor = myforeach(series.begin(), series.end(), myfunctor());
}
