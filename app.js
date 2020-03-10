let borough;
let userInput;
let arrayforRes=[];

function chooseBorough(name){
  borough=name;
  }

function resolution(num){
  if(arrayforRes[num]==undefined){
    document.getElementById("resolv").innerHTML="Case is pending";
  }
  else{
    document.getElementById("resolv").innerHTML=arrayforRes[num];
  }
    
}

$(()=>{
  $('brooklyn').click({param:"BROOKLYN"},chooseBorough);
  $('manhattan').click({param:"MANHATTAN"},chooseBorough); 
  $('queens').click({param:"MANHATTAN"},chooseBorough); 
  $('statenIsland').click({param:"MANHATTAN"},chooseBorough); 
  $('bronx').click({param:"MANHATTAN"},chooseBorough); 

  $('form').on('submit', (event)=>
    {
      event.preventDefault();
      if($('input[type="text"]').val()===""){
        userInput=10;
      }
      else
      {
        userInput=$('input[type="text"]').val();}
  
        $.ajax({
          url:"https://data.cityofnewyork.us/resource/erm2-nwe9.json",
          data:{"$limit":userInput, //use data to set up different filters for the search
                "borough":borough,
                "agency":"NYPD"}
          }).then((data)=>{
          for(let i=0;i<userInput;i++){
            arrayforRes.push(data[i].resolution_description);
            $('#complaint').append('<li>' + data[i].complaint_type +'<br>'+'</li>');
            $("#complaint").append(`<button id="resolution${i}" onclick="resolution(${i})" type="button">Resolution ${i+1}</>`);}
        },
          ()=>{console.log("bad request")} );
        })
      
  })
