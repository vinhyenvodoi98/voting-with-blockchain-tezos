var contractAddress;
var keys;
var account;

function loadData(){
    contractAddress = "KT1DZsRk3GwkL9L6jybdzcYKsZihFzYcTkKU";
    // eztz.node.setProvider("http://172.18.0.2:8732");
    eztz.node.setProvider("https://tezrpc.me");
    var mnemonic = "kiss action hope half love pizza welcome pact million laugh tumble have alcohol rifle oil";
    keys = eztz.crypto.generateKeys(mnemonic,"12345679");
    console.log(keys);
    account = keys.pkh;
    console.log(account);

    eztz.rpc.getBalance(account).then(function(res) {
        console.log(res);
        $("#balance").html(res);
        $("#account").html(account);
    }).catch(function(e){
        console.log(e);
    });

    eztz.contract.watch(contractAddress,3,(s)=>{
        console.log("New storage",s);
        var candidateList = s.args[0];
        for(var i=1; i<= 3; i++){
            $("#candidate-"+i).html(candidateList[i-1].args[1].int);
        }
    });
}

function vote(id){
    var candidate;
    if(id ==0 ){ candidate="Alice" }
    if(id ==1 ){ candidate="Bob" }
    if(id ==2 ){ candidate="Mary" }
    eztz.contract.send(contractAddress,account,keys,0,'\"' + candidate + '\"',"010000",10000,60000).then((res)=>{
        console.log(res);
        $("#msg").html("Please wait for the transaction to complete");
    }).catch((e)=>{
        console.log(e);
        $("#msg").html("Error" + e.error + "-" + e.error[1].with.args[0].string);
    });
}