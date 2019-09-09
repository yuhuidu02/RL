// Settings
/*
probabilistic relation-based - condition - 1
deterministic relation-based - condition - 2
              constant relation: number - 2.1
                                 size - 2.2
                                 ratio - 2.3
                                 dark - 2.4
probabilistic feature-based - condition - 3
deterministic feature-based - condition - 4
              constant relation: number - 4.1
                                 size - 4.2
                                 ratio - 4.3
                                 dark - 4.4
*/


document.addEventListener('DOMMouseScroll', function (event) {
  if (event.ctrlKey === true || event.metaKey) {
    event.preventDefault();
  }
}, false);

document.addEventListener('mousewheel', function (event) {
  if (event.ctrlKey === true || event.metaKey) {
    event.preventDefault();
  }
}, false);

document.addEventListener('keydown', function (event) {
  if ((event.ctrlKey === true || event.metaKey === true)
       && (event.which === 61 || event.which === 107
          || event.which === 173 || event.which === 109
          || event.which === 187 || event.which === 189)){
            event.preventDefault();
     }
}, false);
/*
An array of all the set sizes you'd like to test.
The total number of trials should be divisible by 2 * the length of the set_sizes array
to account for same/different trials.
*/
var set_sizes = [5]
/*
150 trials gives you a decent signal to noise and only takes 10 minutes to complete.

See the following citation for more info:
Xu, Z., Adam, K. C. S., Fang, X., & Vogel, E. K. (2017). Behavior research methods
*/
var number_of_trials = 320

var next_recon = 0;


// set the feature dimensions
var min_number = 2;
var max_number = 7;
var min_size = 30;
var max_size = 45;
var min_ratio = 70; 
var max_ratio = 90;
var min_dark = 50;
var max_dark = 200;

var text_response = null;
var text_response2 = null;

var atc_ig_size = null;
var atc_ig_size2 = null;
var atc_ig_ratio = null;
var atc_ig_ratio2 = null;
var atc_ig_dark = null;
var atc_ig_dark2 = null;
var atc_ig_number = null;
var atc_ig_number2 = null;

var atc_cell_number = null;
var atc_cell_size2 = null;

/*****************
* Category A
* left dish has 3/4 of (1) more numerous, (2) larger, (3) rounder (4) darker
******************/

// Experiment Logic
// Be careful changing anything below this
// For help, email cquirk@uchicago.edu
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);
//var psiturk = PsiTurk(uniqueId, adServerLoc);
psiTurk.preloadImages(['static/images/sc5.png']);
psiTurk.preloadImages(['static/images/Good.png']);
psiTurk.preloadImages(['static/images/Sorry.png']);
psiTurk.preloadImages(['static/images/Pass.png']);
psiTurk.preloadImages(['static/images/specimen.png']);


// condition setting 

var condition_index = Math.random();
var sub_condition_index = Math.random();
     if (condition_index < 0.25){
               var exp_condition = 1;
            
     } else if (condition_index < 0.5){
           if (sub_condition_index < 0.25){
               var exp_condition = 2.1;    
              
           } else if (sub_condition_index < 0.5){
               var exp_condition = 2.2;
           } else if (sub_condition_index < 0.75){
               var exp_condition = 2.3;
           } else if (sub_condition_index > 0.75){
               var exp_condition = 2.4;
           }
     } else if (condition_index < 0.75){
               var exp_condition = 3;
     }  else if (condition_index > 0.75){
           if (sub_condition_index < 0.25){
               var exp_condition = 4.1;        
           } else if (sub_condition_index < 0.5){
               var exp_condition = 4.2;
           } else if (sub_condition_index < 0.75){
               var exp_condition = 4.3;
           } else if (sub_condition_index > 0.75){
               var exp_condition = 4.4;
           }
     }

// assign conditions for sudo subjects
exp_condition = 2.4
psiTurk.taskdata.set('condition',exp_condition*10);
psiTurk.recordUnstructuredData("exp_condition",exp_condition);
psiTurk.saveData();

var timeout = null;



// idea stolen from stackoverflow
// https://stackoverflow.com/questions/210717/using-jquery-to-center-a-div-on-the-screen

jQuery.fn.center = function () {
  this.css({'position':'absolute',
            'left':'50%',
            'top':'50%',
            'transform':'translate(-50%, -50%)'
  });
  return this;
}

function  msg(){
    alert("hello world!");
  }

function resizeWinTo(){
  window.resizeTo(1000,720); // used to be 1000,660
  window.focus();
}

function permute( a, p ) {
  var r = [];
  for (var i = 0; i < a.length; ++i) {
    r.push(a[p[i]]);
  }
  return r;
}

function linspace(startValue, stopValue, cardinality) {
  resizeWinTo();
  var arr = [];
  var currValue = startValue;
  var step = (stopValue - startValue) / (cardinality - 1);
  for (var i = 0; i < cardinality; i++) {
    arr.push(currValue + (step * i));
  }
  return arr;
}

function repmat(array, count) {
    var result = [];
    while (count--) {
        result = result.concat(array);
    }
    return result;
}stop

function Rtoleft(value,fi){
  var id = value.length;
  var result =[];
  var line = [];
  while(id--){
    line = repmat(value[id],fi);
    result = result.concat(line);
  }
  return result;
}

function dotproduct(a,b){
  var id = a.length;
  var result = [];
  for (var i=0;i<id;i++){
    result[i] = a[i] * b[i];
  }
  return result;
}

function sum_buffer(buffer){
  var sum = 0;
  for (var i=0;i<buffer.length;i++){
    sum = sum + buffer[i];
  }
  return sum;
}

function cumsum(buffer){
  var cum = [];
  cum[0] = buffer[0];
  for (var i=1;i<buffer.length;i++){
    cum[i] = cum[i-1] + buffer[i];
  }
  return cum;
}

 function findvalue(buffer,id){
  for (var i=0;i<buffer.length;i++){
    if (buffer[i] === id){
      var position_id = i;
      break;
    }
  }
  return position_id
 }


function gen_feature_value(min,max,fi,k,b,b2){
  //var min = 20;
  //var max = 60;
  //var fi = 5;
  //var k = 0.3;
  //var b = 0;
  var number = fi * fi;
  var value_holder = linspace(min,max,fi);
  var Right_value = repmat(value_holder,fi);
  var Left_value = Rtoleft(value_holder,fi);
  var buffer = [];
  for(var i=0;i<number;i++) {
        if((Left_value[i] > Right_value[i] * (1+k) + b && Left_value[i] < Right_value[i] * (1+k) + b2)
        || (Left_value[i] < Right_value[i] / (1+k) - b && Left_value[i] > Right_value[i] / (1+k) - b2)){
          buffer[i] = 1;
        }
        else{
          buffer[i] = 0;
        }
  }
  var Left_buffer = dotproduct(Left_value,buffer);
  var Right_buffer = dotproduct(Right_value,buffer);
  var sum = sum_buffer(buffer);
  //var choice_id = getRandomInt(0,sum); 
  var choice_id = getRandomInt(1,sum+1);  // modification for only one cell in each field
  var id_buffer = cumsum(buffer);
  var position_id = findvalue(id_buffer,choice_id);
  var Left_choice = Left_value[position_id];
  var Right_choice = Right_value[position_id];

  var holder_1 = Left_choice;
  var holder_2 = Right_choice;

  if (holder_2 > holder_1){
          var Small_choice = holder_1;
          var Large_choice = holder_2;
        }else{
          var Small_choice = holder_2;
          var Large_choice = holder_1;
        }

  return[Small_choice,Large_choice];

}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
/*
function set_cell_number(trial,min,max){
    var cell_number = [];

      for(var j=0;j<trial;j++) {
        var temp_number = getRandomInt(min,max);
        cell_number.push(temp_number)
      }
 
    return cell_number
  }

*/
/*
var set_number_small = [];
var set_number_large = [];
for (var p=0;p<number_of_trials;p++){
  
     set_number_small[p] = 2 + getRandomInt(0,2);
     set_number_large[p] = set_number_small[p] + 1 + getRandomInt(0,2);
  
}
*/

//
// new added function, need to modify to fit the current structure

function end_experiment() {

  resizeWinTo();
  var end_exp_text = 
`\n\n\n\n\n\nThank you for completing this experiment.\n
Click the button below to receive the completion code that certifies you have successfully completed this HIT. Have a nice day!\n\n\n\n\n\n\n\n\n`;
  $('#displaydiv').css({'position':'absolute','top':'0%','height':'600px'});
  $('#displaydiv').append('<p id=text></p>');
  $('#displaydiv').append('<p id=text_2></p>');
  $('#displaydiv').append('<button id="code">Get completion code</button>');
  $('#displaydiv').append('<button id="continue">Done</button>');
  $('#text').text(end_exp_text)
  $('#text').center();
  $('#text').css('font-size', '150%')
  $('#text').css({'width':'95%', 'white-space':'pre-wrap'})
  $('#text').css({'background-color':'white'})
  $('#code').center()
  $('#code').css({'top':'65%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').center()
  $('#continue').css({'top':'80%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%','display':'none'})

  var digits = Math.floor(Math.random() * 9000000000) + 1000000000;

  $('#code').click(function(){

    psiTurk.recordUnstructuredData("completion_code",digits);
    psiTurk.saveData();
    $('#text_2').text(digits);
    $('#text_2').center()
    $('#text_2').css({'top':'65%','font-size':'150%'})


    $('#code').hide();
    $('#continue').show();

    });


  $('#continue').click(function(){


    psiTurk.saveData({
      success: psiTurk.completeHIT,
      error: psiTurk.completeHIT 

    })
  });
}

$('body').css({'min-width':'1000px','min-height':'720px'}) // used to be 660px
// recreates a blank canvas every time we want to draw something new
function bgCanvas(color) {
  $('body').empty()

  $('body').append('<div id="canvasesdiv"></div>')
  $('#canvasesdiv').css({'width':'1000px', 'height':'440px'})

  var width = window.innerWidth;
  var height = window.innerHeight;

  var image = "<img id = 'bgimage' width=95% height = 80% src='static/images/sc5.png'></img>";
  var canvas1_html = "<canvas id='canvas1' width=450 height=500 ></canvas>";
  var canvas2_html = "<canvas id='canvas2' width=450 height=500 ></canvas>";

  $('#canvasesdiv').append(image);
  $('#canvasesdiv').append(canvas1_html);
  $('#canvasesdiv').append(canvas2_html);
  
  $('#bgimage').css({'position':'absolute','left':'2.5%','right':'5%','top':'0px','style':'z-index:1'}) 
  $('#canvas1').css({'position':'absolute','left':'5%','right':'52%','top':'0px','width':'43%','height':'80%','style':'z-index:2'}) 
  $('#canvas2').css({'position':'absolute','right':'5%','left':'52%','top':'0px','width':'45%','height':'80%','style':'z-index:2'}) 

  // not satisfied!!!

  $('body').append('<div id="displaydiv"></div>')
  $('#displaydiv').css({'width':'1000px', 'height':'480px', 'text-align' : 'center'})
  //$('#displaydiv').center()
}

function miniCanvas() {
  $('body').empty()
  $('body').append('<div id="canvasesdiv"></div>')
  $('#canvasesdiv').css({'width':'1000px', 'height':'440px'})

  var width = window.innerWidth;
  var height = window.innerHeight;

  var image = "<img id = 'bgimage' width=80% height = 67.3% src='static/images/sc5.png'></img>";
  var canvas1_html = "<canvas id='canvas1' width=360 height=400 ></canvas>";
  var canvas2_html = "<canvas id='canvas2' width=360 height=400 ></canvas>";

  $('#canvasesdiv').append(image);
  $('#canvasesdiv').append(canvas1_html);
  $('#canvasesdiv').append(canvas2_html);
  
  $('#bgimage').css({'position':'absolute','left':'10%','right':'15%','top':'0px','style':'z-index:1'}) 
  $('#canvas1').css({'position':'absolute','left':'12%','right':'52%','top':'0px','style':'z-index:2'}) 
  $('#canvas2').css({'position':'absolute','right':'15%','left':'52%','top':'0px','style':'z-index:2'}) 
  $('body').append('<div id="displaydiv"></div>')
  $('#displaydiv').css({'width':'1000px', 'height':'480px', 'text-align' : 'center'})
  //$('#displaydiv').center()
}

function Cases() {
  $('body').empty()
  $('body').append('<div id="canvasesdiv"></div>')
  $('#canvasesdiv').css({'width':'1000px', 'height':'440px'})

  var width = window.innerWidth;
  var height = window.innerHeight;

  var image = "<img id = 'bgimage' width=80% height = 67.3% src='static/images/specimen.png'></img>";
  var canvas1_html = "<canvas id='canvas1' width=360 height=400 ></canvas>";
  var canvas2_html = "<canvas id='canvas2' width=360 height=400 ></canvas>";

  $('#canvasesdiv').append(image);
  $('#canvasesdiv').append(canvas1_html);
  $('#canvasesdiv').append(canvas2_html);
  
  $('#bgimage').css({'position':'absolute','left':'10%','right':'15%','top':'0px','style':'z-index:1'}) 
  $('#canvas1').css({'position':'absolute','left':'12%','right':'52%','top':'0px','style':'z-index:2'}) 
  $('#canvas2').css({'position':'absolute','right':'15%','left':'52%','top':'0px','style':'z-index:2'}) 
  $('body').append('<div id="displaydiv"></div>')
  $('#displaydiv').css({'width':'1000px', 'height':'480px', 'text-align' : 'center'})
  //$('#displaydiv').center()
}

function blankCanvas() {
  $('body').empty()
  //var canvas_html = "<canvas id='expcanvas' width=1000 height=600 style='border:5px solid #000000'></canvas>";
  $('body').append('<div id="canvasesdiv"></div>')
  $('#canvasesdiv').css({'width':'1000px', 'height':'440px'})
  var width = window.innerWidth;
  var height = window.innerHeight;
  var image = "<img id = 'blankimage' width=95% height = 98.5% src='static/images/blank.png'></img>";
  $('#canvasesdiv').append(image);
  $('#blankimage').css({'position':'absolute','left':'2.5%','right':'5%','top':'0px','style':'z-index:1'}) 
  $('body').append('<div id="displaydiv"></div>')
  $('#displaydiv').css({'width':'1000px', 'height':'480px', 'text-align' : 'center'})
  //$('#expcanvas').css('background-color', 'white');
  //$('body').append('<div id="displaydiv"></div>')
  //$('#displaydiv').css({'width':'800px', 'height':'600px', 'text-align' : 'center'})
  //$('#displaydiv').center()
}

function gen_rand_locations(number) { // change in March 24th 

    var width = window.innerWidth;
    var height = window.innerHeight;

    var min_dist = 40;
    
    var dist = [];
    //var distance =[];

    var locations = [];
    //var temp_locs = [[250,300]]; // placeholder, no need to consider the center when the field is rectrangular
    //var temp_locs = [[_.random(width*0.1,width*0.4),_.random(height*0.25,height*0.65)]];
    var temp_locs = [[_.random(24,410),_.random(120,430)]];
    for (var k=1;k<number;k++){
      trying:
      while(true){
        //var attempt = [_.random(width*0.125,width*0.325),_.random(height*0.25,height*0.65)];
        var attempt = [_.random(20,410),_.random(120,430)];
        //for (var s=k;s<1;s--){
        for (var s=0;s<k;s++){
          var temp_dist = Math.hypot(temp_locs[s][0]-attempt[0],temp_locs[s][1]-attempt[1]);
          if (temp_dist < min_dist){
            continue trying;
          }
        }

        break;
      
    }
      dist.push(temp_dist);
      temp_locs.push(attempt);

    }  
     
    locations.push(temp_locs);

    if(locations[0].length < 2){
    alert("function is used in WRONG way");
    alert(locations[0].length);
    alert(number);
    }
    return locations[0]
}

function gen_mini_locations(number) { // change in March 24th 

    var width = window.innerWidth;
    var height = window.innerHeight;

    var min_dist = 34.5;
    
    var dist = [];
    //var distance =[];

    var locations = [];
    //var temp_locs = [[250,300]]; // placeholder, no need to consider the center when the field is rectrangular
    //var temp_locs = [[_.random(width*0.1,width*0.4),_.random(height*0.25,height*0.65)]];
    var temp_locs = [[_.random(30,350),_.random(100,380)]];
    for (var k=1;k<number;k++){
      trying:
      while(true){
        //var attempt = [_.random(width*0.125,width*0.325),_.random(height*0.25,height*0.65)];
        var attempt = [_.random(30,350),_.random(100,380)];
        //for (var s=k;s<1;s--){
        for (var s=0;s<k;s++){
          var temp_dist = Math.hypot(temp_locs[s][0]-attempt[0],temp_locs[s][1]-attempt[1]);
          if (temp_dist < min_dist){
            continue trying;
          }
        }

        break;
      
    }
      dist.push(temp_dist);
      temp_locs.push(attempt);

    }  
     
    locations.push(temp_locs);

    if(locations[0].length < 2){
    alert("function is used in WRONG way");
    alert(locations[0].length);
    alert(number);
    }
    return locations[0]
}

  //var test_of_dist = gen_rand_locations(7)


function rebuild_left_locations(q_number){

  var left_locations = gen_rand_locations(20);
  //var right_locations = gen_rand_locations(20);
  return left_locations
}
function rebuild_right_locations(q_number){

  //var left_locations = gen_rand_locations(20);
  var right_locations = gen_rand_locations(20);
  return right_locations
}
// test for numbers


function test_number(number){
  var test_number_case =[];
  for (var i=1;i<number;i++){
    var test_number_temp = gen_feature_value(20,60,50,0.3,0);
    test_number_case.push(test_number_temp);
  }
}
var value_small;
var value_large;
[value_small,value_large] = gen_feature_value(2,10,9,0.3,0);
//var fake_locations = [[141,260],[336,437]];

function add_cell(){
 
  if (left_locations.length > 20){  // maximum n+2
  $('#add').hide()
}
  if (left_locations.length > 0){
  $('#delete').show()
}

    var width = window.innerWidth;
    var height = window.innerHeight;

    var min_dist = 10;

    var locations = [];
    var temp_locs = [[250,300]];
    var l_number = left_locations.length

   
    //var temp_locs = [[250,300]]; // placeholder, no need to consider the center when the field is rectrangular
    //var temp_locs = [[width/4,height/2]];
    //for (var k=0;k<1;k++){
      trying:
      while(true){
        var attempt = [_.random(width*0.1,width*0.4),_.random(height*0.25,height*0.65)];
        for (var s=0;s<l_number;s++){ // s is not consistent in temp_locs and left_locations!!!!
          //var temp_dist = Math.hypot(temp_locs[s][0]-attempt[0],temp_locs[s][1]-attempt[1]);
          var temp_dist = Math.hypot(left_locations[s][0]-attempt[0],left_locations[s][1]-attempt[1]);
          if (temp_dist < min_dist){
            continue trying;
          }
          //break;
        }
        break;
      }
      temp_locs.push(attempt);
    //}
    locations.push(temp_locs.slice(1));

    left_locations.push(locations[0][0]);

// Start draw the fiber cells





  var canvas1_html = "<canvas id='canvas1' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
  var ctx1 = document.getElementById('canvas1').getContext('2d');

  var dish_radius = 180;

  var free_cell_size = document.getElementById("free_size").value;
  var free_cell_ratio = document.getElementById("free_ratio").value;
  var free_cell_dark = document.getElementById("free_dark").value;

    ctx1.clearRect(0,0,500,600);
/*
    ctx1.strokeStyle = 'black';
    ctx1.fillStyle = 'rgba(255,255,255,0.9)';
    ctx1.beginPath();  
    ctx1.arc(250,300,dish_radius,0,2*Math.PI);
    ctx1.fill();
    ctx1.stroke();
*/
    var height_left = free_cell_size;
    var width_left = free_cell_size * free_cell_ratio/100;
    var dark_left = free_cell_dark;
    var sub_locations = left_locations;

    sub_locations.forEach((loc,i) => {
     ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
    })

  }

function add_cell_right(){
    var width = window.innerWidth;
    var height = window.innerHeight;

    var min_dist = 10; // should be larger, 10 only use for testing the range of field

    var locations = [];
    var temp_locs = [[250,300]];
    var r_number = right_locations.length
   
    //var temp_locs = [[250,300]]; // placeholder, no need to consider the center when the field is rectrangular
    //var temp_locs = [[width/4,height/2]];
    //for (var k=0;k<1;k++){
      trying:
      while(true){
        var attempt = [_.random(width*0.1,width*0.4),_.random(height*0.25,height*0.65)];
        for (var s=0;s<r_number;s++){ // s is not consistent in temp_locs and left_locations!!!!
          //var temp_dist = Math.hypot(temp_locs[s][0]-attempt[0],temp_locs[s][1]-attempt[1]);
          var temp_dist = Math.hypot(right_locations[s][0]-attempt[0],right_locations[s][1]-attempt[1]);
          if (temp_dist < min_dist){
            continue trying;
          }
          //break;
        }
        break;
      }
      temp_locs.push(attempt);
    //}
    locations.push(temp_locs.slice(1));

    right_locations.push(locations[0][0]);

  // start draw diber in right hemisphere
  var canvas2_html = "<canvas id='canvas2' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
  var ctx2 = document.getElementById('canvas2').getContext('2d');

  var dish_radius = 180;

  var free_cell_size2 = document.getElementById("free_size2").value;
  var free_cell_ratio2 = document.getElementById("free_ratio2").value;
  var free_cell_dark2 = document.getElementById("free_dark2").value;

  ctx2.clearRect(0,0,500,600);
/*
    ctx2.strokeStyle = 'black';
    ctx2.fillStyle = 'rgba(255,255,255,0.9)';
    ctx2.beginPath(); 
    ctx2.arc(250,300,dish_radius,0,2*Math.PI);
    ctx2.fill();
    ctx2.stroke();
*/
    var height_left = free_cell_size2;
    var width_left = free_cell_size2 * free_cell_ratio2/100;
    var dark_left = free_cell_dark2;
    var sub_locations = right_locations;

    sub_locations.forEach((loc,i) => {
     ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx2.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();

      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();
    })

  }

function delete_cell(){
  //var cur_number = free_locations.length;

  if (left_locations.length < 23){
  $('#add').show()
}
  if (left_locations.length < 3){
  $('#delete').hide()
}


  left_locations.splice(0,1); // 0 ok?


  // Start draw the fiber cells
  var canvas1_html = "<canvas id='canvas1' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
  var ctx1 = document.getElementById('canvas1').getContext('2d');

  var dish_radius = 180;

  var free_cell_size = document.getElementById("free_size").value;
  var free_cell_ratio = document.getElementById("free_ratio").value;
  var free_cell_dark = document.getElementById("free_dark").value;

    ctx1.clearRect(0,0,500,600);
/*
    ctx1.strokeStyle = 'black';
    ctx1.fillStyle = 'rgba(255,255,255,0.9)';
    ctx1.beginPath();  
    ctx1.arc(250,300,dish_radius,0,2*Math.PI);
    ctx1.fill();
    ctx1.stroke();
*/
    var height_left = free_cell_size;
    var width_left = free_cell_size * free_cell_ratio/100;
    var dark_left = free_cell_dark;
    var sub_locations = left_locations;

    sub_locations.forEach((loc,i) => {
     ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
    })
}

function delete_cell_right(){
  //var cur_number = free_locations.length;
  right_locations.splice(0,1); // 0 ok?

  // start draw diber in right hemisphere
  var canvas2_html = "<canvas id='canvas2' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
  var ctx2 = document.getElementById('canvas2').getContext('2d');

  var dish_radius = 180;

  var free_cell_size2 = document.getElementById("free_size2").value;
  var free_cell_ratio2 = document.getElementById("free_ratio2").value;
  var free_cell_dark2 = document.getElementById("free_dark2").value;

  ctx2.clearRect(0,0,500,600);
/*
    ctx2.strokeStyle = 'black';
    ctx2.fillStyle = 'rgba(255,255,255,0.9)';
    ctx2.beginPath(); 
    ctx2.arc(250,300,dish_radius,0,2*Math.PI);
    ctx2.fill();
    ctx2.stroke();
*/
    var height_left = free_cell_size2;
    var width_left = free_cell_size2 * free_cell_ratio2/100;
    var dark_left = free_cell_dark2;
    var sub_locations = right_locations;

    sub_locations.forEach((loc,i) => {
     ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx2.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();

      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();
    })
}


 function example_number_1(){
resizeWinTo();
bgCanvas('#ffffff');
example_feature_id = 1
  $('#displaydiv').remove();
  var number_text = 
`
The cells in the SPLEEN sample and those in the KIDNEY sample differ in number.
`
  $('body').append('<div id="display0"></div>')
  $('#display0').append('<p id=text></p>');
  $('#text').text(number_text)
  $('#text').center()
  $('#text').css({'position':'absolute', 'top':'86%','width':'60%'})
  $('#text').css('font-size', '120%')

  $('#display0').append('<button id="continue">Continue</button>');
  $('#continue').css({'position':'absolute','right':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);

  $('#display0').append('<button id="back">Back</button>');
  $('#back').css({'position':'absolute','left':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#back').click(back_illustration_2);



    var canvas1_html = "<canvas id='canvas1' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var canvas2_html = "<canvas id='canvas2' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var ctx1 = document.getElementById('canvas1').getContext('2d');
    var ctx2 = document.getElementById('canvas2').getContext('2d');

    var cell_dark_left = e_dark_left[0];
    var cell_dark_right = e_dark_right[0];
    var cell_size_left = e_size_left[0];
    var cell_size_right = e_size_right[0];
    var cell_ratio_left = e_ratio_left[0];
    var cell_ratio_right = e_ratio_right[0];
    var example_left_locations = e1_left_locations;
    var example_right_locations = e1_right_locations;

    var height_left = cell_size_left / (cell_ratio_left/100);
    var width_left = cell_size_left * cell_ratio_left/100;
    var dark_left = cell_dark_left;
    

    example_left_locations.forEach((loc,i) => {
   

      ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();
      

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
    })

    var height_right = cell_size_right / (cell_ratio_right/100);
    var width_right = cell_size_right * cell_ratio_right/100;
    var dark_right = cell_dark_right;
    

    example_right_locations.forEach((loc,i) => {

    
      ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_right/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_right/2, loc[1] - height_right/2, // C1
        loc[0] + width_right/2, loc[1] + height_right/2, // C2
        loc[0], loc[1] + height_right/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_right/2, loc[1] + height_right/2, // C3
        loc[0] - width_right/2, loc[1] - height_right/2, // C4
        loc[0], loc[1] - height_right/2); // A1
      ctx2.fillStyle = "rgb(" + dark_right + "," + dark_right + "," + dark_right + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();
      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();
  })

    
  }
 function example_number_2(){
  resizeWinTo();
bgCanvas('#ffffff');
example_feature_id = 2
  $('#displaydiv').remove();
  var number_text = 
`
The cells in the SPLEEN sample are more numerous than those in the KIDNEY sample. 
`
  $('body').append('<div id="display0"></div>')
  $('#display0').append('<p id=text></p>');
  $('#text').text(number_text)
  $('#text').center()
  $('#text').css({'position':'absolute', 'top':'86%','width':'60%'})
  $('#text').css('font-size', '120%')

  $('#display0').append('<button id="continue">Continue</button>');
  $('#continue').css({'position':'absolute','right':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);

  $('#display0').append('<button id="back">Back</button>');
  $('#back').css({'position':'absolute','left':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#back').click(back_example_number_1);



    var canvas1_html = "<canvas id='canvas1' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var canvas2_html = "<canvas id='canvas2' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var ctx1 = document.getElementById('canvas1').getContext('2d');
    var ctx2 = document.getElementById('canvas2').getContext('2d');

    var cell_dark_left = e_dark_left[1];
    var cell_dark_right = e_dark_right[1];
    var cell_size_left = e_size_left[1];
    var cell_size_right = e_size_right[1];
    var cell_ratio_left = e_ratio_left[1];
    var cell_ratio_right = e_ratio_right[1];
    var example_left_locations = e2_left_locations;
    var example_right_locations = e2_right_locations;

    var height_left = cell_size_left / (cell_ratio_left/100);
    var width_left = cell_size_left * cell_ratio_left/100;
    var dark_left = cell_dark_left;
    

    example_left_locations.forEach((loc,i) => {
   

      ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();
      

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
    })

    var height_right = cell_size_right / (cell_ratio_right/100);
    var width_right = cell_size_right * cell_ratio_right/100;
    var dark_right = cell_dark_right;
    

    example_right_locations.forEach((loc,i) => {

    
      ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_right/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_right/2, loc[1] - height_right/2, // C1
        loc[0] + width_right/2, loc[1] + height_right/2, // C2
        loc[0], loc[1] + height_right/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_right/2, loc[1] + height_right/2, // C3
        loc[0] - width_right/2, loc[1] - height_right/2, // C4
        loc[0], loc[1] - height_right/2); // A1
      ctx2.fillStyle = "rgb(" + dark_right + "," + dark_right + "," + dark_right + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();
      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();
  })

    
  }

 function example_number_3(){
  resizeWinTo();
bgCanvas('#ffffff');
//bgCanvas('#ffffff');
example_feature_id = 3
  $('#displaydiv').remove();
  var number_text = 
`
The cells in the KIDNEY sample are more numerous than those in the SPLEEN sample. 
`
  $('body').append('<div id="display0"></div>')
  $('#display0').append('<p id=text></p>');
  $('#text').text(number_text)
  $('#text').center()
  $('#text').css({'position':'absolute', 'top':'86%','width':'60%'})
  $('#text').css('font-size', '120%')

  $('#display0').append('<button id="continue">Continue</button>');
  $('#continue').css({'position':'absolute','right':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);

  $('#display0').append('<button id="back">Back</button>');
  $('#back').css({'position':'absolute','left':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#back').click(back_example_number_2);



    var canvas1_html = "<canvas id='canvas1' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var canvas2_html = "<canvas id='canvas2' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var ctx1 = document.getElementById('canvas1').getContext('2d');
    var ctx2 = document.getElementById('canvas2').getContext('2d');

    var cell_dark_left = e_dark_left[2];
    var cell_dark_right = e_dark_right[2];
    var cell_size_left = e_size_left[2];
    var cell_size_right = e_size_right[2];
    var cell_ratio_left = e_ratio_left[2];
    var cell_ratio_right = e_ratio_right[2];
    var example_left_locations = e3_left_locations;
    var example_right_locations = e3_right_locations;

    var height_left = cell_size_left / (cell_ratio_left/100);
    var width_left = cell_size_left * cell_ratio_left/100;
    var dark_left = cell_dark_left;
    

    example_left_locations.forEach((loc,i) => {
   

      ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();
      

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
    })

    var height_right = cell_size_right / (cell_ratio_right/100);
    var width_right = cell_size_right * cell_ratio_right/100;
    var dark_right = cell_dark_right;
    

    example_right_locations.forEach((loc,i) => {

    
      ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_right/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_right/2, loc[1] - height_right/2, // C1
        loc[0] + width_right/2, loc[1] + height_right/2, // C2
        loc[0], loc[1] + height_right/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_right/2, loc[1] + height_right/2, // C3
        loc[0] - width_right/2, loc[1] - height_right/2, // C4
        loc[0], loc[1] - height_right/2); // A1
      ctx2.fillStyle = "rgb(" + dark_right + "," + dark_right + "," + dark_right + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();
      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();
  })

    
  }

function example_size_1(){
  resizeWinTo();
   bgCanvas('#ffffff');
  $('#displaydiv').remove();
  var number_text = 
`
The cells in the SPLEEN sample and those in the KIDNEY sample differ in size (area).
`
  $('body').append('<div id="display0"></div>')
  $('#display0').append('<p id=text></p>');
  $('#text').text(number_text)
  $('#text').center()
  $('#text').css({'position':'absolute', 'top':'86%','width':'60%'})
  $('#text').css('font-size', '120%')
  $('#display0').append('<button id="continue">Continue</button>');
  //$('#continue').center()
  $('#continue').css({'position':'absolute','right':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);

  $('#display0').append('<button id="back">Back</button>');
  $('#back').css({'position':'absolute','left':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#back').click(back_example_number_1);

    var canvas1_html = "<canvas id='canvas1' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var canvas2_html = "<canvas id='canvas2' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var ctx1 = document.getElementById('canvas1').getContext('2d');
    var ctx2 = document.getElementById('canvas2').getContext('2d');

    var cell_dark_left = e_dark_left[3];
    var cell_dark_right = e_dark_right[3];
    var cell_size_left = e_size_left[3];
    var cell_size_right = e_size_right[3];
    var cell_ratio_left = e_ratio_left[3];
    var cell_ratio_right = e_ratio_right[3];
    var example_left_locations = e4_left_locations;
    var example_right_locations = e4_right_locations;
  

    var height_left = cell_size_left / (cell_ratio_left/100);
    var width_left = cell_size_left * cell_ratio_left/100;
    var dark_left = cell_dark_left;
    

    example_left_locations.forEach((loc,i) => {
      
      

      ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
    })

    var height_right = cell_size_right / (cell_ratio_right/100);
    var width_right = cell_size_right * cell_ratio_right/100;
    var dark_right = cell_dark_right;

    example_right_locations.forEach((loc,i) => {

      
      ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_right/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_right/2, loc[1] - height_right/2, // C1
        loc[0] + width_right/2, loc[1] + height_right/2, // C2
        loc[0], loc[1] + height_right/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_right/2, loc[1] + height_right/2, // C3
        loc[0] - width_right/2, loc[1] - height_right/2, // C4
        loc[0], loc[1] - height_right/2); // A1
      ctx2.fillStyle = "rgb(" + dark_right + "," + dark_right + "," + dark_right + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();
      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();
  })

    
  }

function    example_size_2(){
  resizeWinTo();
  bgCanvas('#ffffff');
  $('#displaydiv').remove();
  var number_text = 
`
The cells in the KIDNEY sample are larger (have greater area) than those in the SPLEEN sample.
`
  $('body').append('<div id="display0"></div>')
  $('#display0').append('<p id=text></p>');
  $('#text').text(number_text)
  $('#text').center()
  $('#text').css({'position':'absolute','top':'86%','width':'60%'})
  $('#text').css('font-size', '120%')
  $('#display0').append('<button id="continue">Continue</button>');
  //$('#continue').center()
  $('#continue').css({'position':'absolute','right':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);

  $('#display0').append('<button id="back">Back</button>');
  $('#back').css({'position':'absolute','left':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#back').click(back_example_size_1);

    var canvas1_html = "<canvas id='canvas1' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var canvas2_html = "<canvas id='canvas2' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var ctx1 = document.getElementById('canvas1').getContext('2d');
    var ctx2 = document.getElementById('canvas2').getContext('2d');

    var cell_dark_left = e_dark_left[4];
    var cell_dark_right = e_dark_right[4];
    var cell_size_left = e_size_left[4];
    var cell_size_right = e_size_right[4];
    var cell_ratio_left = e_ratio_left[4];
    var cell_ratio_right = e_ratio_right[4];
    var example_left_locations = e5_left_locations;
    var example_right_locations = e5_right_locations;
  

    var height_left = cell_size_left / (cell_ratio_left/100);
    var width_left = cell_size_left * cell_ratio_left/100;
    var dark_left = cell_dark_left;
    

    example_left_locations.forEach((loc,i) => {
      
      

      ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
    })

    var height_right = cell_size_right / (cell_ratio_right/100);
    var width_right = cell_size_right * cell_ratio_right/100;
    var dark_right = cell_dark_right;

    example_right_locations.forEach((loc,i) => {

      
      ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_right/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_right/2, loc[1] - height_right/2, // C1
        loc[0] + width_right/2, loc[1] + height_right/2, // C2
        loc[0], loc[1] + height_right/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_right/2, loc[1] + height_right/2, // C3
        loc[0] - width_right/2, loc[1] - height_right/2, // C4
        loc[0], loc[1] - height_right/2); // A1
      ctx2.fillStyle = "rgb(" + dark_right + "," + dark_right + "," + dark_right + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();
      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();
  })

    
  }

 function   example_size_3(){
  resizeWinTo();
  bgCanvas('#ffffff');
  $('#displaydiv').remove();
  var number_text = 
`
The cells in the SPLEEN sample are larger (have greater area) than those in the KIDNEY sample.
`
  $('body').append('<div id="display0"></div>')
  $('#display0').append('<p id=text></p>');
  $('#text').text(number_text)
  $('#text').center()
  $('#text').css({'position':'absolute','top':'86%','width':'60%'})
  $('#text').css('font-size', '120%')
  $('#display0').append('<button id="continue">Continue</button>');
  //$('#continue').center()
  $('#continue').css({'position':'absolute','right':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);

  $('#display0').append('<button id="back">Back</button>');
  $('#back').css({'position':'absolute','left':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#back').click(back_example_size_2);

    var canvas1_html = "<canvas id='canvas1' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var canvas2_html = "<canvas id='canvas2' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var ctx1 = document.getElementById('canvas1').getContext('2d');
    var ctx2 = document.getElementById('canvas2').getContext('2d');

    var cell_dark_left = e_dark_left[5];
    var cell_dark_right = e_dark_right[5];
    var cell_size_left = e_size_left[5];
    var cell_size_right = e_size_right[5];
    var cell_ratio_left = e_ratio_left[5];
    var cell_ratio_right = e_ratio_right[5];
    var example_left_locations = e6_left_locations;
    var example_right_locations = e6_right_locations;
  

    var height_left = cell_size_left / (cell_ratio_left/100);
    var width_left = cell_size_left * cell_ratio_left/100;
    var dark_left = cell_dark_left;
    

    example_left_locations.forEach((loc,i) => {
      
      

      ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
    })

    var height_right = cell_size_right/ (cell_ratio_right/100);
    var width_right = cell_size_right * cell_ratio_right/100;
    var dark_right = cell_dark_right;

    example_right_locations.forEach((loc,i) => {

      
      ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_right/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_right/2, loc[1] - height_right/2, // C1
        loc[0] + width_right/2, loc[1] + height_right/2, // C2
        loc[0], loc[1] + height_right/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_right/2, loc[1] + height_right/2, // C3
        loc[0] - width_right/2, loc[1] - height_right/2, // C4
        loc[0], loc[1] - height_right/2); // A1
      ctx2.fillStyle = "rgb(" + dark_right + "," + dark_right + "," + dark_right + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();
      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();
  })

    
  }

function  example_ratio_1(){
  resizeWinTo();
  bgCanvas('#ffffff');
  $('#displaydiv').remove();
  var number_text = 
`
The cells in the SPLEEN sample and those in the KIDNEY sample differ in elongation (The sizes are the same).
`
  $('body').append('<div id="display0"></div>')
  $('#display0').append('<p id=text></p>');
  $('#text').text(number_text)
  $('#text').center()
  $('#text').css({'position':'absolute', 'top':'86%','width':'60%'})
  $('#text').css('font-size', '120%')
  $('#display0').append('<button id="continue">Continue</button>');
  //$('#continue').center()
  $('#continue').css({'position':'absolute','right':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);

  $('#display0').append('<button id="back">Back</button>');
  $('#back').css({'position':'absolute','left':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#back').click(back_example_size_1);

    var canvas1_html = "<canvas id='canvas1' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var canvas2_html = "<canvas id='canvas2' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var ctx1 = document.getElementById('canvas1').getContext('2d');
    var ctx2 = document.getElementById('canvas2').getContext('2d');

    var cell_dark_left = e_dark_left[6];
    var cell_dark_right = e_dark_right[6];
    var cell_size_left = e_size_left[6];
    var cell_size_right = e_size_right[6];
    var cell_ratio_left = e_ratio_left[6];
    var cell_ratio_right = e_ratio_right[6];
    var example_left_locations = e7_left_locations;
    var example_right_locations = e7_right_locations;

    var height_left = cell_size_left / (cell_ratio_left/100);
    var width_left = cell_size_left * cell_ratio_left/100;
    var dark_left = cell_dark_left;
    

    example_left_locations.forEach((loc,i) => {
      

      ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
  
    })


    var height_right = cell_size_right / (cell_ratio_right/100);
    var width_right = cell_size_right * cell_ratio_right/100;
    var dark_right = cell_dark_right;
  

    example_right_locations.forEach((loc,i) => {

    
      ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_right/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_right/2, loc[1] - height_right/2, // C1
        loc[0] + width_right/2, loc[1] + height_right/2, // C2
        loc[0], loc[1] + height_right/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_right/2, loc[1] + height_right/2, // C3
        loc[0] - width_right/2, loc[1] - height_right/2, // C4
        loc[0], loc[1] - height_right/2); // A1
      ctx2.fillStyle = "rgb(" + dark_right + "," + dark_right + "," + dark_right + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();
      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();

  })

    
  }
function  example_ratio_2(){
  resizeWinTo();
  bgCanvas('#ffffff');
  $('#displaydiv').remove();
  var number_text = 
`
The cells in the KIDNEY sample are more elongated than those in the SPLEEN sample. 
`
  $('body').append('<div id="display0"></div>')
  $('#display0').append('<p id=text></p>');
  $('#text').text(number_text)
  $('#text').center()
  $('#text').css({'position':'absolute', 'top':'86%','width':'60%'})
  $('#text').css('font-size', '120%')
  $('#display0').append('<button id="continue">Continue</button>');
  //$('#continue').center()
  $('#continue').css({'position':'absolute','right':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);

  $('#display0').append('<button id="back">Back</button>');
  $('#back').css({'position':'absolute','left':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#back').click(back_example_ratio_1);

    var canvas1_html = "<canvas id='canvas1' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var canvas2_html = "<canvas id='canvas2' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var ctx1 = document.getElementById('canvas1').getContext('2d');
    var ctx2 = document.getElementById('canvas2').getContext('2d');

    var cell_dark_left = e_dark_left[7];
    var cell_dark_right = e_dark_right[7];
    var cell_size_left = e_size_left[7];
    var cell_size_right = e_size_right[7];
    var cell_ratio_left = e_ratio_left[7];
    var cell_ratio_right = e_ratio_right[7];
    var example_left_locations = e8_left_locations;
    var example_right_locations = e8_right_locations;

    var height_left = cell_size_left / (cell_ratio_left/100);
    var width_left = cell_size_left * cell_ratio_left/100;
    var dark_left = cell_dark_left;
    

    example_left_locations.forEach((loc,i) => {
      

      ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
  
    })


    var height_right = cell_size_right / (cell_ratio_right/100);
    var width_right = cell_size_right * cell_ratio_right/100;
    var dark_right = cell_dark_right;
  

    example_right_locations.forEach((loc,i) => {

    
      ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_right/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_right/2, loc[1] - height_right/2, // C1
        loc[0] + width_right/2, loc[1] + height_right/2, // C2
        loc[0], loc[1] + height_right/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_right/2, loc[1] + height_right/2, // C3
        loc[0] - width_right/2, loc[1] - height_right/2, // C4
        loc[0], loc[1] - height_right/2); // A1
      ctx2.fillStyle = "rgb(" + dark_right + "," + dark_right + "," + dark_right + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();
      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();

  })

    
  }
function  example_ratio_3(){
  resizeWinTo();
  bgCanvas('#ffffff');
  $('#displaydiv').remove();
  var number_text = 
`
The cells in the KIDNEY sample are more elongated than those in the SPLEEN sample. 
`
  $('body').append('<div id="display0"></div>')
  $('#display0').append('<p id=text></p>');
  $('#text').text(number_text)
  $('#text').center()
  $('#text').css({'position':'absolute', 'top':'86%','width':'60%'})
  $('#text').css('font-size', '120%')
  $('#display0').append('<button id="continue">Continue</button>');
  //$('#continue').center()
  $('#continue').css({'position':'absolute','right':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);

  $('#display0').append('<button id="back">Back</button>');
  $('#back').css({'position':'absolute','left':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#back').click(back_example_ratio_2);

    var canvas1_html = "<canvas id='canvas1' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var canvas2_html = "<canvas id='canvas2' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var ctx1 = document.getElementById('canvas1').getContext('2d');
    var ctx2 = document.getElementById('canvas2').getContext('2d');

    var cell_dark_left = e_dark_left[8];
    var cell_dark_right = e_dark_right[8];
    var cell_size_left = e_size_left[8];
    var cell_size_right = e_size_right[8];
    var cell_ratio_left = e_ratio_left[8];
    var cell_ratio_right = e_ratio_right[8];
    var example_left_locations = e9_left_locations;
    var example_right_locations = e9_right_locations;

    var height_left = cell_size_left / (cell_ratio_left/100);
    var width_left = cell_size_left * cell_ratio_left/100;
    var dark_left = cell_dark_left;
    

    example_left_locations.forEach((loc,i) => {
      

      ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
  
    })


    var height_right = cell_size_right / (cell_ratio_right/100);
    var width_right = cell_size_right * cell_ratio_right/100;
    var dark_right = cell_dark_right;
  

    example_right_locations.forEach((loc,i) => {

    
      ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_right/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_right/2, loc[1] - height_right/2, // C1
        loc[0] + width_right/2, loc[1] + height_right/2, // C2
        loc[0], loc[1] + height_right/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_right/2, loc[1] + height_right/2, // C3
        loc[0] - width_right/2, loc[1] - height_right/2, // C4
        loc[0], loc[1] - height_right/2); // A1
      ctx2.fillStyle = "rgb(" + dark_right + "," + dark_right + "," + dark_right + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();
      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();

  })

    
  }
function  example_dark_1(){
  resizeWinTo();
  bgCanvas('#ffffff');
  $('#displaydiv').remove();
  var number_text = 
`
The cells in the SPLEEN sample and those in the KIDNEY sample differ in darkness.
`
  $('body').append('<div id="display0"></div>')
  $('#display0').append('<p id=text></p>');
  $('#text').text(number_text)
  $('#text').center()
  $('#text').css({'position':'absolute','top':'86%','width':'60%'})
  $('#text').css('font-size', '120%')
  $('#display0').append('<button id="continue">Continue</button>');
  //$('#continue').center()
  $('#continue').css({'position':'absolute','right':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);

  $('#display0').append('<button id="back">Back</button>');
  $('#back').css({'position':'absolute','left':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#back').click(back_example_ratio_1);

    var canvas1_html = "<canvas id='canvas1' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var canvas2_html = "<canvas id='canvas2' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var ctx1 = document.getElementById('canvas1').getContext('2d');
    var ctx2 = document.getElementById('canvas2').getContext('2d');

    var cell_dark_left = e_dark_left[9];
    var cell_dark_right = e_dark_right[9];
    var cell_size_left = e_size_left[9];
    var cell_size_right = e_size_right[9];
    var cell_ratio_left = e_ratio_left[9];
    var cell_ratio_right = e_ratio_right[9];
    var example_left_locations = e10_left_locations;
    var example_right_locations = e10_right_locations;

    var height_left = cell_size_left / (cell_ratio_left/100);
    var width_left = cell_size_left * cell_ratio_left/100;
    var dark_left = cell_dark_left;
    

    example_left_locations.forEach((loc,i) => {
      

      ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
  
    })

    //var cell_size_right = 35;
    //var cell_ratio_right = 40;
    //var cell_dark_right = 160;


    var height_right = cell_size_right / (cell_ratio_right/100);
    var width_right = cell_size_right * cell_ratio_right/100;
    var dark_right = cell_dark_right;

    example_right_locations.forEach((loc,i) => {

    
      ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_right/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_right/2, loc[1] - height_right/2, // C1
        loc[0] + width_right/2, loc[1] + height_right/2, // C2
        loc[0], loc[1] + height_right/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_right/2, loc[1] + height_right/2, // C3
        loc[0] - width_right/2, loc[1] - height_right/2, // C4
        loc[0], loc[1] - height_right/2); // A1
      ctx2.fillStyle = "rgb(" + dark_right + "," + dark_right + "," + dark_right + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();
      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();

  })

    
  }
function example_dark_2(){
  resizeWinTo();
  bgCanvas('#ffffff');
  $('#displaydiv').remove();
  var number_text = 
`
The cells in the SPLEEN sample are darker than those in the KIDNEY sample. 
`
  $('body').append('<div id="display0"></div>')
  $('#display0').append('<p id=text></p>');
  $('#text').text(number_text)
  $('#text').center()
  $('#text').css({'position':'absolute','top':'86%','width':'60%'})
  $('#text').css('font-size', '120%')
  $('#display0').append('<button id="continue">Continue</button>');
  //$('#continue').center()
  $('#continue').css({'position':'absolute','right':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);

  $('#display0').append('<button id="back">Back</button>');
  $('#back').css({'position':'absolute','left':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#back').click(back_example_dark_1);

    var canvas1_html = "<canvas id='canvas1' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var canvas2_html = "<canvas id='canvas2' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var ctx1 = document.getElementById('canvas1').getContext('2d');
    var ctx2 = document.getElementById('canvas2').getContext('2d');

    var cell_dark_left = e_dark_left[10];
    var cell_dark_right = e_dark_right[10];
    var cell_size_left = e_size_left[10];
    var cell_size_right = e_size_right[10];
    var cell_ratio_left = e_ratio_left[10];
    var cell_ratio_right = e_ratio_right[10];
    var example_left_locations = e11_left_locations;
    var example_right_locations = e11_right_locations;

    var height_left = cell_size_left / (cell_ratio_left/100);
    var width_left = cell_size_left * cell_ratio_left/100;
    var dark_left = cell_dark_left;
    

    example_left_locations.forEach((loc,i) => {
      

      ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
  
    })

    //var cell_size_right = 35;
    //var cell_ratio_right = 40;
    //var cell_dark_right = 160;


    var height_right = cell_size_right / (cell_ratio_right/100);
    var width_right = cell_size_right * cell_ratio_right/100;
    var dark_right = cell_dark_right;

    example_right_locations.forEach((loc,i) => {

    
      ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_right/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_right/2, loc[1] - height_right/2, // C1
        loc[0] + width_right/2, loc[1] + height_right/2, // C2
        loc[0], loc[1] + height_right/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_right/2, loc[1] + height_right/2, // C3
        loc[0] - width_right/2, loc[1] - height_right/2, // C4
        loc[0], loc[1] - height_right/2); // A1
      ctx2.fillStyle = "rgb(" + dark_right + "," + dark_right + "," + dark_right + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();
      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();

  })

    
  }
function  example_dark_3(){
  resizeWinTo();
  bgCanvas('#ffffff');
  $('#displaydiv').remove();
  var number_text = 
`
The cells in the KIDNEY sample are darker than those in the SPLEEN sample. 
`
  $('body').append('<div id="display0"></div>')
  $('#display0').append('<p id=text></p>');
  $('#text').text(number_text)
  $('#text').center()
  $('#text').css({'position':'absolute','top':'86%','width':'60%'})
  $('#text').css('font-size', '120%')
  $('#display0').append('<button id="continue">Continue</button>');
  //$('#continue').center()
  $('#continue').css({'position':'absolute','right':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);

  $('#display0').append('<button id="back">Back</button>');
  $('#back').css({'position':'absolute','left':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#back').click(back_example_dark_2);

    var canvas1_html = "<canvas id='canvas1' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var canvas2_html = "<canvas id='canvas2' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var ctx1 = document.getElementById('canvas1').getContext('2d');
    var ctx2 = document.getElementById('canvas2').getContext('2d');

    var cell_dark_left = e_dark_left[11];
    var cell_dark_right = e_dark_right[11];
    var cell_size_left = e_size_left[11];
    var cell_size_right = e_size_right[11];
    var cell_ratio_left = e_ratio_left[11];
    var cell_ratio_right = e_ratio_right[11];
    var example_left_locations = e12_left_locations;
    var example_right_locations = e12_right_locations;

    var height_left = cell_size_left / (cell_ratio_left/100);
    var width_left = cell_size_left * cell_ratio_left/100;
    var dark_left = cell_dark_left;
    

    example_left_locations.forEach((loc,i) => {
      

      ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
  
    })

    //var cell_size_right = 35;
    //var cell_ratio_right = 40;
    //var cell_dark_right = 160;


    var height_right = cell_size_right / (cell_ratio_right/100);
    var width_right = cell_size_right * cell_ratio_right/100;
    var dark_right = cell_dark_right;

    example_right_locations.forEach((loc,i) => {

    
      ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_right/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_right/2, loc[1] - height_right/2, // C1
        loc[0] + width_right/2, loc[1] + height_right/2, // C2
        loc[0], loc[1] + height_right/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_right/2, loc[1] + height_right/2, // C3
        loc[0] - width_right/2, loc[1] - height_right/2, // C4
        loc[0], loc[1] - height_right/2); // A1
      ctx2.fillStyle = "rgb(" + dark_right + "," + dark_right + "," + dark_right + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();
      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();

  })

    
  }


// modify from blankcanvas

class Rebuild_Practice {

  constructor(){

    this.cur_trial = 0;
    this.k_trial_state = 0;
    this.trials_per_setsize = 2;

    this.start = () => {
      this.startTime = Date.now();
      //this.r_instructions();
      //this.draw_sample();
      show_slider(11);
    }
  }
}

class Rebuild_Task {

  constructor(){

    this.cur_trial = 0;
    this.k_trial_state = 0;
    this.trials_per_setsize = 2;

    this.start = () => {
      this.startTime = Date.now();
      //this.r_instructions();
      //this.draw_sample();
      show_slider(1);
    }
  }
}


// modify from blankcanvas
class Rebuild_Task2 {

  constructor(){

    this.cur_trial = 0;
    this.k_trial_state = 0;
    this.trials_per_setsize = 2;

    this.start = () => {
      this.startTime = Date.now();
      //this.r_instructions();
      //this.draw_sample();
      show_slider(2);
    }
  }
}

class Rebuild_Task3 {

  constructor(){

    this.cur_trial = 0;
    this.k_trial_state = 0;
    this.trials_per_setsize = 2;

    this.start = () => {
      this.startTime = Date.now();
      //this.r_instructions();
      //this.draw_sample();
      show_slider(3);
    }
  }
}

class Rebuild_Task4 {

  constructor(){

    this.cur_trial = 0;
    this.k_trial_state = 0;
    this.trials_per_setsize = 2;

    this.start = () => {
      this.startTime = Date.now();
      //this.r_instructions();
      //this.draw_sample();
      show_slider(4);
    }
  }
}

class Rebuild_Task5 {

  constructor(){

    this.cur_trial = 0;
    this.k_trial_state = 0;
    this.trials_per_setsize = 2;

    this.start = () => {
      this.startTime = Date.now();
      //this.r_instructions();
      //this.draw_sample();
      show_slider(5);
    }
  }
}

class Rebuild_Task6 {

  constructor(){

    this.cur_trial = 0;
    this.k_trial_state = 0;
    this.trials_per_setsize = 2;

    this.start = () => {
      this.startTime = Date.now();
      //this.r_instructions();
      //this.draw_sample();
      show_slider(6);
    }
  }
}

class Rebuild_Task7 {

  constructor(){

    this.cur_trial = 0;
    this.k_trial_state = 0;
    this.trials_per_setsize = 2;

    this.start = () => {
      this.startTime = Date.now();
      //this.r_instructions();
      //this.draw_sample();
      show_slider(7);
    }
  }
}
class Rebuild_Task8 {

  constructor(){

    this.cur_trial = 0;
    this.k_trial_state = 0;
    this.trials_per_setsize = 2;

    this.start = () => {
      this.startTime = Date.now();
      //this.r_instructions();
      //this.draw_sample();
      show_slider(8);
    }
  }
}
class Rebuild_Task9 {

  constructor(){

    this.cur_trial = 0;
    this.k_trial_state = 0;
    this.trials_per_setsize = 2;

    this.start = () => {
      this.startTime = Date.now();
      //this.r_instructions();
      //this.draw_sample();
      show_slider(9);
    }
  }
}
class Rebuild_Task10 {

  constructor(){

    this.cur_trial = 0;
    this.k_trial_state = 0;
    this.trials_per_setsize = 2;

    this.start = () => {
      this.startTime = Date.now();
      //this.r_instructions();
      //this.draw_sample();
      show_slider(10);
    }
  }
}
class attention_check1 {

  constructor(){

    this.cur_trial = 0;
    this.k_trial_state = 0;
    this.trials_per_setsize = 2;

    this.start = () => {
      this.startTime = Date.now();
      //this.r_instructions();
      //this.draw_sample();
      show_slider(12);
    }
  }
}
class attention_check2 {

  constructor(){

    this.cur_trial = 0;
    this.k_trial_state = 0;
    this.trials_per_setsize = 2;

    this.start = () => {
      this.startTime = Date.now();
      //this.r_instructions();
      //this.draw_sample();
      show_slider(13);
    }
  }
}
class attention_check3 {

  constructor(){

    this.cur_trial = 0;
    this.k_trial_state = 0;
    this.trials_per_setsize = 2;

    this.start = () => {
      this.startTime = Date.now();
      //this.r_instructions();
      //this.draw_sample();
      show_slider(14);
    }
  }
}
class attention_check4 {

  constructor(){

    this.cur_trial = 0;
    this.k_trial_state = 0;
    this.trials_per_setsize = 2;

    this.start = () => {
      this.startTime = Date.now();
      //this.r_instructions();
      //this.draw_sample();
      show_slider(15);
    }
  }
}
class attention_check5 {

  constructor(){

    this.cur_trial = 0;
    this.k_trial_state = 0;
    this.trials_per_setsize = 2;

    this.start = () => {
      this.startTime = Date.now();
      //this.r_instructions();
      //this.draw_sample();
      show_slider(16);
    }
  }
}
class attention_check6 {

  constructor(){

    this.cur_trial = 0;
    this.k_trial_state = 0;
    this.trials_per_setsize = 2;

    this.start = () => {
      this.startTime = Date.now();
      //this.r_instructions();
      //this.draw_sample();
      show_slider(17);
    }
  }
}
class attention_check7 {

  constructor(){

    this.cur_trial = 0;
    this.k_trial_state = 0;
    this.trials_per_setsize = 2;

    this.start = () => {
      this.startTime = Date.now();
      //this.r_instructions();
      //this.draw_sample();
      show_slider(18);
    }
  }
}
class attention_check8 {

  constructor(){

    this.cur_trial = 0;
    this.k_trial_state = 0;
    this.trials_per_setsize = 2;

    this.start = () => {
      this.startTime = Date.now();
      //this.r_instructions();
      //this.draw_sample();
      show_slider(19);
    }
  }
}
function show_slider(q_number) {// not only slider actually, buttons also involved

var ig_size_check = 0;
var ig_size2_check = 0;
var ig_number_check = 0;
var ig_number2_check = 0;
var ig_ratio_check = 0;
var ig_ratio2_check = 0;
var ig_dark_check = 0;
var ig_dark2_check = 0;

left_locations = rebuild_left_locations(q_number);
right_locations = rebuild_right_locations(q_number);

    resizeWinTo();
  $('#displaydiv').remove();

  //$('body').append('<div id="display0"></div>')
  $('body').append('<div id="display1" width=900 height=30></div>')
  $('body').append('<div id="display2" width=900 height=30></div>')
  $('body').append('<div id="display3" width=900 height=30></div>')
  $('body').append('<div id="display4" width=900 height=30></div>')

 // $('body').append('<div id="display5" width=900 height=120></div>')
  
  $('#display1').css({'position':'absolute','left':'2%','right':'2%','top':'80%','style':'z-index:2'})
  $('#display2').css({'position':'absolute','left':'2%','right':'2%','top':'81%','style':'z-index:2'})
  $('#display3').css({'position':'absolute','left':'2%','right':'2%','top':'82%','style':'z-index:2'})
  $('#display4').css({'position':'absolute','left':'2%','right':'2%','top':'83%','style':'z-index:2'})
/*
  $('#display5').css({'position':'absolute','left':'2%','right':'2%','top':'80%','style':'z-index:2','display':'none'})

  var revise_text = 
`Click the "revise" button to `;
  $('body').append('<p id=text></p>');
  //$('#display0').css({'top':'500px'})
  $('#text').text(reconstruct_text)
  $('#text').css('font-size', '120%')
  //$('#text').center()
  $('#text').css({'position':'absolute','left':'10%','right':'10%','top':'80%'})
*/
 // Starting size
  $('#display1').append('<button id="ig_size">Ignore</button>');
  $('#display1').append('<button id="rs_size">Reset</button>');

  $('#rs_size').hide();
  $('#rs_size').click(function(){
    ig_size_check = 0;
    $('#slider-size').show();
    $('#ig_size').show();
    $('#rs_size').hide();
  }) 

  $('#ig_size').click(function(){
    ig_size_check = 1;
    $('#slider-size').hide();
    $('#rs_size').show();
    $('#ig_size').hide();

  });

  $('#display1').append('<button id="ig_size2">Ignore</button>');
  $('#display1').append('<button id="rs_size2">Reset</button>');

  $('#rs_size2').hide();
  $('#rs_size2').click(function(){
    ig_size2_check = 0;
    $('#slider-size2').show();
    $('#ig_size2').show();
    $('#rs_size2').hide();
  }) 

  $('#ig_size2').click(function(){
    ig_size2_check = 1;
    $('#slider-size2').hide();
    $('#rs_size2').show();
    $('#ig_size2').hide();
  });

$('#ig_size').css({'position':'absolute','left':'2px','background-color':'white','border-radius':'4px','color':'black','border':'2px solid #682847',
'padding':'2px 12px','font-size':'80%'})
$('#rs_size').css({'position':'absolute','left':'2px','background-color':'white','border-radius':'4px','color':'black','border':'2px solid #682847',
'padding':'2px 12px','font-size':'80%'})
//,'background-color':'white','padding':'4px 6px',
   // 'border-radius':'3px','color':'black','border':'2px solid #682847','font-size':'100%','display':'none'
$('#ig_size2').css({'position':'absolute','right':'2px','background-color':'white','border-radius':'4px','color':'black','border':'2px solid #682847',
'padding':'2px 12px','font-size':'80%'})
$('#rs_size2').css({'position':'absolute','right':'2px','background-color':'white','border-radius':'4px','color':'black','border':'2px solid #682847',
'padding':'2px 12px','font-size':'80%'})
/*
  $('#add').click(add_cell);

  $('#delete').click(delete_cell);
  $('#add').css({'margin-left':'12px'})
  $('#delete').css({'margin-left':'42px'})
*/
 $('#display1').append('<div id="slider-size" ></div>');
 $('#display1').append('<div id="slider-size2" ></div>');


  $("#slider-size").append('<input class="bar" type="range" id="free_size" step ="1" min="20" max="50" value ="35" ></input>')
  $("#slider-size").css({'position':'absolute','left':'10%','right':'60%','top':'6px'})
 
  
  //$("#slider-dark").append('<input class="bar" type="range" id="free_dark" step ="1" min="30" max="220" value="125"></input>')



var text_size = 
`SIZE`;
  $('#display1').append('<p id=text1></p>');
  $('#text1').text(text_size)
  //$('#text').center()
  $('#text1').css({'position':'absolute','left':'48%','top':'6px'})



  $("#slider-size2").append('<input class="bar" type="range" id="free_size2" step ="1" min="20" max="50" value ="35" ></input>')
  $("#slider-size2").css({'position':'absolute','left':'60%','right':'10%','top':'6px'})



// Ratio
  $('#display2').append('<button id="ig_ratio">Ignore</button>');
  $('#display2').append('<button id="rs_ratio">Reset</button>');

  $('#rs_ratio').hide();
  $('#rs_ratio').click(function(){
    ig_ratio_check = 0;
    $('#slider-ratio').show();
    $('#ig_ratio').show();
    $('#rs_ratio').hide();
  }) 

  $('#ig_ratio').click(function(){
    ig_ratio_check = 1;
    $('#slider-ratio').hide();
    $('#rs_ratio').show();
    $('#ig_ratio').hide();
  });

  $('#display2').append('<button id="ig_ratio2">Ignore</button>');
  $('#display2').append('<button id="rs_ratio2">Reset</button>');

  $('#rs_ratio2').hide();
  $('#rs_ratio2').click(function(){
    ig_ratio2_check = 0;
    $('#slider-ratio2').show();
    $('#ig_ratio2').show();
    $('#rs_ratio2').hide();
  }) 

  $('#ig_ratio2').click(function(){
    ig_ratio2_check = 1;
    $('#slider-ratio2').hide();
    $('#rs_ratio2').show();
    $('#ig_ratio2').hide();
  });

$('#ig_ratio').css({'position':'absolute','left':'2px','top':'25px','background-color':'white','border-radius':'4px','color':'black','border':'2px solid #682847',
'padding':'2px 12px','font-size':'80%'})
$('#rs_ratio').css({'position':'absolute','left':'2px','top':'25px','background-color':'white','border-radius':'4px','color':'black','border':'2px solid #682847',
'padding':'2px 12px','font-size':'80%'})
//,'background-color':'white','padding':'4px 6px',
   // 'border-radius':'3px','color':'black','border':'2px solid #682847','font-size':'100%','display':'none'
   
$('#ig_ratio2').css({'position':'absolute','right':'2px','top':'25px','background-color':'white','border-radius':'4px','color':'black','border':'2px solid #682847',
'padding':'2px 12px','font-size':'80%'})
$('#rs_ratio2').css({'position':'absolute','right':'2px','top':'25px','background-color':'white','border-radius':'4px','color':'black','border':'2px solid #682847',
'padding':'2px 12px','font-size':'80%'})


 $('#display2').append('<div id="slider-ratio" ></div>');
 $('#display2').append('<div id="slider-ratio2" ></div>');
  $("#slider-ratio").append('<input type="range" id="free_ratio" step = "1" min="50" max="110" value = "80"></input>')
  $("#slider-ratio2").append('<input type="range" id="free_ratio2" step = "1" min="50" max="110" value = "80"></input>')
  $("#slider-ratio").css({'position':'absolute','left':'10%','right':'60%','top':'30px'})
  $("#slider-ratio2").css({'position':'absolute','left':'60%','right':'10%','top':'30px'})

  var text_ratio = 
`ELONGATION`;
  $('#display2').append('<p id=text2></p>');
  $('#text2').text(text_ratio)
  //$('#text').center()
  $('#text2').css({'position':'absolute','left':'48%','top':'30px'})
// ending of ratio

// Starting Darkness
$('#display3').append('<button id="ig_dark">Ignore</button>');
  $('#display3').append('<button id="rs_dark">Reset</button>');

  $('#rs_dark').hide();
  $('#rs_dark').click(function(){
    ig_dark_check = 0;
    $('#slider-dark').show();
    $('#ig_dark').show();
    $('#rs_dark').hide();
  }) 

  $('#ig_dark').click(function(){
    ig_dark_check = 1;
    $('#slider-dark').hide();
    $('#rs_dark').show();
    $('#ig_dark').hide();
  });

  $('#display3').append('<button id="ig_dark2">Ignore</button>');
  $('#display3').append('<button id="rs_dark2">Reset</button>');

  $('#rs_dark2').hide();
  $('#rs_dark2').click(function(){
    ig_dark2_check = 0;
    $('#slider-dark2').show();
    $('#ig_dark2').show();
    $('#rs_dark2').hide();
  }) 

  $('#ig_dark2').click(function(){
    ig_dark2_check = 1;
    $('#slider-dark2').hide();
    $('#rs_dark2').show();
    $('#ig_dark2').hide();
  });

$('#ig_dark').css({'position':'absolute','left':'2px','top':'50px','background-color':'white','border-radius':'4px','color':'black','border':'2px solid #682847',
'padding':'2px 12px','font-size':'80%'})
$('#rs_dark').css({'position':'absolute','left':'2px','top':'50px','background-color':'white','border-radius':'4px','color':'black','border':'2px solid #682847',
'padding':'2px 12px','font-size':'80%'})
//,'background-color':'white','padding':'4px 6px',
   // 'border-radius':'3px','color':'black','border':'2px solid #682847','font-size':'100%','display':'none'
$('#ig_dark2').css({'position':'absolute','right':'2px','top':'50px','background-color':'white','border-radius':'4px','color':'black','border':'2px solid #682847',
'padding':'2px 12px','font-size':'80%'})
$('#rs_dark2').css({'position':'absolute','right':'2px','top':'50px','background-color':'white','border-radius':'4px','color':'black','border':'2px solid #682847',
'padding':'2px 12px','font-size':'80%'})

$('#display3').append('<div id="slider-dark" ></div>');
 $('#display3').append('<div id="slider-dark2" ></div>');
$("#slider-dark").append('<input class="bar" type="range" id="free_dark" step ="1" min="40" max="220" value="130"></input>')
$("#slider-dark2").append('<input class="bar" type="range" id="free_dark2" step ="1" min="40" max="220" value="130"></input>')
$("#slider-dark").css({'position':'absolute','left':'10%','right':'60%','top':'55px'})
  $("#slider-dark2").css({'position':'absolute','left':'60%','right':'10%','top':'55px'})

  var text_dark = 
`DARKNESS`;
  $('#display3').append('<p id=text3></p>');
  $('#text3').text(text_dark)
  //$('#text').center()
  $('#text3').css({'position':'absolute','left':'48%','top':'50px'})

// ending of darkness
// Starting NUMBER - change from buttons to the sliders
$('#display4').append('<button id="ig_number">Ignore</button>');
  $('#display4').append('<button id="rs_number">Reset</button>');

  $('#rs_number').hide();
  $('#rs_number').click(function(){
    ig_number_check = 0;
    $('#slider-number').show();
    $('#ig_number').show();
    $('#rs_number').hide();
  }) 

  $('#ig_number').click(function(){
    ig_number_check = 1;
    $('#slider-number').hide();
    $('#rs_number').show();
    $('#ig_number').hide();
  });

  $('#display4').append('<button id="ig_number2">Ignore</button>');
  $('#display4').append('<button id="rs_number2">Reset</button>');

  $('#rs_number2').hide();
  $('#rs_number2').click(function(){
    ig_number2_check = 0;
    $('#slider-number2').show();
    $('#ig_number2').show();
    $('#rs_number2').hide();
  }) 

  $('#ig_number2').click(function(){
    ig_number2_check = 1;
    $('#slider-number2').hide();
    $('#rs_number2').show();
    $('#ig_number2').hide();
  });

$('#ig_number').css({'position':'absolute','left':'2px','top':'75px','background-color':'white','border-radius':'4px','color':'black','border':'2px solid #682847',
'padding':'2px 12px','font-size':'80%'})
$('#rs_number').css({'position':'absolute','left':'2px','top':'75px','background-color':'white','border-radius':'4px','color':'black','border':'2px solid #682847',
'padding':'2px 12px','font-size':'80%'})
//,'background-color':'white','padding':'4px 6px',
   // 'border-radius':'3px','color':'black','border':'2px solid #682847','font-size':'100%','display':'none'
$('#ig_number2').css({'position':'absolute','right':'2px','top':'75px','background-color':'white','border-radius':'4px','color':'black','border':'2px solid #682847',
'padding':'2px 12px','font-size':'80%'})
$('#rs_number2').css({'position':'absolute','right':'2px','top':'75px','background-color':'white','border-radius':'4px','color':'black','border':'2px solid #682847',
'padding':'2px 12px','font-size':'80%'})

$('#display4').append('<div id="slider-number" ></div>');
 $('#display4').append('<div id="slider-number2" ></div>');
$("#slider-number").append('<input class="bar" type="range" id="free_number" step ="1" min="2" max="8" value="5"></input>')
$("#slider-number2").append('<input class="bar" type="range" id="free_number2" step ="1" min="2" max="8" value="5"></input>')
$("#slider-number").css({'position':'absolute','left':'10%','right':'60%','top':'80px'})
  $("#slider-number2").css({'position':'absolute','left':'60%','right':'10%','top':'80px'})

  var text_number = 
`NUMBER`;
  $('#display4').append('<p id=text4></p>');
  $('#text4').text(text_number)
  //$('#text').center()
  $('#text4').css({'position':'absolute','left':'48%','top':'75px'})
  // Ending of NUMBER


  var canvas1_html = "<canvas id='canvas1' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
  var canvas2_html = "<canvas id='canvas2' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
  var ctx1 = document.getElementById('canvas1').getContext('2d');
  var ctx2 = document.getElementById('canvas2').getContext('2d');

  //var free_cell_size = document.getElementById("free_size").value;
  //var free_cell_ratio = document.getElementById("free_ratio").value;
  var free_cell_dark = document.getElementById("free_dark").value;
  var free_cell_number = document.getElementById("free_number").value;

  var free_cell_size = 35; // also not work
  var free_cell_ratio = 80;

  var free_cell_size2 = document.getElementById("free_size2").value;
  var free_cell_ratio2 = document.getElementById("free_ratio2").value;
  var free_cell_dark2 = document.getElementById("free_dark2").value;
  var free_cell_number2 = document.getElementById("free_number2").value;

  psiTurk.recordUnstructuredData("fk_test_size",free_cell_size);
  psiTurk.recordUnstructuredData("fk_test_ratio",free_cell_ratio);
  psiTurk.saveData();


    var height_left = free_cell_size / (free_cell_ratio/100)  // forget to change this...082719
    var width_left = free_cell_size * free_cell_ratio/100;
    var dark_left = free_cell_dark;
    var sub_locations = left_locations.slice(0,free_cell_number);

    sub_locations.forEach((loc,i) => {
     ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1] + height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
    })

    var height_left = free_cell_size2 / (free_cell_ratio2/100)
    var width_left = free_cell_size2 * free_cell_ratio2/100;
    var dark_left = free_cell_dark2;
    var sub_locations = right_locations.slice(0,free_cell_number2);

    sub_locations.forEach((loc,i) => {
     ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx2.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();

      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();
    })

  document.getElementById("free_size").addEventListener("input",function(){
    free_cell_size = document.getElementById("free_size").value
    free_cell_ratio = document.getElementById("free_ratio").value;
    free_cell_dark = document.getElementById("free_dark").value;
    free_cell_number = document.getElementById("free_number").value;

    free_cell_dark = 260 - free_cell_dark; // response to John 082919
    free_cell_ratio = 160 - free_cell_ratio;

     ctx1.clearRect(0,0,500,600);

    var height_left = free_cell_size / (free_cell_ratio/100);
    var width_left = free_cell_size * free_cell_ratio/100;
    var dark_left = free_cell_dark;
    var sub_locations = left_locations.slice(0,free_cell_number);

    sub_locations.forEach((loc,i) => {
     ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
    })
    
     
  });

document.getElementById("free_size2").addEventListener("input",function(){
    free_cell_size2 = document.getElementById("free_size2").value
    free_cell_ratio2 = document.getElementById("free_ratio2").value;
    free_cell_dark2 = document.getElementById("free_dark2").value;
    free_cell_number2 = document.getElementById("free_number2").value;

    free_cell_dark2 = 260 - free_cell_dark2; // response to John 082919
    free_cell_ratio2 = 160 - free_cell_ratio2;

     ctx2.clearRect(0,0,500,600);
/*
    ctx2.strokeStyle = 'black';
    ctx2.fillStyle = 'rgba(255,255,255,0.9)';
    ctx2.beginPath(); 
    ctx2.arc(250,300,dish_radius,0,2*Math.PI);
    ctx2.fill();
    ctx2.stroke();
*/
    var height_left = free_cell_size2 / (free_cell_ratio2/100);
    var width_left = free_cell_size2 * free_cell_ratio2/100;
    var dark_left = free_cell_dark2;
    var sub_locations = right_locations.slice(0,free_cell_number2);

    sub_locations.forEach((loc,i) => {
     ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx2.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();

      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();
    })

     
  });

  document.getElementById("free_ratio").addEventListener("input",function(){
    free_cell_ratio = document.getElementById("free_ratio").value;
    free_cell_size = document.getElementById("free_size").value;
    //var free_cell_size = 30;
    free_cell_dark = document.getElementById("free_dark").value;
    free_cell_number = document.getElementById("free_number").value;

    free_cell_dark = 260 - free_cell_dark; // response to John 082919
    free_cell_ratio = 160 - free_cell_ratio;

     ctx1.clearRect(0,0,500,600);
/*
    ctx1.strokeStyle = 'black';
    ctx1.fillStyle = 'rgba(255,255,255,0.9)';
    ctx1.beginPath();  
    ctx1.arc(250,300,dish_radius,0,2*Math.PI);
    ctx1.fill();
    ctx1.stroke();
*/
    var height_left = free_cell_size / (free_cell_ratio/100);
    var width_left = free_cell_size * free_cell_ratio/100;
    var dark_left = free_cell_dark;

    var sub_locations = left_locations.slice(0,free_cell_number);

     
    sub_locations.forEach((loc,i) => {
     ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
    })
   
    
  })

document.getElementById("free_ratio2").addEventListener("input",function(){
    free_cell_ratio2 = document.getElementById("free_ratio2").value;
    free_cell_size2 = document.getElementById("free_size2").value;
    free_cell_dark2 = document.getElementById("free_dark2").value;
    free_cell_number2 = document.getElementById("free_number2").value;

    free_cell_dark2 = 260 - free_cell_dark2; // response to John 082919
    free_cell_ratio2 = 160 - free_cell_ratio2;

     ctx2.clearRect(0,0,500,600);
/*
    ctx2.strokeStyle = 'black';
    ctx2.fillStyle = 'rgba(255,255,255,0.9)';
    ctx2.beginPath(); 
    ctx2.arc(250,300,dish_radius,0,2*Math.PI);
    ctx2.fill();
    ctx2.stroke();
*/
    var height_left = free_cell_size2 / (free_cell_ratio2/100);
    var width_left = free_cell_size2 * free_cell_ratio2/100;
    var dark_left = free_cell_dark2;

    var sub_locations = right_locations.slice(0,free_cell_number2);

     
    sub_locations.forEach((loc,i) => {
     ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx2.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();

      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();
    })
   

   
  })
//var locations = this.locations;
  document.getElementById("free_dark").addEventListener("input",function(){
    free_cell_dark = document.getElementById("free_dark").value
    free_cell_size = document.getElementById("free_size").value;
    //var free_cell_size = 30;
    free_cell_ratio = document.getElementById("free_ratio").value;
    free_cell_number = document.getElementById("free_number").value;

    free_cell_dark = 260 - free_cell_dark; // response to John 082919
    free_cell_ratio = 160 - free_cell_ratio;
   
     ctx1.clearRect(0,0,500,600);
/*
    ctx1.strokeStyle = 'black';
    ctx1.fillStyle = 'rgba(255,255,255,0.9)';
    ctx1.beginPath();  
    ctx1.arc(250,300,dish_radius,0,2*Math.PI);
    ctx1.fill();
    ctx1.stroke();
*/
    var height_left = free_cell_size / (free_cell_ratio/100);
    var width_left = free_cell_size * free_cell_ratio/100;
    var dark_left = free_cell_dark;
    //var loc = [250,300];
    var sub_locations = left_locations.slice(0,free_cell_number);

     
    sub_locations.forEach((loc,i) => {
     ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

     

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
    })

   
     
     
  });

document.getElementById("free_dark2").addEventListener("input",function(){
    free_cell_dark2 = document.getElementById("free_dark2").value
    free_cell_size2 = document.getElementById("free_size2").value;
    free_cell_ratio2 = document.getElementById("free_ratio2").value;
    free_cell_number2 = document.getElementById("free_number2").value;

    free_cell_dark2 = 260 - free_cell_dark2; // response to John 082919
    free_cell_ratio2 = 160 - free_cell_ratio2;
  
     ctx2.clearRect(0,0,500,600);

    var height_left = free_cell_size2 / (free_cell_ratio2/100);
    var width_left = free_cell_size2 * free_cell_ratio2/100;
    var dark_left = free_cell_dark2;
    //var loc = [250,300];
    var sub_locations = right_locations.slice(0,free_cell_number2);

    sub_locations.forEach((loc,i) => {
     ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx2.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();

      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();
    })
  });  
document.getElementById("free_number").addEventListener("input",function(){
    free_cell_dark = document.getElementById("free_dark").value
    free_cell_size = document.getElementById("free_size").value;
    free_cell_ratio = document.getElementById("free_ratio").value;
    free_cell_number = document.getElementById("free_number").value;

    free_cell_dark = 260 - free_cell_dark; // response to John 082919
    free_cell_ratio = 160 - free_cell_ratio;
  
     ctx1.clearRect(0,0,500,600);

    var height_left = free_cell_size / (free_cell_ratio/100);
    var width_left = free_cell_size * free_cell_ratio/100;
    var dark_left = free_cell_dark;
    //var loc = [250,300];
    var sub_locations = left_locations.slice(0,free_cell_number);

    sub_locations.forEach((loc,i) => {
     ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
    })
  });  
document.getElementById("free_number2").addEventListener("input",function(){
    free_cell_dark2 = document.getElementById("free_dark2").value
    free_cell_size2 = document.getElementById("free_size2").value;
    free_cell_ratio2 = document.getElementById("free_ratio2").value;
    free_cell_number2 = document.getElementById("free_number2").value;

    free_cell_dark2 = 260 - free_cell_dark2; // response to John 082919
    free_cell_ratio2 = 160 - free_cell_ratio2;
  
     ctx2.clearRect(0,0,500,600);

    var height_left = free_cell_size2 / (free_cell_ratio2/100);
    var width_left = free_cell_size2 * free_cell_ratio2/100;
    var dark_left = free_cell_dark2;
    //var loc = [250,300];
    var sub_locations = right_locations.slice(0,free_cell_number2);

    sub_locations.forEach((loc,i) => {
     ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx2.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();

      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();
    })
  });  

  $('body').append('<button id="continue">Continue</button>');
  $('body').append('<button id="back">Back</button>');
  //$('#continue').center()
  //$('#continue').center();
  //$('#continue').css({'top':'90%','background-color':'white','padding':'12px 28px','right':'5%',
  //  'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%','display':'none'})
  $('#continue').css({'position':'absolute','top':'85%','right':'1%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%','display':'none'})
  //avadu

  var double_check = 
`
Now you can double check the specimen you made. 
Click on Revise button to make modification, and click on Continue button to enter the next question.
`
  $('body').append('<p id=double></p>');
  $('#double').text(double_check)
  $('#double').center()
  $('#double').css({'position':'absolute', 'top':'90%','width':'60%','display':'none'})
  $('#double').css('font-size', '120%')
  //$('#continue').css({'position':'absolute','top':'6%','right':'3%','background-color':'white','padding':'6px 28px',
    //'border-radius':'4px','color':'black','border':'2px solid #682847','font-size':'130%','display':'none'})


  $('#continue').click(next_main_state)

  $('#back').css({'position':'absolute','left':'3%','top':'6%','background-color':'white','padding':'6px 28px',
    'border-radius':'4px','color':'black','border':'2px solid #682847','font-size':'130%'})
  $('#back').click(last_main_state) 

  $('body').append('<button id="confirm">Confirm</button>');
  $('body').append('<button id="revise">Revise</button>');
  $('#confirm').center();
  $('#revise').center();
  $('#confirm').css({'top':'10%','background-color':'white','padding':'6px 28px',
    'border-radius':'4px','color':'black','border':'2px solid #e07b16','font-size':'130%'})
  $('#revise').css({'top':'10%','background-color':'white','padding':'6px 28px',
    'border-radius':'4px','color':'black','border':'2px solid #e07b16','font-size':'130%','display':'none'})
switch(q_number){
  case 1:
  var Hint_text = `Reminder: Good, Azolitis`;
  $('body').append('<p id=text_h></p>'); 
  $('#text_h').text(Hint_text);
  $('#text_h').center();
  $('#text_h').css({'top':'3%','font-size':'150%','background-color':'#ffd966'});
  break;
  case 2:
  var Hint_text = `Reminder: Good, Leporidis`;
  $('body').append('<p id=text_h></p>'); 
  $('#text_h').text(Hint_text);
  $('#text_h').center();
  $('#text_h').css({'top':'3%','font-size':'150%','background-color':'#ffd966'});
  break;
  case 3:
  var Hint_text = `Reminder: Typical, Azolitis`;
  $('body').append('<p id=text_h></p>'); 
  $('#text_h').text(Hint_text);
  $('#text_h').center();
  $('#text_h').css({'top':'3%','font-size':'150%','background-color':'#ffd966'});
  break;
  case 4:
  var Hint_text = `Reminder: Typical, Leporidis`;
  $('body').append('<p id=text_h></p>'); 
  $('#text_h').text(Hint_text);
  $('#text_h').center();
  $('#text_h').css({'top':'3%','font-size':'150%','background-color':'#ffd966'});
  break;
  case 5:
  var Hint_text = `Reminder: Early, Azolitis`;
  $('body').append('<p id=text_h></p>'); 
  $('#text_h').text(Hint_text);
  $('#text_h').center();
  $('#text_h').css({'top':'3%','font-size':'150%','background-color':'#ffd966'});
  break;
  case 6:
  var Hint_text = `Reminder: Early, Leporidis`;
  $('body').append('<p id=text_h></p>'); 
  $('#text_h').text(Hint_text);
  $('#text_h').center();
  $('#text_h').css({'top':'3%','font-size':'150%','background-color':'#ffd966'});
  break;
  case 7:
  var Hint_text = `Reminder: Terminal, Azolitis`;
  $('body').append('<p id=text_h></p>'); 
  $('#text_h').text(Hint_text);
  $('#text_h').center();
  $('#text_h').css({'top':'3%','font-size':'150%','background-color':'#ffd966'});
  break;
  case 8:
  var Hint_text = `Reminder: Terminal, Leporidis`;
  $('body').append('<p id=text_h></p>'); 
  $('#text_h').text(Hint_text);
  $('#text_h').center();
  $('#text_h').css({'top':'3%','font-size':'150%','background-color':'#ffd966'});
  break;
  case 9:
  var Hint_text = `Reminder: Teaching, Azolitis`;
  $('body').append('<p id=text_h></p>'); 
  $('#text_h').text(Hint_text);
  $('#text_h').center();
  $('#text_h').css({'top':'3%','font-size':'150%','background-color':'#ffd966'});
  break;
  case 10:
  var Hint_text = `Reminder: Teaching, Leporidis`;
  $('body').append('<p id=text_h></p>'); 
  $('#text_h').text(Hint_text);
  $('#text_h').center();
  $('#text_h').css({'top':'3%','font-size':'150%','background-color':'#ffd966'});
  break;
// 11 for practice
  case 11:
  var Hint_text = `Practice`;
  $('body').append('<p id=text_h></p>'); 
  $('#text_h').text(Hint_text);
  $('#text_h').center();
  $('#text_h').css({'top':'3%','font-size':'150%','background-color':'#ffd966'});
  break;
// 12-13 for attention checks (w/ feedback)
  case 12:
  var Hint_text = `Reminder:3 in Spleen & Ignore`;
  $('body').append('<p id=text_h></p>'); 
  $('#text_h').text(Hint_text);
  $('#text_h').center();
  $('#text_h').css({'top':'3%','font-size':'150%','background-color':'#ffd966'});
  break;
  case 13:
  var Hint_text = `Reminder: Large in Kidney & Ignore`;
  $('body').append('<p id=text_h></p>'); 
  $('#text_h').text(Hint_text);
  $('#text_h').center();
  $('#text_h').css({'top':'3%','font-size':'150%','background-color':'#ffd966'});
  break;
  // 14-19 for attention checks (without feedback)
  case 14:
  var Hint_text = `Reminder:Darker in Spleen & Ignore`;
  $('body').append('<p id=text_h></p>'); 
  $('#text_h').text(Hint_text);
  $('#text_h').center();
  $('#text_h').css({'top':'3%','font-size':'150%','background-color':'#ffd966'});
  break;
  case 15:
  var Hint_text = `Reminder:7 in Kidney & Ignore`;
  $('body').append('<p id=text_h></p>'); 
  $('#text_h').text(Hint_text);
  $('#text_h').center();
  $('#text_h').css({'top':'3%','font-size':'150%','background-color':'#ffd966'});
  break;
  case 16:
  var Hint_text = `Reminder:More Elong. in Kidney & Ignore`;
  $('body').append('<p id=text_h></p>'); 
  $('#text_h').text(Hint_text);
  $('#text_h').center();
  $('#text_h').css({'top':'3%','font-size':'150%','background-color':'#ffd966'});
  break;
  case 17:
  var Hint_text = `Reminder:Larger, darker in Spleen & Ignore`;
  $('body').append('<p id=text_h></p>'); 
  $('#text_h').text(Hint_text);
  $('#text_h').center();
  $('#text_h').css({'top':'3%','font-size':'150%','background-color':'#ffd966'});
  break;
  // 12-13 for attention checks (w/ feedback)
  case 18:
  var Hint_text = `Reminder:2 in both & Ignore`;
  $('body').append('<p id=text_h></p>'); 
  $('#text_h').text(Hint_text);
  $('#text_h').center();
  $('#text_h').css({'top':'3%','font-size':'150%','background-color':'#ffd966'});
  break;
  case 19 :
  var Hint_text = `Reminder:5 in both & Ignore`;
  $('body').append('<p id=text_h></p>'); 
  $('#text_h').text(Hint_text);
  $('#text_h').center();
  $('#text_h').css({'top':'3%','font-size':'150%','background-color':'#ffd966'});
  break;

}
  switch(q_number){

    case 1:
    $('#confirm').click(function(){
    resizeWinTo();
  
    psiTurk.recordUnstructuredData("left_ig_size1",ig_size_check);
    psiTurk.recordUnstructuredData("right_ig_size1",ig_size2_check);
    psiTurk.recordUnstructuredData("left_ig_ratio1",ig_ratio_check);
    psiTurk.recordUnstructuredData("right_ig_ratio1",ig_ratio2_check);
    psiTurk.recordUnstructuredData("left_ig_dark1",ig_dark_check);
    psiTurk.recordUnstructuredData("right_ig_dark1",ig_dark2_check);
    psiTurk.recordUnstructuredData("left_ig_number1",ig_number_check);
    psiTurk.recordUnstructuredData("right_ig_number1",ig_number2_check);

    psiTurk.recordUnstructuredData("left_size1",free_cell_size);
    psiTurk.recordUnstructuredData("left_ratio1",free_cell_ratio);
    psiTurk.recordUnstructuredData("left_dark1",free_cell_dark);
    psiTurk.recordUnstructuredData("right_size1",free_cell_size2);
    psiTurk.recordUnstructuredData("right_ratio1",free_cell_ratio2);
    psiTurk.recordUnstructuredData("right_dark1",free_cell_dark2);

    psiTurk.recordUnstructuredData("left_number1",free_cell_number);
    psiTurk.recordUnstructuredData("right_number1",free_cell_number2);

    psiTurk.saveData();

    $('#confirm').hide();
    $('#back').hide();
    $('#continue').show();
    $('#double').show();
    $('#revise').show();
    $('#display1').hide();  // "hide" works perfectly
    $('#display2').hide(); 
    $('#display3').hide(); 
    $('#display4').hide(); 

  });
    
    break;
    case 2:
    $('#confirm').click(function(){
      resizeWinTo();
  
    psiTurk.recordUnstructuredData("left_ig_size2",ig_size_check);
    psiTurk.recordUnstructuredData("right_ig_size2",ig_size2_check);
    psiTurk.recordUnstructuredData("left_ig_ratio2",ig_ratio_check);
    psiTurk.recordUnstructuredData("right_ig_ratio2",ig_ratio2_check);
    psiTurk.recordUnstructuredData("left_ig_dark2",ig_dark_check);
    psiTurk.recordUnstructuredData("right_ig_dark2",ig_dark2_check);
    psiTurk.recordUnstructuredData("left_ig_number2",ig_number_check);
    psiTurk.recordUnstructuredData("right_ig_number2",ig_number2_check);

    psiTurk.recordUnstructuredData("left_size2",free_cell_size);
    psiTurk.recordUnstructuredData("left_ratio2",free_cell_ratio);
    psiTurk.recordUnstructuredData("left_dark2",free_cell_dark);
    psiTurk.recordUnstructuredData("right_size2",free_cell_size2);
    psiTurk.recordUnstructuredData("right_ratio2",free_cell_ratio2);
    psiTurk.recordUnstructuredData("right_dark2",free_cell_dark2);

    psiTurk.recordUnstructuredData("left_number2",free_cell_number);
    psiTurk.recordUnstructuredData("right_number2",free_cell_number2);

    psiTurk.saveData();

    $('#confirm').hide();
    $('#back').hide();
    $('#continue').show();
    $('#double').show();
    $('#revise').show();
    $('#display1').hide(); 
    $('#display2').hide(); 
    $('#display3').hide(); 
    $('#display4').hide(); 

  });
  
    break;
    case 3:
    $('#confirm').click(function(){
      resizeWinTo();
  
    psiTurk.recordUnstructuredData("left_ig_size3",ig_size_check);
    psiTurk.recordUnstructuredData("right_ig_size3",ig_size2_check);
    psiTurk.recordUnstructuredData("left_ig_ratio3",ig_ratio_check);
    psiTurk.recordUnstructuredData("right_ig_ratio3",ig_ratio2_check);
    psiTurk.recordUnstructuredData("left_ig_dark3",ig_dark_check);
    psiTurk.recordUnstructuredData("right_ig_dark3",ig_dark2_check);
    psiTurk.recordUnstructuredData("left_ig_number3",ig_number_check);
    psiTurk.recordUnstructuredData("right_ig_number3",ig_number2_check);

    psiTurk.recordUnstructuredData("left_size3",free_cell_size);
    psiTurk.recordUnstructuredData("left_ratio3",free_cell_ratio);
    psiTurk.recordUnstructuredData("left_dark3",free_cell_dark);
    psiTurk.recordUnstructuredData("right_size3",free_cell_size2);
    psiTurk.recordUnstructuredData("right_ratio3",free_cell_ratio2);
    psiTurk.recordUnstructuredData("right_dark3",free_cell_dark2);

    psiTurk.recordUnstructuredData("left_number3",free_cell_number);
    psiTurk.recordUnstructuredData("right_number3",free_cell_number2);

    psiTurk.saveData();

    $('#confirm').hide();
    $('#back').hide();
    $('#continue').show();
    $('#double').show();
    $('#revise').show();
    $('#display1').hide();  
    $('#display2').hide(); 
    $('#display3').hide(); 
    $('#display4').hide(); 

  });
   
    break;
    case 4:
    $('#confirm').click(function(){
      resizeWinTo();
  
    psiTurk.recordUnstructuredData("left_ig_size4",ig_size_check);
    psiTurk.recordUnstructuredData("right_ig_size4",ig_size2_check);
    psiTurk.recordUnstructuredData("left_ig_ratio4",ig_ratio_check);
    psiTurk.recordUnstructuredData("right_ig_ratio4",ig_ratio2_check);
    psiTurk.recordUnstructuredData("left_ig_dark4",ig_dark_check);
    psiTurk.recordUnstructuredData("right_ig_dark4",ig_dark2_check);
    psiTurk.recordUnstructuredData("left_ig_number4",ig_number_check);
    psiTurk.recordUnstructuredData("right_ig_number4",ig_number2_check);

    psiTurk.recordUnstructuredData("left_size4",free_cell_size);
    psiTurk.recordUnstructuredData("left_ratio4",free_cell_ratio);
    psiTurk.recordUnstructuredData("left_dark4",free_cell_dark);
    psiTurk.recordUnstructuredData("right_size4",free_cell_size2);
    psiTurk.recordUnstructuredData("right_ratio4",free_cell_ratio2);
    psiTurk.recordUnstructuredData("right_dark4",free_cell_dark2);

    psiTurk.recordUnstructuredData("left_number4",free_cell_number);
    psiTurk.recordUnstructuredData("right_number4",free_cell_number2);

    psiTurk.saveData();

    $('#confirm').hide();
    $('#back').hide();
    $('#continue').show();
    $('#double').show();
    $('#revise').show();
    $('#display1').hide();  
    $('#display2').hide(); 
    $('#display3').hide(); 
    $('#display4').hide();

  });
   
    break;
    case 5:
    $('#confirm').click(function(){
      resizeWinTo();
  
    psiTurk.recordUnstructuredData("left_ig_size5",ig_size_check);
    psiTurk.recordUnstructuredData("right_ig_size5",ig_size2_check);
    psiTurk.recordUnstructuredData("left_ig_ratio5",ig_ratio_check);
    psiTurk.recordUnstructuredData("right_ig_ratio5",ig_ratio2_check);
    psiTurk.recordUnstructuredData("left_ig_dark5",ig_dark_check);
    psiTurk.recordUnstructuredData("right_ig_dark5",ig_dark2_check);
    psiTurk.recordUnstructuredData("left_ig_number5",ig_number_check);
    psiTurk.recordUnstructuredData("right_ig_number5",ig_number2_check);

    psiTurk.recordUnstructuredData("left_size5",free_cell_size);
    psiTurk.recordUnstructuredData("left_ratio5",free_cell_ratio);
    psiTurk.recordUnstructuredData("left_dark5",free_cell_dark);
    psiTurk.recordUnstructuredData("right_size5",free_cell_size2);
    psiTurk.recordUnstructuredData("right_ratio5",free_cell_ratio2);
    psiTurk.recordUnstructuredData("right_dark5",free_cell_dark2);

    psiTurk.recordUnstructuredData("left_number5",free_cell_number);
    psiTurk.recordUnstructuredData("right_number5",free_cell_number2);

    psiTurk.saveData();

    $('#confirm').hide();
    $('#back').hide();
    $('#continue').show();
    $('#double').show();
    $('#revise').show();
    $('#display1').hide();  
    $('#display2').hide(); 
    $('#display3').hide(); 
    $('#display4').hide();

  });
    
    break;
    case 6:
    $('#confirm').click(function(){
      resizeWinTo();
  
    psiTurk.recordUnstructuredData("left_ig_size6",ig_size_check);
    psiTurk.recordUnstructuredData("right_ig_size6",ig_size2_check);
    psiTurk.recordUnstructuredData("left_ig_ratio6",ig_ratio_check);
    psiTurk.recordUnstructuredData("right_ig_ratio6",ig_ratio2_check);
    psiTurk.recordUnstructuredData("left_ig_dark6",ig_dark_check);
    psiTurk.recordUnstructuredData("right_ig_dark6",ig_dark2_check);
    psiTurk.recordUnstructuredData("left_ig_number6",ig_number_check);
    psiTurk.recordUnstructuredData("right_ig_number6",ig_number2_check);

    psiTurk.recordUnstructuredData("left_size6",free_cell_size);
    psiTurk.recordUnstructuredData("left_ratio6",free_cell_ratio);
    psiTurk.recordUnstructuredData("left_dark6",free_cell_dark);
    psiTurk.recordUnstructuredData("right_size6",free_cell_size2);
    psiTurk.recordUnstructuredData("right_ratio6",free_cell_ratio2);
    psiTurk.recordUnstructuredData("right_dark6",free_cell_dark2);

    psiTurk.recordUnstructuredData("left_number6",free_cell_number);
    psiTurk.recordUnstructuredData("right_number6",free_cell_number2);

    psiTurk.saveData();

    $('#confirm').hide();
    $('#back').hide();
    $('#continue').show();
    $('#double').show();
    $('#revise').show();
    $('#display1').hide();  
    $('#display2').hide(); 
    $('#display3').hide(); 
    $('#display4').hide();

  });
   
    break;
    case 7:
    $('#confirm').click(function(){
      resizeWinTo();
  
    psiTurk.recordUnstructuredData("left_ig_size7",ig_size_check);
    psiTurk.recordUnstructuredData("right_ig_size7",ig_size2_check);
    psiTurk.recordUnstructuredData("left_ig_ratio7",ig_ratio_check);
    psiTurk.recordUnstructuredData("right_ig_ratio7",ig_ratio2_check);
    psiTurk.recordUnstructuredData("left_ig_dark7",ig_dark_check);
    psiTurk.recordUnstructuredData("right_ig_dark7",ig_dark2_check);
    psiTurk.recordUnstructuredData("left_ig_number7",ig_number_check);
    psiTurk.recordUnstructuredData("right_ig_number7",ig_number2_check);

    psiTurk.recordUnstructuredData("left_size7",free_cell_size);
    psiTurk.recordUnstructuredData("left_ratio7",free_cell_ratio);
    psiTurk.recordUnstructuredData("left_dark7",free_cell_dark);
    psiTurk.recordUnstructuredData("right_size7",free_cell_size2);
    psiTurk.recordUnstructuredData("right_ratio7",free_cell_ratio2);
    psiTurk.recordUnstructuredData("right_dark7",free_cell_dark2);

    psiTurk.recordUnstructuredData("left_number7",free_cell_number);
    psiTurk.recordUnstructuredData("right_number7",free_cell_number2);

    psiTurk.saveData();

    $('#confirm').hide();
    $('#back').hide();
    $('#continue').show();
    $('#double').show();
    $('#revise').show();
    $('#display1').hide();  
    $('#display2').hide(); 
    $('#display3').hide(); 
    $('#display4').hide();

  });
    
    break;
    case 8:
    $('#confirm').click(function(){
      resizeWinTo();
  
    psiTurk.recordUnstructuredData("left_ig_size8",ig_size_check);
    psiTurk.recordUnstructuredData("right_ig_size8",ig_size2_check);
    psiTurk.recordUnstructuredData("left_ig_ratio8",ig_ratio_check);
    psiTurk.recordUnstructuredData("right_ig_ratio8",ig_ratio2_check);
    psiTurk.recordUnstructuredData("left_ig_dark8",ig_dark_check);
    psiTurk.recordUnstructuredData("right_ig_dark8",ig_dark2_check);
    psiTurk.recordUnstructuredData("left_ig_number8",ig_number_check);
    psiTurk.recordUnstructuredData("right_ig_number8",ig_number2_check);

    psiTurk.recordUnstructuredData("left_size8",free_cell_size);
    psiTurk.recordUnstructuredData("left_ratio8",free_cell_ratio);
    psiTurk.recordUnstructuredData("left_dark8",free_cell_dark);
    psiTurk.recordUnstructuredData("right_size8",free_cell_size2);
    psiTurk.recordUnstructuredData("right_ratio8",free_cell_ratio2);
    psiTurk.recordUnstructuredData("right_dark8",free_cell_dark2);

    psiTurk.recordUnstructuredData("left_number8",free_cell_number);
    psiTurk.recordUnstructuredData("right_number8",free_cell_number2);

    psiTurk.saveData();

    $('#confirm').hide();
    $('#back').hide();
    $('#continue').show();
    $('#double').show();
    $('#revise').show();
    $('#display1').hide();  
    $('#display2').hide(); 
    $('#display3').hide(); 
    $('#display4').hide();

  });
    
    break;
    case 9:
    $('#confirm').click(function(){
      resizeWinTo();
  
    psiTurk.recordUnstructuredData("left_ig_size9",ig_size_check);
    psiTurk.recordUnstructuredData("right_ig_size9",ig_size2_check);
    psiTurk.recordUnstructuredData("left_ig_ratio9",ig_ratio_check);
    psiTurk.recordUnstructuredData("right_ig_ratio9",ig_ratio2_check);
    psiTurk.recordUnstructuredData("left_ig_dark9",ig_dark_check);
    psiTurk.recordUnstructuredData("right_ig_dark9",ig_dark2_check);
    psiTurk.recordUnstructuredData("left_ig_number9",ig_number_check);
    psiTurk.recordUnstructuredData("right_ig_number9",ig_number2_check);

    psiTurk.recordUnstructuredData("left_size9",free_cell_size);
    psiTurk.recordUnstructuredData("left_ratio9",free_cell_ratio);
    psiTurk.recordUnstructuredData("left_dark9",free_cell_dark);
    psiTurk.recordUnstructuredData("right_size9",free_cell_size2);
    psiTurk.recordUnstructuredData("right_ratio9",free_cell_ratio2);
    psiTurk.recordUnstructuredData("right_dark9",free_cell_dark2);

    psiTurk.recordUnstructuredData("left_number9",free_cell_number);
    psiTurk.recordUnstructuredData("right_number9",free_cell_number2);

    psiTurk.saveData();

    $('#confirm').hide();
    $('#back').hide();
    $('#continue').show();
    $('#double').show();
    $('#revise').show();
    $('#display1').hide();  
    $('#display2').hide(); 
    $('#display3').hide(); 
    $('#display4').hide();

  });
    
    break;
    case 10:
    $('#confirm').click(function(){
      resizeWinTo();
  
    psiTurk.recordUnstructuredData("left_ig_size10",ig_size_check);
    psiTurk.recordUnstructuredData("right_ig_size10",ig_size2_check);
    psiTurk.recordUnstructuredData("left_ig_ratio10",ig_ratio_check);
    psiTurk.recordUnstructuredData("right_ig_ratio10",ig_ratio2_check);
    psiTurk.recordUnstructuredData("left_ig_dark10",ig_dark_check);
    psiTurk.recordUnstructuredData("right_ig_dark10",ig_dark2_check);
    psiTurk.recordUnstructuredData("left_ig_number10",ig_number_check);
    psiTurk.recordUnstructuredData("right_ig_number10",ig_number2_check);

    psiTurk.recordUnstructuredData("left_size10",free_cell_size);
    psiTurk.recordUnstructuredData("left_ratio10",free_cell_ratio);
    psiTurk.recordUnstructuredData("left_dark10",free_cell_dark);
    psiTurk.recordUnstructuredData("right_size10",free_cell_size2);
    psiTurk.recordUnstructuredData("right_ratio10",free_cell_ratio2);
    psiTurk.recordUnstructuredData("right_dark10",free_cell_dark2);

    psiTurk.recordUnstructuredData("left_number10",free_cell_number);
    psiTurk.recordUnstructuredData("right_number10",free_cell_number2);

    psiTurk.saveData();

    $('#confirm').hide();
    $('#back').hide();
    $('#continue').show();
    $('#double').show();
    $('#revise').show();
    $('#display1').hide();  
    $('#display2').hide(); 
    $('#display3').hide(); 
    $('#display4').hide();

  });
    
    break;
    case 11:
    $('#confirm').click(function(){
      resizeWinTo();
  /*
    psiTurk.recordUnstructuredData("left_ig_size10",ig_size_check);
    psiTurk.recordUnstructuredData("right_ig_size10",ig_size2_check);
    psiTurk.recordUnstructuredData("left_ig_ratio10",ig_ratio_check);
    psiTurk.recordUnstructuredData("right_ig_ratio10",ig_ratio2_check);
    psiTurk.recordUnstructuredData("left_ig_dark10",ig_dark_check);
    psiTurk.recordUnstructuredData("right_ig_dark10",ig_dark2_check);
    psiTurk.recordUnstructuredData("left_ig_number10",ig_number_check);
    psiTurk.recordUnstructuredData("right_ig_number10",ig_number2_check);

    psiTurk.recordUnstructuredData("left_size10",free_cell_size);
    psiTurk.recordUnstructuredData("left_ratio10",free_cell_ratio);
    psiTurk.recordUnstructuredData("left_dark10",free_cell_dark);
    psiTurk.recordUnstructuredData("right_size10",free_cell_size2);
    psiTurk.recordUnstructuredData("right_ratio10",free_cell_ratio2);
    psiTurk.recordUnstructuredData("right_dark10",free_cell_dark2);

    psiTurk.recordUnstructuredData("left_number10",free_cell_number);
    psiTurk.recordUnstructuredData("right_number10",free_cell_number2);

    psiTurk.saveData();
*/
    $('#confirm').hide();
    $('#back').hide();
    $('#continue').show();
    $('#double').show();
    $('#revise').show();
    $('#display1').hide();  
    $('#display2').hide(); 
    $('#display3').hide(); 
    $('#display4').hide();
  
  
});
    break;
    case 12:
    $('#confirm').click(function(){
      resizeWinTo();

    atc_ig_size = ig_size_check;
    atc_ig_size2 = ig_size2_check;
    atc_ig_ratio = ig_ratio_check;
    atc_ig_ratio2 = ig_ratio2_check;
    atc_ig_dark = ig_dark_check;
    atc_ig_dark2 = ig_dark2_check;
    atc_ig_number = ig_number_check;
    atc_ig_number2 = ig_number2_check;
    atc_cell_number = free_cell_number;
  
    psiTurk.recordUnstructuredData("check_left_ig_size1",ig_size_check);
    psiTurk.recordUnstructuredData("check_right_ig_size1",ig_size2_check);
    psiTurk.recordUnstructuredData("check_left_ig_ratio1",ig_ratio_check);
    psiTurk.recordUnstructuredData("check_right_ig_ratio1",ig_ratio2_check);
    psiTurk.recordUnstructuredData("check_left_ig_dark1",ig_dark_check);
    psiTurk.recordUnstructuredData("check_right_ig_dark1",ig_dark2_check);
    psiTurk.recordUnstructuredData("check_left_ig_number1",ig_number_check);
    psiTurk.recordUnstructuredData("check_right_ig_number1",ig_number2_check);

    psiTurk.recordUnstructuredData("check_left_size1",free_cell_size);
    psiTurk.recordUnstructuredData("check_left_ratio1",free_cell_ratio);
    psiTurk.recordUnstructuredData("check_left_dark1",free_cell_dark);
    psiTurk.recordUnstructuredData("check_right_size1",free_cell_size2);
    psiTurk.recordUnstructuredData("check_right_ratio1",free_cell_ratio2);
    psiTurk.recordUnstructuredData("check_right_dark1",free_cell_dark2);

    psiTurk.recordUnstructuredData("check_left_number1",free_cell_number);
    psiTurk.recordUnstructuredData("check_right_number1",free_cell_number2);

    psiTurk.saveData();

    $('#confirm').hide();
    $('#back').hide();
    $('#continue').show();
    $('#double').show();
    $('#revise').show();
    $('#display1').hide();  
    $('#display2').hide(); 
    $('#display3').hide(); 
    $('#display4').hide();

  });
    break;
    case 13:
    $('#confirm').click(function(){
      resizeWinTo();

    atc_ig_size = ig_size_check;
    atc_ig_size2 = ig_size2_check;
    atc_ig_ratio = ig_ratio_check;
    atc_ig_ratio2 = ig_ratio2_check;
    atc_ig_dark = ig_dark_check;
    atc_ig_dark2 = ig_dark2_check;
    atc_ig_number = ig_number_check;
    atc_ig_number2 = ig_number2_check;
    atc_cell_size2 = free_cell_size2;
    
  
    psiTurk.recordUnstructuredData("check_left_ig_size2",ig_size_check);
    psiTurk.recordUnstructuredData("check_right_ig_size2",ig_size2_check);
    psiTurk.recordUnstructuredData("check_left_ig_ratio2",ig_ratio_check);
    psiTurk.recordUnstructuredData("check_right_ig_ratio2",ig_ratio2_check);
    psiTurk.recordUnstructuredData("check_left_ig_dark2",ig_dark_check);
    psiTurk.recordUnstructuredData("check_right_ig_dark2",ig_dark2_check);
    psiTurk.recordUnstructuredData("check_left_ig_number2",ig_number_check);
    psiTurk.recordUnstructuredData("check_right_ig_number2",ig_number2_check);

    psiTurk.recordUnstructuredData("check_left_size2",free_cell_size);
    psiTurk.recordUnstructuredData("check_left_ratio2",free_cell_ratio);
    psiTurk.recordUnstructuredData("check_left_dark2",free_cell_dark);
    psiTurk.recordUnstructuredData("check_right_size2",free_cell_size2);
    psiTurk.recordUnstructuredData("check_right_ratio2",free_cell_ratio2);
    psiTurk.recordUnstructuredData("check_right_dark2",free_cell_dark2);

    psiTurk.recordUnstructuredData("check_left_number2",free_cell_number);
    psiTurk.recordUnstructuredData("check_right_number2",free_cell_number2);

    psiTurk.saveData();

    $('#confirm').hide();
    $('#back').hide();
    $('#continue').show();
    $('#double').show();
    $('#revise').show();
    $('#display1').hide();  
    $('#display2').hide(); 
    $('#display3').hide(); 
    $('#display4').hide();

  });
    break;
    case 14:
    $('#confirm').click(function(){
      resizeWinTo();
  
    psiTurk.recordUnstructuredData("check_left_ig_size3",ig_size_check);
    psiTurk.recordUnstructuredData("check_right_ig_size3",ig_size2_check);
    psiTurk.recordUnstructuredData("check_left_ig_ratio3",ig_ratio_check);
    psiTurk.recordUnstructuredData("check_right_ig_ratio3",ig_ratio2_check);
    psiTurk.recordUnstructuredData("check_left_ig_dark3",ig_dark_check);
    psiTurk.recordUnstructuredData("check_right_ig_dark3",ig_dark2_check);
    psiTurk.recordUnstructuredData("check_left_ig_number3",ig_number_check);
    psiTurk.recordUnstructuredData("check_right_ig_number3",ig_number2_check);

    psiTurk.recordUnstructuredData("check_left_size3",free_cell_size);
    psiTurk.recordUnstructuredData("check_left_ratio3",free_cell_ratio);
    psiTurk.recordUnstructuredData("check_left_dark3",free_cell_dark);
    psiTurk.recordUnstructuredData("check_right_size3",free_cell_size2);
    psiTurk.recordUnstructuredData("check_right_ratio3",free_cell_ratio2);
    psiTurk.recordUnstructuredData("check_right_dark3",free_cell_dark2);

    psiTurk.recordUnstructuredData("check_left_number3",free_cell_number);
    psiTurk.recordUnstructuredData("check_right_number3",free_cell_number2);

    psiTurk.saveData();

    $('#confirm').hide();
    $('#back').hide();
    $('#continue').show();
    $('#double').show();
    $('#revise').show();
    $('#display1').hide();  
    $('#display2').hide(); 
    $('#display3').hide(); 
    $('#display4').hide();



  });
    
    break;
    case 15:
    $('#confirm').click(function(){
      resizeWinTo();
  
    psiTurk.recordUnstructuredData("check_left_ig_size4",ig_size_check);
    psiTurk.recordUnstructuredData("check_right_ig_size4",ig_size2_check);
    psiTurk.recordUnstructuredData("check_left_ig_ratio4",ig_ratio_check);
    psiTurk.recordUnstructuredData("check_right_ig_ratio4",ig_ratio2_check);
    psiTurk.recordUnstructuredData("check_left_ig_dark4",ig_dark_check);
    psiTurk.recordUnstructuredData("check_right_ig_dark4",ig_dark2_check);
    psiTurk.recordUnstructuredData("check_left_ig_number4",ig_number_check);
    psiTurk.recordUnstructuredData("check_right_ig_number4",ig_number2_check);

    psiTurk.recordUnstructuredData("check_left_size4",free_cell_size);
    psiTurk.recordUnstructuredData("check_left_ratio4",free_cell_ratio);
    psiTurk.recordUnstructuredData("check_left_dark4",free_cell_dark);
    psiTurk.recordUnstructuredData("check_right_size4",free_cell_size2);
    psiTurk.recordUnstructuredData("check_right_ratio4",free_cell_ratio2);
    psiTurk.recordUnstructuredData("check_right_dark4",free_cell_dark2);

    psiTurk.recordUnstructuredData("check_left_number4",free_cell_number);
    psiTurk.recordUnstructuredData("check_right_number4",free_cell_number2);

    psiTurk.saveData();

    $('#confirm').hide();
    $('#back').hide();
    $('#continue').show();
    $('#double').show();
    $('#revise').show();
    $('#display1').hide();  
    $('#display2').hide(); 
    $('#display3').hide();
    $('#display4').hide();
 


  });
    
    break;
    case 16:
    $('#confirm').click(function(){
      resizeWinTo();
  
    psiTurk.recordUnstructuredData("check_left_ig_size5",ig_size_check);
    psiTurk.recordUnstructuredData("check_right_ig_size5",ig_size2_check);
    psiTurk.recordUnstructuredData("check_left_ig_ratio5",ig_ratio_check);
    psiTurk.recordUnstructuredData("check_right_ig_ratio5",ig_ratio2_check);
    psiTurk.recordUnstructuredData("check_left_ig_dark5",ig_dark_check);
    psiTurk.recordUnstructuredData("check_right_ig_dark5",ig_dark2_check);
    psiTurk.recordUnstructuredData("check_left_ig_number5",ig_number_check);
    psiTurk.recordUnstructuredData("check_right_ig_number5",ig_number2_check);

    psiTurk.recordUnstructuredData("check_left_size5",free_cell_size);
    psiTurk.recordUnstructuredData("check_left_ratio5",free_cell_ratio);
    psiTurk.recordUnstructuredData("check_left_dark5",free_cell_dark);
    psiTurk.recordUnstructuredData("check_right_size5",free_cell_size2);
    psiTurk.recordUnstructuredData("check_right_ratio5",free_cell_ratio2);
    psiTurk.recordUnstructuredData("check_right_dark5",free_cell_dark2);

    psiTurk.recordUnstructuredData("check_left_number5",free_cell_number);
    psiTurk.recordUnstructuredData("check_right_number5",free_cell_number2);

    psiTurk.saveData();

    $('#confirm').hide();
    $('#back').hide();
    $('#continue').show();
    $('#double').show();
    $('#revise').show();
    $('#display1').hide();  
    $('#display2').hide(); 
    $('#display3').hide(); 
    $('#display4').hide();



  });
    
    break;
    case 17:
    $('#confirm').click(function(){
      resizeWinTo();
  
    psiTurk.recordUnstructuredData("check_left_ig_size6",ig_size_check);
    psiTurk.recordUnstructuredData("check_right_ig_size6",ig_size2_check);
    psiTurk.recordUnstructuredData("check_left_ig_ratio6",ig_ratio_check);
    psiTurk.recordUnstructuredData("check_right_ig_ratio6",ig_ratio2_check);
    psiTurk.recordUnstructuredData("check_left_ig_dark6",ig_dark_check);
    psiTurk.recordUnstructuredData("check_right_ig_dark6",ig_dark2_check);
    psiTurk.recordUnstructuredData("check_left_ig_number6",ig_number_check);
    psiTurk.recordUnstructuredData("check_right_ig_number6",ig_number2_check);

    psiTurk.recordUnstructuredData("check_left_size6",free_cell_size);
    psiTurk.recordUnstructuredData("check_left_ratio6",free_cell_ratio);
    psiTurk.recordUnstructuredData("check_left_dark6",free_cell_dark);
    psiTurk.recordUnstructuredData("check_right_size6",free_cell_size2);
    psiTurk.recordUnstructuredData("check_right_ratio6",free_cell_ratio2);
    psiTurk.recordUnstructuredData("check_right_dark6",free_cell_dark2);

    psiTurk.recordUnstructuredData("check_left_number6",free_cell_number);
    psiTurk.recordUnstructuredData("check_right_number6",free_cell_number2);

    psiTurk.saveData();

    $('#confirm').hide();
    $('#back').hide();
    $('#continue').show();
    $('#double').show();
    $('#revise').show();
    $('#display1').hide();  
    $('#display2').hide(); 
    $('#display3').hide(); 
    $('#display4').hide();



  });
    
    break;
    case 18:
    $('#confirm').click(function(){
      resizeWinTo();
  
    psiTurk.recordUnstructuredData("check_left_ig_size7",ig_size_check);
    psiTurk.recordUnstructuredData("check_right_ig_size7",ig_size2_check);
    psiTurk.recordUnstructuredData("check_left_ig_ratio7",ig_ratio_check);
    psiTurk.recordUnstructuredData("check_right_ig_ratio7",ig_ratio2_check);
    psiTurk.recordUnstructuredData("check_left_ig_dark7",ig_dark_check);
    psiTurk.recordUnstructuredData("check_right_ig_dark7",ig_dark2_check);
    psiTurk.recordUnstructuredData("check_left_ig_number7",ig_number_check);
    psiTurk.recordUnstructuredData("check_right_ig_number7",ig_number2_check);

    psiTurk.recordUnstructuredData("check_left_size7",free_cell_size);
    psiTurk.recordUnstructuredData("check_left_ratio7",free_cell_ratio);
    psiTurk.recordUnstructuredData("check_left_dark7",free_cell_dark);
    psiTurk.recordUnstructuredData("check_right_size7",free_cell_size2);
    psiTurk.recordUnstructuredData("check_right_ratio7",free_cell_ratio2);
    psiTurk.recordUnstructuredData("check_right_dark7",free_cell_dark2);

    psiTurk.recordUnstructuredData("check_left_number7",free_cell_number);
    psiTurk.recordUnstructuredData("check_right_number7",free_cell_number2);

    psiTurk.saveData();

    $('#confirm').hide();
    $('#back').hide();
    $('#continue').show();
    $('#double').show();
    $('#revise').show();
    $('#display1').hide();  
    $('#display2').hide(); 
    $('#display3').hide(); 
    $('#display4').hide();



  });
    
    break;
    case 19:
    $('#confirm').click(function(){
      resizeWinTo();
  
    psiTurk.recordUnstructuredData("check_left_ig_size8",ig_size_check);
    psiTurk.recordUnstructuredData("check_right_ig_size8",ig_size2_check);
    psiTurk.recordUnstructuredData("check_left_ig_ratio8",ig_ratio_check);
    psiTurk.recordUnstructuredData("check_right_ig_ratio8",ig_ratio2_check);
    psiTurk.recordUnstructuredData("check_left_ig_dark8",ig_dark_check);
    psiTurk.recordUnstructuredData("check_right_ig_dark8",ig_dark2_check);
    psiTurk.recordUnstructuredData("check_left_ig_number8",ig_number_check);
    psiTurk.recordUnstructuredData("check_right_ig_number8",ig_number2_check);

    psiTurk.recordUnstructuredData("check_left_size8",free_cell_size);
    psiTurk.recordUnstructuredData("check_left_ratio8",free_cell_ratio);
    psiTurk.recordUnstructuredData("check_left_dark8",free_cell_dark);
    psiTurk.recordUnstructuredData("check_right_size8",free_cell_size2);
    psiTurk.recordUnstructuredData("check_right_ratio8",free_cell_ratio2);
    psiTurk.recordUnstructuredData("check_right_dark8",free_cell_dark2);

    psiTurk.recordUnstructuredData("check_left_number8",free_cell_number);
    psiTurk.recordUnstructuredData("check_right_number8",free_cell_number2);

    psiTurk.saveData();

    $('#confirm').hide();
    $('#back').hide();
    $('#continue').show();
    $('#double').show();
    $('#revise').show();
    $('#display1').hide();  
    $('#display2').hide(); 
    $('#display3').hide(); 
    $('#display4').hide();



  });
    
    break;
}

$('#revise').click(function(){

resizeWinTo();
    $('#confirm').show();
    $('#back').show();
    $('#continue').hide();
    $('#double').hide();
    $('#revise').hide();
    $('#display1').show();  
    $('#display2').show(); 
    $('#display3').show(); 
    $('#display4').show(); 


  });

  

  var reconstruct_text = 
`In this reconstruction phase,\n
please adjust the sliders and buttons so that\n
the spinal cord is a good example of being infected by "Azolitis" virus`;
  $('#display0').append('<p id=text></p>');
  $('#text').text(reconstruct_text)
  //$('#text').center()
  $('#text').css({'margin-left':'333px', 'margin-top':'625px','margin-right':'329px'})


  }

// displays some text on the first screen
function welcome() {
  bgCanvas('#ffffff');
  //cur_main_state = 0;
  resizeWinTo();
  var welcome_text = 
`  \n\nWelcome to the experiment.\n
Please do not refresh this page as it will reset your progress.\n
If you'd like to stop during the HIT or if you have technical issues, 
please contact du.618@osu.edu to receive partial compensation.\n
You are free to change the size of this interface, 
just be prepared that the it will constantly resize to the default settings.\n
To view instructions for the task, click on the button.`;
  $('#displaydiv').css({'position':'absolute','top':'0%','height':'95%','width':'99.95%'});
  
  $('#displaydiv').append('<p id=text></p>');
  $('#displaydiv').append('<button id="continue">View task instructions</button>');

//$('#body').append('<p id=text></p>');
//$('#body').append('<button id="continue">View task instructions</button>');


  $('#text').text(welcome_text);
  $('#text').center()
 
  $('#text').css('font-size', '120%')
  $('#text').css({'width':'95%', 'height':'100%','white-space':'pre-wrap'})
  $('#text').css({'background-color':'white'})
  $('#continue').center()
  $('#continue').css({'top':'75%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);
}



// Tells the participants how to complete the experiment
var ill_left_locations = gen_mini_locations(5);
var ill_right_locations = gen_mini_locations(3);

function instructions() {

  var bf_instruction = Date.now();
  psiTurk.recordUnstructuredData("before_instruction",bf_instruction);
  psiTurk.saveData();

   miniCanvas();
  $('#displaydiv').remove();
resizeWinTo();
  //$('#displaydiv').append('<h2 id=text> <mark> Marked </mark> </p>');
  var instruct_text = 
`\n
This experiment investigates how people categorize biopsy specimens in an idealized medical-diagnosis task.\n
On each trial of the experiment, you will see a pair of images similar to photographs taken with an optical microscope under 200x magnification. We will refer to them as micrographs. The micrograph on the left always depicts a sample taken from the SPLEEN of a given patient, and the micrograph on the right always depicts a sample taken from the KIDNEY of the same patient.

`
 var instruct_text_2 = 
`
On each trial of the experiment, you will see a pair of images similar to photographs taken with an optical microscope under 200x magnification. We will refer to them as micrographs. The micrograph on the left always depicts a sample taken from the SPLEEN of a given patient, and the micrograph on the right always depicts a sample taken from the KIDNEY of the same patient.
`
  $('body').append('<div id="display0"></div>')
  $('#display0').append('<p id=text></p>');
  $('#display0').append('<p id=text2></p>');
  
  $('#text').text(instruct_text)
  $('#text').center()
  $('#text').css({'position':'absolute', 'top':'81%','width':'70%','line-height':'130%'})
  $('#text').css('font-size', '120%')
 // $('#text2').text(instruct_text_2)
  //$('#text2').center()
  //$('#text2').css({'position':'absolute', 'top':'88%','width':'70%','line-height':'130%'})
 // $('#text2').css('font-size', '120%')
  //$('#text').css({'width':'80%', 'height':'100%','white-space':'pre-wrap'})
  //$('#text').css({'background-color':'white'})
  
  //$('#continue').center()
  $('#display0').append('<button id="continue">Continue</button>');
  $('#continue').css({'position':'absolute','top':'85%','right':'1%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);

  //$('#back').center()
  $('#display0').append('<button id="back">Back</button>');
  $('#back').css({'position':'absolute','top':'85%','left':'1%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#back').click(back_welcome);

  var canvas1_html = "<canvas id='canvas1' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var canvas2_html = "<canvas id='canvas2' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var ctx1 = document.getElementById('canvas1').getContext('2d');
    var ctx2 = document.getElementById('canvas2').getContext('2d');

    var cell_dark_left = 60;
    var cell_dark_right = 160;
    var cell_size_left = 30/1.16;
    var cell_size_right = 40/1.16;
    var cell_ratio_left = 55;
    var cell_ratio_right = 80;
    var example_left_locations = ill_left_locations;
    var example_right_locations = ill_right_locations

    var height_left = cell_size_left;
    var width_left = cell_size_left * cell_ratio_left/100;
    var dark_left = cell_dark_left;
    

    example_left_locations.forEach((loc,i) => {
   

      ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();
      

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
    })

    var height_right = cell_size_right;
    var width_right = cell_size_right * cell_ratio_right/100;
    var dark_right = cell_dark_right;
    

    example_right_locations.forEach((loc,i) => {

    
      ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_right/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_right/2, loc[1] - height_right/2, // C1
        loc[0] + width_right/2, loc[1] + height_right/2, // C2
        loc[0], loc[1] + height_right/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_right/2, loc[1] + height_right/2, // C3
        loc[0] - width_right/2, loc[1] - height_right/2, // C4
        loc[0], loc[1] - height_right/2); // A1
      ctx2.fillStyle = "rgb(" + dark_right + "," + dark_right + "," + dark_right + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();
      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();
  })

}

function instructions_2() {
   miniCanvas();
  $('#displaydiv').remove();
resizeWinTo();
  //$('#displaydiv').append('<h2 id=text> <mark> Marked </mark> </p>');
  var instruct_text = 
`
It is very important to keep in mind that the pair of micrographs TOGETHER constitute one specimen\n – they are biopsy samples taken from the spleen and kidney of the SAME individual patient on the SAME day.
`
  $('body').append('<div id="display0"></div>')
  $('#display0').append('<p id=text></p>');
  
  //$('#display0').append('<h2 id=text> It is very important to keep in mind that the pair of micrographs <b>together</b> constitute one specimen – they are biopsy samples taken from the spleen and kidney of the same individual patient on the same day. </p>');
  
  $('#text').text(instruct_text)
  $('#text').center()
  $('#text').css({'position':'absolute', 'top':'80%','width':'60%'})
  $('#text').css('font-size', '120%')
  //$('#text').css({'width':'80%', 'height':'100%','white-space':'pre-wrap'})
  //$('#text').css({'background-color':'white'})
  
  //$('#continue').center()
  $('#display0').append('<button id="continue">Continue</button>');
  $('#continue').css({'position':'absolute','top':'85%','right':'5%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);

  //$('#back').center()
  $('#display0').append('<button id="back">Back</button>');
  $('#back').css({'position':'absolute','top':'85%','left':'5%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#back').click(back_instructions); 

  var canvas1_html = "<canvas id='canvas1' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var canvas2_html = "<canvas id='canvas2' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var ctx1 = document.getElementById('canvas1').getContext('2d');
    var ctx2 = document.getElementById('canvas2').getContext('2d');

    var cell_dark_left = 60;
    var cell_dark_right = 160;
    var cell_size_left = 30/1.16;
    var cell_size_right = 40/1.16;
    var cell_ratio_left = 55;
    var cell_ratio_right = 80;
    var example_left_locations = ill_left_locations;
    var example_right_locations = ill_right_locations

    var height_left = cell_size_left;
    var width_left = cell_size_left * cell_ratio_left/100;
    var dark_left = cell_dark_left;
    

    example_left_locations.forEach((loc,i) => {
   

      ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();
      

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
    })

    var height_right = cell_size_right;
    var width_right = cell_size_right * cell_ratio_right/100;
    var dark_right = cell_dark_right;
    

    example_right_locations.forEach((loc,i) => {

    
      ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_right/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_right/2, loc[1] - height_right/2, // C1
        loc[0] + width_right/2, loc[1] + height_right/2, // C2
        loc[0], loc[1] + height_right/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_right/2, loc[1] + height_right/2, // C3
        loc[0] - width_right/2, loc[1] - height_right/2, // C4
        loc[0], loc[1] - height_right/2); // A1
      ctx2.fillStyle = "rgb(" + dark_right + "," + dark_right + "," + dark_right + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();
      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();
  })

}


function illustration(){
 resizeWinTo();
 Cases();
 //blankCanvas();
  $('#displaydiv').remove();

  var illustration_text = 
`
There are two idealized diseases: “Azolitis” and “Leporidis”.  The specimen on each experimental trial is taken from a patient that has either Azolitis or Leporidis. Your job in the first part of the experiment is to make a diagnosis on the basis of the two micrographs and indicate your choice by pressing a key on the keyboard: “A” for Azolitis or “L” for Leporidis.
`
  $('body').append('<div id="display0"></div>')
  $('#display0').append('<p id=text></p>');
  $('#text').text(illustration_text)
  $('#text').center()
  $('#text').css({'position':'absolute', 'top':'83%','width':'60%'})
  $('#text').css('font-size', '120%')

  $('#display0').append('<button id="continue">Continue</button>');
  $('#continue').css({'position':'absolute','right':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);

  $('#display0').append('<button id="back">Back</button>');
  $('#back').css({'position':'absolute','left':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#back').click(back_instructions_2);


/*
    var canvas1_html = "<canvas id='canvas1' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var canvas2_html = "<canvas id='canvas2' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var ctx1 = document.getElementById('canvas1').getContext('2d');
    var ctx2 = document.getElementById('canvas2').getContext('2d');

    var cell_dark_left = 60;
    var cell_dark_right = 160;
    var cell_size_left = 30/1.16;
    var cell_size_right = 40/1.16;
    var cell_ratio_left = 55;
    var cell_ratio_right = 80;
    var example_left_locations = ill_left_locations;
    var example_right_locations = ill_right_locations

    var height_left = cell_size_left;
    var width_left = cell_size_left * cell_ratio_left/100;
    var dark_left = cell_dark_left;
    

    example_left_locations.forEach((loc,i) => {
   

      ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();
      

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
    })

    var height_right = cell_size_right;
    var width_right = cell_size_right * cell_ratio_right/100;
    var dark_right = cell_dark_right;
    

    example_right_locations.forEach((loc,i) => {

    
      ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_right/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_right/2, loc[1] - height_right/2, // C1
        loc[0] + width_right/2, loc[1] + height_right/2, // C2
        loc[0], loc[1] + height_right/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_right/2, loc[1] + height_right/2, // C3
        loc[0] - width_right/2, loc[1] - height_right/2, // C4
        loc[0], loc[1] - height_right/2); // A1
      ctx2.fillStyle = "rgb(" + dark_right + "," + dark_right + "," + dark_right + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();
      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();
  })
*/
    
  }

function illustration_2(){
  resizeWinTo();
  miniCanvas();
  $('#displaydiv').remove();

  var illustration_text = 
  `
As you can see, idealized fiber cells are visible in each micrograph. They vary in four attributes: number, size, elongation, and darkness.\n
The following pages provide some examples so that you can get used to recognizing each of these four attributes. 
`
  $('body').append('<div id="display0"></div>')
  $('#display0').append('<p id=text></p>');
  $('#text').text(illustration_text)
  $('#text').center()
  $('#text').css({'position':'absolute', 'top':'83%','width':'60%'})
  $('#text').css('font-size', '120%')

  $('#display0').append('<button id="continue">Continue</button>');
  $('#continue').css({'position':'absolute','right':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);

  $('#display0').append('<button id="back">Back</button>');
  $('#back').css({'position':'absolute','left':'5%','top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#back').click(back_illustration);



    var canvas1_html = "<canvas id='canvas1' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var canvas2_html = "<canvas id='canvas2' width=400 height=500 style='border:5px solid #ffffff'></canvas>";
    var ctx1 = document.getElementById('canvas1').getContext('2d');
    var ctx2 = document.getElementById('canvas2').getContext('2d');

    var cell_dark_left = 60;
    var cell_dark_right = 160;
    var cell_size_left = 30/1.16;
    var cell_size_right = 40/1.16;
    var cell_ratio_left = 55;
    var cell_ratio_right = 80;
    var example_left_locations = ill_left_locations;
    var example_right_locations = ill_right_locations

    var height_left = cell_size_left;
    var width_left = cell_size_left * cell_ratio_left/100;
    var dark_left = cell_dark_left;
    

    example_left_locations.forEach((loc,i) => {
   

      ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.strokeStyle ='black';
      ctx1.stroke();
      ctx1.fill();
      

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
    })

    var height_right = cell_size_right;
    var width_right = cell_size_right * cell_ratio_right/100;
    var dark_right = cell_dark_right;
    

    example_right_locations.forEach((loc,i) => {

    
      ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_right/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_right/2, loc[1] - height_right/2, // C1
        loc[0] + width_right/2, loc[1] + height_right/2, // C2
        loc[0], loc[1] + height_right/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_right/2, loc[1] + height_right/2, // C3
        loc[0] - width_right/2, loc[1] - height_right/2, // C4
        loc[0], loc[1] - height_right/2); // A1
      ctx2.fillStyle = "rgb(" + dark_right + "," + dark_right + "," + dark_right + ")";
      ctx2.strokeStyle ='black';
      ctx2.stroke();
      ctx2.fill();
      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();
  })

    
  }

function back_welcome(){
  cur_main_state = cur_main_state-1;
  welcome();
}

function back_instructions(){
  //$('body').append('<div id="displaydiv"></div>')
  //$('#displaydiv').css({'width':'1000px', 'height':'480px', 'text-align' : 'center'})
  cur_main_state = cur_main_state-1;
  example_state_id = 0;
  instructions();
}

function back_instructions_2(){
  //$('body').append('<div id="displaydiv"></div>')
  //$('#displaydiv').css({'width':'1000px', 'height':'480px', 'text-align' : 'center'})
  cur_main_state = cur_main_state-1;
  example_state_id = 0;
  instructions_2();
}

function back_illustration(){
  //$('body').append('<div id="displaydiv"></div>')
  //$('#displaydiv').css({'width':'1000px', 'height':'480px', 'text-align' : 'center'})
  cur_main_state = cur_main_state-1;
  example_state_id = 0;
  illustration();
}

function back_illustration_2(){
  //$('body').append('<div id="displaydiv"></div>')
  //$('#displaydiv').css({'width':'1000px', 'height':'480px', 'text-align' : 'center'})
  cur_main_state = cur_main_state-1;
  example_state_id = 0;
  illustration_2();
}

function back_example_number_1(){
  //$('body').append('<div id="displaydiv"></div>')
  //$('#displaydiv').css({'width':'1000px', 'height':'480px', 'text-align' : 'center'})
  cur_main_state = cur_main_state-1;
  example_state_id = 0;
  example_number_1();
}
function back_example_number_2(){
  //$('body').append('<div id="displaydiv"></div>')
  //$('#displaydiv').css({'width':'1000px', 'height':'480px', 'text-align' : 'center'})
  cur_main_state = cur_main_state-1;
  example_state_id = 0;
  example_number_2();
}
function back_example_number_3(){
  //$('body').append('<div id="displaydiv"></div>')
  //$('#displaydiv').css({'width':'1000px', 'height':'480px', 'text-align' : 'center'})
  cur_main_state = cur_main_state-1;
  example_state_id = 0;
  example_number_3();
}
function back_example_size_1(){
  //$('body').append('<div id="displaydiv"></div>')
  //$('#displaydiv').css({'width':'1000px', 'height':'480px', 'text-align' : 'center'})
  cur_main_state = cur_main_state-1;
  example_state_id = 0;
  example_size_1();
}
function back_example_size_2(){
  //$('body').append('<div id="displaydiv"></div>')
  //$('#displaydiv').css({'width':'1000px', 'height':'480px', 'text-align' : 'center'})
  cur_main_state = cur_main_state-1;
  example_state_id = 0;
  example_size_2();
}
function back_example_size_3(){
  //$('body').append('<div id="displaydiv"></div>')
  //$('#displaydiv').css({'width':'1000px', 'height':'480px', 'text-align' : 'center'})
  cur_main_state = cur_main_state-1;
  example_state_id = 0;
  example_size_3();
}
function back_example_ratio_1(){
  //$('body').append('<div id="displaydiv"></div>')
  //$('#displaydiv').css({'width':'1000px', 'height':'480px', 'text-align' : 'center'})
  cur_main_state = cur_main_state-1;
  example_state_id = 0;
  example_ratio_1();
}
function back_example_ratio_2(){
  //$('body').append('<div id="displaydiv"></div>')
  //$('#displaydiv').css({'width':'1000px', 'height':'480px', 'text-align' : 'center'})
  cur_main_state = cur_main_state-1;
  example_state_id = 0;
  example_ratio_2();
}
function back_example_ratio_3(){
  //$('body').append('<div id="displaydiv"></div>')
  //$('#displaydiv').css({'width':'1000px', 'height':'480px', 'text-align' : 'center'})
  cur_main_state = cur_main_state-1;
  example_state_id = 0;
  example_ratio_3();
}
function back_example_dark_1(){
  //$('body').append('<div id="displaydiv"></div>')
  //$('#displaydiv').css({'width':'1000px', 'height':'480px', 'text-align' : 'center'})
  cur_main_state = cur_main_state-1;
  example_state_id = 0;
  example_dark_1();
}
function back_example_dark_2(){
  //$('body').append('<div id="displaydiv"></div>')
  //$('#displaydiv').css({'width':'1000px', 'height':'480px', 'text-align' : 'center'})
  cur_main_state = cur_main_state-1;
  example_state_id = 0;
  example_dark_2();
}
function back_example_dark_3(){
  //$('body').append('<div id="displaydiv"></div>')
  //$('#displaydiv').css({'width':'1000px', 'height':'480px', 'text-align' : 'center'})
  cur_main_state = cur_main_state-1;
  example_state_id = 0;
  example_dark_3();
}


function pass_training() {
  resizeWinTo();
  bgCanvas('#ffffff');
  $('body').empty();
  var instruct_text = 
`
Congradulations! You have completed the first part of the experiment!
Click the Continue button to move on to the second (and final) part of the experiment.
`

var final_text = 
`
Click the Continue button to move on to the second (and final) part of the experiment.
`

  var image_emoji = "<img id = 'emoji' width=150 height = 150 src='static/images/Pass.png'></img>";
  
  
  
  
var image = "<img id = 'blankimage' src='static/images/blank.png'></img>";
$('body').append(image);
$('#blankimage').css({'position':'absolute','left':'2.5%','right':'5%','top':'0px','width':'95%','height':'100%'}) 
  
  //$('#emoji').css({'margin-top':'80px'})

  $('body').append('<p id=text_1></p>');
  $('body').append('<p id=text_2></p>');
  $('body').append('<button id="continue">Continue</button>');

  $('#text_1').text(instruct_text)
  //$('#text_2').text(final_text)

  //$('#text_1').css({'width':'95%', 'height':'100%','white-space':'pre-wrap'})
  //$('#text_1').css({'background-color':'white'})

  $('#text_1').css('font-size', '120%')
  //$('#text_2').css('font-size', '120%')
  $('body').append(image_emoji);
  $('#emoji').center();
  //$('#text_1').center()
  //$('#text_2').center()
  //$('#text').css({'background-color':'white'})
  $('#text_1').css({'position':'absolute','top':'63%','left':'20%','right':'18%'})
  //$('#text_2').css({'position':'absolute','top':'68%','left':'20%','right':'15%'})

  
  //$('#text').text(instruct_text)
  
  //$('#text').css({'width':'100%', 'white-space':'pre-wrap'})
  //$('#text').css({'background-color':'white'})
  $('#continue').center()
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);
}

function text_input(){
  $('body').empty()
  resizeWinTo();

  var instruct_text = 
`\n\n
Please write down a brief description of the diagnostic criteria that you used to differentiate Azolitis from Leporidis. 
One paragraph is ideal, but in the end, it is up to you.
`
  $('body').append('<p id=text></p>');
  $('#text').text(instruct_text)
  $('#text').css('font-size', '120%')
  $('#text').css({'position':'absolute','top':'30%','left':'20%','right':'20%'})
  
  $('body').append('<textarea id="textareabox" cols="70" rows="7" placeholder="Start here..."></textarea>')
  $('#textareabox').css({'position':'absolute','top':'45%','left':'20%','right':'15%'})
  
  $('body').append('<button id="continue">Finish</button>');
  $('#continue').center()
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  //$('#continue').click(next_main_state);
  $('#continue').click(getText);
  
}

function getText(){
  var text = document.getElementById("textareabox").value;
  text_response = text;
  psiTurk.recordUnstructuredData("text_response",text);
  psiTurk.saveData();
  next_main_state();
}
function slider_instruction() {
  blankCanvas();
  //cur_main_state = 1;
resizeWinTo();
  //$('#displaydiv').append('<h2 id=text> <mark> Marked </mark> </p>');
  var instruct_text = 
`\n\n
Now that you have become an expert in diagnosing Azolitis and Leporidis, your task in this part of the experiment is to construct example specimens that can be useful for teaching somebody else about these diseases. 
We have created an interface that allows you to modify the various attributes – the next page gives you an opportunity to practice using the interface. Your responses will not be recorded during practice.\n
Use the sliders to set the number, size, elongation, and darkness of the fiber cells in the SPLEEN sample and the KIDNEY sample, respectively.
To indicate that a particular attribute is irrelevant for diagnostic purposes, click the “Ignore” button next to the corresponding slider.
`
  $('#displaydiv').css({'position':'absolute','top':'0%','height':'600px'});
  $('#displaydiv').append('<p id=text></p>');
  
  
  $('#text').text(instruct_text)
  $('#text').center()
  $('#text').css('font-size', '120%')
  $('#text').css({'width':'80%', 'height':'100%','white-space':'pre-wrap'})
  $('#text').css({'background-color':'white'})
  
  //$('#continue').center()
  $('#displaydiv').append('<button id="continue">Practice using the interface</button>');
  $('#continue').center()
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);

  //$('#back').center()
  
}

function attention_start() {
  blankCanvas();
  resizeWinTo();
  var instruct_text = 
`\n\n
If you need more practice with the interface, feel free to click on the Back button get more practice.\n
Otherwise, please click on the Continue button to start the construction tasks - modify the various attributes in response to the requirements, and explicitly ignore the irrelevant ones.

`
  $('#displaydiv').css({'position':'absolute','top':'0%','height':'600px'});
  $('#displaydiv').append('<p id=text></p>');
  
  
  $('#text').text(instruct_text)
  $('#text').center()
  $('#text').css('font-size', '120%')
  $('#text').css({'width':'60%', 'height':'100%','white-space':'pre-wrap'})
  $('#text').css({'background-color':'white'})
  $('#displaydiv').append('<button id="continue">Continue</button>');
  $('#continue').center();
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);

  $('#displaydiv').append('<button id="back">Back</button>');
  $('#back').css({'position':'absolute','left':'5%','top':'80%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#back').click(last_main_state);
}

function slider_start() {
  blankCanvas();
  resizeWinTo();
  var instruct_text = 
`\n\n
This is the end of the practice session. 
As you know, the previous slides we asked you ignore most of the dimensions, but it’s just for practice purpose.\n 
Feel free not to ignore anything if you think everything is relevant on subsequent trials, it’s up to you to decide which dimensions are relevant, and which dimensions are to be ignored in any given case.

`
  $('#displaydiv').css({'position':'absolute','top':'0%','height':'600px'});
  $('#displaydiv').append('<p id=text></p>');
  
  
  $('#text').text(instruct_text)
  $('#text').center()
  $('#text').css('font-size', '120%')
  $('#text').css({'width':'60%', 'height':'100%','white-space':'pre-wrap'})
  $('#text').css({'background-color':'white'})
  $('#displaydiv').append('<button id="continue">Continue</button>');
  $('#continue').center();
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);

  //$('#displaydiv').append('<button id="back">Back</button>');
  //$('#back').css({'position':'absolute','left':'5%','top':'80%','background-color':'white','padding':'12px 28px',
  //  'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  //$('#back').click(last_main_state);
}

function Good_A() {
  resizeWinTo();
blankCanvas()
  var good_A = 
`It is up to you whether you want to use all sliders.
If you think some stimulus attributes are irrelevant for diagnostic purposes, click on the Ignore button next to the corresponding slider.
`;
  $('#displaydiv').append('<h2 id=text2> Please construct a specimen that is a <mark>good</mark> example of <mark>Azolitis</mark>. </p>');
  $('#displaydiv').append('<h2 id=text3> When you have a specimen that is a <mark>good</mark> example of <mark>Azolitis</mark>, click the "confirm" button. </p>');
  $('#displaydiv').append('<p id=text1></p>');
  
  $('#text1').text(good_A)
  $('#text1').css({'position':'absolute','top':'30%','left':'15%','right':'15%'})
  $('#text1').css({'font-size':'120%','line-height':'160%'})

  //$('#text2').center()
  $('#text2').css({'font-size': '120%','position':'absolute','left':'170px','right':'170px','top':'120px'})
  $('#text3').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'270px'})
  $('#text3').css({'line-height':'160%'})

  $('#displaydiv').append('<button id="continue">Continue</button>');
  $('#continue').center()
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);
}

function Good_L() {
  resizeWinTo();
blankCanvas()
  var good_L = 
`It is up to you whether you want to use all sliders.
If you think some stimulus attributes are irrelevant for diagnostic purposes, click on the Ignore button next to the corresponding slider.
`;
  $('#displaydiv').append('<h2 id=text2> Please construct a specimen that is a <mark>good</mark> example of <mark>Leporidis</mark>. </p>');
  $('#displaydiv').append('<h2 id=text3> When you have a specimen that is a <mark>good</mark> example of <mark>Leporidis</mark>, click the "confirm" button. </p>');
  $('#displaydiv').append('<p id=text1></p>');
  
  $('#text1').text(good_L)
  $('#text1').css({'position':'absolute','top':'30%','left':'15%','right':'15%'})
  $('#text1').css({'font-size':'120%','line-height':'160%'})

  //$('#text2').center()
  $('#text2').css({'font-size': '120%','position':'absolute','left':'170px','top':'120px'})
  $('#text3').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'270px'})
  $('#text3').css({'line-height':'160%'})

  $('#displaydiv').append('<button id="continue">Continue</button>');
  $('#continue').center()
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);
}

function Typical_A() {
  resizeWinTo();
blankCanvas()
  var typical_A = 
`It is up to you whether you want to use all sliders.
If you think some stimulus attributes are irrelevant for diagnostic purposes, click on the Ignore button next to the corresponding slider.
`;
  $('#displaydiv').append('<h2 id=text2> Please construct a specimen that is a <mark>typical</mark> example of <mark>Azolitis</mark>. </p>');
  $('#displaydiv').append('<h2 id=text3> When you have a specimen that is a <mark>typical</mark> example of <mark>Azolitis</mark>, click the "confirm" button. </p>');
  $('#displaydiv').append('<p id=text1></p>');
  
  $('#text1').text(typical_A)
  $('#text1').css({'position':'absolute','top':'30%','left':'15%','right':'15%'})
  $('#text1').css({'font-size':'120%','line-height':'160%'})

  //$('#text2').center()
  $('#text2').css({'font-size': '120%','position':'absolute','left':'170px','top':'120px'})
  $('#text3').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'270px'})
  $('#text3').css({'line-height':'160%'})

  $('#displaydiv').append('<button id="continue">Continue</button>');
  $('#continue').center()
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);
}

function Typical_L() {
  resizeWinTo();
blankCanvas()
  var typical_L = 
`It is up to you whether you want to use all sliders.
If you think some stimulus attributes are irrelevant for diagnostic purposes, click on the Ignore button next to the corresponding slider.
`;
  $('#displaydiv').append('<h2 id=text2> Please construct a specimen that is a <mark>typical</mark> example of <mark>Leporidis</mark>. </p>');
  $('#displaydiv').append('<h2 id=text3> When you have a specimen that is a <mark>typical</mark> example of <mark>Leporidis</mark>, click the "confirm" button. </p>');
  $('#displaydiv').append('<p id=text1></p>');
  
  $('#text1').text(typical_L)
  $('#text1').css({'position':'absolute','top':'30%','left':'15%','right':'15%'})
  $('#text1').css({'font-size':'120%','line-height':'160%'})

  //$('#text2').center()
  $('#text2').css({'font-size': '120%','position':'absolute','left':'170px','top':'120px'})
  $('#text3').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'270px'})
  $('#text3').css({'line-height':'160%'})


  $('#displaydiv').append('<button id="continue">Continue</button>');
  $('#continue').center()
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);
}


function Early_A() {
  resizeWinTo();
blankCanvas()
  var early_A = 
`It is up to you whether you want to use all sliders.
If you think some stimulus attributes are irrelevant for diagnostic purposes, click on the Ignore button next to the corresponding slider.
`;
  $('#displaydiv').append('<h2 id=text2> Please construct an example of what you think an <mark>early stage</mark> of <mark>Azolitis</mark> might look like. </p>');
  $('#displaydiv').append('<h2 id=text3> When you have an example of what you think an <mark>early stage</mark> of <mark>Azolitis</mark> might look like, click the "confirm" button. </p>');
  $('#displaydiv').append('<p id=text1></p>');
  
  $('#text1').text(early_A)
  $('#text1').css({'position':'absolute','top':'34%','left':'15%','right':'15%'})
  $('#text1').css({'font-size':'120%','line-height':'160%'})

  //$('#text2').center()
  $('#text2').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'120px'})
  $('#text3').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'290px'})
  $('#text3').css({'line-height':'160%'})
  $('#text2').css({'line-height':'160%'})

  $('#displaydiv').append('<button id="continue">Continue</button>');
  $('#continue').center()
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);
}

function Early_L() {
  resizeWinTo();
blankCanvas()
  var early_L = 
`It is up to you whether you want to use all sliders.
If you think some stimulus attributes are irrelevant for diagnostic purposes, click on the Ignore button next to the corresponding slider.
`;
  $('#displaydiv').append('<h2 id=text2> Please construct an example of what you think an <mark>early stage</mark> of <mark>Leporidis</mark> might look like. </p>');
  $('#displaydiv').append('<h2 id=text3> When you have an example of what you think an <mark>early stage</mark> of <mark>Leporidis</mark> might look like, click the "confirm" button. </p>');
  $('#displaydiv').append('<p id=text1></p>');
  
  $('#text1').text(early_L)
  $('#text1').css({'position':'absolute','top':'34%','left':'15%','right':'15%'})
  $('#text1').css({'font-size':'120%','line-height':'160%'})

  //$('#text2').center()
  $('#text2').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'120px'})
  $('#text3').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'290px'})
  $('#text3').css({'line-height':'160%'})
  $('#text2').css({'line-height':'160%'})

  $('#displaydiv').append('<button id="continue">Continue</button>');
  $('#continue').center()
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);
}

function Late_A() {
  resizeWinTo();
blankCanvas()
  var late_A = 
`It is up to you whether you want to use all sliders.
If you think some stimulus attributes are irrelevant for diagnostic purposes, click on the Ignore button next to the corresponding slider.
`;
  $('#displaydiv').append('<h2 id=text2> Please construct an example of what you think a <mark>very advanced, terminal stage</mark> of <mark>Azolitis</mark> might look like. </p>');
  $('#displaydiv').append('<h2 id=text3> When you have an example of what you think a <mark>very advanced, terminal stage</mark> of <mark>Azolitis</mark> might look like, click the "confirm" button. </p>');
  $('#displaydiv').append('<p id=text1></p>');
  
  $('#text1').text(late_A)
  $('#text1').css({'position':'absolute','top':'34%','left':'15%','right':'15%'})
  $('#text1').css({'font-size':'120%','line-height':'160%'})

  //$('#text2').center()
  $('#text2').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'120px'})
  $('#text3').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'290px'})
  $('#text3').css({'line-height':'160%'})
  $('#text2').css({'line-height':'160%'})

  $('#displaydiv').append('<button id="continue">Continue</button>');
  $('#continue').center()
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);
}

function Late_L() {
  resizeWinTo();
blankCanvas()
  var late_L = 
`It is up to you whether you want to use all sliders.
If you think some stimulus attributes are irrelevant for diagnostic purposes, click on the Ignore button next to the corresponding slider.
`;
  $('#displaydiv').append('<h2 id=text2> Please construct an example of what you think a <mark>very advanced, terminal stage</mark> of <mark>Leporidis</mark> might look like. </p>');
  $('#displaydiv').append('<h2 id=text3> When you have an example of what you think a <mark>very advanced, terminal stage</mark> of <mark>Leporidis</mark> might look like, click the "confirm" button. </p>');
  $('#displaydiv').append('<p id=text1></p>');
  
  $('#text1').text(late_L)
  $('#text1').css({'position':'absolute','top':'34%','left':'15%','right':'15%'})
  $('#text1').css({'font-size':'120%','line-height':'160%'})

  //$('#text2').center()
  $('#text2').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'120px'})
  $('#text3').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'290px'})
  $('#text3').css({'line-height':'160%'})
  $('#text2').css({'line-height':'160%'})

  $('#displaydiv').append('<button id="continue">Continue</button>');
  $('#continue').center()
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);
}

function Teaching_A() {
  resizeWinTo();
blankCanvas()
  var teaching_A = 
`It is up to you whether you want to use all sliders.
If you think some stimulus attributes are irrelevant for diagnostic purposes, click on the Ignore button next to the corresponding slider.
`;
  $('#displaydiv').append('<h2 id=text2> Please construct an example that would be good for <mark>teaching</mark> medical students how to diagnose <mark>Azolitis</mark>. </p>');
  $('#displaydiv').append('<h2 id=text3> When you have an example that is good for <mark>teaching</mark> medical students how to diagnose <mark>Azolitis</mark>, click the "confirm" button. </p>');
  $('#displaydiv').append('<p id=text1></p>');
  
  $('#text1').text(teaching_A)
  $('#text1').css({'position':'absolute','top':'34%','left':'15%','right':'15%'})
  $('#text1').css({'font-size':'120%','line-height':'160%'})

  //$('#text2').center()
  $('#text2').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'120px'})
  $('#text3').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'290px'})
  $('#text3').css({'line-height':'160%'})
  $('#text2').css({'line-height':'160%'})

  $('#displaydiv').append('<button id="continue">Continue</button>');
  $('#continue').center()
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);
}

function Teaching_L() {
  resizeWinTo();
blankCanvas()
  var teaching_L = 
`It is up to you whether you want to use all sliders.
If you think some stimulus attributes are irrelevant for diagnostic purposes, click on the Ignore button next to the corresponding slider.
`;
  $('#displaydiv').append('<h2 id=text2> Please construct an example that would be good for <mark>teaching</mark> medical students how to diagnose <mark>Leporidis</mark>. </p>');
  $('#displaydiv').append('<h2 id=text3> When you have an example that is good for <mark>teaching</mark> medical students how to diagnose <mark>Leporidis</mark>, click the "confirm" button. </p>');
  $('#displaydiv').append('<p id=text1></p>');
  
  $('#text1').text(teaching_L)
  $('#text1').css({'position':'absolute','top':'34%','left':'15%','right':'15%'})
  $('#text1').css({'font-size':'120%','line-height':'160%'})

  //$('#text2').center()
  $('#text2').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'120px'})
  $('#text3').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'290px'})
  $('#text3').css({'line-height':'160%'})
  $('#text2').css({'line-height':'160%'})

  $('#displaydiv').append('<button id="continue">Continue</button>');
  $('#continue').center()
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);
}

function attention_1() {
  resizeWinTo();
blankCanvas()
  var check_1 = 
`
If you think some stimulus attributes are irrelevant for diagnostic purposes, click on the Ignore button next to the corresponding slider.
`;
  $('#displaydiv').append('<h2 id=text2> Please construct a specimen that has <mark>3 cells in SPLEEN sample </mark>, and <mark> ignore the other seven sliders </mark>. </p>');
  $('#displaydiv').append('<h2 id=text3> When you are satisfied with your sample, click the "confirm" button. </p>');
  $('#text2').css({'font-size': '120%','position':'absolute','left':'170px','right':'170px','top':'120px'})
  $('#text3').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'270px'})
  $('#text2').css({'line-height':'160%'})
  $('#text3').css({'line-height':'160%'})

  $('#displaydiv').append('<button id="continue">Continue</button>');
  $('#continue').center()
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);
}

function attention_2() {
  resizeWinTo();
blankCanvas()
  var check_2 = 
`It is up to you whether you want to use all sliders.
If you think some stimulus attributes are irrelevant for diagnostic purposes, click on the Ignore button next to the corresponding slider.
`;
  $('#displaydiv').append('<h2 id=text2> Please construct a specimen that has <mark>large cells in KIDNEY sample. </mark> and <mark> ignore the other seven sliders </mark>. </p>');
  $('#displaydiv').append('<h2 id=text3> When you are satisfied with your sample, click the "confirm" button. </p>');
  $('#text2').css({'font-size': '120%','position':'absolute','left':'170px','right':'163px','top':'120px'})
  $('#text3').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'270px'})
  $('#text2').css({'line-height':'160%'})
  $('#text3').css({'line-height':'160%'})

  $('#displaydiv').append('<button id="continue">Continue</button>');
  $('#continue').center()
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);
}
function attention_3() {
  resizeWinTo();
blankCanvas()
  var check_1 = 
`
If you think some stimulus attributes are irrelevant for diagnostic purposes, click on the Ignore button next to the corresponding slider.
`;
  $('#displaydiv').append('<h2 id=text2> Please construct a specimen that has <mark>darker cells in SPLEEN sample</mark>(in comparison to KIDNEY sample), and <mark> ignore the irrelevant sliders </mark>. </p>');
  $('#displaydiv').append('<h2 id=text3> When you are satisfied with your sample, click the "confirm" button. </p>');
  $('#text2').css({'font-size': '120%','position':'absolute','left':'170px','right':'170px','top':'120px'})
  $('#text3').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'270px'})
  $('#text2').css({'line-height':'160%'})
  $('#text3').css({'line-height':'160%'})

  $('#displaydiv').append('<button id="continue">Continue</button>');
  $('#continue').center()
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);
}
function attention_4() {
  resizeWinTo();
blankCanvas()
  var check_1 = 
`
If you think some stimulus attributes are irrelevant for diagnostic purposes, click on the Ignore button next to the corresponding slider.
`;
  $('#displaydiv').append('<h2 id=text2> Please construct a specimen that has <mark>7 cells in KIDNEY sample </mark>, and <mark> ignore the other seven sliders </mark>. </p>');
  $('#displaydiv').append('<h2 id=text3> When you are satisfied with your sample, click the "confirm" button. </p>');
  $('#text2').css({'font-size': '120%','position':'absolute','left':'170px','right':'170px','top':'120px'})
  $('#text3').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'270px'})
  $('#text2').css({'line-height':'160%'})
  $('#text3').css({'line-height':'160%'})

  $('#displaydiv').append('<button id="continue">Continue</button>');
  $('#continue').center()
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);
}
function attention_5() {
  resizeWinTo();
blankCanvas()
  var check_1 = 
`
If you think some stimulus attributes are irrelevant for diagnostic purposes, click on the Ignore button next to the corresponding slider.
`;
  $('#displaydiv').append('<h2 id=text2> Please construct a specimen that has <mark>more elongated cells in KIDNEY sample</mark>(in comparison to SPLEEN sample), and <mark> ignore the other seven sliders </mark>. </p>');
  $('#displaydiv').append('<h2 id=text3> When you are satisfied with your sample, click the "confirm" button. </p>');
  $('#text2').css({'font-size': '120%','position':'absolute','left':'170px','right':'170px','top':'120px'})
  $('#text3').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'270px'})
  $('#text2').css({'line-height':'160%'})
  $('#text3').css({'line-height':'160%'})

  $('#displaydiv').append('<button id="continue">Continue</button>');
  $('#continue').center()
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);
}

function attention_6() {
  resizeWinTo();
blankCanvas()
  var check_1 = 
`
If you think some stimulus attributes are irrelevant for diagnostic purposes, click on the Ignore button next to the corresponding slider.
`;
  $('#displaydiv').append('<h2 id=text2> Please construct a specimen that has <mark>larger and darker cells in SPLEEN sample</mark>(in comparison to KIDNEY sample), and <mark> ignore the irrelevant sliders </mark>. </p>');
  $('#displaydiv').append('<h2 id=text3> When you are satisfied with your sample, click the "confirm" button. </p>');
  $('#text2').css({'font-size': '120%','position':'absolute','left':'170px','right':'170px','top':'120px'})
  $('#text3').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'270px'})
  $('#text2').css({'line-height':'160%'})
  $('#text3').css({'line-height':'160%'})

  $('#displaydiv').append('<button id="continue">Continue</button>');
  $('#continue').center()
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);
}

function attention_7() {
  resizeWinTo();
blankCanvas()
  var check_1 = 
`
If you think some stimulus attributes are irrelevant for diagnostic purposes, click on the Ignore button next to the corresponding slider.
`;
  $('#displaydiv').append('<h2 id=text2> Please construct a specimen that has <mark>2 cells in both samples</mark>, and <mark> ignore the irrelevant sliders </mark>. </p>');
  $('#displaydiv').append('<h2 id=text3> When you are satisfied with your sample, click the "confirm" button. </p>');
  $('#text2').css({'font-size': '120%','position':'absolute','left':'170px','right':'170px','top':'120px'})
  $('#text3').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'270px'})
  $('#text2').css({'line-height':'160%'})
  $('#text3').css({'line-height':'160%'})

  $('#displaydiv').append('<button id="continue">Continue</button>');
  $('#continue').center()
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);
}

function attention_8() {
  resizeWinTo();
blankCanvas()
  var check_1 = 
`
If you think some stimulus attributes are irrelevant for diagnostic purposes, click on the Ignore button next to the corresponding slider.
`;
  $('#displaydiv').append('<h2 id=text2> Please construct a specimen that has <mark>5 cells in both samples</mark>, and <mark> ignore the irrelevant sliders </mark>. </p>');
  $('#displaydiv').append('<h2 id=text3> When you are satisfied with your sample, click the "confirm" button. </p>');
  $('#text2').css({'font-size': '120%','position':'absolute','left':'170px','right':'170px','top':'120px'})
  $('#text3').css({'font-size': '120%','position':'absolute','left':'150px','right':'150px','top':'270px'})
  $('#text2').css({'line-height':'160%'})
  $('#text3').css({'line-height':'160%'})

  $('#displaydiv').append('<button id="continue">Continue</button>');
  $('#continue').center()
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(next_main_state);
}

var feedback_acc_1 = 0;
var feedback_acc_2 = 0;
var attention_acc_1 = 0;
var attention_acc_2 = 0;
var attention_acc_3 = 0;
var attention_acc_4 = 0;
var attention_acc_5 = 0;
var attention_acc_6 = 0;

function feedback_1(){
    resizeWinTo();
    blankCanvas();
    if (atc_ig_number === 0 && atc_ig_size === 1 && atc_ig_size2 === 1 && atc_ig_ratio === 1 &&
        atc_ig_ratio2 === 1 && atc_ig_dark === 1 && atc_ig_dark2 === 1 && atc_ig_number2 === 1){
      if (atc_cell_number === "3"){
        feedback_acc_1 = 1
        psiTurk.recordUnstructuredData("feedback_acc_1",feedback_acc_1);
        psiTurk.saveData();

        var feedback_text = 
        `Great job, your example fulfill the requirement!`;
        var image_emoji = "<img id = 'emoji' width=150 height = 150 src='static/images/Good.png'></img>";
      } else {
        var feedback_text = 
        `Sorry, your example does not fulfill the requirement. There should be three cells in the Spleen sample`;
        var image_emoji = "<img id = 'emoji' width=150 height = 150 src='static/images/Sorry.png'></img>";
      }
    }
    else {
      if (atc_cell_number === "3"){
        var feedback_text = 
        `Sorry, your example does not fulfill the requirement. Irrelevant dimensions should be ignored explicitly`;
        var image_emoji = "<img id = 'emoji' width=150 height = 150 src='static/images/Sorry.png'></img>";
      } else {
        var feedback_text = 
        `Sorry, your example does not fulfill the requirement. There should be THREE cells in the Spleen sample, also irrelevant dimensions should be ignored explicitly`;
        var image_emoji = "<img id = 'emoji' width=150 height = 150 src='static/images/Sorry.png'></img>";

      }
    }
  
    $('#displaydiv').append('<p id=text></p>');
    $('#displaydiv').append('<button id="continue">Continue</button>');
    $('#displaydiv').append(image_emoji);

    $('#emoji').center();
    
    $('#text').text(feedback_text)
    $('#text').css({'position':'absolute','left':'20%','right':'18%'})
    //$('#text').center()
    $('#text').css({'top':'68%','font-size':'150%'})
     $('#continue').css({'position':'absolute','top':'85%','right':'5%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
     $('#continue').click(next_main_state);
}

function feedback_2(){
    resizeWinTo();
    blankCanvas();
    if (atc_ig_number === 1 && atc_ig_size === 1 && atc_ig_size2 === 0 && atc_ig_ratio === 1 &&
        atc_ig_ratio2 === 1 && atc_ig_dark === 1 && atc_ig_dark2 === 1 && atc_ig_number2 === 1){
      if (atc_cell_size2 > 37){
        feedback_acc_2 = 1
        psiTurk.recordUnstructuredData("feedback_acc_2",feedback_acc_2);
        psiTurk.saveData();

        var feedback_text = 
        `Great job, your example fulfill the requirement!`;
        var image_emoji = "<img id = 'emoji' width=150 height = 150 src='static/images/Good.png'></img>";
      } else {
        var feedback_text = 
        `Sorry, your example does not fulfill the requirement. The cells in the Kidney sample are not large enough.`;
        var image_emoji = "<img id = 'emoji' width=150 height = 150 src='static/images/Sorry.png'></img>";
      }
    }
    else {
      if (atc_cell_size2 > 37){
        var feedback_text = 
        `Sorry, your example does not fulfill the requirement. Irrelevant dimensions should be ignored explicitly`;
        var image_emoji = "<img id = 'emoji' width=150 height = 150 src='static/images/Sorry.png'></img>";
      } else {
        var feedback_text = 
        `Sorry, your example does not fulfill the requirement. The cells in the Kidney sample are not large enough, also irrelevant dimensions should be ignored explicitly`;
        var image_emoji = "<img id = 'emoji' width=150 height = 150 src='static/images/Sorry.png'></img>";

      }
    }
  
    $('#displaydiv').append('<p id=text></p>');
    $('#displaydiv').append('<button id="continue">Continue</button>');
    $('#displaydiv').append(image_emoji);

    $('#emoji').center();
    
    $('#text').text(feedback_text)
    $('#text').css({'position':'absolute','left':'20%','right':'18%'})
    //$('#text').center()
    $('#text').css({'top':'68%','font-size':'150%'})
     $('#continue').css({'position':'absolute','top':'85%','right':'5%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
     $('#continue').click(next_main_state);
}


// Setting of the values in display
var e_dark_left = [];
var e_dark_right = [];
var e_size_left = [];
var e_size_right = [];
var e_ratio_left = [];
var e_ratio_right = [];
var e_number_right = [];
var e_number_left = [];

for (var i=0;i<12;i++){
  /*
     e_dark_left[i] = getRandomInt(min_dark,max_dark);
     e_dark_right[i] = getRandomInt(min_dark,max_dark);
     e_size_left[i] = getRandomInt(min_size,max_size);
     e_size_right[i] = getRandomInt(min_size,max_size);
     e_ratio_left[i] = getRandomInt(min_ratio,max_ratio);
     e_ratio_right[i] = getRandomInt(min_ratio,max_ratio);
     e_number_right[i] = getRandomInt(min_number,max_number);
     e_number_left[i] = getRandomInt(min_number,max_number);
     */
     // make the other three features constant in the example phase
     e_dark_left[i] = getRandomInt(min_dark,max_dark);
     e_dark_right[i] = e_dark_left[i];
     e_size_left[i] = getRandomInt(min_size,max_size);
     e_size_right[i] = e_size_left[i];
     e_ratio_left[i] = getRandomInt(min_ratio,max_ratio);
     e_ratio_right[i] = e_ratio_left[i];
     e_number_left[i] = getRandomInt(min_number,max_number);
     e_number_right[i] = e_number_left[i];

}
// NUMBER
/*
e_number_right[0] = 1;
e_number_left[0] = 1;
e_number_right[1] = 2;
e_number_left[1] = 2;
e_number_right[2] = 3;
e_number_left[2] = 3;
*/
e_number_right[0] = 2 + getRandomInt(0,2);
e_number_left[0] = e_number_right[0] + 2 + getRandomInt(0,2);
e_number_right[1] = 2 + getRandomInt(0,2);
e_number_left[1] = e_number_right[1] + 2 + getRandomInt(0,2);
e_number_left[2] = 2 + getRandomInt(0,2);
e_number_right[2] = e_number_left[2] + 2 + getRandomInt(0,2);

// SIZE
e_size_right[3] = 20 + getRandomInt(0,20);
e_size_left[3] = e_size_right[3] + 20 + getRandomInt(0,10);
e_size_left[4] = 20 + getRandomInt(0,20);
e_size_right[4] = e_size_left[4] + 20 + getRandomInt(0,10);
e_size_right[5] = 20 + getRandomInt(0,20);
e_size_left[5] = e_size_right[5] + 20 + getRandomInt(0,10);
// RATIO
e_ratio_left[6] = 55 + getRandomInt(0,20);
e_ratio_right[6] = e_ratio_left[6] + 10 + getRandomInt(0,20);
e_ratio_right[7] = 55 + getRandomInt(0,20);
e_ratio_left[7] = e_ratio_right[7] + 10 + getRandomInt(0,20);
e_ratio_right[8] = 55 + getRandomInt(0,20);
e_ratio_left[8] = e_ratio_right[8] + 10 + getRandomInt(0,20);
// DARKNESS
e_dark_left[9] = 50 + getRandomInt(0,60);
e_dark_right[9] = e_dark_left[9] + 40 + getRandomInt(0,50);
e_dark_left[10] = 50 + getRandomInt(0,60);
e_dark_right[10] = e_dark_left[10] + 40 + getRandomInt(0,50);
e_dark_right[11] = 50 + getRandomInt(0,60);
e_dark_left[11] = e_dark_right[11] + 40 + getRandomInt(0,50);

// LOCATIONS
var e1_left_locations = gen_rand_locations(e_number_left[0]);
var e2_left_locations = gen_rand_locations(e_number_left[1]);
var e3_left_locations = gen_rand_locations(e_number_left[2]);
var e4_left_locations = gen_rand_locations(e_number_left[3]);
var e5_left_locations = gen_rand_locations(e_number_left[4]);
var e6_left_locations = gen_rand_locations(e_number_left[5]);
var e7_left_locations = gen_rand_locations(e_number_left[6]);
var e8_left_locations = gen_rand_locations(e_number_left[7]);
var e9_left_locations = gen_rand_locations(e_number_left[8]);
var e10_left_locations = gen_rand_locations(e_number_left[9]);
var e11_left_locations = gen_rand_locations(e_number_left[10]);
var e12_left_locations = gen_rand_locations(e_number_left[11]);

var e1_right_locations = gen_rand_locations(e_number_right[0]);
var e2_right_locations = gen_rand_locations(e_number_right[1]);
var e3_right_locations = gen_rand_locations(e_number_right[2]);
var e4_right_locations = gen_rand_locations(e_number_right[3]);
var e5_right_locations = gen_rand_locations(e_number_right[4]);
var e6_right_locations = gen_rand_locations(e_number_right[5]);
var e7_right_locations = gen_rand_locations(e_number_right[6]);
var e8_right_locations = gen_rand_locations(e_number_right[7]);
var e9_right_locations = gen_rand_locations(e_number_right[8]);
var e10_right_locations = gen_rand_locations(e_number_right[9]);
var e11_right_locations = gen_rand_locations(e_number_right[10]);
var e12_right_locations = gen_rand_locations(e_number_right[11]);
//
var example_state_id = 0;
var example_feature_id = 0

/*
class Example_display{
  constructor(){

    this.cur_trial = 0;
    this.example_state = 0;
    this.trials_per_setsize = 2;

    this.start = () => {
      this.startTime = Date.now();
      //this.draw_sample();
      //this.example_instructions();
      this.next_example_state();
    }

    this.example_states = [
      
      //() => {this.example_number_1()},
      () => {this.example_number_2()},
      () => {this.example_number_3()},

      () => {this.example_size_1()},
      () => {this.example_size_2()},
      () => {this.example_size_3()},

      () => {this.example_ratio_1()},
      () => {this.example_ratio_2()},
      () => {this.example_ratio_3()},

      () => {this.example_dark_1()},
      () => {this.example_dark_2()},
      () => {this.example_dark_3()}

    ];


    this.next_example_state = () => {
      bgCanvas('#ffffff');

      // if the next state exists, do it
      if (this.example_states[example_state_id]) {
        this.example_states[example_state_id]()
        example_state_id++
      //otherwise, check if we have more trials
      } else {
          next_main_state(); 
        }
      }

      this.last_example_state = () => {
      bgCanvas('#ffffff');
      example_state_id--
      this.example_states[example_state_id-1]()


      }
    }

  example_instructions() {
   
    
    var example_text = 
`\n\n\n\n\n\n\n\n
Next you will see examples of the cell properties so you can get used to them\n
Click on the button to continue.
\n\n\n\n\n\n\n
`
  $('#displaydiv').css({'position':'absolute','top':'0%','height':'600px'});
  $('#displaydiv').append('<p id=text></p>');
  $('#displaydiv').append('<button id="continue">Continue</button>');
  $('#text').text(example_text)
  $('#text').center()
  $('#text').css('font-size', '120%')
  $('#text').css({'width':'100%', 'white-space':'pre-wrap'})
  $('#text').css({'background-color':'white'})
  $('#continue').center()
  $('#continue').css({'top':'85%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
  $('#continue').click(this.next_example_state);
  
  }
  */



  



/*
This is a class I use to help store data when I have multiple tasks with different fields.
It's probably overkill in the particular situation.

addFields is used to set up the header for each individual task.
recordData marks unused fields as NA, then sends the data to psiturk and saves it
*/
class DataManager {
  constructor() {
    this.fields = [];
  }

  addFields(newFields) {
    _.union(this.fields, newFields).forEach((i) => {
      this.fields.push(i);
    })
  }
  
  recordData(data) {
    var dataKeys = Object.keys(data);
    dataKeys.forEach((k) => {
      if (this.fields.indexOf(k) == -1) {
        throw 'Error: Key does not exist in fields.'
      }
    })
    
    var recData = {};
    this.fields.forEach((h) => {
      recData[h] = 'NA';
    })
    
    dataKeys.forEach((k) => {
      recData[k] = data[k];
    })
    
/*
    psiturk.recordTrialData(recData);
    psiturk.saveData(); // Consider if you want to save every trial
*/
    psiTurk.recordTrialData(recData);
    psiTurk.saveData(); // Consider if you want to save every trial

  }
}

class Learn_Task {
  constructor(max_trials){

    this.max_trials = max_trials - 1; // make it 0 indexed

    this.cur_acc = 0.5;

    this.cur_trial = 0;
    this.k_trial_state = 0;
    this.trials_per_setsize = max_trials;

    this.sample_time = 600; // in ms

    this.k_trial_states = [
      //() => {this.display_fixation(_.random(600,900))},
      () => {this.display_sample()},
     // () => {this.display_fixation(1000)},
     // () => {this.display_test()}
      () => {this.display_feedback()}

    ];


    
    
    var types = this.gen_types();
    //var colors = this.gen_rand_colors();
    
    /*
    var cell_size = this.gen_cell_size();  // updated to new generating method April.4th
    var cell_ratio = this.gen_cell_ratio();
    var cell_dark = this.gen_cell_dark();
   */

    var sudo_acc = this.gen_sudo_acc();




    // shuffle everything consistently
    var p = _.shuffle(_.range(this.max_trials+1));
    //trial_types = permute(trial_types, p);

    /*
    cell_size_left = permute(cell_size_left, p);
    cell_size_right = permute(cell_size_right, p);
    cell_ratio_left = permute(cell_ratio_left, p);
    cell_ratio_right = permute(cell_ratio_right, p);
    cell_dark_left = permute(cell_dark_left, p);
    cell_dark_right = permute(cell_dark_right, p);
*/
    types = permute(types, p);
    //locations[0] = permute(locations[0], p);
    //locations[1] = permute(locations[1], p);  
    //locations[2] = permute(locations[2], p);// trial_types
    //colors = permute(colors, p);
    /*
    cell_size[0] = permute(cell_size[0],p);
    cell_size[1] = permute(cell_size[1],p);
    cell_ratio[0] = permute(cell_ratio[0],p);
    cell_ratio[1] = permute(cell_ratio[1],p);  // small or large refers to the absolute values
    cell_dark[0] = permute(cell_dark[0],p);
    cell_dark[1] = permute(cell_dark[1],p);
    */


    this.trials = {//trial_types: trial_types,
                   //locations_left: locations[0],
                   //locations_right: locations[1],
                   trial_types: types,
                  // sample_colors: colors,
                   //foil_colors: locations[2],

                   //cell_number: cell_number,
                   //cell_size_small: cell_size[0],
                  // cell_size_large: cell_size[1],
                   //cell_ratio_small: cell_ratio[0],
                   //cell_ratio_large: cell_ratio[1],
                  // cell_dark_small: cell_dark[0],
                   //cell_dark_large: cell_dark[1],

                   sudo_acc:sudo_acc
                  };

    // TODO localize this
    // use new method to record data
    dm.addFields([//'Task',
                  'Trialtype',
                  //'SampleTime',
                  'RT',
                  //'CRESP',
                  'RESP',
                  'Correct',
                  'Accuracy',
                  
                  'Train_size_left',
                  'Train_ratio_left',
                  'Train_dark_left',
                  'Train_number_left',

                  'Train_size_right',
                  'Train_ratio_right',
                  'Train_dark_right',
                  'Train_number_right',

                  'Violate_feature',
                  
                  //'SetSize',
                  //'DisplayColor',
                  //'TestColor',
                  //'LocationPresentedX',
                  //'LocationPresentedY'
    ])


    this.start = () => {
      this.startTime = Date.now();
      var af_instruction = Date.now();
      this.k_instructions();

      psiTurk.recordUnstructuredData("after_instruction",af_instruction);
      psiTurk.saveData();
    }

    // manages the timing/trials
    this.next_k_trial_state = () => {
      bgCanvas('#ffffff');

      if (this.cur_acc >= 0.875 && this.cur_trial >= 23){
        var goodtogo = 1;
        psiTurk.recordUnstructuredData("Pass_Accuracy",this.cur_acc);
        psiTurk.recordUnstructuredData("Pass_Trial",this.cur_trial);
        psiTurk.saveData();
      } else {
        var goodtogo = 0;
      }

      // if the next state exists, do it
      if (this.k_trial_states[this.k_trial_state]) {
        this.k_trial_states[this.k_trial_state]()
        this.k_trial_state++
      //otherwise, check if we have more trials// CHANGE // check if the criteria is reached
      } else {
        if (this.cur_trial >= this.max_trials || goodtogo == 1) {
          next_main_state(); // if not, move on
        }
         else {
          // if we do, reset and run the next trial
          this.cur_trial++
          this.k_trial_state = 0;
          this.next_k_trial_state()
        
      }
    }  // line this.next_k_trial_state = () => {

  }
}
  gen_sudo_acc(){
    var sudo_acc =[];
    for(var j=0;j<this.trials_per_setsize;j++) {
        var temp_acc = 0.5;
        sudo_acc.push(temp_acc)
      }
   // }
    return sudo_acc
  }


  gen_types() {

    var trial_types = [];

      for(var j=0;j<this.trials_per_setsize;j++) {
        trial_types.push(j % 2)
      } 

return trial_types;

  }

  k_instructions() {
    resizeWinTo();
    var k_instruct_text = 
`\n\nOn each trial, your job is to decide whether the patient for this trial has "Azolitis" or "Leporidis" 
based on the number, size, darkness, and elongation of the cells in the spleen and in the kidney.\n
You may be tempted to look for a single property that by itself gives you the correct answer every time,
but this strategy is not guaranteed to work. 
However, the four properties together contain enough information to guarantee 100% correct diagnosis.\n
Indicate your diagnosis by pressing A (for Azolitis) or L (for Leporidis) on the keyboard.
The computer will then tell you whether your diagnosis was correct or incorrect.
After this feedback, press the space key to start the next training trial.
At first you will simply have to guess about the disease shown on each trial, 
but eventually you will learn how to categorize them.
` 
    $('#displaydiv').css({'position':'absolute','top':'0%','height':'95%','width':'99.95%'});
    $('#displaydiv').append('<p id=text></p>');
    $('#displaydiv').append('<button id="continue">Start Training</button>');
    $('#displaydiv').append('<button id="back">Review</button>');
    $('#text').text(k_instruct_text)
    $('#text').center()
    $('#text').css('font-size', '120%')
    $('#text').css({'width':'95%','height':'100%','white-space':'pre-wrap'})
    $('#text').css({'background-color':'white'})

    $('#continue').css({'position':'absolute','top':'85%','right':'5%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
    $('#continue').click(this.next_k_trial_state);
    $('#back').css({'position':'absolute','top':'85%','left':'5%','background-color':'white','padding':'12px 28px',
    'border-radius':'8px','color':'black','border':'2px solid #682847','font-size':'150%'})
    $('#back').click(back_example_dark_1);
    
  }

  //display_fixation(duration) {
  //  $('#displaydiv').append('<p id=text></p>');
  //  $('#text').text('+')
  //  $('#text').css('font-size', '300%')
  //  $('#text').center()
  //  timeout = setTimeout(this.next_k_trial_state, duration)
  //}

  display_sample() {
    //$('#displaydiv').append('<p id=text></p>');
    //$('#text').text('+')
    //$('#text').css('font-size', '300%')
    //$('#text').center()

    $('#displaydiv').center();
    $('body').append('<div id="display0"></div>')
    var reconstruct_text = 
`These samples were taken from the SAME patient on the SAME day. Please make a diagnosis and indicate your choice by pressing either "A" for Azolitis or "L" for Leporidis.`;
  $('body').append('<p id=text></p>');
  //$('#display0').css({'top':'500px'})
  $('#text').text(reconstruct_text)
  $('#text').css('font-size', '120%')
  //$('#text').center()
  $('#text').css({'position':'absolute','left':'10%','right':'10%','top':'80%'}) //'margin-top':'80%',

// feature values generating

    var cellSize_small = 0;
    var cellSize_large = 0;
    var cellRatio_small = 0;
    var cellRatio_large = 0;
    var cellDark_small = 0;
    var cellDark_large = 0;
    var cellNumber_small = 0;
    var cellNumber_large = 0;
/*
    $('#displaydiv').append('<p id=text_ps></p>');
    $('#displaydiv').append('<p id=text_pl></p>');
    $('#text_ps').text(cellNumber_small);
    $('#text_pl').text(cellNumber_large);
    $('#text_ps').css({'position':'absolute','top':'75%'});
    $('#text_pl').css({'position':'absolute','top':'78%'});
*/
if (exp_condition < 2.9){
    [cellSize_small,cellSize_large] = gen_feature_value(25,45,121,0.3,0,5);
    [cellRatio_small,cellRatio_large] = gen_feature_value(60,100,121,0.3,0,10);
    [cellDark_small,cellDark_large] = gen_feature_value(70,190,121,0.3,0,30);
    [cellNumber_small,cellNumber_large] = gen_feature_value(3,7,5,0.3,0,1);
} else {
    [cellSize_small,cellSize_large] = [30,40];
    [cellRatio_small,cellRatio_large] = [70,90];
    [cellDark_small,cellDark_large] = [100,160];
    [cellNumber_small,cellNumber_large] = [4,6];
}

    var acc = this.trials.sudo_acc[this.cur_trial];
    var trialType = this.trials.trial_types[this.cur_trial]; // new added

    if (trialType === 0) {
      var ctx1 = document.getElementById('canvas1').getContext('2d');
      var ctx2 = document.getElementById('canvas2').getContext('2d');
    } else {
      var ctx1 = document.getElementById('canvas2').getContext('2d');
      var ctx2 = document.getElementById('canvas1').getContext('2d');
    }

    var violate_feature = Math.random();
if (exp_condition == 1 || exp_condition == 3){

     if (violate_feature < 0.25){
        violate_feature = 2;   // modify 0905
      
      	var cellSize_holder = cellSize_large;
      	cellSize_large = cellSize_small;
      	cellSize_small = cellSize_holder;

     } else if (violate_feature < 0.5){
      violate_feature = 4; 

     	var cellRatio_holder = cellRatio_large;
      	cellRatio_large = cellRatio_small;
      	cellRatio_small = cellRatio_holder;

     } else if (violate_feature < 0.75){
      violate_feature = 3; 

     	var cellDark_holder = cellDark_large;
      	cellDark_large = cellDark_small;
      	cellDark_small = cellDark_holder;

     }  else if (violate_feature > 0.75){
      violate_feature = 1; 
      var cellNumber_holder = cellNumber_large;
      cellNumber_large = cellNumber_small;
      cellNumber_small = cellNumber_holder;

     }
} else if (exp_condition == 2.1 || exp_condition == 4.1){
     if (violate_feature < 0.3333){
      violate_feature = 2; 
      
        var cellSize_holder = cellSize_large;
        cellSize_large = cellSize_small;
        cellSize_small = cellSize_holder;

     } else if (violate_feature < 0.6667){
      violate_feature = 4; 

      var cellRatio_holder = cellRatio_large;
        cellRatio_large = cellRatio_small;
        cellRatio_small = cellRatio_holder;

     } else if (violate_feature > 0.6667){
      violate_feature = 3; 

      var cellDark_holder = cellDark_large;
        cellDark_large = cellDark_small;
        cellDark_small = cellDark_holder;

     } 

} else if (exp_condition == 2.2 || exp_condition == 4.2){
     if (violate_feature < 0.3333){
      violate_feature = 1; 
      
        var cellNumber_holder = cellNumber_large;
      cellNumber_large = cellNumber_small;
      cellNumber_small = cellNumber_holder;


     } else if (violate_feature < 0.6667){
      violate_feature = 4; 

      var cellRatio_holder = cellRatio_large;
        cellRatio_large = cellRatio_small;
        cellRatio_small = cellRatio_holder;

     } else if (violate_feature > 0.6667){
      violate_feature = 3; 

      var cellDark_holder = cellDark_large;
        cellDark_large = cellDark_small;
        cellDark_small = cellDark_holder;

     }  

} else if (exp_condition == 2.3 || exp_condition == 4.3){
     if (violate_feature < 0.3333){
      violate_feature = 2; 

        var cellSize_holder = cellSize_large;
        cellSize_large = cellSize_small;
        cellSize_small = cellSize_holder;

     } else if (violate_feature < 0.6667){
      violate_feature = 3; 

      var cellDark_holder = cellDark_large;
        cellDark_large = cellDark_small;
        cellDark_small = cellDark_holder;

     }  else if (violate_feature > 0.6667){
      violate_feature = 1; 
      var cellNumber_holder = cellNumber_large;
      cellNumber_large = cellNumber_small;
      cellNumber_small = cellNumber_holder;

     }
} else if (exp_condition == 2.4 || exp_condition == 4.4){
     if (violate_feature < 0.3333){
      violate_feature = 2; 

        var cellSize_holder = cellSize_large;
        cellSize_large = cellSize_small;
        cellSize_small = cellSize_holder;

     } else if (violate_feature < 0.6667){
      violate_feature = 4; 

      var cellRatio_holder = cellRatio_large;
        cellRatio_large = cellRatio_small;
        cellRatio_small = cellRatio_holder;

     } else if (violate_feature > 0.6667){
      violate_feature = 1; 

      var cellNumber_holder = cellNumber_large;
      cellNumber_large = cellNumber_small;
      cellNumber_small = cellNumber_holder;

     }

}


      var width_left = cellRatio_small * cellSize_large / 100;
      var height_left = cellSize_large /(cellRatio_small/100);
      var dark_left = cellDark_small;
      var number_left = cellNumber_large;

      var width_right = cellRatio_large * cellSize_small / 100;
      var height_right = cellSize_small/(cellRatio_large/100);
      var dark_right = cellDark_large;
      var number_right = cellNumber_small;

// if (this.trials.locations_left[this.cur_trial].length > this.trials.locations_right[this.cur_trial].length){	

    var Locations_more = gen_rand_locations(number_left);
    var Locations_less = gen_rand_locations(number_right);
/*
$('#displaydiv').append('<p id=text_ns></p>');
    $('#displaydiv').append('<p id=text_nl></p>');
    $('#text_ns').text(number_left);
    $('#text_nl').text(number_right);
    $('#text_ns').css({'position':'absolute','top':'98%','left':'30%'})
    $('#text_nl').css({'position':'absolute','top':'98%','left':'33%'})
*/
    // draws the circles
    /*
    if(Locations_more.length < 2){
      alert("Where it comes?!");
      document.write(Locations_more);
      document.write(number_left);
    }
    */
    Locations_more.forEach((loc,i) => {

      var rotate_id = Math.random();
      
      ctx1.beginPath();
      ctx1.moveTo(loc[0], loc[1]- height_left/2); // A1
      ctx1.bezierCurveTo(
        loc[0] + width_left/2, loc[1] - height_left/2, // C1
        loc[0] + width_left/2, loc[1] + height_left/2, // C2
        loc[0], loc[1] + height_left/2); // A2
      ctx1.bezierCurveTo(
        loc[0] - width_left/2, loc[1]+ height_left/2, // C3
        loc[0] - width_left/2, loc[1] - height_left/2, // C4
        loc[0], loc[1] - height_left/2); // A1

     

      ctx1.fillStyle = "rgb(" + dark_left + "," + dark_left + "," + dark_left + ")";
      ctx1.fill();
      ctx1.strokeStyle ='black';
      ctx1.stroke();

      ctx1.fillStyle = 'black';
      ctx1.beginPath();  
      ctx1.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx1.fill();
    
    })

    Locations_less.forEach((loc,i) => {

      var rotate_id = Math.random();
      

      ctx2.beginPath();
      ctx2.moveTo(loc[0], loc[1]- height_right/2); // A1
      ctx2.bezierCurveTo(
        loc[0] + width_right/2, loc[1] - height_right/2, // C1
        loc[0] + width_right/2, loc[1] + height_right/2, // C2
        loc[0], loc[1] + height_right/2); // A2
      ctx2.bezierCurveTo(
        loc[0] - width_right/2, loc[1] + height_right/2, // C3
        loc[0] - width_right/2, loc[1] - height_right/2, // C4
        loc[0], loc[1] - height_right/2); // A1

     

      ctx2.fillStyle = "rgb(" + dark_right + "," + dark_right + "," + dark_right + ")";
      ctx2.fill();
      ctx2.strokeStyle ='black';
      ctx2.stroke();

      ctx2.fillStyle = 'black';
      ctx2.beginPath();  
      ctx2.arc(loc[0],loc[1],3,0,2*Math.PI);
      ctx2.fill();

    })

  


//65 // where it from?

    $(document).clearQueue();


    var rtStart = performance.now();
    //var acc;

    // gets the response and records the data
    $(document).keypress((e) => {
      if(e.which === 97 || e.which === 108) {
        var rtEnd = performance.now();
        $(document).off('keypress')
        var rt = rtEnd - rtStart;
        if(e.which === 97) {
            var resp = 'a';
        } else {
            var resp = 'l';
        }
        var rt = rtEnd - rtStart;

        if (trialType === 0) {
            trialType = 'a';
        } else {
            trialType = 'l';
        }

        if (trialType[0] === resp) {
            acc = 1;
           // $("#feedback-area").html("Correct!");

        } else {
            acc = 0;
           // var feedback = '<p><font color = "red">You chose the wrong category.</font> ';
        }

        //$(feedback).insertAfter('#canvas1')

        this.trials.sudo_acc[this.cur_trial] = acc // maybe useless, lost in how to use acc in document

        //var ss = this.trials.locations_left[this.cur_trial].length;

        dm.recordData({//'Task': 'ColorK',
                      'Trialtype': trialType,   // the correct answer is a or l
                      
                      'Train_size_left':cellSize_large,
                      'Train_ratio_left':cellRatio_small,
                      'Train_dark_left':cellDark_small,
                      'Train_number_left':cellNumber_large,

                      'Train_size_right':cellSize_small,
                      'Train_ratio_right':cellRatio_large,
                      'Train_dark_right':cellDark_large,
                      'Train_number_right':cellNumber_small,

                      'RT': rt,
                      //'CRESP': trialType[0],  
                      'RESP':resp,      // participants' response
                      'Correct': acc,   // whether the answer of this trial is correct
                      'Violate_feature':violate_feature,
                      //'SetSize': ss,
                    })
        this.next_k_trial_state();
      }
    })
    
  
    // waits the necessary amount of time
   // var called = performance.now()
   // timeout = setTimeout(() => {
   //   this.next_k_trial_state();
   //   this.sample_time = performance.now() - called}, this.sample_time)
  }
  display_feedback(){
    resizeWinTo();
    blankCanvas();
    var index = this.trials.sudo_acc[this.cur_trial];
    if (index === 1){
      var feedback_text = 
      `Great job, your diagnosis is correct!`;
      var image_emoji = "<img id = 'emoji' width=150 height = 150 src='static/images/Good.png'></img>";
    } else {
      var feedback_text = 
      `Sorry, your diagnosis is incorrect.`;
      var image_emoji = "<img id = 'emoji' width=150 height = 150 src='static/images/Sorry.png'></img>";
    }

    var press_text = 
    `Press the space key to continue`;

    if (this.cur_trial >= 23){
      var cur_sum = 0;
      for(var i=0;i<24;i++) {
        cur_sum = cur_sum + this.trials.sudo_acc[this.cur_trial-i]
      }
      this.cur_acc = cur_sum/24
    }

    $('#displaydiv').append('<p id=text></p>');
    $('#displaydiv').append('<p id=text_2></p>');
    $('#displaydiv').append(image_emoji);

    $('#emoji').center();
    //$('#emoji').css(width=1000 height = 600)


    $('#text').text(feedback_text)
    $('#text_2').text(press_text)
    $('#text').css('font-size', '150%')
    $('#text_2').css('font-size', '150%')
    //$('#text').css({'background-color':'white'})
    //$('#text').css({'margin-left':'200px', 'margin-top':'370px','margin-right':'200px'})
    $('#text').center()
    $('#text_2').center()
    $('#text').css({'top':'66%'})
    $('#text_2').css({'position':'absolute','top':'71%'})

    $(document).keypress((e) => {
      if(e.which === 32) {
        $(document).off('keypress')
        this.next_k_trial_state();
        }
     })


   }

  }

/*
var exp_condition = 1;
psiTurk.recordUnstructuredData("exp_condition",exp_condition);
psiTurk.saveData();
*/

dm = new DataManager();

learn_task = new Learn_Task(number_of_trials);
rebuild_task = new Rebuild_Task();
rebuild_task2 = new Rebuild_Task2();
rebuild_task3 = new Rebuild_Task3();
rebuild_task4 = new Rebuild_Task4();
rebuild_task5 = new Rebuild_Task5();
rebuild_task6 = new Rebuild_Task6();
rebuild_task7 = new Rebuild_Task7();
rebuild_task8 = new Rebuild_Task8();
rebuild_task9 = new Rebuild_Task9();
rebuild_task10 = new Rebuild_Task10();
rebuild_practice = new Rebuild_Practice();

attention_check1 = new attention_check1();
attention_check2 = new attention_check2();
attention_check3 = new attention_check3();
attention_check4 = new attention_check4();
attention_check5 = new attention_check5();
attention_check6 = new attention_check6();
attention_check7 = new attention_check7();
attention_check8 = new attention_check8();


//example_display = new Example_display();

// The state machine for the entire experiment
var states = [

  welcome,
  
  instructions,
  instructions_2,
  illustration,
  illustration_2,
  example_number_1,
  example_size_1,
  example_ratio_1,
  example_dark_1,
  
  learn_task.start,

  pass_training,
  
  slider_instruction,
  rebuild_practice.start,
  attention_start,


  attention_1,
  attention_check1.start,
  feedback_1,
  attention_2,
  attention_check2.start,
  feedback_2,


  slider_start,
  Good_A,
  rebuild_task.start,
  Good_L,
  rebuild_task2.start,
  Typical_A,
  rebuild_task3.start,
  Typical_L,
  rebuild_task4.start, 

  Early_A,
  rebuild_task5.start,   // original 3
  Early_L,
  rebuild_task6.start,   // original 4
  Late_A,
  rebuild_task7.start,   // original 5
  Late_L,
  rebuild_task8.start,   // original 6  

  Teaching_A,
  rebuild_task9.start,
  Teaching_L,
  rebuild_task10.start, 

  attention_3,
  attention_check3.start,
  attention_4,
  attention_check4.start,
  attention_5,
  attention_check5.start,
  attention_6,
  attention_check6.start,
  attention_7,
  attention_check7.start,
  attention_8,
  attention_check8.start,

  text_input,
  
  
];

var cur_main_state = 0;

function next_main_state() {
  bgCanvas('#ffffff')
  if (states[cur_main_state]) {
    states[cur_main_state]()
  } else {
    end_experiment()
  }
  cur_main_state++
}

function last_main_state () {
  bgCanvas('#ffffff')
  if (states[cur_main_state]) {
    states[cur_main_state-2]()
  } else {
    end_experiment()
  }
  cur_main_state--
}

$(window).ready(function(){
  next_main_state();
});    // no )?
/*
$(window).load(function(){
  states[cur_main_state]()
}); 
*/

