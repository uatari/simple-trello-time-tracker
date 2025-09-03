// Trello Power-Up JavaScript (power-up.js)
TrelloPowerUp.initialize({
  'card-badges': function(t, options) {
    return t.card('name', 'desc')
    .then(function(card) {
      const timeMatch = card.desc.match(/TIME_LOGGED:(\d+)/);
      const minutes = timeMatch ? parseInt(timeMatch[1]) : 0;
      
      if (minutes > 0) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const timeStr = hours.toString().padStart(2, '0') + ':' + 
                       mins.toString().padStart(2, '0');
        const hoursDecimal = (minutes / 60).toFixed(2);
        
        return [{
          text: timeStr + ' (' + hoursDecimal + 'h)',
          color: 'blue'
        }];
      }
      return [];
    });
  },
  
  'card-buttons': function(t, options) {
    return [{
      text: '+15m',
      callback: function(t) {
        return t.card('desc')
        .then(function(card) {
          const currentDesc = card.desc || '';
          const timeMatch = currentDesc.match(/TIME_LOGGED:(\d+)/);
          const currentMinutes = timeMatch ? parseInt(timeMatch[1]) : 0;
          const newMinutes = currentMinutes + 15;
          
          let newDesc;
          if (timeMatch) {
            newDesc = currentDesc.replace(/TIME_LOGGED:\d+/, 
                     'TIME_LOGGED:' + newMinutes);
          } else {
            newDesc = currentDesc + '\n\nTIME_LOGGED:' + newMinutes;
          }
          
          return t.card('desc', newDesc);
        });
      }
    }];
  }
});
