# UTR Search
## Retrieve UTR information for a list of players from an ITF tournament csv.

### Installation and Running
Download and Install https://nodejs.org/en/download
Download this repository using git clone or "Download Zip" from the "Code" menu and extract contents.

In a command prompt:
```
cd utrsearch_main
npm install
node index.js test1.csv (or the PATH to your csv)
```

### Example: 
```
node index.js test1.csv

Reading test1.csv
Searching UTR players...



Name,Singles UTR,3 Month Rating,Nationality,Doubles UTR
Radka Zelnickova,10.65,10.77,SVK,10.7
Katarina Kuzmova,10.9,10.92,SVK,10.69
Polina Iatcenko,10.94,10.83,RUS,10.7
Renata Jamrichova,11.23,11.18,SVK,10.63
Jasmine Conway,10.69,10.71,GBR,10.39
Ho Ching Wu,10.72,10.78,HKG,10.11
Sarah-Rebecca Sekulic,10.09,10.17,GER,10.03
Boyoung Jeong,10.67,10.56,KOR,10.35
Yasmin Ezzat,10.04,10.02,EGY,10.08
Andre Lukosiute,10.82,10.8,LTU,10.74
Alexandra  Iordache ,10.29,10.28,ROU,9.07
Meiling Wang,10.25,10.21,USA,10.68
Merna Refaat,10.25,10.27,EGY,10.07
Mika Buchnik,10.42,10.61,ISR,9.62
Emma Wilson,10.32,10.22,GBR,9.99
Emma Tothova,9.7,9.97,SVK,9.73



Avg Singles UTR:  10.498749999999998
Avg Doubles UTR:  10.223749999999999
```


