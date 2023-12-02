Vue.component('filter-list', {
  props: ['filterlist', 'page'],
  template: `
    <div class="filter">
      <h4>Фильтер</h4> {{ filterSelect }}
      <select 
        v-model="filterSelect"
        @change="select"
      >
        <option
          value=""
        >
        Все
        </option>
        <option 
          v-for="(item ) in filterlist"
          :key="item.iso_3166_1_numeric"
          :value="item.iso_3166_1_a3"
        >
        {{ item.iso_3166_1_a3}}
        </option>
      </select>
    </div>
  `,
  created() {

  },
  data() {
    return{
      filterSelect: '',
    }
  },
  methods:{
    select(){
      console.log(this.filterSelect)
      this.$emit('getpage', {
        "filters": {
           "iso_3166_1_a2": this.filterSelect
        },
        "paginate": {
          "page": this.page,
          "pp_items": 10
        }
      });
    }
  }
});