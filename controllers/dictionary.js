let fs=require('fs');
let path=require('path');

// Define Dictionary Class
let Dictionary=function(dataPath) {
    this.dataPath='../data/dictionary.json';
    this.data;
    this.number_of_words;
};

Dictionary.prototype.initialize=function() {
    this.data=JSON.parse(fs.readFileSync(path.join(__dirname, path.normalize(this.dataPath))));
    console.log('Info :'+'Done parsing dictionary.');
};

Dictionary.prototype.get=function(w) {
    console.info('Info: \''+w+'\' meaning requested');
    let word = w.toUpperCase();
    if(this.data[word]!=undefined && this.data[word]!=null)
        return this.data[word];
    else{
        console.log('Error : '+'Word is not in our Dictionary');
    }
        return {};
};

module.exports=Dictionary;
