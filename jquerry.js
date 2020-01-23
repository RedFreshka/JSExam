async function Response(url){
    let response = await fetch(url);
  
    if (response.ok) { 
      let json = await response.json();
      return json;
    } 
    else {
      alert("Error HTTP: " + response.status);
    }
  }  
  function roundPlus(x, n) { 
    if(isNaN(x) || isNaN(n)) return false;
    let m = Math.pow(10,n);
    return Math.round(x*m)/m;
  }
  $(function(){
    $("#searchInput").on("keyup", function() {
      let value = $(this).val().toLowerCase();
      $("#crypto tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        console.log($(this).text());
      });
    });
  });
  
  let comeJson = Response("https://poloniex.com/public?command=returnCurrencies");
  comeJson.then(n=>
    $(function(){
        console.log(n);
        
        let all = Object.keys(n).map(i => n[i]);
        let short = Object.keys(n);

        for(let i = 0; i < all.length; i++){
            
            $('#crypto').append(
            `<tbody>
              <tr>
                <td>${i+1}</td>
                <td>${short[i]}</td>
                <td>${all[i].name}</td>
                <td>${all[i].humanType}</td>
                <td>${all[i].currencyType}</td>
                <td>${roundPlus(all[i].txFee, 3)}</td>
                <td>${all[i].minConf}</td>
                <td><button type="button" class="btn btn-danger">Remove</button></td>
              </tr>
            </tbody>`
          );
        }

}));
  
