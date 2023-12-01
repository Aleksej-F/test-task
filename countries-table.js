Vue.component('countries-table', {
  props: ['countries'],
  template: `
      <div class="сtable">
          <h1>Страны</h1>
          <filterlist
            :filterList="countries"
          />
          <div class="сtable-head">
            <div class="сtable-head_item">
              <b>обозначение</b>
            </div>
            <div class="сtable-head_item">
              <b>код</b>
            </div>
            <div class="сtable-head_item">
              <b>имя для печати</b>
            </div>
            <div class="сtable-head_item">
              <b>имя</b>
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