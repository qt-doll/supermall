import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop';
import {BACK_POSITION} from 'common/const'

export const itemListenerMixin = {
    data() {
        return {
            detailImgListener: null,
            newRefresh: null
        }
    },
    mounted() {

        this.newRefresh = debounce(this.$refs.scroll.refresh, 500)
        this.detailImgListener = () => {
            this.newRefresh()
        }
        this.$bus.$on("itemImageLoad", this.detailImgListener)
    
      }
}

export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false
        }
    },
    components: {
        BackTop
    },
    methods: {

        backClick() {
            // 第三个参数500，是时间，在这个时间内完成滚动
            this.$refs.scroll.scrollTo(0, 0, 500) 
        },
        listenShowBackTop(pos) {
        this.isShowBackTop = (-pos.y) > BACK_POSITION
        }
    
      }
}