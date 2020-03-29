


var pokemonRepository = (function(){
    
    
    var repository=[];

    var plist=document.querySelector('.list_pokemon');
    
    
    
    function getAll(){
        
        return repository;
        
    }

    function addListItem(pokemon){
        
        

        var listItem=document.createElement('li');
        var btn = document.createElement('button');
        
        
        btn.innerText=pokemon.name;
        btn.setAttribute('type','button');
        btn.classList.add('btn');
        btn.classList.add('btn-primary');
        btn.classList.add('btn_pokemon');
        btn.setAttribute('data-toggle','modal');
        btn.setAttribute('data-target','#modal_details');

        listItem.classList.add('list-group-item');
        listItem.appendChild(btn);
        plist.appendChild(listItem);
        
        
        
        
        $(btn).click(function(){
            loadDetails(pokemon);
            
        })
        


    }
    
    
    
    
    function loadList(){
        
        showLoadingMessage();
        var path='https://pokeapi.co/api/v2/pokemon/';
        fetch(path).then(function(response){
            return response.json();
        }).then(function(list){
            
            list.results.forEach(function(item){
                var pokemon = {name:item.name, detailsUrl:item.url};
                
                add(pokemon);
            });

        }).catch(function (e) {
            console.error(e);
        });
        
        hideLoadingMessage();
    }
    
    
    function add(pokemon){

            repository.push(pokemon);
        
            addListItem(pokemon);
            
            
    } 
    
    function loadDetails(pokemon){
        
        
        showLoadingMessage();
        var path = pokemon.detailsUrl;
        
        fetch(path).then(function(response){
            return response.json();
        }).then(function(details){
            
            //clearing old values in case there is a delay in loading the new ones
            $('.modal-title').html("");
            $('#pokemon_height').html("");
            document.getElementById('image_pokemon').src="";
            
            
            var height = details.height;
            var imgUrl =details.sprites.front_default;
            pokemon = {name:pokemon.name,detailsUrl:pokemon.detailsUrl, height:height, imgUrl:imgUrl};
            
            //add values to the modal elements
            
            var pokemonHeight = '<b>Height:</b> '+pokemon.height;
            var name = pokemon.name.toUpperCase();
            document.getElementById('image_pokemon').src=pokemon.imgUrl;
            $('.modal-title').html(name);
            $('#pokemon_height').html(pokemonHeight);
            
            
            
            hideLoadingMessage();
            
            
        });
        
        
    }
    
     function showLoadingMessage(){
         document.getElementById('div_loading').style.display='flex';
         
     }   
    
    function hideLoadingMessage(){
        document.getElementById('div_loading').style.display='none';
    }
    
    //functions to switch between light and dark modes
    $('#sun').click(function(){
        
        if($(this).hasClass('text-light'))
            {
                $(this).addClass('text-dark');
                $(this).removeClass('text-light');
                $('#moon').addClass('text-light');
                $('#moon').removeClass('text-dark');
                
                $('li').removeClass('dark');
                $('.btn_pokemon').removeClass('dark');
                
                $('main').css('background-color','white');
                $('#membrane').css('display','block');
                
                $('#title').css('color','black');
                
                
            }
    })
    
    
    $('#moon').click(function(){
        
        if($(this).hasClass('text-light'))
            {
                
                $(this).addClass('text-dark');
                $(this).removeClass('text-light');
                $('#sun').addClass('text-light');
                $('#sun').removeClass('text-dark');

                $('li').addClass('dark');
                $('.btn_pokemon').addClass('dark');
                $('main').css('background-color','black');
                $('#membrane').css('display','none');
                
                $('#title').css('color','white');
                
                

            }

    })
    
    //remove focus from pokemon button
    $(function(){
        
        $(document).on('focus','.btn_pokemon',function(){
            $(this).blur();
        })    
        
    })
    
    
    return {loadList:loadList,add:add,getAll:getAll};  
    

})();


pokemonRepository.loadList();















 
