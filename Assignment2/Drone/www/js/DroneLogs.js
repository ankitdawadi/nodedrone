$(document).ready(function () {
  /* building the required ids for button */
  const buildIDS = (movies) => {
                return {
                    editID: "edit_" + movies._id,
                    deleteID: "delete_" + movies._id,
                    listItemID: "listItem_" + movies._id,
                    moviesID: "movies_" + movies._id
                }
            }
  /* listing the available movie names */
  function showmoviesname(ids,data){

    var movieList=document.getElementById("movieList");
    tmp= `<li><a class="moviename" id="${ids.moviesID}">${data.moviename}</a></li>`;
    movieList.innerHTML+=tmp;
    a=document.getElementById("droneView1");
    b=a.querySelector("#myForm1");
    c=b.querySelectorAll("a");
    c[0].id=ids.editID;
    c[1].id=ids.deleteID;
  
}
  /* editing the available movie list; contains function such as getting the individual movie information
  , editing the individual movie information and deleting the individual movie information */
  function editmoviesname(){

    moviename= document.getElementsByClassName("moviename");

    for(i=0;i<moviename.length;i++)
    {
       $('#'+moviename[i].id).on('click',function(event)
        {
          document.getElementById(this.id).setAttribute("href","#droneView1");
          x=this.id;
          for( var i=0;i<=6;i++)
            {
              x=x.substring(1);
            }
          fetch(`/${x}`, {
            method: "get",
            headers: {"Content-Type": "application/json; charset=utf-8"},
                    }).then((response) => {
                        return response.json();
                      }).then((data) => {
                
                        document.getElementById("actor1").setAttribute("placeholder",data[0].actor);
                        document.getElementById("moviename1").setAttribute("placeholder",data[0].moviename);
                        document.getElementById("actress1").setAttribute("placeholder",data[0].actress);
                        document.getElementById("price1").setAttribute("placeholder",data[0].price);
                        document.getElementById("birthdaytime1").setAttribute("value",data[0].time);
                        document.getElementById("DropDownList1-button").querySelector("span").innerHTML=data[0].DropDownList;
                        document.getElementById("actor1").setAttribute("value",data[0].actor);
                        document.getElementById("moviename1").setAttribute("value",data[0].moviename);
                        document.getElementById("actress1").setAttribute("value",data[0].actress);
                        document.getElementById("price1").setAttribute("value",data[0].price);
                        document.getElementById("birthdaytime1").setAttribute("value",data[0].time);
                        document.getElementById("DropDownList1").setAttribute("value",data[0].DropDownList);
                       
                                        });
                    });
        $('#'+c[0].id).on('click',function(event)
              
          {
              window.location.href="/";
             fetch(`/${x}`, {
            method: "put",
            headers: {"Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify({movie:$("#moviename1").val(),actor: $("#actor1").val(),actress:$("#actress1").val(),
                                  price:$("#price1").val(),birthdaytime:$("#birthdaytime1").val(),
                                  DropDownList:$("#DropDownList1").val()})
                    }).then((response) => {
                        return response.json();
                      }).then((data) => {
                                    
                                        });
                    });
         $('#'+c[1].id).on('click',function(event)
              
          {
            window.location.href="/";
             fetch(`/${x}`, {
            method: "delete",
            headers: {"Content-Type": "application/json; charset=utf-8"}
           
                    }).then((response) => {
                        return response.json();
                      }).then((data) => {
                                    
                                        });
                    });
          }
  }

  /* provide all the movie listing every time called*/
  function homegetchdata(){
  fetch('/get', { method: "get" }).then((response) => {
      return response.json();
    }).then((data) => {
       document.getElementById("movieList").innerHTML="";
      data.forEach((movies) => {
                    let ids = buildIDS(movies);
                    showmoviesname(ids,movies);
                    editmoviesname(ids,movies);
                  });
    });
  }

  /* called on everty time previous button is clicked*/
  homegetchdata();
    $('#home1').on('click',function(event)
    {
   homegetchdata();
    });
     $('#home').on('click',function(event)
    {
   homegetchdata();
    });
      $('#home2').on('click',function(event)
    {
   homegetchdata();
    });
       $('#home3').on('click',function(event)
    {
   homegetchdata();
    });
        $('#home4').on('click',function(event)
    {
   homegetchdata();
    });
         $('#back').on('click',function(event)
    {
   homegetchdata();
    });

    /* search movie according to the movie name*/
    $('#searchBtn').on('click',function(event)
    {
      
      fetch('/searchMovies', {
                    method: 'post',
                    body: JSON.stringify({ movies: capitalizeFirstLetter($('#search-basic').val())}),
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    }
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                  
                    document.getElementById("movieList").innerHTML="";
                   data.forEach((movies) => {
                    let ids = buildIDS(movies);
                    showmoviesname(ids,movies);
                    editmoviesname(ids,movies);
                  });

                });
    })
  var tmp = [];
  //To save the entered log
  function findID(){
    var variable= document.getElementById("movieList").innerHTML;
    var variable1 = document.getElementsByClassName("movienamelist");
    for(var i=0;i<variable1.length;i++)
      {
        $("#"+variable1[i].id).click(function(event){     
          fetch(`/${event.target.id}`, { method: "get" }).then((response) => {
            return response.json();
              }).then((data) => {
                  });
              })
      }
    }

  /*make every string first letter capital */
  function capitalizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
    } 

  /* enter the log value in database */
  function saveLog() {
    try {
      var moviename = $('#moviename');
      var actor = $('#actor');
      console.log(actor);
      var actress=$('#actress');
      console.log(actress);
      var price = $('#price');
      var time = $('#birthdaytime');
      var DropDownList = $('#DropDownList');
    } catch (e) {
      //Catch(e) for holding the exceptional value
      alert('Log not saved. Please fix problems and try again.');
    }
    var form_data = 'form_data_' + $('#myForm').attr('data-page');
    if (
      moviename.val() == ''
    ) {
      alert('Movie Name must be a non empty name string');
      return false;
    }
   
    //if condition so that user cannot leave the pilot name empty
    if (
      // !price.val().match(/^[0-9]*$/) ||
      price.val() == ''
    ) {
      alert('Price must be non empty value');
      return false;
    }
    //if condition to check whether the user has entered correct input or hasnot entered anything
    
    //code to store data locally
    var dataItem = {
      moviename: capitalizeFirstLetter(moviename.val()),
      actor: capitalizeFirstLetter(actor.val()),
      actress: capitalizeFirstLetter(actress.val()),
      price: price.val(),
      time:time.val(),
      DropDownList: DropDownList.find(':selected').text(),
      
    };
  
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: "/post",
      data: { data: dataItem },
      success: function (data) {
        alert('Success');

        alert('All logs has been sent.');
        localStorage.setItem(form_data, '');
        $('#ShowLogsContent .resData').html('');
      },
      error: function (err) {
        console.log('i am inside error');
        alert(err);
      },
    }); //end ajax
    $('#ShowLogsContent .resData').html(tmp);
    $('#moviename').val('');
    $('#actor').val('');
    $('#actress').val('');
    $('#price').val('');
    $('#time').val('');
    $("#DropDownList option[value='select']").attr('selected', 'selected');
    $('#DropDownList-button > span');
    alert('Log saved.');

  }
  //form clear
  $('#formClear1').on('click',function(event)
  {
    document.getElementById("actor1").setAttribute("placeholder","");
    document.getElementById("moviename1").setAttribute("placeholder","");
    document.getElementById("actress1").setAttribute("placeholder","");
    document.getElementById("price1").setAttribute("placeholder","");
    document.getElementById("birthdaytime1").setAttribute("value","");
    $('#moviename1').val('');
    $('#actor1').val('');
    $('#actress1').val('');
    $('#price1').val('');
    $('#birthdaytime1').val('');
    document.getElementById("DropDownList1-button").querySelector("span").innerHTML=" ";
  })
  $('#formClear1').on('click',function(event)
  {
    document.getElementById("actor").setAttribute("placeholder","");
    document.getElementById("moviename").setAttribute("placeholder","");
    document.getElementById("actress").setAttribute("placeholder","");
    document.getElementById("price").setAttribute("placeholder","");
    document.getElementById("birthdaytime").setAttribute("value","");
    $('#moviename').val('');
    $('#actor').val('');
    $('#actress').val('');
    $('#price').val('');
    $('#birthdaytime').val('');
    document.getElementById("DropDownList1-button").querySelector("span").innerHTML=" ";
  })
  //Code to display logs
  function displayLogs() {
    var form_data = 'form_data_' + $('#myForm').attr('data-page');
    var allLogData = JSON.parse(localStorage.getItem(form_data));
    var tmp = '';
    if (allLogData) {
      $.each(allLogData, function (i, item) {
        tmp +=
          '<table style="width: 100%;"><tr><td style="background: #f3f0f0;padding: 10px;">' +
          currentDate +
          ' ' +
          d.getHours() +
          ':' +
          d.getMinutes() +
          ':' +
          d.getSeconds() +
          ', ' +
          allLogData[i].lat +
          ', ' +
          allLogData[i].long +
          ', ' +
          allLogData[i].droneId +
          ', ' +
          allLogData[i].pilot +
          ', ' +
          allLogData[i].key +
          ', ' +
          allLogData[i].contract +
          ', ' +
          allLogData[i].DropDownList +
          '</td></tr></table>';
      });
      $('#ShowLogsContent .resData').html(tmp);
    }
  }
  
  function sendLogs() {
    var form_data = 'form_data_' + $('#myForm').attr('data-page');
    if (
      confirm(
        'Do you want to send all logs, this has the effect of deleting logs?'
      )
    ) {
      postLogs();
    }
  }
  //switch case to execute blocks
  function getID(theValue) {
    var id = theValue.id;
    switch (id) {
      case 'Drone1':
        noOfDrone = 0;
        break;
      case 'Drone2':
        noOfDrone = 1;
        break;
      case 'Drone3':
        noOfDrone = 2;
        break;
      case 'Drone4':
        noOfDrone = 3;
        break;
      case 'Drone5':
        noOfDrone = 4;
        break;
      default:
        alert(' Error!!!');
        break;
    }
  }
  //code for geolocation
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = 'Geolocation is not supported by this browser.';
    }
  }

  function showPosition(position) {
    x.innerHTML =
      'Latitude: ' +
      position.coords.latitude +
      '<br>Longitude: ' +
      position.coords.longitude;
  }
  //code to initialize
  function init() {
    
    // $('#tHeader').empty();
    // $('#tHeader').append(head);
    $('#myForm').trigger('reset');
    $('#myForm').attr('data-page', 'movies');
    getLocation();
  }
  //code when next button is clicked
  function next() {
    if (noOfDrone == 4) {
      noOfDrone = 0;
    } else {
      noOfDrone = noOfDrone + 1;
    }
    var item = $('#droneNum');
    item.text(droneTitle[noOfDrone]);
    init();
  }

  //code when back button is clicked
  function goBack() {
    window.history.back();
  }
  //code to clear form when clear button is clicked
  function formClear() {
    document.getElementById('newForm').reset();
    init();
  }

  function cloudDataTable(data) {
    $.each(data, function (i, item) {
      tmp +=
        '<table style="width: 100%;"><tr><td style="background: #f3f0f0;padding: 10px;">' +
        data[i].lat +
        ', ' +
        data[i].long +
        ', ' +
        data[i].droneId +
        ', ' +
        data[i].pilot +
        ', ' +
        data[i].key +
        ', ' +
        data[i].contract +
        ', ' +
        data[i].DropDownList +
        '</td></tr></table>';
    });
    $('#ShowClousLogsContent .cloudData').html(tmp);
  }

  function getLogs() {
    const serverAddress = 'http://192.168.1.13:3000';
    const url = serverAddress + '/get';

    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: '/',
      //data: { data: allLogData }
      success: function (data) {
        alert('Success');
        cloudDataTable(data);
        // cloudData
      },
      error: function (err) {
        console.log('i am inside error');
        alert(err);
      },
    }); //end ajax
  }

  //when clicked these code return function
  $('#saveLog').click(function () {
    saveLog();
  });
  $('#next').click(function () {
    next();
  });
  $('#prev').click(function () {
    previous();
  });
  $('#Drone1').click(function () {
    getID(this);
  });
  $('#Drone2').click(function () {
    getID(this);
  });
  $('#Drone3').click(function () {
    getID(this);
  });
  $('#Drone4').click(function () {
    getID(this);
  });
  $('#Drone5').click(function () {
    getID(this);
  });
  $('#back').click(function () {
    goBack();
  });
  $('#sendLogs').click(function () {
    sendLogs();
  });
  $('#formClear').click(function () {
    formClear();
  });
  $('#droneView').on('pagebeforeshow', function () {
    init();
  });
  $('.displayLogs').click(function () {
    displayLogs();
  });
  $('#cloudLogBtn').click(function () {
    getLogs();
  });
  
});
