function minTxns(list,target){
    var start=0,sum=0
    list=[...list.entries()].sort((a, b) => a[1] - b[1])
    var result=[]
    var temp=[]
    for (var i=start;i<list.length;i++){
        sum+=list[i][1]
        temp.push(list[i])
        while(sum>=(target)){
            sum-=list[start][1]
            start+=1
            result.push(temp)
            if(sum>=(target)){
                temp=list.slice(start,i+1)
            }else{
                temp=[]
            }
        }
    }
    const listLen = result.map((x) => x.length);
    var minLen=Math.min(...listLen)
    result = result.filter((word) => word.length == minLen);
    if(result[0]){
        return(result[0])
    }else return(false)
    
}

module.exports={minTxns}
