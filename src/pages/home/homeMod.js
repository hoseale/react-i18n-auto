import { observable, action, computed, configure, runInAction } from 'mobx';
import $ from 'jquery';

// 严格模式
configure({enforceActions: 'always'})

class Mod {
  @observable
  count = 0

  @observable
  state={
    loading: false,
    list: []
  }

  @action
  increment() {
    this.count++
  }

  @action
  decrement() {
    this.count--
  }

  @action getData() {
    $.getJSON('/assets/mock/hello.json', (res) => {
      console.log(res, 'res')
      runInAction(() => {
        this.state.list = res.data
      })
    })
  }

  @computed
  get doubleCount() {
    return this.count * 2
  }
}

export default Mod;