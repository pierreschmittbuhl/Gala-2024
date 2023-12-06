

function isElementVisible(el) {
    var rect = el.getBoundingClientRect();

    return rect.bottom > 30 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */ &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */;
}

const liNavbar = Array.from(document.querySelectorAll("#navbar .menu-horizontal li"));
const sections = Array.from(document.querySelectorAll("#bienvenue, #inscription, #menu, #planning, #contacts"))

document.addEventListener("scroll", () => {
  liNavbar.forEach(v => v.classList.remove("border-b", "border-white"));
  found = false
  sections.forEach((v, i) => {
    if(!found && isElementVisible(v)) {
      liNavbar[i].classList.add("border-b", "border-white")
      found = true;
    }
  })
})

const size = document.getElementById("navbar").offsetHeight;

function scrollToBienvenue() {
  const bienvenue = document.querySelector('#bienvenue');
  const y = bienvenue.getBoundingClientRect().top + window.pageYOffset - size;
window.scrollTo({top: y, behavior: 'smooth'});
}

function scrollToInscription() {
  const inscription = document.querySelector('#inscription');
const y = inscription.getBoundingClientRect().top + window.pageYOffset - size;
window.scrollTo({top: y, behavior: 'smooth'});}

function scrollToMenu() {
  const menu = document.querySelector('#menu');
const y = menu.getBoundingClientRect().top + window.pageYOffset - size;
window.scrollTo({top: y, behavior: 'smooth'});}

function scrollToPlanning() {
  const planning = document.querySelector('#planning');
const y = planning.getBoundingClientRect().top + window.pageYOffset - size;
window.scrollTo({top: y, behavior: 'smooth'});}

function scrollToContacts() {
  const menu = document.querySelector('#contacts');
const y = menu.getBoundingClientRect().top + window.pageYOffset - size ;
window.scrollTo({top: y, behavior: 'smooth'});}

$(document).ready(function(){
  /*Tableau qui contient question et réponses */
  var q_array = [
    { 
			"question": "J’offre un verre à une personne :",
			"choices"  : ["1: Elle est en droit de refuser et si elle accepte ne me doit quand même rien.",'2: Si elle accepte elle me doit une faveur en retour','3: Elle peut refuser, mais accepter revient à accepter un rapprochement','4: Si elle refuse, je peux insister pour qu\'elle accepte, je lui offre en toute générosité'],
			"answer"  : "1:"  
		}, 
		{
			"question": "Si la conversation est bien entamée, j’ai le droit de me rapprocher physiquement en passant ma main derrière son épaule par exemple ?",
			"choices"  : ['1: Je m’assure d’un bref coup d’œil que la personne est ok pour ne pas casser l’ambiance et j’y vais','2: C’est le meilleur moyen de se rapprocher rapidement, même si c’est un peu gênant au début','3: Je demande son consentement à la personne. Une bonne entente ne justifie en aucun cas un contact physique non consenti.','4: Si on s’entend bien, le contact physique est la suite logique.'],
			"answer"  : '3:'  
		},
		{
			"question": "Une personne me fait remarquer que je l’ai mégenrée (j’ai utilisé les mauvais pronoms pour me référer à elle) : ",
			"choices"  : ['1: Je demande les raisons de cette remarque afin de mieux comprendre pourquoi je devrais utiliser d’autres pronoms.','2: Je lui présente mes excuses et n’insiste pas sur le sujet. Ça ne sert à rien d’en discuter plus longuement, à part mettre mal à l’aise la personne. Je veille par la suite à utiliser les pronoms de son choix.','3: Je conteste ce choix et continue d’utiliser les mêmes pronoms.','4: Je ne prête pas attention à sa remarque.'],
			"answer"  : '2:' 
		},
		{
			"question": "Je suis témoin d’une vss :",
			"choices"  : ['1: Je fais comme si je n’avais rien vu, ce ne sont pas mes affaires et la victime n’a rien dit donc tout va bien.','2: Je dis haut et fort ce que je viens de voir et attire l’attention afin que l’agresseur·euse se rende compte de ce qu’iel vient de faire','3: J’emmène la victime en espace safe, même si cette dernière me dit qu’elle n’en a pas envie.','4: Si je me sens en capacité, je demande de l’aide autour de moi pour apaiser la situation, je fais diversion, je vérifie discrètement que la victime va bien. Dans tous les cas je le signale au staff qui prendra en main la situation et aidera au mieux la victime'],
			"answer"  : '4:' 
		}
  ],
      tw_array = [" ", " TW : contact intime"," TW: mégenrage"," "],
      ex_array = ["<br/> Un cadeau est par nature désintéressé, il n’engage en rien lae récepteurice et insister pour lui offrir peut à force s’apparenter à du harcèlement. La réponse était donc : Elle est en droit de refuser et si elle accepte ne me doit quand même rien","<br/> Le consentement, libre et éclairé, est indispensable ! Il doit s’agir d’un « oui » clair et affirmé, toute autre réponse (ou absence de réponse) valant pour un « non ». Mieux vaut toujours « casser l’ambiance » plutôt que dépasser les limites! Et certaines personnes n’aiment pas qu’on les touche, donc il faut prendre ça en compte lorsque je veux toucher quelqu’un·e.","<br/> Une personne est en droit de choisir les pronoms avec lesquels iel se sent la.e plus à l’aise. Iel n’a en aucun cas besoin de se justifier. Si iel me fait remarquer que je l’ai mégenré.e, je le prends en compte sans m’étaler sur le sujet et je veille à ne pas reproduire l’erreur. ","<br/> Lorsque l’on est témoin d’une VSS, pour venir en aide à la victime, il y a la règle des 5D : distraire, déléguer, documenter, diriger, dialoguer. Dans tous les cas, il est primordial de respecter les souhaits de la victime même si vous n’êtes pas d’accord avec : chacun·e réagit différemment à un traumatisme. <br/> <br/> Si vous êtes vous-même victime et que vous le souhaitez, vous pourrez vous rendre à l’espace safe (il sera indiqué par des affiches). Des membres du staff formé·es à la prise en charge de victimes seront présent·es tout au long de la soirée."],
      a_array = [],      //tableau des réponses des utilisateurs
      outputs = $('.quiz'), // div de sortie
      button  = $('#start'), //bouton pour lancer le quizz
      nexq    = $('.next'), //bouton de question suivante
      unblurq = $('.unblur'); // Enleve le flou
  
  //Function that creates radio button
  var createRadio = function(index){               
    var ulist = $('<ul>');
			var items;
			var bli = $('<li>');
			var input;
			for(var i=0;i<q_array[index].choices.length;i++){
				items = $('<li>'); 
				input = '<input type="radio" id="answer" name="answer" value='+ q_array[index].choices[i] +'>';
				input+=q_array[index].choices[i];  
				items.append(input);
				ulist.append(items);
			} 

			return ulist;
  }
  
  
  //Fonction qui regarde et compte si une question est juste et affiche les messages
  var right = function(question,answer){
    var div  = $('<div></div>',{class:'output'});
			var ul   = $('<ul>',{class:'final'});
			var li; 
			var input;
			var paraq;
	    	for(var i=0;i<question.length;i++){
	    		if(question[i].answer === answer[i]){
	    			display.correct++;
	    			li = $('<li>');
	    			paraq = $('<p style="color:#297e41;">',{class:'success'});
	    			paraq.append(question[i].question);    
	    			li.append(paraq);
            
	    			
						
	    			
	    		}else{
	    			li = $('<li>');
	    			paraq = $('<p style="color:#ff5656;">',{class:'error'});
	    			paraq.append(question[i].question+'  <small>('+question[i].answer+')</small>');
	    			li.append(paraq);
	    			
	    		} 
          input=('<p> Explication: '+ ex_array[i] +' </p>');
          li.append(input);  
					ul.append(li);
	    			
	    	} 
	    	div.append(ul); 
	    	return div;
  }
  
  //Fonction d'affichage des questions et des choix
  var display = function(){
     if(display.index<q_array.length){
				var div    = $('<div></div>',{class:'output'});
				var	header = $('<h2>Question '+(display.index+1)+(tw_array[display.index])+ '</h2>'); 
				div.append(header);

				var	paraq  = $('<p>').append(q_array[display.index].question);
				div.append(paraq);

				var radio = createRadio(display.index);
				div.append(radio); 

				outputs.append(div);
 
			}else{
				var greet   = $('<h3>'); 
				var message =       right(q_array,a_array);				
				greet.text('Vous avez obtenu '+display.correct+' questions correctes sur '+q_array.length);
				outputs.append(greet);
				outputs.append(message);
          nexq.css('display','none');
          unblurq.css('display','none');
          $('.output p').css('filter','blur(0px)');
          $('.lien').css('display','block');
				display.index   = 0;
				display.correct = 0;
			}
  }           
  
  //Fonction pour vérifier les réponses
  var check = function(){
    var test = 0;
    var radios = document.getElementsByName('answer'),
	      ans;
	    	for(var i=0;i<radios.length;i++){
	    		if(radios[i].checked){
	    			ans = (radios[i]).value;
            test = 1;
	    			a_array.push(String(ans));
	    		}
          
          }
           if(test ==0){
            a_array.push("skip")
	    	}
  }
      
  button.on('click',function(){
    $(this).css('display','none');
    nexq.css('display','inline-block');
    unblurq.css('display','inline-block');
    display.index   = 0;
    
    display.correct = 0;
    display();
  });
  
  nexq.on('click',function(){
         check();
	    	outputs.empty();  
	    	display.index++;
	    	display();
  });
  unblurq.on('click',function(){
             $('.output p').css('filter','blur(0px)');
             });
  
  $('.lien').on('click',function(){
    window.location.href = "https://www.helloasso.com/associations/aeensl/evenements/gala-2023";
  });
  
});

(function () {
  "use strict";

  // define variables
  var items = document.querySelectorAll(".timeline li");

  // check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);
})();

