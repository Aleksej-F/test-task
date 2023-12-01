
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