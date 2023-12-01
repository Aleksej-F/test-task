Vue.component('filterlist', {
  props: ['filterList'],
  template: `
    <div class="filter">
      <h4>Фильтер</h4>
      <select 
        v-model="filterSelect"
      >
        <option 
          v-for="(item ) in filterList"
          :key="item"
          
        >
        {{ item.iso_3166_1_a3}}
        </option>
      </select>
    </div>
  `,
  created() {

  },
  data: {
    filterSelect: '',
  },
  methods:{
    
  }
});