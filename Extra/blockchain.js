 const SHA256 = require('crypto-js/sha256');

 class block{
    constructor(index , timestamp , data , previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash =this.calculateHash();
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}
    class blockchain{
        constructor(){
            this.chain = [this.creteGenesisBlock()];
        }
        creteGenesisBlock(){
            return new block(0 , "11/05/2022" , "Genesis Block" , "0");
        }
        getLatestBlock(){
            return this.chain[this.chain.length -1];
        }
        addBlock(newBlock){
            newBlock.previousHash=this.getLatestBlock().hash;
            newBlock.hash=newBlock.calculateHash();
            this.chain.push(newBlock);
            
        }
        isChainValid(){
            for(let i=1;i<this.chain.length;i++){
                const currentBlock=this.chain[i];
                const previousBlock=this.chain[i-1];
                if(currentBlock.hash!=currentBlock.calculateHash())
                return false;
                if(currentBlock.previousHash!=previousBlock.hash)
                return false;
            }
            return true;
        }
    }

    let rj = new blockchain();
    rj.addBlock(new block(1 , "12/05/2022" , {Coin : 4}));
    rj.addBlock(new block(2 , "13/05/2022" , {Coin : 14}));
    rj.addBlock(new block(3 , "14/05/2022" , {Coin : 141}));

    // console.log(JSON.stringify(rj,null,4));
    console.log("Is Blockchain Valid ? "+rj.isChainValid());

    rj.chain[2].data = {Coin :23};
    console.log("Is Blockchain Valid ? "+rj.isChainValid());

