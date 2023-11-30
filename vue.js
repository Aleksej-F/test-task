'use strict';
const API_ROOT = 'https://devops100.site/test/';

Vue.component('countries-table', {
  props: ['countries'],
  template: `
      <div class="сtable">
          <h1>Страны</h1>
          <div class="сtable-head">
            <div class="сtable-head_item">
              обозначение
            </div>
            <div class="сtable-head_item">
              код
            </div>
            <div class="сtable-head_item">
              имя для печати
            </div>
            <div class="сtable-head_item">
              имя
            </div>
          </div>
          <div class="сtable-head"
            v-for="item, index in countries"
          >
            <div class="сtable-head_item">
              {{ item.iso_3166_1_a3 }}
            </div>
            <div class="сtable-head_item">
              {{ item.iso_3166_1_numeric }}
            </div>
            <div class="сtable-head_item">
              {{ item.printable_name }}
            </div>
            <div class="сtable-head_item">
              {{ item.name }}
            </div>
          </div>
      </div>
  `,
  created() {

  },
  methods:{
    
  }
});

Vue.component('pagination', {
  props: ['pagination'],
  template: `
  <div>
  <div class="block-contener" 
    v-if="pagination.paginations.length>1"
  >
    <div class="block-pagination">
      <div class="block-pagination-element"
        @click = "paginate('-1')"
        v-if="pagination.has_previous"
      >
        <span>
          &laquo; Назад
        </span>
      </div>
      <div 
        v-for="(item) in pagination.paginations"
        :key = "item.label" 
        class="block-pagination-element" 
        :class="{active:item.active}"
        @click ="paginate(parseInt(item.label))"
      >
        <span>
          {{item.label}}
        </span>
      </div>
      <div class="block-pagination-element"
        @click = "paginate('+1')"
        v-if="pagination.has_next"
      >
        <span>
          Вперед &raquo;
        </span>
      </div>
    </div>
  </div>
</div>
  `,
  created() {
    
  },
  
  
  methods:{
    paginate (pag) {
      console.log("pag -- ", pag)
      switch (pag) {
        case '-1' : {
          if (this.pagination.has_previous) {
            pag = this.pagination.previous_page_number
          } else { return }
        break;
        }
        case '+1' : {
          if  (this.pagination.has_next) {
            pag = this.pagination.next_page_number
          } else { return }
        break;
        }
        default:{ }
      }
      this.$emit('getpage', {
        "filters": {
           "iso_3166_1_a2":""
        },
        "paginate": {
          "page": pag,
          "pp_items": 10
        }
      });
    }
  },
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
    this.addPaginations()
  },
  data: {
    countries:[{
      "iso_3166_1_a2": "RU",  //сокращенное обозначени
      "iso_3166_1_a3": "RUS", // обозначение
      "iso_3166_1_numeric": "643", // код - номер
      "printable_name": "Russian Federation", // имя для печати
      "name": "",   // имя
      "display_order": 0,  // порядок отображения - сортировка
      "is_shipping_country": false
    }],
    pagination: {
      "has_next": false,  // есть следующая страница
      "has_previous": false, // наличие предудущей страницы
      "has_other_pages": false, // наличие других страниц
      "next_page_number": null, // номер следующей страницы
      "previous_page_number": null, // номер предыдущей страницы
      "start_index": 1,  // начальный элемент
      "end_index": 1, // последний элемент
      "total_count": 249, // общее количество записей
      "selected_count": 1, // количество выбранных записей
      "pages": 1 // номер страницы
    },
    isError: false,
  },
  methods:{
    async getCountrieList(item){
      try {
        console.log('запрос ', item)
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
        this.countries = countries.page_data.data
        this.pagination = countries.page_data.rpag
        this.addPaginations()
      } catch (error) {
          console.log(`Can't fetch  data`, error);
          this.isError = true;
          throw new Error(error);
      }
    },
    addPaginations(){
      let pagin = []
        for (let i=this.pagination.start_index; i <= this.pagination.end_index; i++){
          pagin.push({
            label: i,
            active: i === this.pagination.page
          })
        }
        this.pagination.paginations = pagin
    }
  }
});