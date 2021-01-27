const item = function(w,v,id) {
  this.w = w ;
  this.v = v ;
  this.id = id;
  let itmObj = document.createElement("div")
  itmObj.classList.add("itm")
  itmObj.id = `Item${this.id}`
  itmObj.innerHTML = `
  <div class="Idclass"><h3 class="wId">Objet <span class="d">${this.id}</span></h3></div>
  <div class="weight"><h3 class="wTitle">Poids : <span class="w">${this.w}</span></h3></div>
  <div class="value"><h3 class="vTitle">Valeur : <span class="v">${this.v}</span></h3></div>` 
  return itmObj;
}
var IdCounter = 0
var itemArray = []

const Additem = (w,v,id) => {
  itemArray.push({w:w,v:v,id:id})
  let newitem = new item(w,v,id)
  document.getElementById("itemStorage").appendChild(newitem)
} 

const calculate = () => {

  document.getElementById("resultValue").innerHTML = ""
  document.getElementById("resultItms").innerHTML = ""
  let capacity = document.getElementById("capacity").value
  if (!itemArray.length | !capacity){
    alert("Aucune valeur n'a ete rempli ")
    return;
  }
  let result = SacADos(itemArray,capacity )
  let res = 0
  console.log(result)
  for(let i=0 ; i<result.subset.length ; i++){
    let resitms =  new item(result.subset[i].w,result.subset[i].v,result.subset[i].id)
    document.getElementById("resultItms").appendChild(resitms)
    res+=parseInt(result.subset[i].v)
  }
  document.getElementById("resultValue").innerText = res
  if (res === 0) 
    document.getElementById("resultItms").innerHTML = `<p style="margin: auto ;">aucun objet n'est une solution</p>`
}


const Ajouter = () => {
  let w = document.getElementById("poidItm")
  let v = document.getElementById("valueItm")
  if (!w.value | !v.value){
    alert("Veuillez remplir les chanmps necessaire !")
    return;
  }
  Additem(parseInt(w.value),parseInt(v.value),++IdCounter)
  w.value = ""
  v.value = ""
  /*let capacity = document.getElementById("capacity")
  if (!!capacity.value) {
    capacity.setAttribute("disabled","disabled")
  }*/
}

const reset = () => {
  document.getElementById("capacity").value = ""
  document.getElementById("resultValue").innerHTML = ""
  document.getElementById("resultItms").innerHTML = ""
  document.getElementById("itemStorage").innerHTML = ""
  //document.getElementById("capacity").removeAttribute("disabled")

  itemArray = []
  IdCounter = 0
}

const deleteitem = (id) => {
  document.getElementById(`Item${id}`).remove()
  itemArray.filter(itm => { 
    return itm.id === id ;
  })
}

function SacADos(items, capacity){
  var memo = [];
  for (var i = 0; i < items.length; i++) {
    var row = [];
    for (var cap = 1; cap <= capacity; cap++) {
      row.push(getSolution(i,cap));
    }
    memo.push(row);
  }
  return(getLast());

  function getLast(){
    var lastRow = memo[memo.length - 1];
    return lastRow[lastRow.length - 1];
  }

  function getSolution(row,cap){
    const NO_SOLUTION = {maxValue:0, subset:[]};
    var col = cap - 1;
    var lastItem = items[row];
    var remaining = cap - lastItem.w;
    var lastSolution = row > 0 ? memo[row - 1][col] || NO_SOLUTION : NO_SOLUTION;
    var lastSubSolution = row > 0 ? memo[row - 1][remaining - 1] || NO_SOLUTION : NO_SOLUTION;
    if(remaining < 0){
      return lastSolution;
    }
    var lastValue = lastSolution.maxValue;
    var lastSubValue = lastSubSolution.maxValue;

    var newValue = lastSubValue + lastItem.v;
    if(newValue >= lastValue){
      var _lastSubSet = lastSubSolution.subset.slice();
      _lastSubSet.push(lastItem);
      return {maxValue: newValue, subset:_lastSubSet};
    }else{
      return lastSolution;
    }
  }
}