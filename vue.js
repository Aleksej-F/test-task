'use strict';
const API_ROOT = 'https://devops100.site/test/';


new Vue({
  el: '#app',
  created() {
    this.getCountrieList({
      "filters": {
         "iso_3166_1_a2":""
      },
      "paginate": {
        "page": 1,
        "pp_items": 5
      }
    })
    
  },
  data() { return{
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
      "pages": 1 ,// номер страницы
      "paginations": []
    },
    isError: false,}
  },
  computed: {
    paginanions: () =>{
      let pagin = []
        for (let i = 0; i < 5; i++){
          let nn = this.pagination.has_previous ? this.pagination.previous_page_number - 1 > 0 
              ? this.pagination.previous_page_number - 1 : this.pagination.previous_page_number
            : this.pagination.next_page_number - 1
          pagin.push({
            label: i + nn,
            active: i + nn === this.pagination.next_page_number - 1
          })
          if (i + nn === this.pagination.next_page_number - 1) {
            this.pagination.activePage = i + nn
          }
        }
        
      return pagin
    }
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
        console.log('res',  res)
        const countries = await res.json();
        console.log('countriess' , countries)
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
      if (has_previous){
        for (let i = 0; i < 5; i++){
          let nn = this.pagination.has_previous ? this.pagination.previous_page_number - 1 > 0 
              ? this.pagination.previous_page_number - 1 : this.pagination.previous_page_number
            : this.pagination.next_page_number - 1
          pagin.push({
            label: i + nn,
            active: i + nn === this.pagination.next_page_number - 1
          })
          if (i + nn === this.pagination.next_page_number - 1) {
            this.pagination.activePage = i + nn
          }
        }
      }
      this.pagination.paginations = pagin
    }
  }
});