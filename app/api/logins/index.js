const path = require('path');
const fs = require('fs');

class loginDataProvider {
    constructor() {
        this.cache = null;
        this.filepath = path.join(__dirname,'..','..','..','data','logins.json');
    }
    async getItems() {
        if (this.cache) return this.cache;
        try { 
            fs.accessSync(this.filepath);
        } catch {
            this.cache = [];
            return this.cache;
        }
        const file$ = fs.createReadStream( this.filepath, { encoding: 'utf8' } );
        const data = await new Promise( (res, rej) => {
            let result = "";
            file$.on( 'data', d => result += d );
            file$.on( 'end', () => res(result) );
            file$.on( 'error', () => rej );
        });
        this.cache = JSON.parse(data);
        return this.cache;
    }
    async setItem(item) {
        if (!this.cache) this.cache = await this.getItems();
        this.cache.push(item);
        const file$ = fs.createWriteStream( this.filepath,  { encoding: 'utf8' } );
        file$.end( JSON.stringify(this.cache) );
        return this.cache; console.log( JSON.stringify(this.cache) );
    }
}

const loginProvider = new loginDataProvider();

module.exports = { loginProvider };