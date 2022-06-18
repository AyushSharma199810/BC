const SHA256 = require('crypto-js/sha256');
const { diff } = require('semver');

class block{
   constructor(index , timestamp , data , previousHash = ''){
       this.index = index;
       this.timestamp = timestamp;
       this.data = data;
       this.previousHash = previousHash;
       this.hash =this.calculateHash();
       this.nouce=0;
   }
   calculateHash(){
       return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)+this.nouce).toString();
   }
   mineBlock(difficulty){
       while(this.hash.substring(0,difficulty)!= Array(difficulty+1).join("0")){
           this.nouce++;
           this.hash=this.calculateHash();
           console.log(this.hash);
       }
       console.log("Block Mined :  " +this.hash);
   }
}
   class blockchain{
       constructor(){
           this.chain = [this.creteGenesisBlock()];
           this.difficulty=2;
       }
       creteGenesisBlock(){
           return new block(0 , "11/05/2022" , "Genesis Block" , "0");
       }
       getLatestBlock(){
           return this.chain[this.chain.length -1];
       }
       addBlock(newBlock){
           newBlock.previousHash=this.getLatestBlock().hash;
           newBlock.mineBlock(this.difficulty);
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
   console.log('mining block 1....');
   rj.addBlock(new block(1 , "12/05/2022" , {Coin : 4}));
   console.log('mining block 2....');
   rj.addBlock(new block(2 , "13/05/2022" , {Coin : 14}));
   console.log('mining block 3....');
   rj.addBlock(new block(3 , "14/05/2022" , {Coin : 141}));

  

