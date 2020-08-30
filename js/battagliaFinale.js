var giorni = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
var calcolaClassificaRun = false;

var matchs = [];
matchs[11] = {"episodio":1, "girone":1, "nome":"battaglia-finale-episodio-1-gruppo-1", "daCaricare":true, "stampaPosizione" : 0};
matchs[12] = {"episodio":1, "girone":2, "nome":"battaglia-finale-episodio-1-gruppo-2", "daCaricare":true, "stampaPosizione" : 0};
matchs[13] = {"episodio":1, "girone":3, "nome":"battaglia-finale-episodio-1-gruppo-3", "daCaricare":true, "stampaPosizione" : 0};
matchs[14] = {"episodio":1, "girone":4, "nome":"battaglia-finale-episodio-1-gruppo-4", "daCaricare":true, "stampaPosizione" : 0};
matchs[15] = {"episodio":1, "girone":5, "nome":"battaglia-finale-episodio-1-gruppo-5", "daCaricare":true, "stampaPosizione" : 0};
matchs[21] = {"episodio":2, "girone":1, "nome":"battaglia-finale-episodio-2-gruppo-1", "daCaricare":true, "stampaPosizione" : 0};
matchs[22] = {"episodio":2, "girone":2, "nome":"battaglia-finale-episodio-2-gruppo-2", "daCaricare":true, "stampaPosizione" : 0};
matchs[23] = {"episodio":2, "girone":3, "nome":"battaglia-finale-episodio-2-gruppo-3", "daCaricare":true, "stampaPosizione" : 0};
matchs[24] = {"episodio":2, "girone":4, "nome":"battaglia-finale-episodio-2-gruppo-4", "daCaricare":true, "stampaPosizione" : 0};
matchs[25] = {"episodio":2, "girone":5, "nome":"battaglia-finale-episodio-2-gruppo-5", "daCaricare":true, "stampaPosizione" : 0};
matchs[31] = {"episodio":3, "girone":1, "nome":"battaglia-finale-episodio-3-gruppo-1", "daCaricare":true, "stampaPosizione" : 0};
matchs[32] = {"episodio":3, "girone":2, "nome":"battaglia-finale-episodio-3-gruppo-2", "daCaricare":true, "stampaPosizione" : 0};
matchs[33] = {"episodio":3, "girone":3, "nome":"battaglia-finale-episodio-3-gruppo-3", "daCaricare":true, "stampaPosizione" : 0};
matchs[34] = {"episodio":3, "girone":4, "nome":"battaglia-finale-episodio-3-gruppo-4", "daCaricare":true, "stampaPosizione" : 0};
matchs[35] = {"episodio":3, "girone":5, "nome":"battaglia-finale-episodio-3-gruppo-5", "daCaricare":true, "stampaPosizione" : 0};
matchs[41] = {"episodio":4, "girone":1, "nome":"battaglia-finale-episodio-4-gruppo-1", "daCaricare":true, "stampaPosizione" : 0};
matchs[42] = {"episodio":4, "girone":2, "nome":"battaglia-finale-episodio-4-gruppo-2", "daCaricare":true, "stampaPosizione" : 0};
matchs[43] = {"episodio":4, "girone":3, "nome":"battaglia-finale-episodio-4-gruppo-3", "daCaricare":true, "stampaPosizione" : 0};
matchs[44] = {"episodio":4, "girone":4, "nome":"battaglia-finale-episodio-4-gruppo-4", "daCaricare":true, "stampaPosizione" : 0};
matchs[45] = {"episodio":4, "girone":5, "nome":"battaglia-finale-episodio-4-gruppo-5", "daCaricare":true, "stampaPosizione" : 0};
matchs[51] = {"episodio":5, "girone":1, "nome":"battaglia-finale-episodio-5-gruppo-1", "daCaricare":true, "stampaPosizione" : 0};
matchs[52] = {"episodio":5, "girone":2, "nome":"battaglia-finale-episodio-5-gruppo-2", "daCaricare":true, "stampaPosizione" : 0};
matchs[53] = {"episodio":5, "girone":3, "nome":"battaglia-finale-episodio-5-gruppo-3", "daCaricare":true, "stampaPosizione" : 0};
matchs[54] = {"episodio":5, "girone":4, "nome":"battaglia-finale-episodio-5-gruppo-4", "daCaricare":true, "stampaPosizione" : 0};
matchs[55] = {"episodio":5, "girone":5, "nome":"battaglia-finale-episodio-5-gruppo-5", "daCaricare":true, "stampaPosizione" : 0};
/**/

//https://api.chess.com/pub/tournament/il-carosello-1deg-turno-girone-1/1/1
//https://api.chess.com/pub/tournament/"battaglia-finale-episodio-1-gruppo-1/1/1
//https://www.chess.com/tournament/battaglia-finale-episodio-1-gruppo-5

function elabora() {
    //Carico i dati di tutti i match
    for (var i in matchs) {
        matchs[i].url = 'https://api.chess.com/pub/tournament/' + matchs[i].nome + '/1/1';
        matchs[i].chessUrl = 'https://www.chess.com/tournament/' + matchs[i].nome;
        caricaMatch(matchs[i].url);
    };
}

function caricaMatch(url)
{
    //Leggo i dati 
    $.getJSON(url,function(data){

        //Cerco match elaborato
        var iMatch = 0
        for (var i in matchs) {
            if (this.url == matchs[i].url && matchs[i].daCaricare)
            iMatch = i;
        }        

        //Creo tutti i giocatori per avere anche quelli senza punteggio
        for (var iPlayer in data.players) {
            var username = data.players[iPlayer].username.toLowerCase();
            if (! giocatori[username]) {
                creaGiocatore(username);
            }

            //Tolgo Dirk perchè ha giocato in due gironi
            if (username != 'dirkflasche' || iMatch != 24)
            {
                //aggiungo il match tra i gironi giocati
                giocatori[username].gironi[matchs[iMatch].episodio] += '<a href="' + matchs[iMatch].chessUrl + '/pairings" target=”_blank”> ' + matchs[iMatch].episodio + '/' + matchs[iMatch].girone + '</a> ';
            }
        }

        //Salvo i dati del match, i risultati devono essere elaborati dopo getAvatar per togliere eventuali bannati
        matchs[iMatch].data = data;

        //Caricamento completato
        matchs[iMatch].daCaricare = false;
        //Se ho caricato tutti i dati calcolo la classifica
        for (var i in matchs) {
            if (matchs[i].daCaricare) {
                return;
            }
        }
        
        //controllo di non aver già lanciato fase sucessiva
        if (calcolaClassificaRun)
            return;  
        calcolaClassificaRun = true;

        //Ricerco elo e stampo classifica torneo / giocatori
        getAvatar();
    
    }).error(function(jqXhr, textStatus, error) {
        //è andato in errore ricarico i dati
        //Se responseJSON non è valorizzato solo se il record esiste    
        console.log(this.url + ' Errore in caricamento');
        var index = 0;
        for (var i in matchs) {
            if (matchs[i].url == this.url)
                index = i;
        };
        if (! jqXhr.responseJSON)
        {
            console.log('ERRORE ricarico dati: ' + this.url);
            caricaMatch(this.url);    
        } else {
            console.log('ERRORE Match non valida. ' + this.url);
            console.log('ERRORE Match non valida. ' + this.url);
            console.log('ERRORE Match non valida. ' + this.url);
            console.log('ERRORE Match non valida. ' + this.url);
            //non lo devo più caricare
            matchs[index].daCaricare = false;           

            //Se ho caricato tutti i dati calcolo la classifica
            for (var i in matchs) {
                if (matchs[i].daCaricare) {
                    return;
                }
            }
            
            //controllo di non aver già lanciato fase sucessiva
            if (calcolaClassificaRun)
                return;  
            calcolaClassificaRun = true;
    
            //Ricerco elo e stampo classifica torneo / giocatori
            getAvatar();
        
            }
              
        });
}

function setPuntiClassifica() 
{
    //Per tutti i match
    for (var iMatch in matchs) 
    {
        //Se girone non ancora giocato, continuo
        if (! matchs[iMatch].data)
           continue;
           
        //Carico i risultati delle partite
        for (var i in matchs[iMatch].data.games) {
            if (matchs[iMatch].data.games[i].white.username && matchs[iMatch].data.games[i].black.username)
            {
                console.log('iMatch: ' + iMatch +  ' i: ' + i)
                console.log(matchs[iMatch].data.games[i].white.username);
                console.log(matchs[iMatch].data.games[i].black.username);
                    //Non cosidero se uno dei giocatori è stato bannato
                if (giocatori[matchs[iMatch].data.games[i].white.username.toLowerCase()].posizione < 999 && giocatori[matchs[iMatch].data.games[i].black.username.toLowerCase()].posizione < 999)
                {
                    //aggiorno punteggi
                    if (matchs[iMatch].data.games[i].white.username) {
                        if (matchs[iMatch].data.games[i].white.username.toLowerCase() != 'dirkflasche' || iMatch != 24)
                            setPunti(matchs[iMatch].data.games[i].white.username.toLowerCase(), matchs[iMatch].data.games[i].white.result, matchs[iMatch].data.games[i].black.username);
                        if (matchs[iMatch].data.games[i].black.username.toLowerCase() != 'dirkflasche' || iMatch != 24)
                            setPunti(matchs[iMatch].data.games[i].black.username.toLowerCase(), matchs[iMatch].data.games[i].black.result, matchs[iMatch].data.games[i].white.username);
                    }
                }
            }
        }
    }

    //Punti caricati, carico classifica giocatori
    calcolaClassificaGiocatori();
}


