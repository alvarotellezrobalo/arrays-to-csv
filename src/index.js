const fs = require('fs');

class arrayToCsv {

    constructor(data = [], params = {
        delimiter: ','
    }){
        this.delimiter = params.delimiter ? params.delimiter : ',';
        this.data = data;
        this.csv = '';

        var aHeaders = [];

        //Generate the csv data
        this.data.forEach((row, index) => {

            if(index === 0){
                //Headers from first element
                Object.keys(row).forEach((elem, index, array) => {

                    //Last element
                    if(index === array.length-1){
                        this.csv += elem + '\n';
                    }else{
                        this.csv += elem + this.delimiter;
                    }

                    aHeaders.push(elem);
                });

                //data
                aHeaders.forEach((elem, index, array) => {

                    //Last element
                    if(index === array.length-1){
                        if(typeof row[elem] === string && row[elem].search(this.delimiter) === -1){
                            this.csv += row[elem] + '\n';
                        }else{
                            this.csv += '"' + row[elem] + '"' + '\n';
                        }
                    }else{
                        if(typeof row[elem] === string && row[elem].search(this.delimiter) === -1){
                            this.csv += row[elem] + this.delimiter;
                        }else{
                            this.csv += '"' + row[elem] + '"' + this.delimiter;
                        }
                    }
                });

            }else{
                //data
                aHeaders.forEach((elem, index, array) => {

                    //Last element
                    if(index === array.length-1){
                        if((typeof row[elem] === string && row[elem].search(this.delimiter) === -1) || (row[elem] === undefined || row[elem] === null)){
                            this.csv += row[elem] + '\n';
                        }else{
                            this.csv += '"' + row[elem] + '"' + '\n';
                        }
                    }else{
                        if((typeof row[elem] === string && row[elem].search(this.delimiter) === -1) || (row[elem] === undefined || row[elem] === null)){
                            this.csv += row[elem] + this.delimiter;
                        }else{
                            this.csv += '"' + row[elem] + '"' + this.delimiter;
                        }
                    }
                });
            }

        });
         

    }

    getCsv(){
        return this.csv;
    }

    saveFile(path){
        return new Promise((resolve, reject) => {

            if(this.csv){
                fs.writeFileSync(path, this.csv);
                resolve('OK');
            }else{
                reject('Error, no csv data generate');
            }

        });
    }
}

module.exports = arrayToCsv;