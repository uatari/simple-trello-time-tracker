const t = window.TrelloPowerUp.iframe();

const getMinutes = async () =>
  (await t.get('card', 'shared', 'minutes')) || 0;

const setMinutes = (v) =>
  t.set('card', 'shared', 'minutes', v);

const fmt = (m) => {
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(h).padStart(2,'0')}:${String(mm).padStart(2,'0')}`;
};

window.TrelloPowerUp.initialize({
  'card-badges': async () => {
    const minutes = await getMinutes();
    if (!minutes) return [];
    return [{
      text: `${fmt(minutes)} (${(minutes/60).toFixed(2)}h)`,
      color: 'blue'
    }];
  },

  'card-buttons': () => [{
    text: '+15m',
    callback: async () => {
      const current = await getMinutes();
      await setMinutes(current + 15);
      await t.closePopup();
      return t.render(); // refresh badges
    }
  }]
});
