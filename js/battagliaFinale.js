var giorni = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
var calcolaClassificaRun = false;

var matchs = [];
matchs[11] = {"episodio":1, "girone":1, "nome":"battaglia-finale-episodio-1-gruppo-1", "daCaricare":true, "stampaPosizione" : 0};
matchs[12] = {"episodio":1, "girone":2, "nome":"battaglia-finale-episodio-1-gruppo-2", "daCaricare":true, "stampaPosizione" : 0};
matchs[13] = {"episodio":1, "girone":3, "nome":"battaglia-finale-episodio-1-gruppo-3", "daCaricare":true, "stampaPosizione" : 0};
matchs[14] = {"episodio":1, "girone":4, "nome":"battaglia-finale-episodio-1-gruppo-4", "daCaricare":true, "stampaPosizione" : 0};
matchs[15] = {"episodio":1, "girone":5, "nome":"battaglia-finale-episodio-1-gruppo-5", "daCaricare":true, "stampaPosizione" : 0};
/*matchs[21] = {"episodio":1, "girone":1, "nome":"battaglia-finale-episodio-2-gruppo-1", "daCaricare":true, "stampaPosizione" : 0};
matchs[22] = {"episodio":1, "girone":2, "nome":"battaglia-finale-episodio-2-gruppo-2", "daCaricare":true, "stampaPosizione" : 0};
matchs[23] = {"episodio":1, "girone":3, "nome":"battaglia-finale-episodio-2-gruppo-3", "daCaricare":true, "stampaPosizione" : 0};
matchs[24] = {"episodio":1, "girone":4, "nome":"battaglia-finale-episodio-2-gruppo-4", "daCaricare":true, "stampaPosizione" : 0};
matchs[25] = {"episodio":1, "girone":5, "nome":"battaglia-finale-episodio-2-gruppo-5", "daCaricare":true, "stampaPosizione" : 0};
matchs[31] = {"episodio":1, "girone":1, "nome":"battaglia-finale-episodio-3-gruppo-1", "daCaricare":true, "stampaPosizione" : 0};
matchs[32] = {"episodio":1, "girone":2, "nome":"battaglia-finale-episodio-3-gruppo-2", "daCaricare":true, "stampaPosizione" : 0};
matchs[33] = {"episodio":1, "girone":3, "nome":"battaglia-finale-episodio-3-gruppo-3", "daCaricare":true, "stampaPosizione" : 0};
matchs[34] = {"episodio":1, "girone":4, "nome":"battaglia-finale-episodio-3-gruppo-4", "daCaricare":true, "stampaPosizione" : 0};
matchs[35] = {"episodio":1, "girone":5, "nome":"battaglia-finale-episodio-3-gruppo-5", "daCaricare":true, "stampaPosizione" : 0};
matchs[41] = {"episodio":1, "girone":1, "nome":"battaglia-finale-episodio-4-gruppo-1", "daCaricare":true, "stampaPosizione" : 0};
matchs[42] = {"episodio":1, "girone":2, "nome":"battaglia-finale-episodio-4-gruppo-2", "daCaricare":true, "stampaPosizione" : 0};
matchs[43] = {"episodio":1, "girone":3, "nome":"battaglia-finale-episodio-4-gruppo-3", "daCaricare":true, "stampaPosizione" : 0};
matchs[44] = {"episodio":1, "girone":4, "nome":"battaglia-finale-episodio-4-gruppo-4", "daCaricare":true, "stampaPosizione" : 0};
matchs[45] = {"episodio":1, "girone":5, "nome":"battaglia-finale-episodio-4-gruppo-5", "daCaricare":true, "stampaPosizione" : 0};
matchs[51] = {"episodio":1, "girone":1, "nome":"battaglia-finale-episodio-5-gruppo-1", "daCaricare":true, "stampaPosizione" : 0};
matchs[52] = {"episodio":1, "girone":2, "nome":"battaglia-finale-episodio-5-gruppo-2", "daCaricare":true, "stampaPosizione" : 0};
matchs[53] = {"episodio":1, "girone":3, "nome":"battaglia-finale-episodio-5-gruppo-3", "daCaricare":true, "stampaPosizione" : 0};
matchs[54] = {"episodio":1, "girone":4, "nome":"battaglia-finale-episodio-5-gruppo-4", "daCaricare":true, "stampaPosizione" : 0};
matchs[55] = {"episodio":1, "girone":5, "nome":"battaglia-finale-episodio-5-gruppo-5", "daCaricare":true, "stampaPosizione" : 0};
*/

//https://api.chess.com/pub/tournament/il-carosello-1deg-turno-girone-1/1/1
//https://api.chess.com/pub/tournament/battaglia-finale-episodio-1-gruppo-1/1/1
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
            //aggiungo il match tra i gironi giocati
            giocatori[username].gironi[matchs[iMatch].episodio] = '<a href="' + matchs[iMatch].chessUrl + '" target=”_blank”> ' + matchs[iMatch].episodio + '/' + matchs[iMatch].girone + '</a> ' 
            
            matchs[iMatch].girone;
        }

        //Carico i risultati delle partite
        for (var i in data.games) {

            //aggiorno punteggi
            if (data.games[i].white.username) {
                setPunti(data.games[i].white.username.toLowerCase(), data.games[i].white.result, data.games[i].black.username);
                setPunti(data.games[i].black.username.toLowerCase(), data.games[i].black.result, data.games[i].white.username);
            }
        }

//--???????? carosello togliere da classifica finale bannati
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
        var index = 0;
        for (var i in matchs) {
            if (matchs[i].url == this.url)
                index = i;
        };
        if (! jqXhr.responseJSON)
        {
            console.log('ERRORE ricarico dati: ' + this.url);
                caricaMatch(index, this.url);    
            } else {
                console.log('ERRORE Match non valida. ' + this.url);
                console.log('ERRORE Match non valida. ' + this.url);
                console.log('ERRORE Match non valida. ' + this.url);
                console.log('ERRORE Match non valida. ' + this.url);
                //non lo devo più caricare
                matchs[index].daCaricare = false;            }
              
        });
}




