'use strict';
const API_ROOT = 'https://devops100.site/test/';

async function fetchAPI(item) {
  try {
      console.log('запрос ')
      const res = await fetch(`${API_ROOT}`,{
        method: 'POST',
                    body: JSON.stringify(item),
                    headers: {
                      'accept': '*/*',
                      'Content-Type': 'application/json'
                    }
      });
      const countries = await res.json();
      console.log('countriess' + countries)
      
  } catch (error) {
      console.log(`Can't fetch  data`, error);
      
      throw new Error(error);
  }
};

Vue.component('countries-table', {
  props: [],
  template: `
      <div class="сtable">
          <p>таблица</p>
      </div>
  `,
  created() {

  },
  methods:{
    
  }
});

new Vue({
  el: '#app',
  created() {
    this.getCountrieList({
      "filters": {
         "iso_3166_1_a2":""
      },
      "paginate": {
        "page": 1,
        "pp_items": 10
      }
    })
  },
  data: {
    countries:[],
    
    isError: false,
  },
  methods:{
    async getCountrieList(item){
      try {
        console.log('запрос ')
        const res = await fetch(`${API_ROOT}`,{
          method: 'POST',
                      body: JSON.stringify(item),
                      headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json'
                      }
        });
        const countries = await res.json();
        console.log('countriess' + countries)
        
    } catch (error) {
        console.log(`Can't fetch  data`, error);
        this.isError = true;
        throw new Error(error);
    }
      }
  }
});